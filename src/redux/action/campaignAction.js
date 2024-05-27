import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import {
  setAllCampaign,
  setAllCategory,
  setAmilCampaign,
  setBerita,
  setCampaign,
  setCampaignPending,
  setCategoryCampaign,
  setDetailBerita,
  setDetailCampaign,
  setGetCampaignSearch,
  setGetCategoryCampaign,
  setPage,
  setPengajuan,
  setSummaryAmil,
  setTopic,
  setTransaksi,
  setUsers,
  setsummary,
} from "../reducers/campaignReducer";
export const VITE_API_URL = import.meta.env.VITE_API_CAREUS;

export const getAllCategory = () => async (dispatch) => {
  try {
    const response = await axios.get(`${VITE_API_URL}/campaign/categories`);
    const data = response.data;
    dispatch(setAllCategory(data));
  } catch (error) {
    toast.error(error.response.data);
  }
};
export const getAllUsers = () => async (dispatch) => {
  try {
    const response = await axios.get(`${VITE_API_URL}/admin/get-all-user`);
    const data = response.data;
    dispatch(setUsers(data));
  } catch (error) {
    toast.error(error.response.data);
  }
};
export const getCampaign = (searchCampaign) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${VITE_API_URL}/campaign/search?campaignName=${searchCampaign}`
    );
    const data = response.data;
    dispatch(setAllCampaign(data.content));
    dispatch(setPage(data.totalPages));
  } catch (error) {
    toast.error(error.response.data);
  }
};
export const getAllCampaign = (pageNumber) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${VITE_API_URL}/campaign/active-and-approved-campaign?page=${pageNumber}`
    );
    const data = response.data;
    dispatch(setCampaign(data.content));
    dispatch(setPage(data.totalPages));
  } catch (error) {
    toast.error(error.response.data);
  }
};
export const getCampaignPending = () => async (dispatch) => {
  try {
    const response = await axios.get(`${VITE_API_URL}/campaign/pending`);
    const data = response.data;
    dispatch(setCampaignPending(data));
  } catch (error) {
    toast.error(error.response.data);
  }
};
export const getSubmissionPending = () => async (dispatch) => {
  try {
    const response = await axios.get(`${VITE_API_URL}/submission/pending`);
    const data = response.data;
    dispatch(setPengajuan(data));
  } catch (error) {
    toast.error(error.response.data);
  }
};
export const getCampaignByService = (id, pageNumber) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${VITE_API_URL}/campaign/get-by-service-office/${id}?page=${pageNumber}`
    );
    const data = response.data;
    dispatch(setCampaignPending(data.content));
  } catch (error) {
    toast.error(error.response.data);
  }
};
export const getCampaignActive = (page) => async (dispatch) => {
  try {
    const response = await axios.get(`${VITE_API_URL}/campaign?page=${page}`);
    const data = response.data;
    dispatch(setAllCampaign(data.content));
    dispatch(setPage(data.totalPages));
  } catch (error) {
    toast.error(error.response.data);
  }
};
export const getAmil = (page) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${VITE_API_URL}/amil-campaign?page=${page}`
    );
    const data = response.data;
    dispatch(setAmilCampaign(data.content));
    dispatch(setPage(data.totalPages));
  } catch (error) {
    toast.error(error.response.data);
  }
};
export const getSummaryAmil = () => async (dispatch) => {
  try {
    const response = await axios.get(`${VITE_API_URL}/summary-campaign`);
    const data = response.data;
    dispatch(setSummaryAmil(data));
  } catch (error) {
    toast.error(error.response.data);
  }
};
export const getDetailCampaign = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${VITE_API_URL}/campaign/${id}`);
    const data = response.data;
    const category = data.category;
    dispatch(setDetailCampaign(data));
    dispatch(setCategoryCampaign(category));
  } catch (error) {
    toast.error(error.response.data);
  }
};
export const getDetailNews = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${VITE_API_URL}/news/${id}`);
    const data = response.data;
    dispatch(setDetailBerita(data));
  } catch (error) {
    toast.error(error.response.data);
  }
};
export const searchCampaignName =
  (pencarian, pageNummber) => async (dispatch) => {
    try {
      const response = await axios.get(
        `${VITE_API_URL}/campaign/search?page=${pageNummber}`,
        {
          params: { campaignName: pencarian }, // Menggunakan params untuk mengirim data pencarian
        }
      );

      dispatch(setGetCampaignSearch(response.data));
    } catch (error) {
      toast.error(error.response.data);
    }
  };
