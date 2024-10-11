import { Link } from "react-router-dom";
import banner from "../../assets/banner.jpg";
import { useGetFurnituresQuery } from "../store/furnitureApi";
import "./Compare.scss";
import { CompareItems } from "../component/CompareItems";

export const Compare = () => {
  const { data } = useGetFurnituresQuery();

  return (
    <div className=" h-fit py-10">
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
      <div className="2in1 mt-5 px-4 ">
        <div className="flex overflow-x-auto mt-5 w-full">
          <div className="flex flex-col min-w-[200px] p-2   text-xl border-r-2 border-gray-300">
            <div className="flex flex-col justify-center items-center  my-28">
              <p className="text-l text-2xl font-bold w-fit ">More Products</p>

              <Link
                to="/shop"
                className=" text-[20px] text-[#797979] underline"
              >
                View more
              </Link>
            </div>
            <h1 className="font-bold mb-3">Dimensions</h1>
            <span className="mb-2">Width</span>
            <span className="mb-2">Height</span>
            <span className="mb-5">Length</span>

            <h1 className="font-bold mb-3">General</h1>
            <span className="mb-2">Model</span>
            <span className="mb-2">Finish</span>
            <span className="mb-2">Material</span>
            <span className="mb-2">Frame Material</span>
            <span className="mb-5">Seating Capacity</span>

            <h1 className="font-bold mb-3">Warranty</h1>
            <span>Warranty Summary</span>
          </div>
          <CompareItems data={data} />
        </div>
      </div>
    </div>
  );
};

export default Compare;
