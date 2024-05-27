import axios from "axios";
import { setToken, setUser } from "../reducers/authReducer";
import { toast } from "react-toastify";
export const VITE_API_URL = import.meta.env.VITE_API_CAREUS;

export const login = (phoneNumber, password) => async (dispatch) => {
  // console.log(phoneNumber, password);
  try {
    const response = await axios.post(`${VITE_API_URL}/auth/signin`, {
      phoneNumber: phoneNumber,
      password: password,
    });

    const data = response.data;
    dispatch(setUser(data));
    dispatch(setToken(data.token));
    
    toast.success("Selamat Datang");
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Tangani error 401 di sini
      toast.error("Kata sandi atau password Anda salah");
    } else {
      // Tangani kesalahan lainnya
      toast.error("Terjadi kesalahan saat melakukan login");
    }
  }
};
export const logout = (navigate) => (dispatch) => {
  dispatch(setToken(null));
  dispatch(setUser(null));
  navigate("/")
};

export const getMe = (navigate, navigatePathSuccess, navigatePathError) =>
async (dispatch, getState) => {
    const { token } = getState().auth;
    try {
      const response = await axios.get(`${VITE_API_URL}/user/my-profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      dispatch(setUser(data));
       if (navigatePathSuccess) navigate(navigatePathSuccess);
       if (data.role.name == "USER"){
        dispatch(setToken(null))
       }
    } catch (error) {
       if (axios.isAxiosError(error)) {
         if (error.response.status === 400) {
           logout();
           if (navigatePathError) navigate(navigatePathError);
           return;
         }

         toast.error(error?.response?.data?.message);
         return;
       }

       toast.error(error?.message);
    }
  };
