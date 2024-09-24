import { Link } from "react-router-dom";
import banner from "../../assets/banner.jpg";
import { useAppSelector } from "../hooks/redux";
import { IFurniture, useGetFurnituresQuery } from "../store/furnitureApi";
import { useEffect, useState } from "react";
import close from "../../assets/closeImg.png";
import { useActions } from "../hooks/Actions";
import { useDispatch } from "react-redux";

import { setCheckoutData } from "../store/checkout.slice";

type QuantityItem = {
  id: number;
  quantity: number;
};

interface SelectedColor {
  productId: number;
  color: string;
}

export const CartPage = () => {
  const { favorites } = useAppSelector((state) => state.furniture);
  const { removeFavorite, updateFavoriteQuantity } = useActions();
  const [quantity, setQuantity] = useState<QuantityItem[]>([]);
  const { data } = useGetFurnituresQuery();
  const [InpVal, setInpVal] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const [selectedColors, setSelectedColors] = useState<SelectedColor[]>([]);
  const [PriceValue, setPriceValue] = useState(0);

  const dispatch = useDispatch();

  const finalPrice = () => {
    let value = 0;
    if (success) {
      value = PriceValue + 400 - PriceValue * 0.05;
    } else {
      value = PriceValue + 400;
    }
    return value;
  };

  useEffect(() => {
    const initialQuantities = favorites.map((item) => ({
      id: item.id,
      quantity: item.quantity,
    }));

    setQuantity(initialQuantities);

    if (data && data.length > 0) {
      setSelectedColors(
        data.map((product) => ({
          productId: product.id,
          color: product.colors[0],
        }))
      );
    }
  }, [data, favorites]);

  const handleChange = (e: string, idItem: number) => {
    dispatch(updateFavoriteQuantity({ id: idItem, quantity: Number(e) }));
  };

  const calc = (price: number) => {
    return price - price * 0.2;
  };

  const RemoveFav = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    event.preventDefault();
    removeFavorite(id);
  };

  const totalQuantity = quantity.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    console.log("Quantity changed:", quantity);

    const totalPrice = quantity.reduce((total, item) => {
      const ItemData = data?.find((i) => i.id === item.id);
      const quanItems = favorites.find((f) => f.id === item.id)?.quantity || 1;

      if (!ItemData) return total;

      const itemPrice = ItemData.price * quanItems;
      const finalPrice = ItemData.discount
        ? calc(ItemData.price) * quanItems
        : itemPrice;

      return total + finalPrice;
    }, 0);

    setPriceValue(totalPrice);
  }, [favorites, data, quantity]);

  const SubmitInp = () => {
    if (InpVal === "FR5COUPONE") {
      setInpVal("FR5COUPONE");
      setSuccess(true);
    } else setSuccess(false);
  };

  const handleInp = (e: string) => {
    setInpVal(e);
  };

  const CheckoutData = () => {
    dispatch(
      setCheckoutData({
        color: selectedColors.filter((i) =>
          favorites.find((f) => f.id === i.productId)
        ),
        items: favorites,
        totalPrice: finalPrice(),
      })
    );
  };

  const ColorChange = (color: string, id: number) => {
    setSelectedColors((prev) =>
      prev.map((item) =>
        item.productId === id ? { ...item, color: color } : item
      )
    );
  };

  const favItems = data
    ?.filter((item) => favorites.find((f) => f.id === item.id))
    .map((i) => {
      const itemQuantity =
        quantity.find((item) => item.id === i.id)?.quantity || 1;
      const ImageChange = (i: IFurniture) => {
        const selectedProduct = selectedColors.find(
          (pr) => pr.productId === i.id
        );
        if (!selectedProduct) return i.gallery[0];

        if (selectedProduct.color === i.colors[0]) {
          return i.gallery[0];
        } else if (selectedProduct.color === i.colors[1]) {
          return i.gallery_second_color
            ? i.gallery_second_color[0]
            : i.gallery[0];
        } else if (selectedProduct.color === i.colors[2]) {
          return i.gallery_third_color
            ? i.gallery_third_color[0]
            : i.gallery[0];
        }

        return i.gallery[0];
      };
      return (
        <>
          <div className="flex justify-around items-center">
            <div className="flex gap-3">
              <img src={ImageChange(i)} className="h-[100px] rounded-md" />
              <div className="flex flex-col justify-center items-center">
                <p className="truncate w-[200px] text-xl font-semibold">
                  {i.name}
                </p>
                <p className="truncate w-[200px]">{i.desc}</p>
              </div>
            </div>
            <p>{i.discount ? calc(i.price) : i.price}₴</p>
            <input
              type="number"
              defaultValue={favorites.find((f) => f.id === i.id)?.quantity || 1}
              min={1}
              onChange={(event) => handleChange(event.target.value, i.id)}
              className="w-[3rem] h-[1rem] text-center  outline-none py-3 border border-solid rounded-xl"
            />
            <select
              className="w-[50px] h-[20px]"
              onChange={(e) => ColorChange(e.target.value, i.id)}
              defaultValue={i.colors && i.colors[0]}
            >
              {i.colors?.map((color, index) => {
                return (
                  <option
                    key={index}
                    style={{ backgroundColor: color }}
                    value={color}
                  >
                    {index + 1}
                  </option>
                );
              })}
            </select>
            <p>
              {i.discount
                ? calc(i.price) * itemQuantity
                : i.price * itemQuantity}
              ₴
            </p>
            <button onClick={(event) => RemoveFav(event, i.id)}>
              <img src={close} className="h-[20px]" />
            </button>
          </div>
          <hr className="w-full my-3 h-[2px] bg-[#797979] opacity-20" />
        </>
      );
    });

  return (
    <>
      <div className="relative flex flex-col ">
        <p className="absolute text-[48px] font-semibold left-[898px] top-[110px] z-20">
          Cart
        </p>
        <div className="z-20">
          <Link
            to="/"
            className="absolute font-semibold left-[900px] top-[170px]"
          >
            Home
          </Link>
          <span className="absolute left-[953px] font-semibold top-[170px]">{`>`}</span>
          <Link
            to="/cart"
            className="absolute left-[970px] font-semibold top-[170px]"
          >
            Cart
          </Link>
        </div>
        <img
          className="w-full h-[320px] object-cover opacity-80 z-10"
          src={banner}
          alt=""
        />
      </div>
      <div className="h-[100vh] flex gap-x-10 container mx-auto my-10">
        <div className="LeftSide w-[60%] ">
          <div className="flex justify-between items-center py-3 pl-5 pr-5">
            <h1 className="text-xl font-bold">Shopping Cart</h1>
            <h1 className="text-xl font-bold">{favorites.length} items</h1>
          </div>
          <div className="h-full ">
            <div className="flex gap-10 pl-10 pr-10">
              <p className="w-[45%]">Product Details</p>
              <p className="w-[10%]">Price</p>
              <p className="w-[12%]">Quantity</p>
              <p className="w-[10%]">color</p>
              <p className="w-[10%]">Total</p>
            </div>
            <hr className=" my-3 w-full h-[2px] bg-[#797979] opacity-30" />
            {favorites.length === 0 && (
              <div className="flex justify-center items-center text-xl">
                No items yet
              </div>
            )}
            <div>{favItems}</div>
          </div>
        </div>
        <div className="RightSide w-[30%] bg-gray-100 h-fit">
          <h1 className="text-2xl font-bold flex justify-center items-center my-5">
            Order Summary
          </h1>
          <div className="flex justify-center items-center gap-2 my-5">
            <label>
              Coupon{"   "}
              <input
                type="text"
                className={`rounded-xl px-2 text-center ${
                  success && "text-[#797979]"
                }`}
                placeholder="coupon"
                value={InpVal}
                disabled={success ? true : false}
                onChange={(event) => handleInp(event.target.value)}
              />
            </label>
            <button
              onClick={SubmitInp}
              className="rounded-[50%] w-[25px] h-[25px]  bg-[#b88e2f] text-[14px] text-[#fff] font-semibold hover:bg-[#a58029]"
            >
              ✓
            </button>
          </div>
          <div
            className="flex 
          items-center flex-col"
          >
            <div className="flex gap-20">
              <h1 className="text-l font-semibold">Price Details</h1>
              <h1 className="text-l font-semibold">(items {totalQuantity})</h1>
            </div>
            {success && (
              <div className="flex gap-[7rem]">
                <p className="text-l font-semibold">Coupone</p>
                <p className="text-l font-semibold">-5%</p>
              </div>
            )}
            {favorites.length === 0 ? null : (
              <div className="flex gap-[7rem]">
                <p className="text-l font-semibold">Shipping</p>
                <p className="text-l font-semibold">400₴</p>
              </div>
            )}
            <hr className="w-[80%] h-[2px] bg-[#797979] my-2" />
            <div className="flex gap-24 ">
              <p className="text-l font-semibold">Total Price</p>
              <p className="text-l font-semibold">
                {success
                  ? PriceValue + 400 - PriceValue * 0.05
                  : PriceValue + 400}
                ₴
              </p>
            </div>
          </div>
          <div className="flex justify-around items-center my-5">
            <Link to="/shop" className=" rounded-[2rem] p-3 hover:underline">
              Back to Store
            </Link>
            <button
              className={`rounded-[2rem] p-3 bg-[#b88e2f] hover:bg-[#a58029] text-[#fff] font-semibold `}
              onClick={CheckoutData}
            >
              {favorites.length === 0 ? (
                `Checkout`
              ) : (
                <Link to="/checkout">Checkout</Link>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
