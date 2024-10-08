import cardImg2 from "../../assets/cardImg2.png";
import cardImg3 from "../../assets/cardImg3.png";
import Vector1 from "../../assets/Vector1.png";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const HomePageSwiper = () => {
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={2}
        navigation
        pagination={{ clickable: true }}
        className="object-cover"
      >
        <SwiperSlide>
          {({ isActive }) => (
            <div>
              <img
                src={cardImg2}
                className={
                  isActive ? `h-[600px] relative` : `h-[500px] relative`
                }
                alt=""
              />
              <div>
                <div className="w-[220px] h-[130px]  bg-[rgba(255,255,255,0.72)] absolute bottom-[50px] left-[50px] flex flex-col justify-center items-center backdrop-blur-sm ">
                  <span className="text-[16px] text-[#616161] font-medium">
                    01 — Bed Room
                  </span>
                  <span className="text-[28px] text-[#3a3a3a] font-semibold">
                    Inner Peace
                  </span>
                </div>
                <div className="w-[48px] h-[48px] bg-[#B88E2F] absolute left-[270px] bottom-[50px] flex justify-center items-center">
                  <img src={Vector1} className="" alt="" />
                </div>
              </div>
            </div>
          )}
        </SwiperSlide>
        <SwiperSlide>
          {({ isActive }) => (
            <img
              src={cardImg3}
              className={isActive ? `h-[600px]` : `h-[500px]`}
              alt=""
            />
          )}
        </SwiperSlide>
        <SwiperSlide>
          {({ isActive }) => (
            <img
              src={cardImg2}
              className={isActive ? `h-[600px]` : `h-[500px]`}
              alt=""
            />
          )}
        </SwiperSlide>
        <SwiperSlide>
          {({ isActive }) => (
            <img
              src={cardImg3}
              className={isActive ? `h-[600px]` : `h-[500px]`}
              alt=""
            />
          )}
        </SwiperSlide>
      </Swiper>
    </>
  );
};
