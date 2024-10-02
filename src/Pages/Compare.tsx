import { Link } from "react-router-dom";
import banner from "../../assets/banner.jpg";
import { useGetFurnituresQuery } from "../store/furnitureApi";
import "./Compare.scss";
import { CompareItems } from "../component/CompareItems";
import { CompareItemsTwo } from "../component/CompareItemsTwo";

export const Compare = () => {
  const { data } = useGetFurnituresQuery();

  return (
    <div className="">
      <div className="relative flex flex-col ">
        <p className="absolute  m-auto left-0 top-0 right-0 bottom-0 w-fit h-fit  text-[48px] font-semibold  z-20">
          Compare
        </p>
        <div className="z-20 flex absolute m-auto left-0 top-[80px] right-0 bottom-0 w-fit h-fit gap-5">
          <Link to="/" className=" font-semibold   ">
            Home
          </Link>
          <span className="font-semibold">{`>`}</span>
          <Link to="/compare" className="font-semibold">
            Compare
          </Link>
        </div>
        <img
          className="w-full h-[320px] object-cover opacity-80 z-10"
          src={banner}
          alt=""
        />
      </div>
      <div className="2in1  mt-5">
        <div className=" h-[35vh] ">
          <div className="flex ">
            <div className="flex flex-col justify-center items-center   w-[20%]">
              <p className=" text-2xl font-bold w-[200px]">
                Go to Product page for more Products
              </p>

              <Link to="/shop" className="text-[20px] text-[#797979] underline">
                View more
              </Link>
            </div>
            <div className="flex w-[80%]">
              <CompareItemsTwo data={data} />
            </div>
          </div>
        </div>
        <div className="h-[90vh] flex justify-start items-start ">
          <div className="flex min-w-[20%] text-[20px]  flex-col justify-center items-center gap-5 pt-5 pb-[115px] border-r-2 border-t-2 border-[#797979] border-opacity-15">
            <h1 className="font-bold text-2xl">Dimensions</h1>
            <span>Width</span>
            <span>Height</span>
            <span>Length</span>
            <h1 className="font-bold text-2xl">General</h1>
            <span>Model</span>
            <span>Finish</span>
            <span>Material</span>
            <span>Frame Material</span>
            <span>Seating Capacity</span>
            <h1 className="font-bold text-2xl">Warranty</h1>
            <span>Warranty Summary</span>
          </div>

          <CompareItems data={data} />
        </div>
      </div>
    </div>
  );
};
