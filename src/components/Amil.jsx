import { Table } from "flowbite-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAmil, getSummaryAmil } from "../redux/action/campaignAction";
import PageNumberDashboard from "./PageNumberDashboard";
import { FaHandsHelping } from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa";
import { SiCampaignmonitor } from "react-icons/si";

function Amil() {
  const dispatch = useDispatch();
  const { amilCampaign } = useSelector((state) => state.campaign);
  const { summaryAmil } = useSelector((state) => state.campaign);
  const { pageNumber } = useSelector((state) => state.campaign);
  useEffect(() => {
    dispatch(getAmil(pageNumber - 1));
    dispatch(getSummaryAmil());
  }, [dispatch, pageNumber]);
  const formatNumber = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  return (
    <div className="space-y-4">
      <div className="overflow-x-auto bg-white p-5 rounded-2xl">
        <div className="flex gap-10 items-end">
          <h1 className="text-lg sm:text-2xl font-bold">Amil Campaign</h1>
          <PageNumberDashboard />
        </div>
        <Table hoverable className="my-5">
          <Table.Head className="text-sm">
            <Table.HeadCell>Campaign</Table.HeadCell>
            <Table.HeadCell>Lokasi</Table.HeadCell>
            <Table.HeadCell>Target</Table.HeadCell>
            <Table.HeadCell>Terkumpul </Table.HeadCell>
            <Table.HeadCell>Amil</Table.HeadCell>
            <Table.HeadCell>status</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {amilCampaign.map((item) => (
              <Table.Row
                key={item.campaignId}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{item.campaignName}</Table.Cell>
                <Table.Cell>{item.location}</Table.Cell>
                <Table.Cell>{formatNumber(item?.targetAmount)}</Table.Cell>
                <Table.Cell>{formatNumber(item?.currentAmount)}</Table.Cell>
                <Table.Cell>{formatNumber(item?.amil)}</Table.Cell>
                <Table.Cell>
                  {item.active == true ? (
                    <button className="bg-green-500 rounded px-4 text-white font-bold">
                      AKTIF
                    </button>
                  ) : (
                    <button className="bg-gray-500 rounded-lg px-4 text-white font-bold">
                      SELESAI
                    </button>
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl flex flex-col gap-4 p-4 font-Inter">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-base font-bold">
                Total Transaksi Campaign
              </p>
              <p className="font-bold text-xl">
                Rp {formatNumber(summaryAmil?.totalCampaignTransactionAmount||0)}
              </p>
            </div>
            <SiCampaignmonitor size={35} color="orange" />
          </div>
        </div>
        <div className="bg-white rounded-2xl flex flex-col gap-4 p-4 font-Inter">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-base font-bold">Total Amil</p>
              <p className="font-bold text-xl">Rp {formatNumber(summaryAmil?.totalAmil||0)}</p>
            </div>
            <FaHandsHelping size={40} color="orange" />
          </div>
        </div>
        <div className="bg-white rounded-2xl flex flex-col gap-4 p-4 font-Inter">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-base font-bold">
                Total Distribusi
              </p>
              <p className="font-bold text-xl">
                Rp {formatNumber(summaryAmil?.totalCampaignDistributionAmount||0)}
              </p>
            </div>
            <FaPaperPlane size={30} color="orange" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Amil;
