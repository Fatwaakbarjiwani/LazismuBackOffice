import { useDispatch } from "react-redux";
import close from "../../assets/keluar.svg";
import PropTypes from "prop-types";
import { aproveSubmission } from "../../redux/action/campaignAction";

export default function ModalNotifAprovedSubmission({showAprove,setShowAprove,id}) {
  const dispatch = useDispatch();

  const onHapus = (event) => {
    event.preventDefault();
    setShowAprove(false);

    dispatch(aproveSubmission(id));
  };

  return (
    <>
      {showAprove ? (
        <>
          <div className="bg-black/50 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto">
              <div className="bg-white rounded-xl p-5 font-Inter ">
                <div className="flex justify-between items-center">
                  <div className="flex justify-end  w-4/6">
                    <img
                      src="https://lazismu.org/images/logo.svg"
                      className="absolute top-2"
                      alt=""
                    />
                  </div>
                  <button
                    className="rounded-full p-1 text-white hover:scale-105"
                    onClick={() => setShowAprove(false)}
                  >
                    <img src={close} className="w-6 h-6" alt="" />
                  </button>
                </div>
                {/* peringatan */}
                <div className="font-semibold text-xl mt-5">
                  Apakah anda yakin menyetujui pengajuan ini ?
                </div>
                {/* button */}
                <div className="flex justify-between gap-5">
                  <button
                    className="w-full bg-orange-500 text-lg text-white mt-8 rounded-md md:rounded-xl px-5 py-2 hover:scale-105"
                    onClick={onHapus}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setShowAprove(false)}
                    className="w-full bg-transparent text-lg text-black border-2 border-gray-300 mt-8 rounded-md md:rounded-xl px-5 py-2 hover:scale-105"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
ModalNotifAprovedSubmission.propTypes = {
  showAprove: PropTypes.bool,
  setShowAprove: PropTypes.func,
  id: PropTypes.number,
};
