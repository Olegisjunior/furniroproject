import React from "react";
import { IFurniture } from "../store/furnitureApi";
import { useDispatch } from "react-redux";
import { useActions } from "../hooks/Actions";
import { FavRemoveButton } from "./FavRemoveButton";
import { useAppSelector } from "../hooks/redux";
import { Link } from "react-router-dom";

type QuantityItem = {
  id: number;
  quantity: number;
};

interface SelectedColor {
  productId: number;
  color: string;
}

type SizeItem = {
  id: number;
  size: string;
};

interface FavItemsProps {
  data?: IFurniture[];
  quantity: QuantityItem[];
  selectedColors: SelectedColor[];
  setSelectedColors: React.Dispatch<React.SetStateAction<SelectedColor[]>>;
  setSize: React.Dispatch<React.SetStateAction<SizeItem[]>>;
}

export const CartFavoritesItems: React.FC<FavItemsProps> = ({
  data,
  quantity,
  selectedColors,
  setSelectedColors,
  setSize,
}) => {
  const { updateFavoriteQuantity } = useActions();
  const { favorites } = useAppSelector((state) => state.furniture);

  const dispatch = useDispatch();

  const ColorChange = (color: string, id: number) => {
    setSelectedColors((prev) =>
      prev.map((item) =>
        item.productId === id ? { ...item, color: color } : item
      )
    );
  };

  const SizeChange = (size: string, id: number) => {
    setSize((prev) =>
      prev.map((item) => (item.id === id ? { ...item, size: size } : item))
    );
  };

  const handleChange = (e: string, idItem: number) => {
    dispatch(updateFavoriteQuantity({ id: idItem, quantity: Number(e) }));
  };

  const calc = (price: number) => {
    return price - price * 0.2;
  };

  const favItems = data
    ?.filter((item) => favorites.find((f) => f.id === item.id))
    .map((i) => {
      const itemQuantity =
        quantity.find((item) => item.id === i.id)?.quantity || 1;

      if (i.sizes && i.sizes.length > 0) {
        const size = i.sizes[0];

        setSize((prev) =>
          prev.some((item) => item.id === i.id)
            ? prev
            : [...prev, { id: i.id, size: size }]
        );
      }

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

      // const initializeSize = () => {
      //   if (i && i.sizes && i.sizes.length > 0) {
      //     setSize((prev) =>
      //       prev.map((item) =>
      //         item.id === i.id ? { ...item, size: i.sizes[0] } : item
      //       )
      //     );
      //   }
      // };

      return (
        <>
          <div className="flex justify-center flex-col gap-6 md:gap-0 md:flex-row md:justify-around items-center p-5">
            <Link to={`/furniture/${i.id}`} className="flex gap-3">
              <img src={ImageChange(i)} className="h-[100px] rounded-md" />
              <div className="flex flex-col justify-center items-center">
                <p className="truncate w-[200px] text-xl font-semibold">
                  {i.name}
                </p>
                <p className="truncate w-[200px]">{i.desc}</p>
              </div>
            </Link>
            <p>{i.discount ? calc(i.price) : i.price}₴</p>
            <input
              type="number"
              defaultValue={favorites.find((f) => f.id === i.id)?.quantity || 1}
              min={1}
              onChange={(event) => handleChange(event.target.value, i.id)}
              className="w-[3rem] h-[1rem] text-center  outline-none py-3 border border-solid rounded-xl"
            />
            {i.sizes ? (
              <select
                className="w-12 h-5"
                defaultValue={i.sizes && i.sizes[0]}
                onChange={(e) => {
                  SizeChange(e.target.value, i.id);
                }}
              >
                {i.sizes?.map((it, index) => {
                  return (
                    <option key={index} value={it}>
                      {it}
                    </option>
                  );
                })}
              </select>
            ) : (
              <div className="md:flex md:items-center md:w-12 md:h-5">
                One size
              </div>
            )}
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
            <FavRemoveButton item={i} />
          </div>
          <hr className="w-full my-3 h-[2px] bg-[#797979] opacity-20" />
        </>
      );
    });

  return favItems;
};
