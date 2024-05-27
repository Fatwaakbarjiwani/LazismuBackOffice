import axios from "axios";
import { setCategoryZakat } from "../reducers/ziswafReducer";

export const VITE_API_URL = import.meta.env.VITE_API_CAREUS;

export const getAllCategoryZakat = (button) => async (dispatch) => {
  try {
    const response = await axios.get(`${VITE_API_URL}/${button}/category`);
    const data = response.data;
    dispatch(setCategoryZakat(data));
  } catch (error) {
    console.error("Error fetching campaign data:", error);
  }
};
