import React, { FC, useMemo } from "react";
import { IFurniture } from "../store/furnitureApi";
import { Cart_Items } from "./Cart_Items";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

type PropsData = {
  data: IFurniture[] | undefined;
  error: FetchBaseQueryError | SerializedError | undefined;
  isLoading: boolean;
};

export const ItemList4: FC<PropsData> = React.memo(
  ({ data, isLoading, error }) => {
    const filteredData = useMemo(() => {
      return data
        ? data.filter(
            (it) =>
              it.id == 1 ||
              it.id == 2 ||
              it.id == 7 ||
              it.id == 8 ||
              it.id == 9 ||
              it.id == 12 ||
              it.id == 13 ||
              it.id == 18 ||
              it.id == 19 ||
              it.id == 20
          )
        : [];
    }, []);

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
