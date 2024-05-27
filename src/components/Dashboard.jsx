// import chartUp from "../assets/chartUp.svg";
// import chartDown from "../assets/chartDown.svg";
import icon1 from "../assets/Icon.svg";
import icon2 from "../assets/Icon-1.svg";
import icon3 from "../assets/Icon-2.svg";
import icon4 from "../assets/Icon-3.svg";
import CardDashboard from "../components/cardDashboard";
import Cart from "../components/Cart";
import Table from "../components/TableContent";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sumarry } from "../redux/action/campaignAction";
function Dashboard() {
  const { summary } = useSelector((state) => state.campaign);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(sumarry());
  }, [dispatch]);
  const formatNumber = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold font-Inter">Dashboard</h1>
      <div className="sm:my-5 my-2 grid sm:grid-cols-4 gap-2 sm:gap-5">
        <CardDashboard
          name={"Total Pengguna"}
          total={summary?.totalUser}
          image={icon1}
        />
        <CardDashboard
          name={"Total Distribusi"}
          total={"Rp " + formatNumber(summary?.totalDistributionAmount || 0)}
          image={icon2}
        />
        <CardDashboard
          name={"Total Penerima"}
          total={summary?.totalDistributionReceiver || 0}
          image={icon3}
        />
        <CardDashboard
          name={"Total Transaksi"}
          total={"Rp " + formatNumber(summary?.totalTransactionAmount || 0)}
          image={icon4}
        />
      </div>
      {/* Cart */}
      <div>
        <Cart />
      </div>
      {/* table */}
      <div className="my-5">
        <Table />
      </div>
    </div>
  );
}

export default Dashboard;
