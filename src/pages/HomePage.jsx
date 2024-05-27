import { useState } from "react";
import Dashboard from "../components/Dashboard";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import Campaign from "../components/campaign/Campaign";
import User from "../components/pengguna/User";
import Transaksi from "../components/Transaksi";
import Berita from "../components/campaign/Berita";
import Amil from "../components/Amil";
import TablePengajuan from "../components/campaign/TablePengajuan";

export default function HomePage() {
  const [menu, setMenu] = useState("dashboard");
  const { showSideBar } = useSelector((state) => state.modal);

  return (
    <div className="flex w-full h-screen">
      <div
        className={`${
          showSideBar == true ? "block" : "hidden"
        } w-1/6 sticky top-0 h-screen sm:hidden `}
      >
        <Sidebar setMenu={setMenu} menu={menu} />
      </div>
      <div className={`hidden sm:block w-1/4 sticky top-0 h-screen`}>
        <Sidebar setMenu={setMenu} menu={menu} />
      </div>
      <div
        className={`${
          showSideBar == true ? "w-5/6" : "w-full"
        } bg-gray-100 overflow-y-auto`}
      >
        <Navbar />
        {/* menu */}
        {menu === "dashboard" && (
          <div className="p-4 sm:p-8">
            <Dashboard />
          </div>
        )}
        {menu == "campaign" && (
          <div className="p-4 sm:p-8">
            <Campaign />
          </div>
        )}
        {menu == "pengguna" && (
          <div className="p-4 sm:p-8">
            <User />
          </div>
        )}
        {menu == "transaksi" && (
          <div className="p-4 sm:p-8">
            <Transaksi />
          </div>
        )}
        {menu == "berita" && (
          <div className="p-4 sm:p-8">
            <Berita />
          </div>
        )}
        {menu == "amil" && (
          <div className="p-4 sm:p-8">
            <Amil />
          </div>
        )}
        {menu == "pengajuan" && (
          <div className="p-4 sm:p-8">
            <TablePengajuan />
          </div>
        )}
      </div>
    </div>
  );
}
