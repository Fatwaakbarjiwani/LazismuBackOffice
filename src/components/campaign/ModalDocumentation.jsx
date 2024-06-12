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
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import { createDocumentation } from "../../redux/action/campaignAction";

export default function ModalDocumentation({ submissionAmount, code }) {
  const [receiver, setReceiver] = useState("");
  const [newsImage, setNewsImage] = useState(null);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const dispatch = useDispatch();
  const [button, setButton] = useState(false);
  const [create, setCreate] = useState(false);

  const formatNumber = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  useEffect(() => {
    if (create == false) {
      setReceiver("");
      setImage(null);
      setDate("");
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
    setTimeout(() => {
      dispatch(setCreate(false));
    }, 2000);
    dispatch(
      createDocumentation(
        code,
        submissionAmount,
        date,
        receiver,
        description,
        newsImage
      )
    );
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Menambahkan 1 karena bulan dimulai dari 0
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  return (
    <>
      <button
        onClick={() => setCreate(true)}
        className="bg-green-500 text-white font-semibold shadow rounded p-2 active:scale-105"
      >
        DOCUMENTATION
      </button>
      <Modal show={create} onClose={() => setCreate(false)}>
        <Modal.Header>Create Documentation</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="font-Inter font-semibold text-gray-600">
              Jumlah Pengajuan : Rp {formatNumber(submissionAmount)}
            </p>
            <FloatingLabel
              variant="standard"
              label="Penerima"
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
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
              <label className="block mb-2 text-sm text-gray-600 flex gap-4 items-center">
                Tanggal
                {button == false && (
                  <button
                    onClick={() => {
                      setButton(true);
                      setDate(getCurrentDate());
                    }}
                    className="bg-yellow-400 p-1 rounded text-white font-semibold"
                  >
                    Pilih
                  </button>
                )}
              </label>
              {button == true && (
                <Datepicker
                  variant="standard"
                  onSelectedDateChanged={(value) => handleStartDate(value)}
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
                    <p className="mb-2 text-sm text-gray-500 ">
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
    </>
  );
}
ModalDocumentation.propTypes = {
  create: PropTypes.bool,
  setCreate: PropTypes.func,
  submissionAmount: PropTypes.string,
  code: PropTypes.string,
};
