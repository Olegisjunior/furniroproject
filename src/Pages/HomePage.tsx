import image from "../../assets/bg1.png";
import cartImage from "../../assets/img1.png";
import cartImage2 from "../../assets/img2.png";
import cartImage3 from "../../assets/img3.png";
import { ItemList2 } from "../component/ItemList2";
import { useState } from "react";
import { HomePageSwiper } from "../component/HomePageSwiper";
import { Collage } from "../component/Collage";

export const HomePage = () => {
  const [visibleItems, setVisibleItems] = useState(4);

  const handlerLoader = () => {
    setVisibleItems((prev) => prev + 4);
  };

  return (
    <main className="max-h-[500vh] h-fit">
      <section>
        <img src={image} className="w-full object-cover z-10 relative" alt="" />
        <div className="bg-[#FFF3E3] w-[643px] gap-[7px] h-[443px] absolute top-[300px] right-[80px] z-30 px-[40px] pt-[60px] pb-[40px]">
          <p className="font-semibold tracking-[3px] text-[#333333]">
            New Arrival
          </p>
          <p className="text-[52px] font-bold text-[#B88E2F]">
            Discover Our <br /> New Collection
          </p>
          <p className="text-[18px] font-semibold mt-[5px] text-[#333333] ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
            molestiae, accusantium officiis est eum vitae?
          </p>

          <button className="bg-[#B88E2F] hover:bg-[#aa842b] mt-[40px] text-white w-[222px] h-[74px] font-bold">
            BUY NOW
          </button>
        </div>
        <div className="container mx-auto flex flex-col justify-center items-center py-[40px]">
          <p className="text-[32px] text-[#333333] font-bold">
            Browse The Range
          </p>
          <p className="text-[#666666] text-[20px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        <div className="container mx-auto flex justify-between items-center relative">
          <div className="flex flex-col items-center justify-center">
            <img
              src={cartImage}
              className="w-[460px] h-[520px] object-cover object-left rounded-xl"
            />
            <p className="text-[#333333] text-[24px] font-semibold mt-5">
              Dining
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <img
              src={cartImage2}
              className="w-[460px] h-[520px] object-cover rounded-xl"
            />
            <p className="text-[#333333] text-[24px] font-semibold mt-5">
              Living
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <img
              src={cartImage3}
              className="w-[460px] h-[520px] object-cover object-left rounded-xl"
            />
            <p className="text-[#333333] text-[24px] font-semibold mt-5">
              Bedroom
            </p>
          </div>
        </div>
        <span className="text-[#3A3A3A] text-[40px] font-bold container mx-auto flex justify-center items-center my-10">
          Our Products
        </span>
        <div className="mx-auto my-4 flex items-center justify-center">
          {visibleItems && <ItemList2 value={visibleItems} />}
        </div>
        <div className="container mx-auto h-[100px] flex items-center justify-center">
          {visibleItems < 12 && (
            <button
              onClick={handlerLoader}
              className="w-[245px] h-[50px] border-[1px] border-solid border-[#b88e2f] text-[#B88E2F] text-[16px] font-semibold"
            >
              Show more
            </button>
          )}
        </div>
        <div className="swiper bg-[#FCF8F3] w-full h-[670px] flex gap-16">
          <div className=" py-[20px] px-[20px] ml-[100px] flex flex-col gap-5 w-[40%]">
            <p className="font-bold text-[40px] text-[#3a3a3a] mt-[200px]">
              50+ Beautiful rooms <br />
              inspiration
            </p>
            <p className="text-[#616161] font-medium">
              Our designer already made a lot of beautiful <br /> prototipe of
              rooms that inspire you
            </p>
            <button className="text-white bg-[#B88E2F] font-semibold w-[175px] h-[50px]">
              Explore More
            </button>
          </div>
          <div className="w-[60%] py-10 px-10">
            <HomePageSwiper />
          </div>
        </div>
        <Collage />
      </section>
    </main>
  );
};
