import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { furnitureActions } from "../store/furniture.slice";

const actions = {
  ...furnitureActions,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch);
};
