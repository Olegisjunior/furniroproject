interface PaginationProps {
  pagination_numbers: number[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const Pagination: React.FC<PaginationProps> = ({
  pagination_numbers,
  page,
  setPage,
}) => {
  const handlePageClick = (page_number: number) => {
    setPage(page_number);
    window.scrollTo({
      top: 1,
      behavior: "smooth",
    });
  };

  return (
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
  );
};
