import { IFurniture } from "../store/furnitureApi";
import React, { MouseEvent } from "react";

interface ItemPageSizeComponentProps {
  data: IFurniture | undefined;
  setIsActive: React.Dispatch<React.SetStateAction<number>>;
  isActive: number;
  setSize: React.Dispatch<React.SetStateAction<string>>;
}

export const ItemPageSizeComponent: React.FC<ItemPageSizeComponentProps> = ({
  data,
  setIsActive,
  isActive,
  setSize,
}) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>, index: number) => {
    setIsActive(index);

    setSize(e.currentTarget.value);
  };
  return (
    <>
      {data?.sizes ? (
        <div className="Sizes flex flex-col gap-3">
          <p className=" text-[#9f9f9f]">Size</p>
          <div className="flex gap-x-5">
            {data?.sizes?.map((item, index) => {
              return (
                <button
                  key={index}
                  value={item}
                  onClick={(e) => handleClick(e, index)}
                  className={
                    isActive === index
                      ? `h-[30px] w-[30px] text-[13px] text-white bg-[#B88E2F] rounded-md`
                      : `h-[30px] w-[30px] text-[13px] bg-[#F9F1E7] rounded-md`
                  }
                >
                  {item.toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </>
  );
};
