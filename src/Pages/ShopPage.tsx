import { Link } from "react-router-dom";
import hat from "../../assets/hat.png";
import { useListItemsQuery } from "../store/furnitureApi";

import { ItemList } from "../component/ItemList";
import { useState } from "react";

export const ShopPage = () => {
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useListItemsQuery(page);

  const ITEMS_LENGTH = 24;
  const PER_PAGE = 10;

  const pagination_numbers: number[] = [];

  if (ITEMS_LENGTH) {
    for (let i = 1; i <= Math.ceil(ITEMS_LENGTH / PER_PAGE); i++) {
      pagination_numbers.push(i);
    }
  }

  const handlePageClick = (page_number: number) => {
    setPage(page_number);
    window.scrollTo({
      top: 1,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="relative flex flex-col ">
        <p className="absolute text-[48px] left-[898px] top-[110px]">Shop</p>
        <div className="">
          <Link
            to="/"
            className="absolute font-semibold left-[900px] top-[170px]"
          >
            Home
          </Link>
          <span className="absolute left-[953px] font-semibold top-[170px]">{`>`}</span>
          <Link to="/shop" className="absolute left-[970px] top-[170px]">
            Shop
          </Link>
        </div>
        <img className="w-full h-[320px] object-cover " src={hat} alt="" />
      </div>
      <div className="filters w-full h-[100px] bg-[#F9F1E7]"></div>
      <div className="max-w-[1800px] mx-auto my-14 flex items-center justify-center">
        <ItemList data={data} error={error} isLoading={isLoading} />
      </div>
      <div className="flex gap-10 justify-center items-center py-10">
        <button
          onClick={() => handlePageClick(pagination_numbers.slice(0)[0])}
        >{`<`}</button>
        {pagination_numbers &&
          pagination_numbers.map((page_number) => {
            return (
              <button
                onClick={() => handlePageClick(page_number)}
                className={`${page === page_number && `text-gray-500`} `}
              >
                {page_number}
              </button>
            );
          })}
        <button
          onClick={() => handlePageClick(pagination_numbers.slice(-1)[0])}
        >{`>`}</button>
      </div>
    </>
  );
};
