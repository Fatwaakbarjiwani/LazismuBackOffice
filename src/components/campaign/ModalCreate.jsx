import {
  Button,
  Datepicker,
  FileInput,
  FloatingLabel,
  Label,
  Modal,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewCampaign,
  getAllCategory,
} from "../../redux/action/campaignAction";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";

export default function ModalCreate({ create, setCreate }) {
  const [campaignName, setCampaignName] = useState("");
  const [campaignCode, setCampaignCode] = useState("");
  const [campaignImage, setCampaignImage] = useState(null);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [category, setCategory] = useState(1);
  const { allCategory } = useSelector((state) => state.campaign);
  const dispatch = useDispatch();
  const { detailCampaign } = useSelector((state) => state.campaign);
  const [button, setButton] = useState(false);

  useEffect(() => {
    dispatch(getAllCategory());
    if (create == false) {
      setButton(false)
      setCampaignName("")
      setCampaignCode("")
      setCampaignImage(null)
      
    }
  }, [dispatch, detailCampaign, create]);

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
    setStartDate(formattedDate);
  };
  const handleEndDate = (time) => {
    const originalDate = new Date(time);
    const formattedDate = formatDateToWIB(originalDate);
    setEndDate(formattedDate);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setCampaignImage(file);
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
  };

  const handleSave = () => {
    const nominalValue = parseInt(targetAmount.replace(/\./g, ""), 10);
    dispatch(
      createNewCampaign(
        category,
        campaignName,
        campaignCode,
        campaignImage,
        description,
        location,
        nominalValue,
        startDate,
        endDate,
        "true"
      )
    );
    setTimeout(() => {
      dispatch(setCreate(false));
    }, 2000);
  };
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Menambahkan 1 karena bulan dimulai dari 0
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <Modal show={create} onClose={() => setCreate(false)}>
      <Modal.Header>Create Campaign</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <select
            id="bulanDropdown"
            className="bg-gray-200 outline-none text-gray-500 rounded-lg p-1 "
            onChange={(e) => setCategory(e.target.value)}
          >
            {allCategory.map((item) => (
              <option
                className="outline-none bg-white"
                key={item.id}
                value={item.id}
              >
                {item.categoryName}
              </option>
            ))}
          </select>
          <FloatingLabel
            variant="standard"
            label="Nama Campaign"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
          />
          <FloatingLabel
            variant="standard"
            label="Code Campaign"
            value={campaignCode}
            onChange={(e) => setCampaignCode(e.target.value)}
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

          <FloatingLabel
            variant="standard"
            label="Lokasi"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <FloatingLabel
            variant="standard"
            label="Target Amount"
            type="text"
            value={targetAmount}
            onChange={(e) => {
              let inputValue = e.target.value.replace(/[^\d]/g, "");
              inputValue = inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
              setTargetAmount(inputValue);
            }}
          />
          {button == false && (
            <label className="block mb-2 text-sm text-gray-600 flex gap-4 items-center">
              Buat Tanggal
              <button
                onClick={() => {
                  setButton(true);
                  setStartDate(getCurrentDate());
                  setEndDate(getCurrentDate());
                }}
                className="bg-yellow-400 p-1 rounded text-white font-semibold"
              >
                Pilih
              </button>
            </label>
          )}
          {button == true && (
            <div>
              <label className="block mb-2 text-sm text-gray-600 flex gap-4 items-center">
                Tanggal Mulai
              </label>
              <Datepicker
                variant="standard"
                onSelectedDateChanged={(value) => handleStartDate(value)}
              />
            </div>
          )}
          {button == true && (
            <div>
              <label className="block mb-2 text-sm text-gray-600 flex gap-4 items-center">
                Tanggal Selesai
              </label>
              <Datepicker
                variant="standard"
                onSelectedDateChanged={(value) => handleEndDate(value)}
              />
            </div>
          )}
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
  );
}
ModalCreate.propTypes = {
  create: PropTypes.bool,
  setCreate: PropTypes.func,
  // id: PropTypes.string,
};
