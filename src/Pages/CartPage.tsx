import { Link } from "react-router-dom";
import banner from "../../assets/banner.jpg";
import { useAppSelector } from "../hooks/redux";
import { useGetFurnituresQuery } from "../store/furnitureApi";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCheckoutData } from "../store/checkout.slice";
import { CartFavoritesItems } from "../component/CartFavoritesItems";

type QuantityItem = {
  id: number;
  quantity: number;
};

type SizeItem = {
  id: number;
  size: string;
};

interface SelectedColor {
  productId: number;
  color: string;
}

export const CartPage = () => {
  const { favorites } = useAppSelector((state) => state.furniture);
  const [quantity, setQuantity] = useState<QuantityItem[]>([]);
  const [size, setSize] = useState<SizeItem[]>([]);
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

  const calc = (price: number) => {
    return price - price * 0.2;
  };

  let totalQuantity = 0;

  if (data) {
    totalQuantity = quantity.reduce((total, item) => total + item.quantity, 0);
  }

  useEffect(() => {
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
        size: size,
      })
    );
  };

  return (
    <>
      <div className="relative flex flex-col ">
        <p className="absolute  m-auto left-0 top-0 right-0 bottom-0 w-fit h-fit  text-[48px] font-semibold  z-20">
          Cart
        </p>
        <div className="z-20 flex absolute m-auto left-0 top-[80px] right-0 bottom-0 w-fit h-fit gap-5">
          <Link to="/" className=" font-semibold   ">
            Home
          </Link>
          <span className="font-semibold">{`>`}</span>
          <Link to="/cart" className="font-semibold">
            Cart
          </Link>
        </div>
        <img
          className="w-full h-[320px] object-cover opacity-80 z-10"
          src={banner}
          alt=""
        />
      </div>
      <div className="min-h-[100vh] h-fit flex flex-col md:flex md:flex-row gap-y-10 md:gap-y-0 md:gap-x-10 md:container md:mx-auto my-10">
        <div className="LeftSide w-full md:w-[60%] ">
          <div className="flex justify-between items-center py-3 pl-5 pr-5">
            <h1 className="text-xl font-bold">Shopping Cart</h1>
            <h1 className="text-xl font-bold">{favorites.length} items</h1>
          </div>
          <div className="h-full ">
            <div className="flex flex-col md:flex-row justify-center md:justify-around items-center md:pr-16 gap-2 md:gap-0">
              <div className="md:w-[290px]">
                <p>Product Details</p>
              </div>
              <p className=" ">Price</p>
              <p className=" ">Amount</p>
              <p className=" ">Size</p>
              <p className=" ">color</p>
              <p className=" ">Total</p>
            </div>
            <hr className=" my-3 w-full h-[2px] bg-[#797979] opacity-30" />
            {favorites.length === 0 && (
              <div className="flex justify-center items-center text-xl">
                No items yet
              </div>
            )}
            <CartFavoritesItems
              data={data}
              quantity={quantity}
              selectedColors={selectedColors}
              setSelectedColors={setSelectedColors}
              setSize={setSize}
            />
          </div>
        </div>
        <div className="RightSide w-full md:w-[30%] bg-gray-100 h-fit">
          <h1 className="text-2xl font-bold flex justify-center items-center my-5">
            Order Summary
          </h1>
          <div className="flex justify-center items-center gap-2 my-5">
            <label>
              Coupon
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

export default CartPage;
