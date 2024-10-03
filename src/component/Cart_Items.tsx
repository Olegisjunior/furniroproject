import share from "../../assets/Vector_share.png";
import compare from "../../assets/Vector_compare.png";
import like from "../../assets/Vector_like.png";
import likeRed from "../../assets/Vector_like_red.png";
import { FC } from "react";
import { useActions } from "../hooks/Actions";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppSelector } from "../hooks/redux";
type Cart_Items_Props = {
  img: string;
  desc: string;
  discount: boolean;
  name: string;
  price: number;
  id: number;
};

export const Cart_Items: FC<Cart_Items_Props> = ({
  img,
  desc,
  discount,
  name,
  price,
  id,
}) => {
  const { addFavorite } = useActions();
  const { addCompare } = useActions();
  const { addLike } = useActions();
  const { liked } = useAppSelector((state) => state.liked);
  const { compareItems } = useAppSelector((state) => state.compare);

  const AddToFav = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
    event.preventDefault();
    addFavorite({ id: id, quantity: 1 });
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
  };

  const AddToComp = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    event.preventDefault();
    if (compareItems.length < 4) {
      addCompare(id);
      toast.success("Added to compare!", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (compareItems.length === 4) {
      toast.error("Maximum 4 item to compare!", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const AddToLike = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    event?.preventDefault();
    addLike(id);
    toast.success("Added to Liked!", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const calc = (price: number) => {
    return price - price * 0.2;
  };

  return (
    <Link className="w-[290px] h-[400px]" to={`/furniture/${id}`}>
      <div className="cardItem relative w-[290px] h-[400px] bg-[#F4F5F7] overflow-hidden   shadow-lg flex flex-col justify-around ">
        <img src={img} />
        <p className="font-semibold mx-5 text-[#3A3A3A] text-[20px] truncate">
          {name}
        </p>
        <p className="font-medium mx-5 text-[#898989] text-[14px] truncate">
          {desc}
        </p>

        <div className="absolute inset-0 bg-black bg-opacity-0 flex flex-col gap-y-5 justify-center items-center transition-opacity opacity-0 duration-300 hover:bg-opacity-60 hover:opacity-100">
          <button
            onClick={(event) => AddToFav(event, id)}
            className="bg-white w-[200px] h-[50px] px-4 py-2 font-semibold text-[#B88E2F]"
          >
            Add to cart
          </button>
          <div className="flex gap-6">
            <button className="text-white bg-none flex items-center justify-center gap-1">
              <img src={share} /> Share
            </button>
            <button
              onClick={(e) => AddToComp(e, id)}
              className="text-white bg-none flex items-center justify-center gap-1"
            >
              <img src={compare} /> Compare
            </button>
            <button
              onClick={(e) => AddToLike(e, id)}
              className="text-white bg-none flex  items-center justify-center gap-1"
            >
              <img src={liked.includes(id) ? likeRed : like} /> Like
            </button>
          </div>
        </div>
        <div className="flex justify-between">
          <p className="font-semibold mx-5 text-[#3A3A3A] text-[20px]">
            {discount ? calc(price) : price}₴
          </p>
          {discount && (
            <span className="font-semibold mx-5 text-[#898989] text-[20px] line-through">
              {price}₴
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};
