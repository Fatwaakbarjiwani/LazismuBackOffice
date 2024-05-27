import menu from "../assets/menu.svg";
import search from "../assets/search.svg";
import image from "../assets/images.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../redux/action/authAction";
import { useEffect } from "react";
import { setShowSideBar } from "../redux/reducers/modalReducer";
import { IoIosClose } from "react-icons/io";

function Navbar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { showSideBar } = useSelector((state) => state.modal);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <div className="w-full sticky top-0 bg-white z-30 py-2 sm:px-5 px-2 font-Inter">
      <div className="flex justify-between items-center">
        <div className="flex justify-between gap-2 w-3/6">
          <button
            onClick={() => dispatch(setShowSideBar(!showSideBar))}
            className="block sm:hidden"
          >
            {showSideBar == false && <img src={menu} className="w-6" alt="" />}
            {showSideBar == true && (
              <div>
                <IoIosClose color="gray" className="w-8 h-8" />
              </div>
            )}
          </button>
          <div className="flex sm:rounded-full gap-2 bg-gray-200 p-1">
            <img src={search} className="w-4 sm:w-6" alt="" />
            <input
              type="text"
              className="w-full outline-none bg-transparent"
              placeholder="Search"
            />
          </div>
        </div>
        <div className="w-1/4 flex justify-end gap-2 items-center">
          <img
            src={image}
            className="sm:h-10 sm:w-10 w-8 h-8 object-cover rounded-full"
            alt=""
          />
          <div>
            {user?.username != null && (
              <p className="font-bold text-sm text-primary">{user.username}</p>
            )}
            <p className="text-xs sm:text-sm font-bold">{user?.role?.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
