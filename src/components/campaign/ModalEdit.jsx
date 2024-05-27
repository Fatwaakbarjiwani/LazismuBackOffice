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
  EditCampaign,
  getAllCategory,
} from "../../redux/action/campaignAction";

function ModalEdit({ edit, setEdit }) {
  const dispatch = useDispatch();
  const [campaignName, setCampaignName] = useState("");
  const [campaignCode, setCampaignCode] = useState("");
  const [campaignImage, setCampaignImage] = useState(null);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");
  const [distribution, setDistribution] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [creator, setCreator] = useState("");
  const [category, setCategory] = useState(1);
  const { detailCampaign } = useSelector((state) => state.campaign);
  const { allCategory } = useSelector((state) => state.campaign);
  const [campaignCodeBefore, setCampaignCodeBefore] = useState("");
  const [editTanggalS, setEditTanggalS] = useState(false);
  const [editTanggalE, setEditTanggalE] = useState(false);
  const [editCategory, setEditCategory] = useState(false);

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);
  useEffect(() => {
    if (edit == true) {
      setCampaignName(detailCampaign?.campaignName || "");
      setCampaignCode(detailCampaign?.campaignCode || "");
      setCampaignCodeBefore(detailCampaign?.campaignCode || "");
      setImage(detailCampaign?.campaignImage || "");
      setDescription(detailCampaign?.description || "");
      setLocation(detailCampaign?.location || "");
      setTargetAmount(detailCampaign?.targetAmount || "");
      setCurrentAmount(detailCampaign?.currentAmount || "0");
      setDistribution(detailCampaign?.distribution || "0");
      setCreator(detailCampaign?.creator?.username || "");
      setCategory(detailCampaign?.category?.categoryId);
    } else {
      setEditTanggalE(false);
      setEditTanggalS(false);
    }
  }, [detailCampaign, edit]);

  function formatDateToWIB(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedYear = year;
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
    const updatedCampaignImage = campaignImage || null;
    dispatch(
      EditCampaign(
        campaignCodeBefore,
        category,
        campaignName,
        campaignCode,
        updatedCampaignImage,
        description,
        location,
        targetAmount,
        currentAmount,
        distribution,
        startDate,
        endDate,
        "true",
        setEdit
      )
    );
  };
  const handleEditS = (e, value) => {
    e.preventDefault();
    setEditTanggalS(!editTanggalS);
    setStartDate(value);
  };
  const handleEditE = (e, value) => {
    e.preventDefault();
    setEditTanggalE(!editTanggalE);
    setEndDate(value);
  };
  const handleEditC = (e, value) => {
    e.preventDefault();
    setEditCategory(!editCategory);
    setCategory(value || 1);
  };

  return (
    <Modal show={edit} onClose={() => setEdit(false)}>
      <Modal.Header>Edit Campaign</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <div>
              <div className="flex gap-2 font-semibold text-gray-600">
                Creator : <p>{creator}</p>
              </div>
            <label className="flex items-center mb-2 text-sm text-gray-600 font-semibold dark:text-white gap-2">
              <div className="flex gap-2">
                Kategori : <p>{detailCampaign?.category?.categoryName}</p>
              </div>
              <button
                onClick={(e) =>
                  handleEditC(e, detailCampaign?.category?.categoryId)
                }
                className="p-1 bg-yellow-400 rounded-md text-white font-bold"
              >
                Edit
              </button>
            </label>
            {editCategory == true && (
              <select
                defaultValue={detailCampaign?.category?.categoryId}
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
            )}
          </div>
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
            <label className="block mb-2 text-sm text-gray-600 dark:text-white">
              Deskripsi
            </label>
            <textarea
              id="message"
              rows="4"
              className="outline-gray-300 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            type="number"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
          />
          <FloatingLabel
            variant="standard"
            label="Current Amount"
            type="number"
            value={currentAmount}
            onChange={(e) => setCurrentAmount(e.target.value)}
          />

          <FloatingLabel
            variant="standard"
            label="Distribution"
            value={distribution}
            onChange={(e) => setDistribution(e.target.value)}
          />
          <div>
            <label className="flex items-center mb-2 text-sm text-gray-600 dark:text-white gap-2">
              <div className="flex gap-2">
                Tanggal Mulai : <p>{detailCampaign?.startDate}</p>
              </div>
              <button
                onClick={(e) => handleEditS(e, detailCampaign?.startDate)}
                className="p-1 bg-yellow-400 rounded-md text-white font-bold"
              >
                Edit
              </button>
            </label>
            {editTanggalS == true && (
              <Datepicker
                variant="standard"
                defaultDate={new Date(startDate)}
                onSelectedDateChanged={(value) => handleStartDate(value)}
              />
            )}
          </div>
          <div>
            <label className="flex items-center mb-2 text-sm text-gray-600 dark:text-white gap-2">
              <div className="flex gap-2">
                Tanggal Selesai : <p>{detailCampaign?.endDate}</p>
              </div>
              <button
                onClick={(e) => handleEditE(e, detailCampaign?.endDate)}
                className="p-1 bg-yellow-400 rounded-md text-white font-bold"
              >
                Edit
              </button>
            </label>
            {editTanggalE == true && (
              <Datepicker
                variant="standard"
                defaultDate={new Date(endDate)}
                onSelectedDateChanged={(value) => handleEndDate(value)}
              />
            )}
          </div>
          {/*  */}
          <div className="flex w-full items-center justify-center">
            <Label
              htmlFor="dropzone-file"
              className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
                    className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
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
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
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
          Edit Campaign
        </Button>
        <Button color="gray" onClick={() => setEdit(false)}>
          Decline
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
ModalEdit.propTypes = {
  edit: PropTypes.bool,
  setEdit: PropTypes.func,
  // id: PropTypes.string,
};
export default ModalEdit;
