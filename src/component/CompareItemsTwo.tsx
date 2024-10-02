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
    </>
  );
};
