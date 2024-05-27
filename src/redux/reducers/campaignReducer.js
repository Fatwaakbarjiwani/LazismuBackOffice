import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  campaign: [],
  allCampaign: [],
  detailCampaign: [],
  categoryCampaign: [],
  searchCampaign: "",
  getCampaignSearch: [],
  getCategoryCampaign: [],
  allCategory: [],
  create: [],
  summary: [],
  users: [],
  pageNumber: 1,
  page: null,
  transaksi: [],
  berita: [],
  topic: [],
  detailBerita: [],
  campaignPending: [],
  amilCampaign: [],
  summaryAmil: [],
  pengajuan: [],
};
const authSlice = createSlice({
  name: "campaign",
  initialState,
  reducers: {
    setCampaign: (state, action) => {
      state.campaign = action.payload;
    },
    setAllCampaign: (state, action) => {
      state.allCampaign = action.payload;
    },
    setDetailCampaign: (state, action) => {
      state.detailCampaign = action.payload;
    },
    setCategoryCampaign: (state, action) => {
      state.categoryCampaign = action.payload;
    },
    setSearchCampaign: (state, action) => {
      state.searchCampaign = action.payload;
    },
    setGetCampaignSearch: (state, action) => {
      state.getCampaignSearch = action.payload;
    },
    setGetCategoryCampaign: (state, action) => {
      state.getCategoryCampaign = action.payload;
    },
    setAllCategory: (state, action) => {
      state.allCategory = action.payload;
    },
    setCreate: (state, action) => {
      state.create = action.payload;
    },
    setsummary: (state, action) => {
      state.summary = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setTransaksi: (state, action) => {
      state.transaksi = action.payload;
    },
    setBerita: (state, action) => {
      state.berita = action.payload;
    },
    setTopic: (state, action) => {
      state.topic = action.payload;
    },
    setDetailBerita: (state, action) => {
      state.detailBerita = action.payload;
    },
    setCampaignPending: (state, action) => {
      state.campaignPending = action.payload;
    },
    setAmilCampaign: (state, action) => {
      state.amilCampaign = action.payload;
    },
    setSummaryAmil: (state, action) => {
      state.summaryAmil = action.payload;
    },
    setPengajuan: (state, action) => {
      state.pengajuan = action.payload;
    },
  },
});

export const {
  setCampaign,
  setAllCampaign,
  setDetailCampaign,
  setCategoryCampaign,
  setSearchCampaign,
  setGetCampaignSearch,
  setGetCategoryCampaign,
  setAllCategory,
  setCreate,
  setsummary,
  setUsers,
  setPageNumber,
  setPage,
  setTransaksi,
  setBerita,
  setTopic,
  setDetailBerita,
  setCampaignPending,
  setAmilCampaign,
  setSummaryAmil,
  setPengajuan,
} = authSlice.actions;

export default authSlice.reducer;
