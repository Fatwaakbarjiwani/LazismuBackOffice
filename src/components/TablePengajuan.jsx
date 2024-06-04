import { Table } from "flowbite-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getAllCampaign } from "../redux/action/campaignAction";
import {
  setSearchCampaign,
} from "../redux/reducers/campaignReducer";
import { ModalTransaksi } from "./ModalTransaksi";
import PageNumber from "./PageNumber";

function TablePengajuan() {
  const dispatch = useDispatch();
  const { campaign } = useSelector((state) => state.campaign);
  const { pageNumber } = useSelector((state) => state.campaign);
  const { searchCampaign } = useSelector((state) => state.campaign);

  useEffect(() => {
    dispatch(getAllCampaign(pageNumber - 1));
  }, [dispatch, pageNumber, searchCampaign]);
  const formatNumber = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  return (
    <div className="bg-white p-5 rounded-2xl">
      <div className="flex gap-10 items-end">
        <div className="flex gap-2 items-center">
          <p className="text-lg">Search: </p>
          <input
            className="outline-none ring-1 rounded-sm ring-gray-200 p-1 w-full"
            color={"green"}
            type="text"
            value={searchCampaign}
            onChange={(e) => dispatch(setSearchCampaign(e.target.value))}
          />
        </div>
        <PageNumber/>
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
            <Table.HeadCell>action</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {campaign.map((item) => (
              <Table.Row
                key={item.campaignId}
                className="bg-white"
              >
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
                    <p className="font-bold text-green-600">AKTIF</p>
                  ) : (
                    <p className="font-bold text-red-600">SELESAI</p>
                  )}
                </Table.Cell>
                <Table.Cell>
                   <ModalTransaksi code={item?.campaignCode}/>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}

export default TablePengajuan;