export const getCampaignCategory = (category) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${VITE_API_URL}/campaign/category/${category}`
    );
    const data = response.data;
    dispatch(setGetCategoryCampaign(data));
    dispatch(setCampaign(data));
  } catch (error) {
    toast.error(error.response.data);
  }
};
export const createNewCampaign =
  (
    category,
    name,
    code,
    image,
    desk,
    location,
    target,
    current,
    dist,
    start,
    end,
    active
  ) =>
  async (dispatch, getState) => {
    try {
      const { token } = getState().auth;
      const formData = new FormData();
      formData.append("categoryId", category);
      formData.append("campaignName", name);
      formData.append("campaignCode", code);
      formData.append("campaignImage", image);
      formData.append("description", desk);
      formData.append("location", location);
      formData.append("targetAmount", target);
      formData.append("currentAmount", current);
      formData.append("distribution", dist);
      formData.append("startDate", start);
      formData.append("endDate", end);
      formData.append("active", active);
      const response = await axios.post(
        `${VITE_API_URL}/admin/create-campaign`,
        {
          categoryId: Number(category),
          campaignName: name,
          campaignCode: code,
          campaignImage: image,
          description: desk,
          location: location,
          targetAmount: target,
          currentAmount: current,
          distribution: dist,
          startDate: start,
          endDate: end,
          active: active,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        toast.success("Berhasil Membuat Campaign");
      }
    } catch (error) {
      if (error.response.status === 400) {
        toast.error(error.response.data.message);
      }
      toast.error(error.response.data);
    }
  };
export const createNews =
  (title, image, content, topic, date) => async (dispatch, getState) => {
    try {
      const { token } = getState().auth;
      // console.log(title, image, content, topic, date);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("image", image);
      formData.append("content", content);
      formData.append("topic", topic);
      formData.append("date", date);
      const response = await axios.post(
        `${VITE_API_URL}/admin/create-news`,
        {
          title: title,
          image: image,
          content: content,
          location: location,
          topic: topic,
          date: date,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        toast.success("Berhasil Membuat Berita");
      }
    } catch (error) {
      if (error.response.status === 400) {
        toast.error(error.response.data.message);
      }
      console.error("Error fetching create News:", error);
    }
  };
export const editNews =
  (title, image, content, topic, date, id, setEdit) =>
  async (dispatch, getState) => {
    try {
      const { token } = getState().auth;
      // console.log(date);
      const formData = new FormData();
      formData.append("title", title);
      {
        image != null && formData.append("image", image);
      }
      formData.append("content", content);
      formData.append("topic", topic);
      formData.append("date", date);
      const response = await axios.put(
        `${VITE_API_URL}/admin/update-news/${id}`,
        {
          title: title,
          image: image,
          content: content,
          location: location,
          topic: topic,
          date: date,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        toast.success("Berhasil Merubah Berita");
        setTimeout(() => {
          setEdit(false);
        }, 3000);
      }
    } catch (error) {
      if (error.response.status === 400) {
        toast.error(error.response.data.message);
      }
      console.error("Error fetching create News:", error);
    }
  };
export const EditCampaign =
  (
    codeEdit,
    categoryId,
    campaignName,
    campaignCode,
    campaignImage,
    description,
    location,
    targetAmount,
    currentAmount,
    distribution,
    startDate,
    endDate,
    active,
    setEdit
  ) =>
  async (dispatch, getState) => {
    try {
      const { token } = getState().auth;
      const formData = new FormData();
      formData.append("categoryId", categoryId);
      formData.append("campaignName", campaignName);
      formData.append("campaignCode", campaignCode);
      {
        campaignImage != null &&
          formData.append("campaignImage", campaignImage);
      }
      formData.append("description", description);
      formData.append("location", location);
      formData.append("targetAmount", targetAmount);
      formData.append("currentAmount", currentAmount);
      formData.append("distribution", distribution);
      formData.append("startDate", startDate);
      formData.append("endDate", endDate);
      formData.append("active", active);
      await axios.put(
        `${VITE_API_URL}/admin/update-campaign/${codeEdit}`,
        {
          categoryId: Number(categoryId),
          campaignName,
          campaignCode,
          campaignImage,
          description,
          location,
          targetAmount,
          currentAmount,
          distribution,
          startDate,
          endDate,
          active,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEdit(false);
      window.location.reload();
    } catch (error) {
      console.error("Error edit campaign:", error);
    }
  };

export const sumarry = () => async (dispatch) => {
  try {
    const response = await axios.get(`${VITE_API_URL}/summary`);
    const data = response.data;
    dispatch(setsummary(data));
  } catch (error) {
    toast.error(error.response.data);
  }
};
export const getAllBerita = (page) => async (dispatch) => {
  try {
    const response = await axios.get(`${VITE_API_URL}/news?page=${page}`);
    const data = response.data;
    dispatch(setBerita(data.content));
    dispatch(setPage(data.totalPages));
  } catch (error) {
    toast.error(error.response.data);
  }
};
export const tutupBerita = (id) => async (dispatch, getState) => {
  try {
    const { token } = getState().auth;
    const response = await axios.delete(
      `${VITE_API_URL}/admin/delete-news/${id}`,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response) {
      toast.success("Berita Berhasil Di Hapus");
    }
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
export const getAllTopic = () => async (dispatch) => {
  try {
    const response = await axios.get(`${VITE_API_URL}/news/all-topic`);
    const data = response.data;
    dispatch(setTopic(data));
  } catch (error) {
    console.error("Error fetching Topic:", error);
  }
};

export const getAproveCampaign = (id) => async (_, getState) => {
  try {
    const { token } = getState().auth;
    await axios.put(
      `${VITE_API_URL}/admin/approve-campaign?campaignCode=${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Unknown error";
    toast.error(`Error approve campaign: ${errorMessage}`);
    console.log(error.response);
  }
};

