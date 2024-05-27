import { FloatingLabel } from "flowbite-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/action/authAction";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = () => {
    dispatch(login(phoneNumber, password));
  };
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (user?.roles == "ADMIN" || user?.roles == "SUB_ADMIN") {
      navigate("/homePage");
      toast.success("Berhasil Login");
    } else if (user?.roles == "USER") {
      toast.error("Login Admin gagal");
    }
  }, [user]);
  return (
    <div className="bg-GRAY01 w-full min-h-screen flex">
      <ToastContainer />
      <div className="hidden w-2/6 h-screen bg-white sm:flex items-center bg-white shadow shadow-lg justify-center">
        <img
          src="https://lazismu.org/images/logo.svg"
          className="w-40 h-40"
          alt=""
        />
      </div>
      <div className="flex flex-col items-center justify-center w-full sm:w-4/6">
        <img
          src="https://lazismu.org/images/logo.svg"
          className="sm:hidden w-32 h-32"
          alt=""
        />
        <div className="flex flex-col w-4/6 gap-2 text-3xl font-semibold font-Inter">
          <p className="text-3">Login Admin</p>
          <div>
            <FloatingLabel
              className="text-lg"
              variant="standard"
              label="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <FloatingLabel
              className="text-lg"
              variant="standard"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={handleLogin}
              className="w-full text-white rounded-md p-1 mt-4 active:scale-105 text-lg bg-primary"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
