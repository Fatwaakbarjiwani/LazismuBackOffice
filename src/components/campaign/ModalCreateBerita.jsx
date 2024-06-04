import {
  Button,
  Datepicker,
  FileInput,
  FloatingLabel,
  Label,
  Modal,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  createNews,
} from "../../redux/action/campaignAction";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";

export default function ModalCreateBerita({ create, setCreate }) {
  const [judulBerita, setJudulBerita] = useState("");
  const [newsImage, setNewsImage] = useState(null);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [topicNews, setTopicNews] = useState(1);
  const dispatch = useDispatch();

  const topic = [
    { id: 1, topicName: "Opini" },
    { id: 2, topicName: "Daerah" },
    { id: 3, topicName: "Nasional" },
    { id: 4, topicName: "Internasional" },
    { id: 5, topicName: "Ziswaf" },
    { id: 6, topicName: "Hikmah & Doa" },
  ];

  useEffect(() => {
    if (create == false) {
      setJudulBerita("");
      setImage(null);
      setDate("");
      setTopicNews(1);
    }
  }, [dispatch, create]);

  function formatDateToWIB(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedYear = year;

    // Mengembalikan string tanggal dalam format dd/mm/yyyy
    return `${formattedYear}-${formattedMonth}-${formattedDay}`;
  }

  const handleStartDate = (time) => {
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
    dispatch(createNews(judulBerita, newsImage, description,topicNews, date));
    setTimeout(() => {
      dispatch(setCreate(false));
    }, 2000);
  };

  return (
    <Modal show={create} onClose={() => setCreate(false)}>
      <Modal.Header>Create Berita</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <select
            id="bulanDropdown"
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
          <FloatingLabel
            variant="standard"
            label="Judul Berita"
            value={judulBerita}
            onChange={(e) => setJudulBerita(e.target.value)}
          />
          <div>
            <label className="block mb-2 text-sm text-gray-600 ">
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
            <label className="block mb-2 text-sm text-gray-600 ">
              Tanggal
            </label>
            <Datepicker
              variant="standard"
              onSelectedDateChanged={(value) => handleStartDate(value)}
            />
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
                    className="mb-4 h-8 w-8 text-gray-500"
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
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
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
          Create
        </Button>
        <Button color="gray" onClick={() => setCreate(false)}>
          Decline
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
ModalCreateBerita.propTypes = {
  create: PropTypes.bool,
  setCreate: PropTypes.func,
  // id: PropTypes.string,
};
