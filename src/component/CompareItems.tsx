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
          .map((item) => {
            return (
              <div className="flex flex-col items-center gap-5 pb-20 pt-5 text-[20px] w-[100%] border-r-2 border-t-2 border-[#797979] border-opacity-15">
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
                    className="bg-orange-400 p-3 text-xl font-medium "
                  >
                    Add to cart
                  </button>
                  <button onClick={() => handleClick(item.id)}>
                    <img src={close} className="h-[20px]" />
                  </button>
                </div>
              </div>
            );
          })}
    </>
  );
};
