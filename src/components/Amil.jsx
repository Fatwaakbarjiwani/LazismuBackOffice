import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAmil,
  getAmilInfak,
  getAmilWakaf,
  getAmilZakat,
  getSummaryAmil,
} from "../redux/action/campaignAction";
import PageNumberDashboard from "./PageNumberDashboard";
import { FaHandsHelping } from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa";
import { SiCampaignmonitor } from "react-icons/si";
import PageAmil from "./PageAmil";

function Amil() {
  const dispatch = useDispatch();
  const { amilCampaign } = useSelector((state) => state.campaign);
  const { amilZakat } = useSelector((state) => state.campaign);
  const { amilInfak } = useSelector((state) => state.campaign);
  const { amilWakaf } = useSelector((state) => state.campaign);
  const { summaryAmil } = useSelector((state) => state.campaign);
  const { pageNumberDashboard } = useSelector((state) => state.campaign);
  const [pageZakat, setPageZakat] = useState(1);
  const [totalPageZakat, setTotalPageZakat] = useState(null);
  const [pageInfak, setPageInfak] = useState(1);
  const [totalPageInfak, setTotalPageInfak] = useState(null);
  const [pageWakaf, setPageWakaf] = useState(1);
  const [totalPageWakaf, setTotalPageWakaf] = useState(null);
  useEffect(() => {
    dispatch(getAmil(pageNumberDashboard - 1));
    dispatch(getAmilZakat(pageZakat - 1, setTotalPageZakat));
    dispatch(getAmilInfak(pageInfak - 1, setTotalPageInfak));
    dispatch(getAmilWakaf(pageWakaf - 1, setTotalPageWakaf));
    dispatch(getSummaryAmil());
  }, [dispatch, pageNumberDashboard, pageInfak, pageWakaf, pageZakat]);
  const formatNumber = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl flex flex-col gap-4 p-4 font-Inter">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-base font-bold">
                Total Transaksi Campaign
              </p>
              <p className="font-bold text-xl">
                Rp{" "}
                {formatNumber(summaryAmil?.totalCampaignTransactionAmount || 0)}
              </p>
            </div>
            <SiCampaignmonitor size={35} color="orange" />
          </div>
        </div>
        <div className="bg-white rounded-2xl flex flex-col gap-4 p-4 font-Inter">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-base font-bold">Total Amil</p>
              <p className="font-bold text-xl">
                Rp {formatNumber(summaryAmil?.totalAmil || 0)}
              </p>
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
                Rp{" "}
                {formatNumber(
                  summaryAmil?.totalCampaignDistributionAmount || 0
                )}
              </p>
            </div>
            <FaPaperPlane size={30} color="orange" />
          </div>
        </div>
      </div>
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
              <Table.Row key={item.campaignId} className="bg-white">
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
      <div className="overflow-x-auto bg-white p-5 rounded-2xl">
        <div className="flex gap-10 items-end">
          <h1 className="text-lg sm:text-2xl font-bold">Amil Zakat</h1>
          <PageAmil
            pageDashboard={totalPageZakat}
            pageNumberDashboard={pageZakat}
            setPageNumberDashboard={setPageZakat}
          />
        </div>
        <Table hoverable className="my-5">
          <Table.Head className="text-sm">
            <Table.HeadCell>Zakat Category</Table.HeadCell>
            <Table.HeadCell>Code</Table.HeadCell>
            <Table.HeadCell>Terkumpul </Table.HeadCell>
            <Table.HeadCell>Amil</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {amilZakat.map((item) => (
              <Table.Row key={item?.zakatId} className="bg-white">
                <Table.Cell>{item?.zakatCategory}</Table.Cell>
                <Table.Cell>{item?.zakatCode}</Table.Cell>
                <Table.Cell>{formatNumber(item?.amount)}</Table.Cell>
                <Table.Cell>{formatNumber(item?.amil)}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      <div className="overflow-x-auto bg-white p-5 rounded-2xl">
        <div className="flex gap-10 items-end">
          <h1 className="text-lg sm:text-2xl font-bold">Amil Infak</h1>
          <PageAmil
            pageDashboard={totalPageInfak}
            pageNumberDashboard={pageInfak}
            setPageNumberDashboard={setPageInfak}
          />
        </div>
        <Table hoverable className="my-5">
          <Table.Head className="text-sm">
            <Table.HeadCell>Infak Category</Table.HeadCell>
            <Table.HeadCell>Code</Table.HeadCell>
            <Table.HeadCell>Terkumpul</Table.HeadCell>
            <Table.HeadCell>Amil</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {amilInfak.map((item) => (
              <Table.Row key={item.infakId} className="bg-white">
                <Table.Cell>{item.infakCategory}</Table.Cell>
                <Table.Cell>{item.infakCode}</Table.Cell>
                <Table.Cell>{formatNumber(item?.amount)}</Table.Cell>
                <Table.Cell>{formatNumber(item?.amil)}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      <div className="overflow-x-auto bg-white p-5 rounded-2xl">
        <div className="flex gap-10 items-end">
          <h1 className="text-lg sm:text-2xl font-bold">Amil Wakaf</h1>
          <PageAmil
            pageDashboard={totalPageWakaf}
            pageNumberDashboard={pageWakaf}
            setPageNumberDashboard={setPageWakaf}
          />
        </div>
        <Table hoverable className="my-5">
          <Table.Head className="text-sm">
            <Table.HeadCell>Amil Category</Table.HeadCell>
            <Table.HeadCell>Code</Table.HeadCell>
            <Table.HeadCell>Terkumpul </Table.HeadCell>
            <Table.HeadCell>Amil</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {amilWakaf.map((item) => (
              <Table.Row key={item.wakafId} className="bg-white">
                <Table.Cell>{item.wakafCategory}</Table.Cell>
                <Table.Cell>{item.wakafCode}</Table.Cell>
                <Table.Cell>{formatNumber(item?.amount)}</Table.Cell>
                <Table.Cell>{formatNumber(item?.amil)}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}

export default Amil;
