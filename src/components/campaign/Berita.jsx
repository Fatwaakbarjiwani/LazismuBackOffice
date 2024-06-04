import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageNumber from "../PageNumber";
import { getAllBerita, getDetailNews } from "../../redux/action/campaignAction";
import ModalCreateBerita from "./ModalCreateBerita";
import ModalEditBerita from "./ModalEditBerita";
import ModalNotifDelete from "./ModalNotifDelete";

function Berita() {
  const { pageNumber } = useSelector((state) => state.campaign);
  const { berita } = useSelector((state) => state.campaign);
  const { user } = useSelector((state) => state.auth);

  const [create, setCreate] = useState(false);
  const [edit, setEdit] = useState(false);
  const [hapus, setHapus] = useState(false);
  const [idNews, setIdNews] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBerita(pageNumber - 1));
  }, [dispatch, create, pageNumber]);

  const handleEdit = (id) => {
    dispatch(getDetailNews(id));
    setEdit(true);
  };
  const handleCreate = () => {
    setCreate(true);
  };
  const handleTutup = (id) => {
    setHapus(true);
    setIdNews(id);
  };
  return (
    <div>
      <h1 className=" text-3xl font-Inter font-bold">Berita</h1>
      <div className="bg-white rounded sm:rounded-2xl my-2 p-3 sm:p-5 gap-5">
        <div className="sm:flex space-y-2 justify-between">
          <div className="flex gap-2 justify-between">
            <button
              onClick={handleCreate}
              className="bg-[#4caf50] text-sm sm:text-base p-1 rounded-sm font-bold text-[#ffffff] shadow hover:bg-green-500 active:scale-105"
            >
              CREATE NEWS
            </button>
            <PageNumber />
          </div>
          {/* modal */}
          <ModalCreateBerita create={create} setCreate={setCreate} />
          <ModalEditBerita edit={edit} setEdit={setEdit} />
          <ModalNotifDelete
            setShowHapus={setHapus}
            showHapus={hapus}
            id={idNews}
          />        
        </div>
        <div className="overflow-x-auto">
          <Table hoverable className="my-5 ">
            <Table.Head className="text-sm ">
              <Table.HeadCell>Judul</Table.HeadCell>
              <Table.HeadCell>Deskripsi</Table.HeadCell>
              <Table.HeadCell>Topic</Table.HeadCell>
              <Table.HeadCell>date</Table.HeadCell>
              {user?.role?.name == "ADMIN" && (
                <Table.HeadCell>Action</Table.HeadCell>
              )}
            </Table.Head>
            <Table.Body className="divide-y">
              {berita
                .slice()
                .sort((a, b) => a.id - b.id)
                .map((item) => (
                  <Table.Row
                    key={item.newsId}
                    className="bg-white"
                  >
                    <Table.Cell className="px-4 py-2 whitespace-nowrap overflow-hidden overflow-ellipsis max-w-sm">
                      {item.title}
                    </Table.Cell>
                    <Table.Cell className="line-clamp-3">
                      {item.content}
                    </Table.Cell>
                    <Table.Cell>{item?.topic?.topicName}</Table.Cell>
                    <Table.Cell>{item.date}</Table.Cell>
                    {user?.role?.name == "ADMIN" && (
                      <Table.Cell className="h-full">
                        <div className="gap-1 flex">
                          <button
                            onClick={() => handleEdit(item.newsId)}
                            className="bg-yellow-400 p-1 rounded-sm text-white font-semibold active:scale    -105"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleTutup(item.newsId)}
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
    </div>
  );
}

export default Berita;
