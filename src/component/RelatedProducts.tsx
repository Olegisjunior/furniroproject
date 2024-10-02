import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { IFurniture } from "../store/furnitureApi";
import { Cart_Items2 } from "./Cart_Items2";
import { SerializedError } from "@reduxjs/toolkit";

interface RelatedProductsProps {
  data2: IFurniture[] | undefined;
  error2: FetchBaseQueryError | SerializedError | undefined;
  isLoading2: boolean;
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({
  data2,
  error2,
  isLoading2,
}) => {
  return (
    <div className="4cards flex justify-between items-center flex-col h-[52vh] mb-[60px] gap-y-7">
      <span className="text-3xl font-bold">Related Product</span>
      <div className="grid w-[85%] grid-cols-[repeat(auto-fit,minmax(300px,1fr))]  gap-x-10 gap-y-10  ">
        {error2 ? (
          <p className="text-red-700">Oh no, there was an error</p>
        ) : isLoading2 ? (
          <p>Loading...</p>
        ) : (
          data2 &&
          data2.slice(0, 4).map((item: IFurniture) => {
            return (
              <Cart_Items2
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
    </div>
  );
};
