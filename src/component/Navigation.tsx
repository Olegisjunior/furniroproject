import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.svg";
import Profile from "../../assets/account.png";
import Search from "../../assets/search.png";
import Favorite from "../../assets/heart.png";
import Cart from "../../assets/cart.png";
import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/redux";
import { useGetFurnituresQuery } from "../store/furnitureApi";
import { useActions } from "../hooks/Actions";
import close from "../../assets/closeImg.png";
import "./Navigation.scss";

export const Navigation = () => {
  const { favorites } = useAppSelector((state) => state.furniture);
  const [modalIsOpen, setIsOpen] = useState(false);
  const { removeFavorite } = useActions();
  const { data } = useGetFurnituresQuery();
  const [SubTotal, setSubTotal] = useState<number>(0);

  const RemoveFav = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    event.preventDefault();
    removeFavorite(id);
  };

  const calc = (price: number) => {
    return price - price * 0.2;
  };

  useEffect(() => {
    setSubTotal(
      data?.reduce(
        (acc, i) =>
          favorites.includes(i.id)
            ? acc + (i.discount ? calc(i.price) : i.price)
            : acc,
        0
      ) || 0
    );
  }, [favorites, data]);

  const FavItems = data
    ?.filter((item) => favorites.includes(item.id))
    .map((i) => {
      return (
        <ul key={i.name} className="">
          <div className="flex justify-around items-center gap-5 mt-5">
            <img className="h-[90px] rounded-md" src={i.img} />
            <div className="flex flex-col justify-center items-center">
              <p className="w-[240px] truncate font-semibold">{i.name}</p>
              <div className="flex gap-3">
                <div className="flex justify-center items-center mx-5 text-[#B88E2F] text-[18px]  gap-x-6">
                  <span className=" text-[16px] text-[#000000]">1</span>
                  <span className=" text-[16px] text-[#000000]">x</span>
                  {/* quantity */}
                  <p>{i.discount ? calc(i.price) : i.price}₴</p>
                </div>
              </div>
            </div>
            <button onClick={(event) => RemoveFav(event, i.id)}>
              <img src={close} className="h-[20px] " />
            </button>
          </div>
        </ul>
      );
    });

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    if (modalIsOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [modalIsOpen]);

  return (
    <>
      <header
        className={`container mx-auto h-[100px]  flex justify-between items-center pl-5 pr-5 z-50 `}
      >
        <div className="flex gap-2 ">
          <img className="h-[40px] " src={Logo} />
          <span className="font-mont font-bold text-[34px]">Furniro</span>
        </div>
        <div className="flex gap-10 justify-center items-center mr-20">
          <Link className="font-[500]" to="/">
            Home
          </Link>
          <Link className="font-[500]" to="/shop">
            Shop
          </Link>
          <Link className="font-[500]" to="/about">
            About
          </Link>
          <Link className="font-[500]" to="/contact">
            Contact
          </Link>
        </div>
        <div className="flex gap-10 justify-center items-center ">
          <a href="">
            <img src={Profile} className="h-[28px]" alt="" />
          </a>
          <a href="">
            <img src={Search} className="h-[28px]" alt="" />
          </a>
          <a href="">
            <img src={Favorite} className="h-[28px]" alt="" />
          </a>
          <a
            onClick={(event) => event.preventDefault()}
            className="cursor-pointer"
          >
            <img
              src={Cart}
              onClick={openModal}
              className="h-[28px] relative"
              alt=""
            />
            {favorites.length >= 1 ? (
              <div className="w-[18px] h-[18px] bg-[#999999] rounded-[50%] flex items-center justify-center absolute top-[53px]">
                {favorites.length}
              </div>
            ) : null}
          </a>
        </div>

        {modalIsOpen && (
          <div
            onClick={closeModal}
            className="fixed left-0 top-0 right-0 bottom-0 bg-[rgba(0,0,0,0.6)] flex justify-center items-center z-50"
          >
            <aside
              onClick={(e) => e.stopPropagation()}
              className="flex flex-col fixed top-[0px] right-[0px] bg-white min-w-[500px] w-fit max-h-[100%] min-h-[750px] z-50"
            >
              <h1 className="font-[700] text-2xl text-center pt-5">
                Shopping Cart
              </h1>
              <div className="CUSTOM_SCROLL flex-grow overflow-y-scroll ">
                {FavItems}
              </div>
              <div className="flex justify-around p-2 ">
                <p className="font-semibold">Subtotal</p>
                <span className=" font-semibold text-[#B88E2F]">
                  {SubTotal}₴
                </span>
              </div>
              <hr className="w-[100%] h-[2px] bg-[#a1a1a1] my-2" />
              <div className="flex justify-around pb-5 pt-2">
                <Link
                  onClick={closeModal}
                  to="/cart"
                  className="font-medium py-2 px-6 border border-solid border-[#000000] rounded-full"
                >
                  Cart
                </Link>
                <Link
                  onClick={closeModal}
                  to="/checkout"
                  className="font-medium py-2 px-6 border border-solid border-[#000000] rounded-full"
                >
                  Checkout
                </Link>
                <Link
                  to="compare"
                  onClick={closeModal}
                  className="font-medium py-2 px-6 border border-solid border-[#000000] rounded-full"
                >
                  Comparison
                </Link>
              </div>
            </aside>
          </div>
        )}
      </header>
    </>
  );
};
