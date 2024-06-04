import { Table } from "flowbite-react";
import { ModalPengajuan } from "./ModalPengajuan";
import PageNumber from "../PageNumber";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getAprovedSubmission,
  getCampaignByService,
  getSubmissionPending,
} from "../../redux/action/campaignAction";
import ModalNotifAprovedSubmission from "./ModalNotifAprovedSubmission";

export default function TablePengajuan() {
  const { user } = useSelector((state) => state.auth);
  const { campaignPending } = useSelector((state) => state.campaign);
  const { pageNumber } = useSelector((state) => state.campaign);
  const { pengajuan } = useSelector((state) => state.campaign);
  const { aprovedPengajuan } = useSelector((state) => state.campaign);
  const dispatch = useDispatch();
  const [approve, setAprove] = useState(false);
  const [idSubmission, setIdSubmission] = useState("");

  useEffect(() => {
    dispatch(
      getCampaignByService(user?.serviceOffice?.serviceOfficeId, pageNumber - 1)
    );
    dispatch(getAprovedSubmission());
    dispatch(getSubmissionPending());
  }, [pageNumber]);
  const formatNumber = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div>
      {user?.role?.name == "SUB_ADMIN" && (
        <h1 className=" text-3xl mt-4 sm:mt-4 font-Inter font-bold">
          Pengajuan Distribusi
        </h1>
      )}
      {user?.role?.name == "SUB_ADMIN" && (
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
                <Table.HeadCell>Campaign</Table.HeadCell>
                <Table.HeadCell>Creator</Table.HeadCell>
                <Table.HeadCell>Lokasi</Table.HeadCell>
                <Table.HeadCell>Tanggal & Waktu</Table.HeadCell>
                <Table.HeadCell>Target</Table.HeadCell>
                <Table.HeadCell>Terkumpul</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell>Aproved</Table.HeadCell>
                <Table.HeadCell>Action</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {campaignPending.map((item) => (
                  <Table.Row
                    key={item.campaignId}
                    className="bg-white"
                  >
                    <Table.Cell>{item.campaignId}</Table.Cell>
                    <Table.Cell className="px-4 py-2 whitespace-nowrap overflow-hidden overflow-ellipsis max-w-sm">
                      {item.campaignName}
                    </Table.Cell>
                    <Table.Cell>{item?.creator?.username}</Table.Cell>
                    <Table.Cell>{item.location}</Table.Cell>
                    <Table.Cell>
                      {item.startDate} - {item.endDate}
                    </Table.Cell>
                    <Table.Cell>{formatNumber(item.targetAmount)}</Table.Cell>
                    <Table.Cell>{formatNumber(item.currentAmount)}</Table.Cell>
                    <Table.Cell>
                      {item.active == true ? (
                        <div className="font-bold text-green-600">AKTIF</div>
                      ) : (
                        <div className="font-bold text-gray-600">Selesai</div>
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
                    <Table.Cell>
                      {item?.approved == true && (
                        <ModalPengajuan id={item?.campaignId} item={item} />
                      )}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </div>
      )}
      <h1 className=" text-3xl mt-4 sm:mt-6 font-Inter font-bold">
        Aproved Submission
      </h1>
      <div className="bg-white rounded sm:rounded-2xl my-2 p-3 sm:p-5 gap-5">
        <div className="overflow-x-auto">
          <Table hoverable className="my-5 ">
            <Table.Head className="text-sm ">
              <Table.HeadCell>Id</Table.HeadCell>
              <Table.HeadCell>Kantor</Table.HeadCell>
              <Table.HeadCell>Campaign</Table.HeadCell>
              <Table.HeadCell>Donasi</Table.HeadCell>
              <Table.HeadCell>Nominal Pengajuan</Table.HeadCell>
              <Table.HeadCell>Tanggal Pengajuan</Table.HeadCell>
              <Table.HeadCell>Tanggal Disetujui</Table.HeadCell>
              <Table.HeadCell>Aproved</Table.HeadCell>
              {user?.role?.name == "SUB_ADMIN" && (
                <Table.HeadCell>Action</Table.HeadCell>
              )}
            </Table.Head>
            <Table.Body className="divide-y">
              {aprovedPengajuan.map((item) => (
                <Table.Row
                  key={item.submissionId}
                  className="bg-white"
                >
                  <Table.Cell>{item.submissionId}</Table.Cell>
                  <Table.Cell>{item?.user?.username}</Table.Cell>
                  <Table.Cell className="px-4 py-2 whitespace-nowrap overflow-hidden overflow-ellipsis max-w-sm">
                    {item?.campaign?.campaignName}
                  </Table.Cell>
                  <Table.Cell>
                    {formatNumber(item?.campaign?.currentAmount)}
                  </Table.Cell>
                  <Table.Cell>{item?.submissionAmount}</Table.Cell>
                  <Table.Cell>{item.submissionDate}</Table.Cell>
                  <Table.Cell>{item.approvedDate}</Table.Cell>
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
                  {user?.role?.name == "SUB_ADMIN" && (
                    <Table.Cell>
                      <button className="bg-green-500 text-white font-semibold shadow rounded p-2 active:scale-105">
                        DOCUMENTATION
                      </button>
                    </Table.Cell>
                  )}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
      {/* =================================== */}
      <h1 className=" text-3xl mt-4 sm:mt-6 font-Inter font-bold">
        Pending Submission
      </h1>
      <div className="bg-white rounded sm:rounded-2xl my-2 p-3 sm:p-5 gap-5">
        <div className="overflow-x-auto">
          <Table hoverable className="my-5 ">
            <Table.Head className="text-sm ">
              <Table.HeadCell>Id</Table.HeadCell>
              <Table.HeadCell>Kantor</Table.HeadCell>
              <Table.HeadCell>Campaign</Table.HeadCell>
              <Table.HeadCell>Donasi</Table.HeadCell>
              <Table.HeadCell>Nominal Pengajuan</Table.HeadCell>
              <Table.HeadCell>Tanggal Pengajuan</Table.HeadCell>
              <Table.HeadCell>Aproved</Table.HeadCell>
              {user?.role?.name == "ADMIN" && (
                <Table.HeadCell>Action</Table.HeadCell>
              )}
            </Table.Head>
            <Table.Body className="divide-y">
              {pengajuan.map((item) => (
                <Table.Row
                  key={item.submissionId}
                  className="bg-white"
                >
                  <Table.Cell>{item.submissionId}</Table.Cell>
                  <Table.Cell>{item?.user?.username}</Table.Cell>
                  <Table.Cell>{item?.campaign?.campaignName}</Table.Cell>
                  <Table.Cell>
                    {formatNumber(item?.campaign?.currentAmount)}
                  </Table.Cell>
                  <Table.Cell>{item?.submissionAmount}</Table.Cell>
                  <Table.Cell>{item.submissionDate}</Table.Cell>
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
                  <ModalNotifAprovedSubmission
                    showAprove={approve}
                    setShowAprove={setAprove}
                    id={idSubmission}
                  />
                  {user?.role?.name == "ADMIN" && (
                    <Table.Cell>
                      <button
                        onClick={() => {
                          setAprove(true);
                          setIdSubmission(item.submissionId);
                        }}
                        className="bg-green-500 text-white font-semibold shadow rounded p-2 active:scale-105"
                      >
                        DISETUJUI
                      </button>
                    </Table.Cell>
                  )}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
}
