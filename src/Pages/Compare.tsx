import { Link } from "react-router-dom";
import banner from "../../assets/banner.jpg";
import { useAppSelector } from "../hooks/redux";
import { useActions } from "../hooks/Actions";
import { useGetFurnituresQuery } from "../store/furnitureApi";

export const Compare = () => {
  const { favorites } = useAppSelector((state) => state.furniture);
  const { removeFavorite } = useActions();
  const { data } = useGetFurnituresQuery();

  const calc = (price: number) => {
    return price - price * 0.2;
  };

  return (
    <div>
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
      <div className="bg-orange-500 h-[40vh]">
        <div className="flex gap-10">
          <div className="flex flex-col justify-center items-center">
            <p className="ml-10 text-xl font-bold w-[150px]">
              Go to Product page for more Products
            </p>

            <Link to="/shop" className="text-[#797979] underline">
              View more
            </Link>
          </div>
          <div className="flex gap-10">
            {data &&
              data
                .filter((b) => favorites.includes(b.id))
                .map((item) => {
                  return (
                    <div className="flex flex-col items-center gap-y-3 mt-5">
                      <img className="h-[170px] w-[170px]" src={item.img} />
                      <p className="truncate w-[200px]">{item.name}</p>
                      <p>{item.discount ? calc(item.price) : item.price}₴</p>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
      <div className="container mx-auto h-[100vh]"></div>
    </div>
  );
};
