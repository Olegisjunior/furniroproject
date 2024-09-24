import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { furnitureActions } from "../store/furniture.slice";
import { furnitureActionsComp } from "../store/furniture.slice.comp";
import { likedSliceActions } from "../store/furniture.slice.like";

const actions = {
  ...furnitureActions,
  ...furnitureActionsComp,
  ...likedSliceActions,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch);
};
