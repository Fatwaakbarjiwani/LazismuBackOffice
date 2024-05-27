import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { buatTransaksi } from "../redux/action/campaignAction";

export function ModalTransaksi({ code }) {
  const [openModal, setOpenModal] = useState(false);
  const [nama, setNama] = useState("");
  const [selectedTotal, setSelectedTotal] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [desk, setDesk] = useState("");
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    let inputValue = e.target.value.replace(/[^\d]/g, "");
    // Menambahkan titik setiap tiga digit dari belakang
    inputValue = inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    setSelectedTotal(formatNumber(inputValue));
  };
  const formatNumber = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  function hapusTitik(nominal) {
    let nominalStr = nominal.toString();
    let nominalTanpaTitik = nominalStr.replace(/\./g, "");
    return nominalTanpaTitik;
  }
  const handleAnonymousChange = () => {
    setIsAnonymous(!isAnonymous);
  };
  function onCloseModal() {
    setOpenModal(false);
    setNama("");
    setDesk("");
    setSelectedTotal("");
  }
  const handleTransaction = () => {
    dispatch(
      buatTransaksi(hapusTitik(selectedTotal), nama, desk, code, setOpenModal)
    );
  };

  useEffect(() => {
    if (isAnonymous == true) {
      setNama("Hamba Allah");
    } else {
      setNama("");
    }
  }, [isAnonymous]);

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className="font-bold bg-orange-500 text-white p-1 active:scale-105 rounded"
      >
        CREATE
      </button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Buat Transaksi
            </h3>
            <div>
              <div className="mb-2 block">
                <Label value="Nama Donatur" />
              </div>
              <TextInput
                value={nama}
                onChange={(event) => setNama(event.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="nominal" value="Nominal" />
              </div>
              <TextInput
                id="nominal"
                type="text"
                placeholder="0"
                value={selectedTotal}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={handleAnonymousChange}
                  className="h-4 w-4 rounded-md text-primary"
                />
                <label className="ml-2 text-sm text-gray-600">
                  Sembunyikan nama saya (Hamba Allah)
                </label>
              </div>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="pesan" value="Pesan" />
              </div>
              <textarea
                id="pesan"
                className="w-full border border-gray-300 rounded-lg p-2 text-sm outline-none"
                placeholder="Pesan Anda..."
                value={desk}
                onChange={(e) => setDesk(e.target.value)}
              />
            </div>
            <div className="w-full">
              <Button onClick={handleTransaction}>Buat Transaksi</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
ModalTransaksi.propTypes = {
  code: PropTypes.string,
};
