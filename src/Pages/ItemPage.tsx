import { Link, useParams } from "react-router-dom";
import {
  useGetFurnitureByIdQuery,
  useGetFurnituresQuery,
} from "../store/furnitureApi";
import star from "../../assets/star.png";
import half_star from "../../assets/half_star.png";
import { useEffect, useState } from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import { Cart_Items2 } from "../component/Cart_Items2";

/// to do
//1. зробити сторінку кожного товару, доробити всюди характеристики товарів  YES
//2. доробити пагінацію на сторінці Shop! YES
//2. доробити cart меню YES
//3. CART (quantity...) YES
//4. CHECKOUT
//5. COMPARE
// під учити reduce, some, find, filter!!!!!!!!!!!!!!

type Image = {
  original: string;
  thumbnail: string;
};

export const ItemPage = () => {
  const { productId } = useParams();
  //@ts-ignore
  const { data, isLoading, error } = useGetFurnitureByIdQuery(productId);
  //@ts-ignore
  const {
    data: data2,
    isLoading: isLoading2,
    error: error2,
  } = useGetFurnituresQuery();
  const [isActive, setIsActive] = useState(null);
  const [isActive2, setIsActive2] = useState(0);
  const [counter, setCounter] = useState(1);
  const [isColor, setIsColor] = useState(data?.colors?.[0]);
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    if (data && data.colors) {
      setIsColor(data.colors[0]);
    }
  }, [data]);

  useEffect(() => {
    if (!data) return;

    const updatedImages: Image[] = [];

    if (data.gallery && isColor === data?.colors?.[0]) {
      data?.gallery?.forEach((item: string) => {
        updatedImages.push({ original: item, thumbnail: item });
      });
    } else if (data.gallery_second_color && isColor === data?.colors?.[1]) {
      data?.gallery_second_color?.forEach((item: string) => {
        updatedImages.push({ original: item, thumbnail: item });
      });
    } else if (data.gallery_third_color && isColor === data?.colors?.[2]) {
      data?.gallery_third_color?.forEach((item: string) => {
        updatedImages.push({ original: item, thumbnail: item });
      });
    }

    setImages(updatedImages);
  }, [isColor, data]);

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

  const handleClick = (index: any) => {
    setIsActive(index);
  };
  const handleClickColor = (color: any) => {
    setIsColor(color);
  };

  const increment = () => {
    setCounter(counter + 1);
  };
  const decrement = () => {
    if (counter >= 2) setCounter(counter - 1);
    else if (counter === 1) {
      null;
    }
  };

  const calc = (price: number) => {
    return price - price * 0.2;
  };

  const desc_buttons = ["Description", "Additional Information"];

  const handleClick2 = (index: any) => {
    setIsActive2(index);
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
            <div className="gallery flex flex-col gap-5">
              <ImageGallery
                //@ts-ignore
                items={images}
                showNav={false}
                thumbnailPosition={"left"}
                showFullscreenButton={false}
                showPlayButton={false}
                disableThumbnailScroll={true}
              />
            </div>
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
            {data?.sizes ? (
              <div className="Sizes flex flex-col gap-3">
                <p className=" text-[#9f9f9f]">Size</p>
                <div className="flex gap-x-5">
                  {data?.sizes?.map((item, index) => {
                    return (
                      <button
                        key={index}
                        onClick={() => handleClick(index)}
                        className={
                          isActive === index
                            ? `h-[30px] w-[30px] text-[13px] text-white bg-[#B88E2F] rounded-md`
                            : `h-[30px] w-[30px] text-[13px] bg-[#F9F1E7] rounded-md`
                        }
                      >
                        {item.toUpperCase()}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}
            {data?.colors ? (
              <div className="Colors flex flex-col gap-3">
                <p className=" text-[#9f9f9f]">Color</p>
                <div className="flex gap-5">
                  {data?.colors?.map((color, index) => {
                    return (
                      <button
                        key={index}
                        onClick={() => handleClickColor(color)}
                        className={`h-[30px] w-[30px] rounded-[50%]`}
                        style={{ background: color }}
                      ></button>
                    );
                  })}
                </div>
              </div>
            ) : null}
            <div className="flex gap-10">
              <div className="w-[125px] h-[65px] text-[20px] flex justify-center items-center  border-black rounded-md gap-8">
                <button onClick={decrement}>-</button>
                <p>{counter}</p>
                <button onClick={increment}>+</button>
              </div>
              <button className="w-[215px] h-[65px] flex justify-center items-center border-solid border-[2px] border-black rounded-md gap-8">
                Add To Cart
              </button>
              <button className="w-[215px] h-[65px] flex justify-center items-center border-solid border-[2px] border-black rounded-md gap-8">
                Add To Compare
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr className="w-[100%] h-[2px] bg-[#3a3a3a] mb-[60px] mt-[60px]" />

      <div className="flex flex-col justify-around items-center w-full min-h-[300px] h-fit ">
        <div className="flex justify-center items-center gap-16 mb-10">
          {desc_buttons.map((item, index) => {
            return (
              <button
                key={index}
                onClick={() => handleClick2(index)}
                className={
                  isActive2 === index
                    ? `font-semibold text-[24px]`
                    : `font-semibold text-[24px] text-[#797979]`
                }
              >
                {item}
              </button>
            );
          })}
        </div>

        {isActive2 === 0 ? (
          <p className="w-[1200px] text-[#797979]">{data?.desc}</p>
        ) : (
          <div className="flex justify-around w-full">
            <div className="flex items-center gap-10">
              <table className="border-collapse text-[18px]">
                <tbody>
                  {data?.prod_info.Length && (
                    <tr>
                      <th className="font-medium border-[1px] border-[solid] border-[#000000] text-center py-4 pr-5 pl-5 border-l-0">
                        Length
                      </th>
                      <td className="text-left border-[1px] border-[solid] border-[#000000] border-r-0 pl-4 pr-4">
                        {data?.prod_info.Length}
                      </td>
                    </tr>
                  )}
                  {data?.prod_info.Width && (
                    <tr>
                      <th className="font-medium border-[1px] border-[solid] border-[#000000] text-center py-4 pr-5 pl-5 border-l-0">
                        Width
                      </th>
                      <td className="text-left border-[1px] border-[solid] border-[#000000] border-r-0 pl-4 pr-4">
                        {data?.prod_info.Width}
                      </td>
                    </tr>
                  )}
                  {data?.prod_info.Height && (
                    <tr>
                      <th className="font-medium border-[1px] border-[solid] border-[#000000] text-center py-4 pr-5 pl-5 border-l-0">
                        Height
                      </th>
                      <td className="text-left border-[1px] border-[solid] border-[#000000] border-r-0 pl-4 pr-4">
                        {data?.prod_info.Height}
                      </td>
                    </tr>
                  )}
                  {data?.prod_info.Material && (
                    <tr>
                      <th className="font-medium border-[1px] border-[solid] border-[#000000] text-center py-4 pr-5 pl-5 border-l-0 ">
                        Material
                      </th>
                      <td className="text-left border-[1px] border-[solid] border-[#000000] border-r-0 pl-4 pr-4">
                        {data?.prod_info.Material}
                      </td>
                    </tr>
                  )}
                  {data?.prod_info.Frame_Material && (
                    <tr>
                      <th className="font-medium border-[1px] border-[solid] border-[#000000] text-center py-4 pr-5 pl-5 border-l-0 ">
                        Frame Material
                      </th>
                      <td className="text-left border-[1px] border-[solid] border-[#000000] border-r-0 pl-4 pr-4">
                        {data?.prod_info.Frame_Material}
                      </td>
                    </tr>
                  )}
                  {data?.prod_info.Seating_Capacity && (
                    <tr>
                      <th className="font-medium border-[1px] border-[solid] border-[#000000] text-center py-4 pr-5 pl-5 border-l-0 ">
                        Seating Capacity
                      </th>
                      <td className="text-left border-[1px] border-[solid] border-[#000000] border-r-0 pl-4 pr-4">
                        {data?.prod_info.Seating_Capacity}
                      </td>
                    </tr>
                  )}
                  {data?.prod_info.Finish && (
                    <tr>
                      <th className="font-medium border-[1px] border-[solid] border-[#000000] text-center py-4 pr-5 pl-5 border-l-0 ">
                        Finish
                      </th>
                      <td className="text-left border-[1px] border-[solid] border-[#000000] border-r-0 pl-4 pr-4">
                        {data?.prod_info.Finish}
                      </td>
                    </tr>
                  )}
                  {data?.prod_info.Model && (
                    <tr>
                      <th className="font-medium border-[1px] border-[solid] border-[#000000] text-center py-4 pr-5 pl-5 border-l-0 ">
                        Model
                      </th>
                      <td className="text-left border-[1px] border-[solid] border-[#000000] border-r-0 pl-4 pr-4">
                        {data?.prod_info.Model}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {data?.size_photo?.map((item, index) => {
              return (
                <>
                  <img src={item} key={index} className="h-[400px]" />
                </>
              );
            })}
          </div>
        )}
      </div>

      <hr className="w-[full] h-[2px] bg-[#3a3a3a] mb-[60px] mt-[60px]" />

      <div className="4cards flex justify-between items-center flex-col h-[52vh] mb-[60px]">
        <span className="text-3xl font-bold">Related Product</span>
        <div className="grid w-[85%] grid-cols-[repeat(auto-fit,minmax(300px,1fr))]  gap-x-10 gap-y-10  ">
          {error2 ? (
            <p className="text-red-700">Oh no, there was an error</p>
          ) : isLoading2 ? (
            <p>Loading...</p>
          ) : (
            data2 &&
            data2.slice(0, 4).map((item: any) => {
              return (
                <Cart_Items2
                  img={item.img}
                  desc={item.desc}
                  discount={item.discount}
                  name={item.name}
                  price={item.price}
                  key={item.id}
                  id={item.id}
                />
              );
            })
          )}
        </div>
      </div>
    </>
  );
};
