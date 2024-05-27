import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTransaksi, sumarry } from "../redux/action/campaignAction";
import PageNumber from "./PageNumber";
import CardDashboard from "./cardDashboard";
import icon4 from "../assets/Icon-3.svg";
import { HiOutlineUserGroup } from "react-icons/hi2";
import TablePengajuan from "./TablePengajuan";

function Transaksi() {
  const { transaksi } = useSelector((state) => state.campaign);
  const { pageNumber } = useSelector((state) => state.campaign);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { summary } = useSelector((state) => state.campaign);
  const [jumlah, setJumlah] = useState(null);

  useEffect(() => {
    dispatch(getTransaksi(pageNumber - 1, setJumlah));
    dispatch(sumarry());
  }, [dispatch, pageNumber]);
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
              <p className="font-bold text-xl">{jumlah||0}</p>
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
            <PageNumber />
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
                <Table.Row
                  key={item.transactionId}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell>{item.transactionId}</Table.Cell>
                  <Table.Cell>{item.username}</Table.Cell>
                  <Table.Cell>{item.phoneNumber}</Table.Cell>
                  <Table.Cell>{formatNumber(item.transactionAmount)}</Table.Cell>
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
        <div className="mt-4 sm:mt-10 space-y-4">
          <h1 className=" text-3xl font-Inter font-bold">Buat Transaksi</h1>
          <TablePengajuan />
        </div>
      )}
    </div>
  );
}

export default Transaksi;
