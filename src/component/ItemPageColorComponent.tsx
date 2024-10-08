import React from "react";
import { IFurniture } from "../store/furnitureApi";

interface ItemPageColorComponentProps {
  data: IFurniture | undefined;
  setIsColor: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const ItemPageColorComponent: React.FC<ItemPageColorComponentProps> = ({
  data,
  setIsColor,
}) => {
  const handleClickColor = (color: string) => {
    setIsColor(color);
  };

  return (
    <>
      {data?.colors ? (
        <div className="Colors flex flex-col gap-3 max-w-full mx-auto md:mx-0">
          <p className=" text-[#9f9f9f]">Color</p>
          <div className="flex gap-5 ">
            {data?.colors?.map((color, index) => {
              return (
                <button
                  key={index}
                  onClick={() => handleClickColor(color)}
                  className={`h-[30px] w-[30px] rounded-[50%]`}
                  style={{ background: color }}
                ></button>
              );
            })}
          </div>
        </div>
      ) : null}
    </>
  );
};
