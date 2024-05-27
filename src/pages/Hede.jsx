import { useState } from "react";
import Dashboard from "../components/Dashboard";
import Sidebar from "../components/Sidebar";
import Campaign from "../components/campaign/Campaign";
import Navbar from "../components/Navbar";
import User from "../components/pengguna/User";

function Hede() {
  const [menu, setMenu] = useState("dashboard");
  return (
    <div className="flex w-full">
      <div className="mb-8">
        <Navbar />
      </div>
      <div className="bg-GRAY01 w-full min-h-screen flex">
        {/* sidebar */}
        <Sidebar setMenu={setMenu} menu={menu} />
        {/* Dashboard */}
        {menu == "dashboard" && (
          <div className="p-10 w-5/6">
            <Dashboard />
          </div>
        )}
        {/* Campaign */}
        {menu == "campaign" && (
          <div className="p-10 w-5/6">
            <Campaign />
          </div>
        )}
        {/* Users */}
        {menu == "pengguna" && (
          <div className="p-10 w-5/6">
            <User/>
          </div>
        )}
      </div>
    </div>
  );
}

export default Hede;
