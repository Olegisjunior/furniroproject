import React, { FC } from "react";
import { IFurniture } from "../store/furnitureApi";
import { Cart_Items } from "./Cart_Items";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

type PropsData = {
  data: IFurniture[] | undefined;
  error: FetchBaseQueryError | SerializedError | undefined;
  isLoading: boolean;
};

export const ItemList3: FC<PropsData> = React.memo(
  ({ data, isLoading, error }) => {
    const filteredData = data
      ? data.filter((it) => it.id == 3 || it.id == 14)
      : [];

    return (
      <div
        className={`grid mx-auto max-w-[85%] justify-center grid-cols-[repeat(auto-fill,minmax(300px,1fr))]  gap-x-10 gap-y-10  `}
      >
        {error ? (
          <p className="text-red-700">Oh no, there was an error</p>
        ) : isLoading ? (
          <p>Loading...</p>
        ) : (
          filteredData &&
          filteredData.map((item: IFurniture) => {
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
  }
);
