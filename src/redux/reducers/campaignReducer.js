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
  pageNumber2: 1,
  pageNumberDashboard: 1,
  page: null,
  page2: null,
  pageDashboard: null,
  transaksi: [],
  berita: [],
  topic: [],
  detailBerita: [],
  campaignPending: [],
  amilCampaign: [],
  amilZakat: [],
  amilInfak: [],
  amilWakaf: [],
  summaryAmil: [],
  pengajuan: [],
  aprovedPengajuan: [],
  historyCampaign: [],
  documentasi:[]
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
    setPageNumber2: (state, action) => {
      state.pageNumber2 = action.payload;
    },
    setPageNumberDashboard: (state, action) => {
      state.pageNumberDashboard = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setPage2: (state, action) => {
      state.page2 = action.payload;
    },
    setPageDashboard: (state, action) => {
      state.pageDashboard = action.payload;
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
    setAmilZakat: (state, action) => {
      state.amilZakat = action.payload;
    },
    setAmilInfak: (state, action) => {
      state.amilInfak = action.payload;
    },
    setAmilWakaf: (state, action) => {
      state.amilWakaf = action.payload;
    },
    setSummaryAmil: (state, action) => {
      state.summaryAmil = action.payload;
    },
    setPengajuan: (state, action) => {
      state.pengajuan = action.payload;
    },
    setAprovedPengajuan: (state, action) => {
      state.aprovedPengajuan = action.payload;
    },
    setHistoryCampaign: (state, action) => {
      state.historyCampaign = action.payload;
    },
    setDocumentasi: (state, action) => {
      state.documentasi = action.payload;
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
  setPageNumber2,
  setPageNumberDashboard,
  setPage,
  setPage2,
  setPageDashboard,
  setTransaksi,
  setBerita,
  setTopic,
  setDetailBerita,
  setCampaignPending,
  setAmilCampaign,
  setAmilInfak,
  setAmilWakaf,
  setAmilZakat,
  setSummaryAmil,
  setPengajuan,
  setAprovedPengajuan,
  setHistoryCampaign,
  setDocumentasi
} = authSlice.actions;

export default authSlice.reducer;
