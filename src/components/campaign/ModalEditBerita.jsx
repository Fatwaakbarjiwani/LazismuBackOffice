import {
  Button,
  Datepicker,
  FileInput,
  FloatingLabel,
  Label,
  Modal,
} from "flowbite-react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  editNews,
  getAllTopic,
} from "../../redux/action/campaignAction";

function ModalEditBerita({ edit, setEdit }) {
  const dispatch = useDispatch();
   const [judulBerita, setJudulBerita] = useState("");
   const [newsImage, setNewsImage] = useState(null);
   const [image, setImage] = useState(null);
   const [description, setDescription] = useState("");
   const [date, setDate] = useState("");
   const [topicNews, setTopicNews] = useState(1);
   const { detailBerita } = useSelector((state) => state.campaign);
   const { topic } = useSelector((state) => state.campaign);
   const [editTanggal,setEditTanggal] = useState(false)
   const [editCategory,setEditCategory] = useState(false)
   

  useEffect(() => {
    dispatch(getAllTopic());
  }, [dispatch]);
  useEffect(() => {
    if (edit == true) {
      setJudulBerita(detailBerita?.title || "");
      setImage(detailBerita?.image || "");
      setDescription(detailBerita?.content || "");
      setDescription(detailBerita?.content || "");
    } else {
      setEditTanggal(false);
    }
  }, [detailBerita, edit]);

  function formatDateToWIB(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedYear = year;
    return `${formattedYear}-${formattedMonth}-${formattedDay}`;
  }

  const handleDate = (time) => {
    const originalDate = new Date(time);
    const formattedDate = formatDateToWIB(originalDate);
    setDate(formattedDate);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setNewsImage(file);
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
  };
  const handleSave = () => {
    dispatch(editNews(judulBerita, newsImage, description, topicNews, date, detailBerita?.newsId,setEdit));
  };
  const handleEditS = (e, value) => {
    e.preventDefault();
    setEditTanggal(!editTanggal);
    setDate(value);
  };
  const handleEditC = (e, value) => {
    e.preventDefault();
    setEditCategory(!editCategory);
    setTopicNews(value || 1);
  };

  return (
    <Modal show={edit} onClose={() => setEdit(false)}>
      <Modal.Header>Edit Campaign</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <div>
            <label className="flex items-center mb-2 text-sm text-gray-600 font-semibold gap-2">
              <div className="flex gap-2">
                Topic : <p>{detailBerita?.topic?.topicName}</p>
              </div>
              <button
                onClick={(e) =>
                  handleEditC(e, detailBerita?.topic?.topicId)
                }
                className="p-1 bg-yellow-400 rounded-md text-white font-bold"
              >
                Edit
              </button>
            </label>
            {editCategory == true && (
              <select
                defaultValue={detailBerita?.topic?.topicId}
                className="bg-gray-200 outline-none text-gray-500 rounded-lg p-1 "
                onChange={(e) => setTopicNews(e.target.value)}
              >
                {topic.map((item) => (
                  <option
                    className="outline-none bg-white"
                    key={item.id}
                    value={item.id}
                  >
                    {item.topicName}
                  </option>
                ))}
              </select>
            )}
          </div>
          <FloatingLabel
            variant="standard"
            label="Nama Campaign"
            value={judulBerita}
            onChange={(e) => setJudulBerita(e.target.value)}
          />
          <div>
            <label className="block mb-2 text-sm text-gray-600">
              Deskripsi
            </label>
            <textarea
              id="message"
              rows="4"
              className="outline-gray-300 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write your thoughts here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label className="flex items-center mb-2 text-sm text-gray-600 gap-2">
              <div className="flex gap-2">
                Tanggal : <p>{detailBerita?.date}</p>
              </div>
              <button
                onClick={(e) => handleEditS(e, detailBerita?.date)}
                className="p-1 bg-yellow-400 rounded-md text-white font-bold"
              >
                Edit
              </button>
            </label>
            {editTanggal == true && (
              <Datepicker
                variant="standard"
                defaultDate={new Date(date)}
                onSelectedDateChanged={(value) => handleDate(value)}
              />
            )}
          </div>
          {/*  */}
          <div className="flex w-full items-center justify-center">
            <Label
              htmlFor="dropzone-file"
              className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
            >
              {image != null ? (
                <img
                  src={image}
                  alt="Campaign Image"
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                  <svg
                    className="mb-4 h-8 w-8 text-gray-500 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 ">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 ">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
              )}
              <FileInput
                id="dropzone-file"
                className="hidden"
                onChange={handleImageUpload}
              />
            </Label>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="text-white bg-green-500 active:scale-105"
          color={"none"}
          onClick={handleSave}
        >
          Edit
        </Button>
        <Button color="gray" onClick={() => setEdit(false)}>
          Decline
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
ModalEditBerita.propTypes = {
  edit: PropTypes.bool,
  setEdit: PropTypes.func,
  // id: PropTypes.string,
};
export default ModalEditBerita;
