import { Table } from "flowbite-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHistory } from "../redux/action/campaignAction";
import PageNumberDashboard from "./PageNumberDashboard";

function TableHistory() {
  const dispatch = useDispatch();
  const { historyCampaign } = useSelector((state) => state.campaign);
  const { pageNumberDashboard } = useSelector((state) => state.campaign);

  useEffect(() => {
    dispatch(getHistory(pageNumberDashboard - 1));
  }, [dispatch, pageNumberDashboard]);
  const formatNumber = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  return (
    <div className="bg-white p-5 rounded-2xl">
      <div className="sm:flex space-y-4 gap-10 items-end">
        <PageNumberDashboard />
      </div>
      <div className="overflow-x-auto">
        <Table hoverable className="my-5">
          <Table.Head className="text-sm">
            <Table.HeadCell className="w-3/6">Campaign</Table.HeadCell>
            <Table.HeadCell>Creator</Table.HeadCell>
            <Table.HeadCell>Code</Table.HeadCell>
            <Table.HeadCell>Lokasi</Table.HeadCell>
            <Table.HeadCell>Tanggal & Waktu</Table.HeadCell>
            <Table.HeadCell>Target</Table.HeadCell>
            <Table.HeadCell>Terkumpul</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Aproved</Table.HeadCell>
            <Table.HeadCell>Pengajuan</Table.HeadCell>
            <Table.HeadCell>Realisasi</Table.HeadCell>
            <Table.HeadCell>Distribusi</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {historyCampaign.map((item) => (
              <Table.Row key={item.campaignId} className="bg-white ">
                <Table.Cell className="whitespace-nowrap overflow-hidden overflow-ellipsis max-w-2xl">
                  {item.campaignName}
                </Table.Cell>
                <Table.Cell>{item?.creator?.username}</Table.Cell>
                <Table.Cell>{item.campaignCode}</Table.Cell>
                <Table.Cell>{item.location}</Table.Cell>
                <Table.Cell>
                  {item.startDate} - {item.endDate}
                </Table.Cell>
                <Table.Cell>{formatNumber(item.targetAmount)}</Table.Cell>
                <Table.Cell>{formatNumber(item.currentAmount)}</Table.Cell>
                <Table.Cell>
                  {item.active == true ? (
                    <button className="font-bold text-green-600">AKTIF</button>
                  ) : (
                    <button className="font-bold text-red-600">SELESAI</button>
                  )}
                </Table.Cell>
                <Table.Cell>
                  {item.approved == true ? (
                    <button className="flex items-center bg-green-500 rounded p-1 px-4 text-white">
                      APROVE
                    </button>
                  ) : (
                    <button className="flex items-center bg-gray-500 rounded p-1 px-4 text-white">
                      PENDING
                    </button>
                  )}
                </Table.Cell>
                <Table.Cell>{formatNumber(500000)}</Table.Cell>
                <Table.Cell>{formatNumber(250000)}</Table.Cell>
                <Table.Cell>
                  {formatNumber(item?.currentAmount - 250000)}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}

export default TableHistory;
