import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IDistrictMaster } from "../../interfaces/GlobalMaster/IDistrictMaster";

interface DistrictMaster {
  getAllDistrictMasterData: IDistrictMaster[];
  getByIDDistrictMaster: any;
  status: "idle" | "loading" | "error" | "tokenExpired";
  saveUpdateDistrictMaster: any;
  deleteDistrictMaster: any;
  getOptionDistrictMasterData: IDistrictMaster[];
}
const initialState: DistrictMaster = {
  getAllDistrictMasterData: [],
  getByIDDistrictMaster: null,
  status: "idle",
  saveUpdateDistrictMaster: "",
  deleteDistrictMaster: null,
  getOptionDistrictMasterData: [],
};

export const slice = createSlice({
  name: "DistrictMaster",
  initialState,
  reducers: {
    load: () => {},
    loadOptionDistrict: () => {},
    setLoadGetAllDistrictMaster: (state, action: PayloadAction<any>) => {
      state.getAllDistrictMasterData = action.payload;
    },
    loadGetByIdDistrictMaster: (state, action: PayloadAction<any>) => {},
    setGetByIdDistrictMaster: (state, action: PayloadAction<any>) => {
      state.getByIDDistrictMaster = action.payload;
    },
    loadSaveUpdateDistrictMaster: (state, action: PayloadAction<any>) => {},
    setSaveUpdateDistrictMaster: (state, action: PayloadAction<any>) => {
      state.saveUpdateDistrictMaster = action.payload;
    },
    loadDeleteDistrictMaster: (state, action: PayloadAction<any>) => {},
    setDeleteDistrictMaster: (state, action: PayloadAction<any>) => {
      state.deleteDistrictMaster = action.payload;
    },
    setLoadGetOptionDistrictMaster: (state, action: PayloadAction<any>) => {
      state.getOptionDistrictMasterData = action.payload;
    },
    setStatus: (state, action: PayloadAction<"idle" | "loading" | "error">) => {
      state.status = action.payload;
    },
  },
});

export const { reducer, actions } = slice;

export const selectDistrictMaster = (state: RootState) => state.districtMaster;

export const getAllDistrictMaster = createSelector(
  selectDistrictMaster,
  (District) => District.getAllDistrictMasterData
);
export const getbyIdDistrictMaster = createSelector(
  selectDistrictMaster,
  (District) => District.getByIDDistrictMaster
);
export const getSaveUpdateDistrictMaster = createSelector(
  selectDistrictMaster,
  (District) => District.saveUpdateDistrictMaster
);
export const getDeleteDistrictMaster = createSelector(
  selectDistrictMaster,
  (District) => District.deleteDistrictMaster
);
export const getOptionDistrictMaster = createSelector(
  selectDistrictMaster,
  (District) => District.getOptionDistrictMasterData
);
export const selectStatus = createSelector(
  selectDistrictMaster,
  (state) => state.status
);