export const getTransaksi = (pageNumber, setJumlah) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${VITE_API_URL}/admin/get-all-transactions?page=${pageNumber}`
    );
    const data = response.data;
    dispatch(setTransaksi(data.content));
    dispatch(setPage(data.totalPages));
    setJumlah(data.totalElements);
  } catch (error) {
    toast.error(error.response.data);
  }
};
export const createPengajuan = (id,jumlah,setOpenModal) => async (_, getState) => {
  try {
    const { token } = getState().auth;
    await axios.post(
      `${VITE_API_URL}/submission/create`,
      {
        campaign: {
          campaignId: id,
        },
        submissionAmount: jumlah,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setOpenModal(false)
    toast.success("pengajuan berhasil");
  } catch (error) {
    toast.error(error.response.data);
  }
};
export const buatTransaksi =
  (jumlah, nama, desk, code, setOpenModal) => async (_, getState) => {
    // console.log(jumlah, nama, desk, code);
    try {
      const { token } = getState().auth;
      await axios.post(
        `${VITE_API_URL}/transaction/campaign/${code}`,
        {
          transactionAmount: jumlah,
          message: desk,
          username: nama,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("berhasil membuat transaksi");
      setOpenModal(false);
    } catch (error) {
      toast.error(error.response.data);
    }
  };

export const TutupCampaign =
  (
    codeEdit,
    campaignName,
    description,
    location,
    targetAmount,
    currentAmount,
    vaNumber,
    distribution,
    active,
    creator
  ) =>
  async (dispatch, getState) => {
    try {
      const { token } = getState().auth;
      const formData = new FormData();
      formData.append("description", description);
      formData.append("location", location);
      formData.append("targetAmount", targetAmount);
      formData.append("currentAmount", currentAmount);
      formData.append("vaNumber", vaNumber);
      formData.append("distribution", distribution);
      formData.append("active", active);
      formData.append("creator", creator);
      const response = await axios.put(
        `${VITE_API_URL}/admin/update-campaign/${codeEdit}`,
        {
          campaignName,
          description,
          location,
          targetAmount,
          currentAmount,
          vaNumber,
          distribution,
          active,
          creator,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        toast.success("Campaign berhasil di tutup");
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  };
