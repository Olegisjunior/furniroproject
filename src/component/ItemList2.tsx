import { Cart_Items } from "./Cart_Items";
import { useGetFurnituresQuery } from "../store/furnitureApi";
import React, { FC, useMemo } from "react";

type ItemList2 = {
  value: number;
};

export const ItemList2: FC<ItemList2> = React.memo(({ value }) => {
  const { data, error, isLoading } = useGetFurnituresQuery();

  const filteredData = useMemo(() => {
    return data ? data.slice(0, value) : [];
  }, [data, value]);

  return (
    <div className="grid mx-auto max-w-[85%] justify-center grid-cols-[repeat(auto-fill,minmax(300px,1fr))]  gap-x-10 gap-y-10  ">
      {error ? (
        <p className="text-red-700">Oh no, there was an error</p>
      ) : isLoading ? (
        <p>Loading...</p>
      ) : (
        filteredData.map((item) => {
          return (
            <Cart_Items
              img={item.img}
              desc={item.desc}
              discount={item.discount}
              name={item.name}
              price={item.price}
              key={item.id}
              id={item.id}
            />
          );
        })
      )}
    </div>
  );
});
