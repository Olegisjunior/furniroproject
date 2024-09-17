import { FC } from "react";
import { IFurniture, ListResponse } from "../store/furnitureApi";
import { Cart_Items } from "./Cart_Items";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

type PropsData = {
  data: ListResponse<IFurniture[]> | undefined;
  error: FetchBaseQueryError | SerializedError | undefined;
  isLoading: Boolean;
};

export const ItemList: FC<PropsData> = ({ data, isLoading, error }) => {
  return (
    <div className="grid w-[85%]  grid-cols-[repeat(auto-fit,minmax(300px,1fr))]  gap-x-10 gap-y-10  ">
      {error ? (
        <p className="text-red-700">Oh no, there was an error</p>
      ) : isLoading ? (
        <p>Loading...</p>
      ) : (
        data &&
        data.map((item) => {
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
};
