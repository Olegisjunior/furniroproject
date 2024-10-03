import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.svg";
import Profile from "../../assets/UserProfile.svg";
import Search from "../../assets/search.svg";
import Favorite from "../../assets/like.svg";
import Cart from "../../assets/cart.svg";
import compare from "../../assets/comparesvg.svg";
import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/redux";
import {
  useGetFurnitureByNameQuery,
  useGetFurnituresQuery,
} from "../store/furnitureApi";
import { useActions } from "../hooks/Actions";
import close from "../../assets/closeImg.png";
import "./Navigation.scss";
import useDebounce from "../hooks/useDebounce";
import burger from "../../assets/burger.svg";

export const Navigation = () => {
  const { favorites } = useAppSelector((state) => state.furniture);
  const { compareItems } = useAppSelector((state) => state.compare);
  const { liked } = useAppSelector((state) => state.liked);
  const { removeLike } = useActions();
  const [modalIsOpen2, setIsOpen2] = useState(false);
  const [burgerMenu, setBurgerMenu] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const { removeFavorite } = useActions();
  const { data } = useGetFurnituresQuery();
  const [SubTotal, setSubTotal] = useState<number>(0);
  const [isSearch, setIsSearch] = useState(false);
  const [handleChangeInput, setHandleChangeInput] = useState("");
  const debounceInpValue = useDebounce(handleChangeInput, 1000);
  const [showDropdown, setShowDropdown] = useState(false);

  const {
    data: furnitureItems,
    error,
    isLoading,
  } = useGetFurnitureByNameQuery(debounceInpValue, {
    skip: !handleChangeInput,
  });
  const RemoveFav = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    event.preventDefault();
    removeFavorite(id);
  };

  const removeLiked = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    event.preventDefault();
    removeLike(id);
  };

  const calc = (price: number) => {
    return price - price * 0.2;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".search-container")) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSubTotal(
      data?.reduce((acc, item) => {
        const favorite = favorites.find((fav) => fav.id === item.id);

        if (favorite) {
          const itemPrice = item.discount ? calc(item.price) : item.price;
          return acc + itemPrice * favorite.quantity;
        }

        return acc;
      }, 0) || 0
    );
  }, [favorites, data]);

  const openModal = () => {
    setIsOpen(true);
    setBurgerMenu(false);
  };

  const closeModal = () => {
    setIsOpen(false);
    setBurgerMenu(false);
  };

  const openModal2 = () => {
    setIsOpen2(true);
    setBurgerMenu(false);
  };

  const closeModal2 = () => {
    setIsOpen2(false);
    setBurgerMenu(false);
  };

  const openBurger = () => {
    setBurgerMenu(true);
  };

  const closeBurger = () => {
    setBurgerMenu(false);
  };

  const FavItems = data
    ?.filter((item) => favorites.find((fav) => fav.id === item.id))
    .map((i) => {
      const favoriteId = favorites.find((fav) => fav.id === i.id);
      const favoriteQuan = favoriteId ? favoriteId.quantity : 1;
      return (
        <ul key={i.name} className="">
          <div className="flex justify-around items-center gap-5 mt-5">
            <img className="h-[90px] rounded-md" src={i.img} />
            <div className="flex flex-col justify-center items-center">
              <p className="w-[240px] truncate font-semibold">{i.name}</p>
              <div className="flex gap-3">
                <div className="flex justify-center items-center mx-5 text-[#B88E2F] text-[18px]  gap-x-6">
                  <span className=" text-[16px] text-[#000000]">
                    {favoriteQuan}
                  </span>
                  <span className=" text-[16px] text-[#000000]">x</span>
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

  const LikedItems = data
    ?.filter((item) => liked.includes(item.id))
    .map((i) => {
      return (
        <ul key={i.name} className="">
          <div className="flex justify-around items-center gap-5 mt-5">
            <img className="h-[90px] rounded-md" src={i.img} />
            <div className="flex flex-col justify-center items-center">
              <p className="w-[240px] truncate font-semibold">{i.name}</p>
              <div className="flex gap-3">
                <div className="flex justify-center items-center mx-5 text-[#B88E2F] text-[18px]  gap-x-6">
                  <button onClick={closeModal2}>
                    <Link
                      className=" px-2 bg-[#B88E2F] text-white rounded-lg"
                      to={`/furniture/${i.id}`}
                    >
                      View
                    </Link>
                  </button>
                </div>
              </div>
            </div>
            <button onClick={(event) => removeLiked(event, i.id)}>
              <img src={close} className="h-[20px] " />
            </button>
          </div>
        </ul>
      );
    });

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

  const ActiveInp = () => {
    setIsSearch(!isSearch);
  };
  const handleInp = (val: string) => {
    setHandleChangeInput(val);
    setShowDropdown(true);
  };

  return (
    <>
      <header
        className={`container mx-auto h-[100px]  flex justify-between items-center pl-5 pr-5 z-50 `}
      >
        <Link to={"/"}>
          <div className="flex gap-2 ">
            <img className="h-[40px] " src={Logo} />
            <span className="font-mont font-bold text-[34px]">Furniro</span>
          </div>
        </Link>
        <div className="hidden md:flex gap-10 justify-center items-center mr-20">
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
        <div className="hidden md:flex gap-10 justify-center items-center ">
          <Link to="/profile">
            <img src={Profile} className="h-[40px]" />
          </Link>
          <button className="" onClick={ActiveInp}>
            <img src={Search} className="h-[28px]" />
          </button>
          {isSearch ? (
            <div className="relative ">
              <input
                className="search-container border-[2px] rounded-lg px-3"
                type="text"
                value={handleChangeInput}
                onChange={(e) => handleInp(e.target.value)}
                placeholder="search"
              />

              {showDropdown && handleChangeInput && (
                <div className=" absolute flex  m-auto left-[-3rem] top-10 right-0 bottom-0  h-fit  bg-white border w-[500px] border-gray-300 max-h-[200px] overflow-y-auto shadow-lg rounded mt-2 z-40 gap-y-3 flex-col">
                  {isLoading ? (
                    <p>loading...</p>
                  ) : error ? (
                    <p>Server error</p>
                  ) : (
                    furnitureItems &&
                    furnitureItems.length > 0 &&
                    furnitureItems.map((item) => {
                      return (
                        <div className="flex gap-3">
                          <img src={item.img} className="h-[70px]" />
                          <Link
                            to={`furniture/${item.id}`}
                            className="p-2 hover:bg-gray-200 cursor-pointer w-full"
                            key={item.id}
                          >
                            {item.name}
                          </Link>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          ) : null}
          <Link to="/compare">
            <img className="h-[30px]" src={compare} alt="" />
            {compareItems.length >= 1 ? (
              <div
                className={`w-[18px] h-[18px] bg-[#b88e2f] ${
                  compareItems.length === 4 && "bg-[#b43838]"
                } rounded-[50%] flex items-center justify-center absolute top-[53px]`}
              >
                {compareItems.length}
              </div>
            ) : null}
          </Link>
          <a
            onClick={(event) => event.preventDefault()}
            className="cursor-pointer"
          >
            <img
              onClick={openModal2}
              src={Favorite}
              className="h-[32px]"
              alt=""
            />
            {liked.length >= 1 ? (
              <div
                className={`w-[18px] h-[18px] bg-[#b88e2f] rounded-[50%] flex items-center justify-center absolute top-[53px]`}
              >
                {liked.length}
              </div>
            ) : null}
          </a>
          <a
            onClick={(event) => event.preventDefault()}
            className="cursor-pointer"
          >
            <img
              src={Cart}
              onClick={openModal}
              className="h-[35px] relative"
              alt=""
            />
            {favorites.length >= 1 ? (
              <div className="w-[18px] h-[18px] bg-[#b88e2f] rounded-[50%] flex items-center justify-center absolute top-[53px]">
                {favorites.length}
              </div>
            ) : null}
          </a>
        </div>
        <div className=" flex md:hidden gap-10 justify-center items-center ">
          <button onClick={openBurger}>
            <img src={burger} className="h-[40px]" />
          </button>
        </div>
        {burgerMenu && (
          <div
            onClick={closeBurger}
            className="fixed left-0 top-0 right-0 bottom-0 bg-[rgba(0,0,0,0.6)] flex justify-center items-center z-50"
          >
            <aside
              onClick={(e) => e.stopPropagation()}
              className="flex flex-col fixed top-[0px] right-[0px] bg-white min-w-[500px] w-fit max-h-[100%] h-full z-50"
            >
              <nav className="flex flex-col justify-center items-center text-3xl pt-10 pb-2 gap-5">
                <Link className="font-[500]" to="/" onClick={closeBurger}>
                  Home
                </Link>
                <Link className="font-[500]" to="/shop" onClick={closeBurger}>
                  Shop
                </Link>
                <Link className="font-[500]" to="/about" onClick={closeBurger}>
                  About
                </Link>
                <Link
                  className="font-[500]"
                  to="/contact"
                  onClick={closeBurger}
                >
                  Contact
                </Link>
              </nav>
              <section className="flex flex-col justify-center items-center pt-10 pb-10 gap-5">
                <Link to="/profile" onClick={closeBurger}>
                  <img src={Profile} className="h-[60px]" />
                </Link>
                <div className=" flex gap-y-3 justify-center items-center">
                  <button className="" onClick={ActiveInp}>
                    <img src={Search} className="h-[48px]" />
                  </button>
                  {isSearch ? (
                    <div className="relative ">
                      <input
                        className="search-container border-[2px] rounded-lg px-3"
                        type="text"
                        value={handleChangeInput}
                        onChange={(e) => handleInp(e.target.value)}
                        placeholder="search"
                      />

                      {showDropdown && handleChangeInput && (
                        <div className=" absolute flex  m-auto left-[-3rem] top-10 right-0 bottom-0  h-fit  bg-white border w-[500px] border-gray-300 max-h-[200px] overflow-y-auto shadow-lg rounded mt-2 z-40 gap-y-3 flex-col">
                          {isLoading ? (
                            <p>loading...</p>
                          ) : error ? (
                            <p>Server error</p>
                          ) : (
                            furnitureItems &&
                            furnitureItems.length > 0 &&
                            furnitureItems.map((item) => {
                              return (
                                <div className="flex gap-3">
                                  <img src={item.img} className="h-[70px]" />
                                  <Link
                                    to={`furniture/${item.id}`}
                                    className="p-2 hover:bg-gray-200 cursor-pointer w-full"
                                    key={item.id}
                                    onClick={closeBurger}
                                  >
                                    {item.name}
                                  </Link>
                                </div>
                              );
                            })
                          )}
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>
                <Link to="/compare" onClick={closeBurger}>
                  <img className="h-[50px]" src={compare} alt="" />
                </Link>
                <a
                  onClick={(event) => event.preventDefault()}
                  className="cursor-pointer"
                >
                  <img
                    onClick={openModal2}
                    src={Favorite}
                    className="h-[52px]"
                    alt=""
                  />
                </a>
                <a
                  onClick={(event) => event.preventDefault()}
                  className="cursor-pointer"
                >
                  <img
                    src={Cart}
                    onClick={openModal}
                    className="h-[55px] relative"
                    alt=""
                  />
                </a>
              </section>
            </aside>
          </div>
        )}
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
              </div>
            </aside>
          </div>
        )}
        {modalIsOpen2 && (
          <div
            onClick={closeModal2}
            className="fixed left-0 top-0 right-0 bottom-0 bg-[rgba(0,0,0,0.6)] flex justify-center items-center z-50"
          >
            <aside
              onClick={(e) => e.stopPropagation()}
              className="flex flex-col fixed top-[0px] right-[0px] bg-white min-w-[500px] w-fit max-h-[100%] min-h-[750px] z-50"
            >
              <h1 className="font-[700] text-2xl text-center pt-5">
                Liked items
              </h1>
              <div className="CUSTOM_SCROLL flex-grow overflow-y-scroll ">
                {LikedItems}
              </div>
            </aside>
          </div>
        )}
      </header>
    </>
  );
};
