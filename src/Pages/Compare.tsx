import { Link } from "react-router-dom";
import banner from "../../assets/banner.jpg";
import { useAppSelector } from "../hooks/redux";
import { useActions } from "../hooks/Actions";
import { useGetFurnituresQuery } from "../store/furnitureApi";
import "./Compare.scss";
import close from "../../assets/closeImg.png";

export const Compare = () => {
  const { compareItems } = useAppSelector((state) => state.compare);
  const { removeCompare } = useActions();
  const { data } = useGetFurnituresQuery();

  const handleClick = (id: number) => {
    removeCompare(id);
  };

  const calc = (price: number) => {
    return price - price * 0.2;
  };

  return (
    <div className="">
      <div className="relative flex flex-col ">
        <p className="absolute text-[48px] font-semibold left-[848px] top-[110px] z-20">
          Compare
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
            to="/compare"
            className="absolute left-[970px] font-semibold top-[170px]"
          >
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
              {data &&
                data
                  .filter((b) => compareItems.includes(b.id))
                  .map((item) => {
                    return (
                      <div className="flex flex-col items-center w-[100%] gap-y-3 mt-5  ">
                        <img className="h-[170px] w-[170px]" src={item.img} />
                        <p className="truncate w-[200px] text-xl font-bold">
                          {item.name}
                        </p>
                        <p className="text-xl font-bold">
                          {item.discount ? calc(item.price) : item.price}₴
                        </p>
                      </div>
                    );
                  })}
            </div>
          </div>
        </div>
        {/* <hr className="flex justify-center items-center w-[100%] h-[2px] bg-[#797979] opacity-30" /> */}
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

          {data &&
            data
              .filter((b) => compareItems.includes(b.id))
              .map((item) => {
                return (
                  <div className="flex flex-col items-center gap-5 pb-5 pt-5 text-[20px] w-[100%] border-r-2 border-t-2 border-[#797979] border-opacity-15">
                    <p className="pt-[50px] truncate w-[290px] text-center">
                      {item.prod_info.Width || "-"}
                    </p>
                    <p className="truncate w-[290px] text-center">
                      {item.prod_info.Height || "-"}
                    </p>
                    <p className="truncate w-[290px] text-center">
                      {item.prod_info.Length || "-"}
                    </p>
                    <p className="pt-[50px] truncate w-[290px] text-center">
                      {item.prod_info.Model || "-"}
                    </p>
                    <p className="truncate w-[290px] text-center">
                      {item.prod_info.Finish || "-"}
                    </p>
                    <p className="truncate w-[290px] text-center">
                      {item.prod_info.Material || "-"}
                    </p>
                    <p className="truncate w-[290px] text-center">
                      {item.prod_info.Frame_Material || "-"}
                    </p>
                    <p className="truncate w-[290px] text-center">
                      {item.prod_info.Seating_Capacity || "-"}
                    </p>
                    <p className=" pt-[50px] w-[290px] h-[6rem] text-center">
                      {item.prod_info.Warranty || "-"}
                    </p>
                    <div className="flex pt-3 gap-x-20">
                      <button className="bg-orange-400 p-3 text-xl font-medium ">
                        Add to cart
                      </button>
                      <button onClick={() => handleClick(item.id)}>
                        <img src={close} className="h-[20px]" />
                      </button>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
};
