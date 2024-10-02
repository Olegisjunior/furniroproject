import { Link, useParams } from "react-router-dom";
import {
  useGetFurnitureByIdQuery,
  useGetFurnituresQuery,
} from "../store/furnitureApi";
import star from "../../assets/star.png";
import half_star from "../../assets/half_star.png";
import { useEffect, useState } from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import { useActions } from "../hooks/Actions";
import { ImageGalleryComponent } from "../component/ImageGalleryComponent";
import { skipToken } from "@reduxjs/toolkit/query";
import { ItemPageSizeComponent } from "../component/ItemPageSizeComponent";
import { ItemPageColorComponent } from "../component/ItemPageColorComponent";
import { ProductInfo } from "../component/ProductInfo";
import { RelatedProducts } from "../component/RelatedProducts";

//refactoring code +-yes
//loreminpsum homepage
//notifications to add cart
// під учити reduce, some, find, filter!!!!!!!!!!!!!!

export const ItemPage = () => {
  const { productId } = useParams();
  const { data, isLoading, error } = useGetFurnitureByIdQuery(
    productId ? parseInt(productId, 10) : skipToken
  );
  const { addFavorite } = useActions();
  const { addCompare } = useActions();
  const {
    data: data2,
    isLoading: isLoading2,
    error: error2,
  } = useGetFurnituresQuery();
  const [isActive, setIsActive] = useState(0);
  const [size, setSize] = useState("l");
  const [isActive2, setIsActive2] = useState(0);
  const [counter, setCounter] = useState(1);
  const [isColor, setIsColor] = useState(data?.colors?.[0]);

  useEffect(() => {
    if (data && data.colors) {
      setIsColor(data.colors[0]);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return (
      <p className="text-3xl font-bold flex justify-center items-center h-[70vh]">
        Wrong url, try again
      </p>
    );
  }

  const AddToFav = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
    event.preventDefault();

    addFavorite({ id: id, quantity: counter });
  };

  const AddToComp = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    event.preventDefault();
    addCompare(id);
  };

  const increment = () => {
    setCounter(counter + 1);
  };
  const decrement = () => {
    if (counter >= 2) setCounter(counter - 1);
    else if (counter === 1) {
      return null;
    }
  };

  const calc = (price: number) => {
    return price - price * 0.2;
  };

  return (
    <>
      <div
        className="w-full h-[100px] bg-[#F9F1E7] flex justify-start items-center gap-6 
      pl-[50px]"
      >
        <Link to="/" className="font-semibold text-[#9F9F9F]">
          Home
        </Link>
        <span className="font-semibold text-[24px]">{`>`}</span>
        <Link to="/shop" className="font-semibold text-[#9F9F9F]">
          Shop
        </Link>
        <span className="font-semibold text-[24px]">{`>`}</span>
        <span className="font-semibold">{data?.name}</span>
      </div>

      <div
        className={`min-h-[64vh] h-fit container mx-auto flex flex-col pt-10 mr-[200px]`}
      >
        <div className="flex gap-x-[150px]">
          <div className="flex gap-5  w-[50%]">
            <ImageGalleryComponent data={data} isColor={isColor} />
          </div>

          <div className="RightSide flex flex-col  w-[50%] gap-y-10">
            <p className="font-bold text-xl">{data?.name}</p>
            <p className="font-bold text-2xl text-[#000000]">
              {data?.discount ? calc(data.price) : data?.price}₴
              {data?.discount && (
                <span className="font-semibold mx-5 text-[#898989] text-[20px] line-through">
                  {data.price}₴
                </span>
              )}
            </p>
            <div className="flex gap-5 items-center">
              <div className="flex gap-2 justify-center items-center">
                <img className="h-[20px]" src={star} alt="" />
                <img className="h-[20px]" src={star} alt="" />
                <img className="h-[20px]" src={star} alt="" />
                <img className="h-[20px]" src={star} alt="" />
                <img className="h-[20px]" src={half_star} alt="" />
              </div>
              <div className="h-[30px] w-[1px] bg-[#9f9f9f]"></div>
              <p className="text-[#9f9f9f]">5 Customer review</p>
            </div>
            <p className="w-[700px] text-[14px]">{data?.desc}</p>
            <ItemPageSizeComponent
              data={data}
              isActive={isActive}
              setIsActive={setIsActive}
              setSize={setSize}
            />
            <ItemPageColorComponent data={data} setIsColor={setIsColor} />
            <div className="flex gap-10">
              <div className="w-[125px] h-[65px] text-[20px] flex justify-center items-center  border-black rounded-md gap-8">
                <button onClick={decrement}>-</button>
                <p>{counter}</p>
                <button onClick={increment}>+</button>
              </div>
              {data && (
                <>
                  <button
                    onClick={(e) => AddToFav(e, data.id)}
                    className="w-[215px] h-[65px] flex justify-center items-center border-solid border-[2px] border-black rounded-md gap-8"
                  >
                    Add To Cart
                  </button>
                  <button
                    onClick={(e) => AddToComp(e, data.id)}
                    className="w-[215px] h-[65px] flex justify-center items-center border-solid border-[2px] border-black rounded-md gap-8"
                  >
                    Add To Compare
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <hr className="w-[100%] h-[2px] bg-[#3a3a3a] mb-[60px] mt-[60px]" />

      <ProductInfo
        data={data}
        isActive2={isActive2}
        setIsActive2={setIsActive2}
        size={size}
      />

      <hr className="w-[full] h-[2px] bg-[#3a3a3a] mb-[60px] mt-[60px]" />

      <RelatedProducts data2={data2} isLoading2={isLoading2} error2={error2} />
    </>
  );
};
