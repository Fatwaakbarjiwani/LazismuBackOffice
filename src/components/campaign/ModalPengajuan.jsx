"use client";

import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import PropTypes from "prop-types";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { createPengajuan } from "../../redux/action/campaignAction";

export function ModalPengajuan({ id,item }) {
  const [openModal, setOpenModal] = useState(false);
  const [nominal, setNominal] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  function onCloseModal() {
    setOpenModal(false);
    setNominal("");
    setError("");
  }

  const formatNumber = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleInputChange = (e) => {
    let inputValue = e.target.value.replace(/[^\d]/g, "");
    inputValue = inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    setNominal(formatNumber(inputValue));
  };

  const handleSubmit = () => {
    const nominalValue = parseInt(nominal.replace(/\./g, ""), 10);
    if (nominalValue > item.currentAmount) {
      setError("Nominal pengajuan tidak boleh lebih besar dari total donasi.");
    } else {
      dispatch(createPengajuan(id,nominalValue,setOpenModal));
      onCloseModal();
    }
  };

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className="bg-blue-500 p-2 font-semibold text-white rounded active:scale-105 shadow flex items-center"
      >
        <HiOutlineCurrencyDollar className="mr-2" size={20} />
        PENGAJUAN
      </button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 text-center">
              Form Pengajuan Distribusi
            </h3>
            <div>
              <div className="mb-4">
                <div className="text-lg font-semibold text-gray-700">
                  Campaign:{" "}
                  <span className="font-normal">{item?.campaignName}</span>
                </div>
                <div className="text-lg font-semibold text-gray-700">
                  Total Donasi:{" "}
                  <span className="font-normal">
                    Rp {formatNumber(item?.currentAmount)}
                  </span>
                </div>
              </div>
              <div className="mb-4">
                <div className="mb-2 block">
                  <Label htmlFor="nominal" value="Nominal Pengajuan" />
                </div>
                <TextInput
                  id="nominal"
                  type="text"
                  placeholder="Masukkan nominal pengajuan"
                  value={nominal}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {error && <div className="text-red-500">{error}</div>}
            </div>
            <div className="w-full">
              <Button
                className="w-full bg-green-500 hover:bg-green-600 text-white"
                onClick={handleSubmit}
              >
                Ajukan
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

ModalPengajuan.propTypes = {
  item: PropTypes.shape({
    campaignName: PropTypes.string.isRequired,
    currentAmount: PropTypes.number.isRequired,
  }).isRequired,
  id: PropTypes.string.isRequired,
};
