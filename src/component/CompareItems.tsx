import close from "../../assets/closeImg.png";
import { useActions } from "../hooks/Actions";
import { useAppSelector } from "../hooks/redux";
import { IFurniture } from "../store/furnitureApi";
import { toast } from "react-toastify";

interface CompareItemsProps {
  data: IFurniture[] | undefined;
}

export const CompareItems: React.FC<CompareItemsProps> = ({ data }) => {
  const { compareItems } = useAppSelector((state) => state.compare);

  const calc = (price: number) => {
    return price - price * 0.2;
  };
  const { removeCompare } = useActions();

  const { addFavorite } = useActions();

  const AddToFav = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
    event.preventDefault();
    toast.success("Added to cart!", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    addFavorite({ id: id, quantity: 1 });
  };

  const handleClick = (id: number) => {
    removeCompare(id);
  };
  return (
    <>
      {data &&
        data
          .filter((b) => compareItems.includes(b.id))
          .map((item, index) => {
            return (
              <div className="flex flex-col">
                <div className=" flex flex-col items-center w-[100%] gap-y-3 mt-5  ">
                  <img
                    className="
h-[170px] w-[170px]"
                    src={item.img}
                  />
                  <p className="truncate  w-[200px] text-xl font-bold">
                    {item.name}
                  </p>
                  <p className="text-xl font-bold">
                    {item.discount ? calc(item.price) : item.price}₴
                  </p>
                </div>

                <div
                  key={index}
                  className="flex flex-col items-center gap-y-2 p-4 text-xl border-r-2 border-gray-300 w-full"
                >
                  {" "}
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
                    <button
                      onClick={(e) => AddToFav(e, item.id)}
                      className="bg-orange-400 p-1 md:p-3 text-l md:text-xl font-medium "
                    >
                      Add to cart
                    </button>
                    <button onClick={() => handleClick(item.id)}>
                      <img src={close} className="h-[20px]" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
    </>
  );
};
