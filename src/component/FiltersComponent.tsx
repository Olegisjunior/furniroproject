interface FiltersComponentProps {
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  setOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
  filter: string;
  order: string;
  sortBy: string;
}

export const FiltersComponent: React.FC<FiltersComponentProps> = ({
  setFilter,
  setSortBy,
  setOrder,
  filter,
  order,
  sortBy,
}) => {
  const handleChangeFilter = (category: string) => {
    setFilter((prevFilters) => {
      if (prevFilters === category) {
        return "";
      } else {
        return category;
      }
    });
  };

  const handleSortChange = (newSortBy: string, newSortOrder: string) => {
    setSortBy(newSortBy);
    setOrder(newSortOrder as "asc" | "desc");
  };

  const resetAll = () => {
    setFilter("");
    setSortBy("");
    setOrder("asc");
  };

  return (
    <div className="filters w-full min-h-[100px] h-fit py-5 gap-2  bg-[#ecdcc8] relative flex-col flex md:flex-row justify-around items-center">
      <div className="Filters flex gap-5">
        <h1 className="font-semibold text-xl flex justify-center items-center gap-2 ">
          Category
        </h1>

        <select
          value={filter}
          className="  w-fit p-3 rounded-lg h-fit  flex "
          onChange={(e) => handleChangeFilter(e.target.value)}
        >
          <option value={""}>All category</option>
          <option value={"beds"}>Beds</option>
          <option value={"sofas"}>Sofas</option>
          <option value={"table"}>Tabels</option>
          <option value={"shelf"}>Shelfs</option>
          <option value={"recliner"}>Recliner</option>
          <option value={"covers"}>Covers</option>
          <option value={"pillow"}>Pillows</option>
        </select>
      </div>
      <div className="flex gap-5">
        <h1 className="font-semibold text-xl flex justify-center items-center gap-2 ">
          Sort{" "}
        </h1>
        <select
          value={sortBy}
          className="  w-fit p-3 rounded-lg h-fit   "
          onChange={(e) => handleSortChange(e.target.value, order)}
        >
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
        </select>
      </div>

      <div className="flex gap-5">
        <h1 className="font-semibold text-xl flex justify-center items-center gap-2 ">
          Order
        </h1>
        <select
          value={order}
          onChange={(e) => handleSortChange(sortBy, e.target.value)}
          className="w-fit p-3 rounded-lg h-fit"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <button
        onClick={resetAll}
        className="w-fit p-3 rounded-lg h-fit bg-white"
      >
        reset all
      </button>
    </div>
  );
};
