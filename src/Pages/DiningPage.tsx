import { Link } from "react-router-dom";
import banner from "../../assets/banner4.avif";
import { Pagination } from "../component/Pagination";
import { ItemList3 } from "../component/ItemList3";
import { FiltersComponent } from "../component/FiltersComponent";
import { useEffect, useState } from "react";
import { useListItemsQuery } from "../store/furnitureApi";

export const DiningPage = () => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState<string>("");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const { data, error, isLoading } = useListItemsQuery({
    page: page,
    category: filter,
    sortBy: sortBy,
    order: order,
    limit: 22,
  });
  const [itemsLengthWF, setItemsLengthWF] = useState<number | null>(null);

  const ITEMS_LENGTH = 22;
  const PER_PAGE = 20;

  useEffect(() => {
    if (filter.length > 0) {
      setItemsLengthWF(10);
    } else {
      setItemsLengthWF(null);
    }
  }, [filter]);

  const pagination_numbers: number[] = [];

  const lengthTouse = itemsLengthWF ?? ITEMS_LENGTH;

  for (let i = 1; i <= Math.ceil(lengthTouse / PER_PAGE); i++) {
    pagination_numbers.push(i);
  }

  return (
    <>
      <div className="relative flex flex-col ">
        <p className="absolute  m-auto left-0 top-0 right-0 bottom-0 w-fit h-fit  text-[48px] font-semibold  z-20">
          Dining
        </p>
        <div className="z-20 flex absolute m-auto left-0 top-[80px] right-0 bottom-0 w-fit h-fit gap-5">
          <Link to="/" className=" font-semibold   ">
            Home
          </Link>
          <span className="font-semibold">{`>`}</span>
          <Link to="/dining" className="font-semibold">
            Dining
          </Link>
        </div>
        <img
          className="w-full h-[320px] object-cover opacity-80 z-10"
          src={banner}
          alt=""
        />
      </div>
      <div className="max-h-[500vh] h-fit">
        <FiltersComponent
          filter={filter}
          order={order}
          sortBy={sortBy}
          setFilter={setFilter}
          setSortBy={setSortBy}
          setOrder={setOrder}
        />
        <div className="max-w-[1800px] mx-auto my-14 flex items-center justify-center h-fit">
          {/* @ts-ignore */}
          <ItemList3 data={data} error={error} isLoading={isLoading} />
        </div>
        <Pagination
          pagination_numbers={pagination_numbers}
          page={page}
          setPage={setPage}
        />
      </div>
    </>
  );
};

export default DiningPage;
