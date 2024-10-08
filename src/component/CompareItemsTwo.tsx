import { useAppSelector } from "../hooks/redux";
import { IFurniture } from "../store/furnitureApi";

interface CompareItemsTwoProps {
  data: IFurniture[] | undefined;
}

export const CompareItemsTwo: React.FC<CompareItemsTwoProps> = ({ data }) => {
  const { compareItems } = useAppSelector((state) => state.compare);

  const calc = (price: number) => {
    return price - price * 0.2;
  };

  return (
    <>
      {data &&
        data
          .filter((b) => compareItems.includes(b.id))
          .map((item) => {
            return (
              <div className=" flex flex-col items-center w-[100%] gap-y-3 mt-5  ">
                <img
                  className="h-[80px]
w-[80px] md:h-[100px] md:w-[100px] l:h-[120px] l:w-[120px] xl:h-[170px] xl:w-[170px]"
                  src={item.img}
                />
                <p className="truncate w-[60px] md:w-[200px] text-sm md:text-xl font-bold">
                  {item.name}
                </p>
                <p className="text-sm md:text-xl font-bold">
                  {item.discount ? calc(item.price) : item.price}₴
                </p>
              </div>
            );
          })}
    </>
  );
};
