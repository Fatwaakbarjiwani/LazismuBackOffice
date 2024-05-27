import logout from "../assets/logout.svg";
import user1 from "../assets/user.svg";
import paper from "../assets/paper.svg";
import work from "../assets/work.svg";
import tiket from "../assets/tiket.svg";
import logout1 from "../assets/logout1.svg";
import user2 from "../assets/user1.svg";
import news1 from "../assets/news.svg";
import news from "../assets/news1.svg";
import paper1 from "../assets/paper1.svg";
import work1 from "../assets/work1.svg";
import tiket1 from "../assets/tiket1.svg";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { setShowLogout } from "../redux/reducers/modalReducer";

function Sidebar({ setMenu, menu }) {
  const dispatch = useDispatch();
  const {user} = useSelector((state)=>state.auth)

  return (
    <div className="w-full bg-white ring-1 ring-gray-100 drop-shadow-sm py-1 h-full">
      <div className="w-full flex items-end justify-center mt-2 mb-4 sm:mt-0">
        <img
          src="https://lazismu.org/images/logo.svg"
          className="w-10 h-8 sm:w-16 sm:h-12"
          alt=""
        />
      </div>
      <button
        onClick={() => setMenu("dashboard")}
        className={`${
          menu == "dashboard" ? "border-primary" : "border-transparent"
        } flex justify-center border-l-4 active:border-primary w-full justify-center`}
      >
        <div
          className={`${
            menu == "dashboard" ? "bg-primary text-white  " : "bg-transparent"
          } active:bg-primary flex gap-4 justify-center sm:justify-start p-2 rounded-md w-3/4 active:text-white`}
        >
          {menu != "dashboard" && (
            <img src={work} className="w-4 sm:w-6" alt="" />
          )}
          {menu == "dashboard" && (
            <img src={work1} className="w-4 sm:w-6" alt="" />
          )}
          <p className="text-lg font-semibold hidden sm:block">Dashboard</p>
        </div>
      </button>
      <button
        onClick={() => setMenu("campaign")}
        className={`${
          menu == "campaign" ? "border-primary" : "border-transparent"
        } flex justify-center border-l-4 active:border-primary w-full justify-center`}
      >
        <div
          className={`${
            menu == "campaign" ? "bg-primary text-white " : "bg-transparent"
          } active:bg-primary flex gap-4 justify-center sm:justify-start p-2 rounded-md w-3/4 active:text-white`}
        >
          {menu != "campaign" && (
            <img src={tiket} className="w-4 sm:w-6" alt="" />
          )}
          {menu == "campaign" && (
            <img src={tiket1} className="w-4 sm:w-6" alt="" />
          )}
          <p className="text-lg font-semibold hidden sm:block">Campaign</p>
        </div>
      </button>
      <button
        onClick={() => setMenu("pengguna")}
        className={`${
          menu == "pengguna" ? "border-primary" : "border-transparent"
        } flex justify-center border-l-4 active:border-primary w-full justify-center`}
      >
        <div
          className={`${
            menu == "pengguna" ? "bg-primary text-white " : "bg-transparent"
          } active:bg-primary flex gap-4 justify-center sm:justify-start p-2 rounded-md w-3/4 active:text-white`}
        >
          {menu != "pengguna" && (
            <img src={user1} className="w-4 sm:w-6" alt="" />
          )}
          {menu == "pengguna" && (
            <img src={user2} className="w-4 sm:w-6" alt="" />
          )}
          <p className="text-lg font-semibold hidden sm:block">Pengguna</p>
        </div>
      </button>
      <button
        onClick={() => setMenu("transaksi")}
        className={`${
          menu == "transaksi" ? "border-primary" : "border-transparent"
        } flex justify-center border-l-4 active:border-primary w-full justify-center`}
      >
        <div
          className={`${
            menu == "transaksi" ? "bg-primary text-white  " : "bg-transparent"
          } active:bg-primary flex gap-4 justify-center sm:justify-start p-2 rounded-md w-3/4 active:text-white`}
        >
          {menu != "transaksi" && (
            <img src={paper} className="w-4 sm:w-6" alt="" />
          )}
          {menu == "transaksi" && (
            <img src={paper1} className="w-4 sm:w-6" alt="" />
          )}
          <p className="text-lg font-semibold hidden sm:block">Transaksi</p>
        </div>
      </button>
      <button
        onClick={() => setMenu("amil")}
        className={`${
          menu == "amil" ? "border-primary" : "border-transparent"
        } flex justify-center border-l-4 active:border-primary w-full justify-center`}
      >
        <div
          className={`${
            menu == "amil" ? "bg-primary text-white  " : "bg-transparent"
          } active:bg-primary flex gap-4 justify-center sm:justify-start p-2 rounded-md w-3/4 active:text-white`}
        >
          {menu != "amil" && (
            <img src={paper} className="w-4 sm:w-6" alt="" />
          )}
          {menu == "amil" && (
            <img src={paper1} className="w-4 sm:w-6" alt="" />
          )}
          <p className="text-lg font-semibold hidden sm:block">Amil</p>
        </div>
      </button>
        <button
          onClick={() => setMenu("pengajuan")}
          className={`${
            menu == "pengajuan" ? "border-primary" : "border-transparent"
          } flex justify-center border-l-4 active:border-primary w-full justify-center`}
        >
          <div
            className={`${
              menu == "pengajuan"
                ? "bg-primary text-white  "
                : "bg-transparent"
            } active:bg-primary flex gap-4 justify-center sm:justify-start p-2 rounded-md w-3/4 active:text-white`}
          >
            {menu != "pengajuan" && (
              <img src={news} className="w-6 sm:w-6" alt="" />
            )}
            {menu == "pengajuan" && (
              <img src={news1} className="w-6 sm:w-6" alt="" />
            )}
            <p className="text-lg font-semibold hidden sm:block">Pengajuan</p>
          </div>
        </button>
      {user?.role?.name == "ADMIN" && (
        <button
          onClick={() => setMenu("berita")}
          className={`${
            menu == "berita" ? "border-primary" : "border-transparent"
          } flex justify-center border-l-4 active:border-primary w-full justify-center`}
        >
          <div
            className={`${
              menu == "berita"
                ? "bg-primary text-white  "
                : "bg-transparent"
            } active:bg-primary flex gap-4 justify-center sm:justify-start p-2 rounded-md w-3/4 active:text-white`}
          >
            {menu != "berita" && (
              <img src={news} className="w-6 sm:w-6" alt="" />
            )}
            {menu == "berita" && (
              <img src={news1} className="w-6 sm:w-6" alt="" />
            )}
            <p className="text-lg font-semibold hidden sm:block">Berita</p>
          </div>
        </button>
      )}
      <button
        onClick={() => dispatch(setShowLogout(true))}
        className={`${
          menu == "logout" ? "border-primary" : "border-transparent"
        } flex justify-center border-l-4 active:border-primary w-full justify-center`}
      >
        <div
          className={`${
            menu == "logout" ? "bg-primary text-white " : "bg-transparent"
          } active:bg-primary flex gap-4 justify-center sm:justify-start p-2 rounded-md w-3/4 active:text-white`}
        >
          {menu != "logout" && (
            <img src={logout} className="w-4 sm:w-6" alt="" />
          )}
          {menu == "logout" && (
            <img src={logout1} className="w-4 sm:w-6" alt="" />
          )}
          <p className="text-lg font-semibold hidden sm:block">Logout</p>
        </div>
      </button>
    </div>
  );
}
Sidebar.propTypes = {
  setMenu: PropTypes.bool.isRequired,
  menu: PropTypes.bool.isRequired,
};

export default Sidebar;
