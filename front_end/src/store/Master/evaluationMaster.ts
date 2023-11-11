import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IEvaluationMaster } from "../../interfaces/Master/IEvaluationMaster";

interface EvaluationMaster {
    getAllEvaluationMasterData: IEvaluationMaster[];
    getByIDEvaluationMaster: any;
    status: "idle" | "loading" | "error" | "tokenExpired";
    saveUpdadteEvaluationMaster: any;
    deleteEvaluationMaster: any;
    getOptionEvaluationMasterData: IEvaluationMaster[];
  }

  const initialState: EvaluationMaster = {
    getAllEvaluationMasterData: [],
    getByIDEvaluationMaster: null,
    status: "idle",
    saveUpdadteEvaluationMaster: null,
    deleteEvaluationMaster: null,
    getOptionEvaluationMasterData: [],
  };

  export const slice = createSlice({
    name: "EvaluationMaster",
    initialState,
    reducers: {
      load: () => {
        //load  nothing
      },
      loadOptions: () => {
        //load  nothing
      },
      setLoadGetAllEvaluationMaster: (state, action: PayloadAction<any>) => {
        state.getAllEvaluationMasterData = action.payload;
      },
      loadGetByIdEvaluationMaster: (state, action: PayloadAction<any>) => {
        //load  nothing
      },
      setGetByIdEvaluationMaster: (state, action: PayloadAction<any>) => {
        state.getByIDEvaluationMaster = action.payload;
      },
      loadSaveUpdateEvaluationMaster: (state, action: PayloadAction<any>) => {
        //load  nothing
      },
      setSaveUpdateEvaluationMaster: (state, action: PayloadAction<any>) => {
        state.saveUpdadteEvaluationMaster = action.payload;
      },
      loadDeleteEvaluationMaster: (state, action: PayloadAction<any>) => {
        //load  nothing
      },
      setDeleteEvaluationMaster: (state, action: PayloadAction<any>) => {
        state.deleteEvaluationMaster = action.payload;
      },
      setLoadGetOptionEvaluationMaster: (state, action: PayloadAction<any>) => {
        state.getOptionEvaluationMasterData = action.payload;
      },
  
      setStatus: (state, action: PayloadAction<"idle" | "loading" | "error">) => {
        state.status = action.payload;
      },
    },
  });

  export const { reducer, actions } = slice;

  export const selectEvaluationMaster = (state: RootState) => state.evaluationMaster;

  export const getAllEvaluationMaster= createSelector(
    selectEvaluationMaster,
    (Evaluation) => Evaluation.getAllEvaluationMasterData
  );
  export const getbyIdEvaluationMaster= createSelector(
    selectEvaluationMaster,
    (Evaluation) => Evaluation.getByIDEvaluationMaster
  );
  export const getSaveUpdateEvaluationMaster= createSelector(
    selectEvaluationMaster,
    (Evaluation) => Evaluation.saveUpdadteEvaluationMaster
  );
  export const getDeleteEvaluationMaster= createSelector(
    selectEvaluationMaster,
    (Evaluation) => Evaluation.deleteEvaluationMaster
  );
  export const getOptionEvaluationMaster= createSelector(
    selectEvaluationMaster,
    (Evaluation) => Evaluation.getOptionEvaluationMasterData
  );
  export const selectStatus = createSelector(
    selectEvaluationMaster,
    (state) => state.status
  );
  