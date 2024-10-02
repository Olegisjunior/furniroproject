import React from "react";
import { useActions } from "../hooks/Actions";
import close from "../../assets/closeImg.png";
import { IFurniture } from "../store/furnitureApi";

interface FavRemoveButtonProps {
  item: IFurniture;
}

export const FavRemoveButton: React.FC<FavRemoveButtonProps> = ({ item }) => {
  const { removeFavorite } = useActions();

  const RemoveFav = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    event.preventDefault();
    removeFavorite(id);
  };
  return (
    <button onClick={(event) => RemoveFav(event, item.id)}>
      <img src={close} className="h-[20px]" />
    </button>
  );
};
