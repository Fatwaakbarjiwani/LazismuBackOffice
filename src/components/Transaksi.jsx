import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAmilInfak,
  getAmilWakaf,
  getAmilZakat,
  getTransaksi,
  sumarry,
} from "../redux/action/campaignAction";
import CardDashboard from "./CardDashboard";
import icon4 from "../assets/Icon-3.svg";
import { HiOutlineUserGroup } from "react-icons/hi2";
import TablePengajuan from "./TablePengajuan";
import PageNumber2 from "./PageNumber2";
import PageAmil from "./PageAmil";
import { ModalTransaksi } from "./ModalTransaksi";

function Transaksi() {
  const { transaksi } = useSelector((state) => state.campaign);
  const { pageNumber2 } = useSelector((state) => state.campaign);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { summary } = useSelector((state) => state.campaign);
  const [jumlah, setJumlah] = useState(null);

  const { amilZakat } = useSelector((state) => state.campaign);
  const { amilInfak } = useSelector((state) => state.campaign);
  const { amilWakaf } = useSelector((state) => state.campaign);
  const [pageZakat, setPageZakat] = useState(1);
  const [totalPageZakat, setTotalPageZakat] = useState(null);
  const [pageInfak, setPageInfak] = useState(1);
  const [totalPageInfak, setTotalPageInfak] = useState(null);
  const [pageWakaf, setPageWakaf] = useState(1);
  const [totalPageWakaf, setTotalPageWakaf] = useState(null);

  useEffect(() => {
    dispatch(getAmilZakat(pageZakat - 1, setTotalPageZakat));
    dispatch(getAmilInfak(pageInfak - 1, setTotalPageInfak));
    dispatch(getAmilWakaf(pageWakaf - 1, setTotalPageWakaf));
    dispatch(getTransaksi(pageNumber2 - 1, setJumlah));
    dispatch(sumarry());
  }, [dispatch, pageNumber2]);
  const formatNumber = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div>
      <h1 className=" text-3xl font-Inter font-bold">Transaksi</h1>
      <div className="sm:my-5 my-2 grid sm:grid-cols-2  gap-2 sm:gap-5">
        <CardDashboard
          name={"Total Transaksi"}
          total={"Rp " + formatNumber(summary?.totalTransactionAmount || 0)}
          image={icon4}
        />
        <div className="bg-white rounded-2xl flex flex-col gap-4 p-4 font-Inter w-full">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-base font-semibold">
                {"Jumlah Transaksi"}
              </p>
              <p className="font-bold text-xl">{jumlah || 0}</p>
            </div>
            <div className="bg-green-400 p-3 rounded-2xl">
              <HiOutlineUserGroup color="green" className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded sm:rounded-2xl my-2 p-3 sm:p-5 gap-5">
        <div className="sm:flex space-y-2 justify-between">
          <div className="flex gap-2 justify-between">
            <PageNumber2 />
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table hoverable className="my-5 ">
            <Table.Head className="text-sm ">
              <Table.HeadCell>Id</Table.HeadCell>
              <Table.HeadCell>Nama</Table.HeadCell>
              <Table.HeadCell>No Handphone</Table.HeadCell>
              <Table.HeadCell>Jumlah Transaksi</Table.HeadCell>
              <Table.HeadCell>Pesan</Table.HeadCell>
              <Table.HeadCell>Tanggal</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {transaksi.map((item) => (
                <Table.Row key={item.transactionId} className="bg-white">
                  <Table.Cell>{item.transactionId}</Table.Cell>
                  <Table.Cell>{item.username}</Table.Cell>
                  <Table.Cell>{item.phoneNumber}</Table.Cell>
                  <Table.Cell>
                    {formatNumber(item.transactionAmount)}
                  </Table.Cell>
                  <Table.Cell>{item.message}</Table.Cell>
                  <Table.Cell>{item.transactionDate}</Table.Cell>
                  <Table.Cell>
                    {item.success == true ? (
                      <button className="flex items-center bg-green-500 rounded px-4 p-1 text-white">
                        Berhasil
                      </button>
                    ) : (
                      <button className="flex items-center bg-red-500 rounded px-4 p-1 text-white">
                        Gagal
                      </button>
                    )}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
      {user?.role?.name == "SUB_ADMIN" && (
        <>
          <div className="mt-4 sm:mt-10 space-y-4">
            <h1 className=" text-3xl font-Inter font-bold">
              Buat Transaksi Campaign
            </h1>
            <TablePengajuan />
          </div>
          <h1 className="text-3xl font-Inter font-bold mt-6 mb-2">
            Buat Transaksi Zakat
          </h1>
          <div className="overflow-x-auto bg-white p-5 rounded-2xl">
            <div className="flex gap-10 items-end">
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
                <Table.HeadCell>Action</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {amilZakat.map((item) => (
                  <Table.Row key={item?.zakatId} className="bg-white">
                    <Table.Cell>{item?.zakatCategory}</Table.Cell>
                    <Table.Cell>{item?.zakatCode}</Table.Cell>
                    <Table.Cell>{formatNumber(item?.amount)}</Table.Cell>
                    <Table.Cell>
                      <ModalTransaksi code={item?.zakatCode} type={"zakat"} />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
          <h1 className="text-3xl font-Inter font-bold mt-6 mb-2">
            Buat Transaksi Infak
          </h1>
          <div className="overflow-x-auto bg-white p-5 rounded-2xl">
            <div className="flex gap-10 items-end">
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
                <Table.HeadCell>Action</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {amilInfak.map((item) => (
                  <Table.Row key={item.infakId} className="bg-white">
                    <Table.Cell>{item.infakCategory}</Table.Cell>
                    <Table.Cell>{item.infakCode}</Table.Cell>
                    <Table.Cell>{formatNumber(item?.amount)}</Table.Cell>
                    <Table.Cell>
                      {" "}
                      <ModalTransaksi code={item?.infakCode} type={"infak"} />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
          <h1 className="text-3xl font-Inter font-bold mt-6 mb-2">
            Buat Transaksi Wakaf
          </h1>
          <div className="overflow-x-auto bg-white p-5 rounded-2xl">
            <div className="flex gap-10 items-end">
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
                <Table.HeadCell>Action</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {amilWakaf.map((item) => (
                  <Table.Row key={item.wakafId} className="bg-white">
                    <Table.Cell>{item.wakafCategory}</Table.Cell>
                    <Table.Cell>{item.wakafCode}</Table.Cell>
                    <Table.Cell>{formatNumber(item?.amount)}</Table.Cell>
                    <Table.Cell>
                      <ModalTransaksi code={item?.wakafCode} type={"wakaf"} />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </>
      )}
    </div>
  );
}

export default Transaksi;
