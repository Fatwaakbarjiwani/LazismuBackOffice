import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalCreate from "./ModalCreate";
import TableContent from "../../components/TableContent";
import {
  TutupCampaign,
  getAllCampaign,
  getCampaignByService,
  getCampaignPending,
  getDetailCampaign,
} from "../../redux/action/campaignAction";
import { setDetailCampaign } from "../../redux/reducers/campaignReducer";
import ModalEdit from "./ModalEdit";
import PageNumber from "../PageNumber";
import ModalAprove from "./ModalAprove";

function Campaign() {
  const { campaign } = useSelector((state) => state.campaign);
  const { pageNumber } = useSelector((state) => state.campaign);
  const { campaignPending } = useSelector((state) => state.campaign);
  const { user } = useSelector((state) => state.auth);

  const [create, setCreate] = useState(false);
  const [edit, setEdit] = useState(false);
  const [aproved, setAproved] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (create == false) {
      dispatch(setDetailCampaign([]));
    }
    if (user?.role?.name == "ADMIN") {
      dispatch(getCampaignPending());
    } else {
      dispatch(
        getCampaignByService(
          user?.serviceOffice?.serviceOfficeId,
          pageNumber - 1
        )
      );
    }
    dispatch(getAllCampaign(pageNumber - 1));
  }, [dispatch, create, pageNumber]);

  const handleEdit = (campaignCode) => {
    dispatch(getDetailCampaign(campaignCode));
    setEdit(true);
  };
  const handleAproved = (campaignCode) => {
    dispatch(getDetailCampaign(campaignCode));
    setAproved(true);
  };
  const handleCreate = () => {
    setCreate(true);
  };
  const handleTutup = (
    campaignCode,
    campaignName,
    description,
    location,
    targetAmount,
    currentAmount,
    vaNumber,
    distribution,
    creator
  ) => {
    dispatch(
      TutupCampaign(
        campaignCode,
        campaignName,
        description,
        location,
        targetAmount,
        currentAmount,
        vaNumber,
        distribution,
        false,
        creator
      )
    );
  };
  const formatNumber = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div>
      <h1 className=" text-3xl font-Inter font-bold">
        Campaign Aktif Dan Disetujui
      </h1>
      <div className="bg-white rounded sm:rounded-2xl my-2 p-3 sm:p-5 gap-5">
        <div className="sm:flex space-y-2 justify-between">
          <div className="flex gap-2 justify-between">
            <button
              onClick={handleCreate}
              className="bg-[#4caf50] text-sm sm:text-base p-1 rounded-sm font-bold text-[#ffffff] shadow hover:bg-green-500 active:scale-105"
            >
              CREATE CAMPAIGN
            </button>
            <PageNumber />
          </div>
          {/* modal */}
          <ModalCreate create={create} setCreate={setCreate} />
          <ModalEdit edit={edit} setEdit={setEdit} />
          <ModalAprove aprove={aproved} setAprove={setAproved} />
          {/*  */}
        </div>
        <div className="overflow-x-auto">
          <Table hoverable className="my-5 ">
            <Table.Head className="text-sm ">
              <Table.HeadCell>Id</Table.HeadCell>
              <Table.HeadCell>Campaign</Table.HeadCell>
              <Table.HeadCell>Creator</Table.HeadCell>
              <Table.HeadCell>Lokasi</Table.HeadCell>
              <Table.HeadCell>Tanggal & Waktu</Table.HeadCell>
              <Table.HeadCell>Target</Table.HeadCell>
              <Table.HeadCell>Terkumpul</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>Aproved</Table.HeadCell>
              {user?.role?.name == "ADMIN" && (
                <Table.HeadCell>Action</Table.HeadCell>
              )}
            </Table.Head>
            <Table.Body className="divide-y">
              {campaign.map((item) => (
                <Table.Row
                  key={item.campaignId}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell>{item.campaignId}</Table.Cell>
                  <Table.Cell>{item.campaignName}</Table.Cell>
                  <Table.Cell>{item?.creator?.username}</Table.Cell>
                  <Table.Cell>{item.location}</Table.Cell>
                  <Table.Cell>
                    {item.startDate} - {item.endDate}
                  </Table.Cell>
                  <Table.Cell>{formatNumber(item.targetAmount)}</Table.Cell>
                  <Table.Cell>{formatNumber(item.currentAmount)}</Table.Cell>
                  <Table.Cell>
                    {item.active == true ? (
                      <div className="font-bold text-green-600">
                        AKTIF
                      </div>
                    ) : (
                      <div className="font-bold text-gray-600">
                        Selesai
                      </div>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {item.approved == true ? (
                      <div className="flex items-center bg-green-500 rounded p-1 justify-center text-white">
                        APROVE
                      </div>
                    ) : (
                      <div className="flex items-center bg-gray-500 rounded p-1 justify-center text-white">
                        PENDING
                      </div>
                    )}
                  </Table.Cell>
                  {user?.role?.name == "ADMIN" && (
                    <Table.Cell className="h-full">
                      <div className="gap-1 flex">
                        <button
                          onClick={() => handleEdit(item?.campaignCode)}
                          className="bg-yellow-400 p-1 rounded-sm text-white font-semibold active:scale-105"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            handleTutup(
                              item.campaignCode,
                              item.campaignName,
                              item.description,
                              item.location,
                              item.targetAmount,
                              item.currentAmount,
                              item.vaNumber,
                              item.distribution,
                              item.creator
                            )
                          }
                          className="bg-red-600 p-1 rounded-sm text-white font-semibold active:scale-105"
                        >
                          Tutup
                        </button>
                      </div>
                    </Table.Cell>
                  )}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
      <h1 className=" text-3xl mt-6 sm:mt-10 font-Inter font-bold">
        {user?.role?.name == "ADMIN" ? "Pengajuan Campaign" : "Pengajuan Distribusi"}
      </h1>
      <div className="bg-white rounded sm:rounded-2xl my-2 p-3 sm:p-5 gap-5">
        {user?.rolle?.name == "SUB_ADMIN" && (
          <div className="sm:flex space-y-2 justify-between">
            <div className="flex gap-2 justify-between">
              <PageNumber />
            </div>
          </div>
        )}
        <div className="overflow-x-auto">
          <Table hoverable className="my-5 ">
            <Table.Head className="text-sm ">
              <Table.HeadCell>Id</Table.HeadCell>
              <Table.HeadCell>Campaign</Table.HeadCell>
              <Table.HeadCell>Creator</Table.HeadCell>
              <Table.HeadCell>Lokasi</Table.HeadCell>
              <Table.HeadCell>Tanggal & Waktu</Table.HeadCell>
              <Table.HeadCell>Target</Table.HeadCell>
              <Table.HeadCell>Terkumpul</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>Aproved</Table.HeadCell>
              {user?.role?.name == "ADMIN" && (
                <Table.HeadCell>Action</Table.HeadCell>
              )}
            </Table.Head>
            <Table.Body className="divide-y">
              {campaignPending.map((item) => (
                <Table.Row
                  key={item.campaignId}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell>{item.campaignId}</Table.Cell>
                  <Table.Cell>{item.campaignName}</Table.Cell>
                  <Table.Cell>{item?.creator?.username}</Table.Cell>
                  <Table.Cell>{item.location}</Table.Cell>
                  <Table.Cell>
                    {item.startDate} - {item.endDate}
                  </Table.Cell>
                  <Table.Cell>{formatNumber(item.targetAmount)}</Table.Cell>
                  <Table.Cell>{formatNumber(item.currentAmount)}</Table.Cell>
                  <Table.Cell>
                    {item.active == true ? (
                      <div className="font-bold text-green-600">
                        AKTIF
                      </div>
                    ) : (
                      <div className="font-bold text-gray-600">
                        Selesai
                      </div>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {item.approved == true ? (
                      <div className="flex items-center bg-green-500 rounded p-1 justify-center text-white">
                        APROVE
                      </div>
                    ) : (
                      <div className="flex items-center bg-gray-500 rounded p-1 justify-center text-white">
                        PENDING
                      </div>
                    )}
                  </Table.Cell>
                  {user?.role?.name == "ADMIN" && (
                    <Table.Cell className="h-full">
                      <div className="gap-1 flex">
                        <button
                          onClick={() => handleAproved(item.campaignCode)}
                          className="bg-primary p-1 rounded-sm text-white font-semibold active:scale-105"
                        >
                          APROVE
                        </button>
                      </div>
                    </Table.Cell>
                  )}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
      <h1 className=" text-3xl font-Inter font-bold mt-4 sm:mt-10">
        Semua Campaign
      </h1>
      <div className="my-5">
        <TableContent />
      </div>
    </div>
  );
}

export default Campaign;
