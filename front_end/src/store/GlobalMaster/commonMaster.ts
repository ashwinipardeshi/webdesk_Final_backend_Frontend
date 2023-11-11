import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { ICommonMasterdetail } from "../../interfaces/GlobalMaster/ICommonMasterdetail";
export interface AllCommonMasters{
  GENDER:ICommonMasterdetail[],
  CAP_ALLOTMENT:ICommonMasterdetail[],
  REGION:ICommonMasterdetail[],
  TITLE:ICommonMasterdetail[],
  PLACE_OF_BIRTH:ICommonMasterdetail[],
  DEFENCE_TYPE:ICommonMasterdetail[],
  ACADEMIC_CLASS:ICommonMasterdetail[],
  ENTRANCE_TYPE:ICommonMasterdetail[],
  LANGUAGES_KNOWN:ICommonMasterdetail[],
  MARITAL_STATUS:ICommonMasterdetail[],
  NUMBER_OF_SIBLING:ICommonMasterdetail[],
  CHILD_NUMBER:ICommonMasterdetail[],
  LIVING_STATUS:ICommonMasterdetail[],
  EMPLOYED_IN:ICommonMasterdetail[],
  MONTH:ICommonMasterdetail[],
  PERSON_TYPE:ICommonMasterdetail[],
  ACCOUNT_TYPE:ICommonMasterdetail[],
  VEHICLE_TYPE:ICommonMasterdetail[],
  GaurdainRELATION:ICommonMasterdetail[],
  MEDIUM:ICommonMasterdetail[],
  ADMISSIONSTATUS:ICommonMasterdetail[],
}


interface CommonMaster {
  getAllCommonMaster: AllCommonMasters;
  getAllCommonMasterByCollegeId:ICommonMasterdetail[]
}

const initialState: CommonMaster = {
    getAllCommonMaster:{
      ACADEMIC_CLASS:[],
      ACCOUNT_TYPE:[],
      ADMISSIONSTATUS:[],
      CAP_ALLOTMENT:[],
      CHILD_NUMBER:[],
      DEFENCE_TYPE:[],
      EMPLOYED_IN:[],
      ENTRANCE_TYPE:[],
      GaurdainRELATION:[],
      GENDER:[],
      LANGUAGES_KNOWN:[],
      LIVING_STATUS:[],
      MARITAL_STATUS:[],
      MEDIUM:[],
      MONTH:[],
      NUMBER_OF_SIBLING:[],
      PERSON_TYPE:[],
      PLACE_OF_BIRTH:[],
      REGION:[],
      TITLE:[],
      VEHICLE_TYPE:[]
    },
    getAllCommonMasterByCollegeId:[]
};

export interface loadActionPayload{
  CommonMasterdetail:ICommonMasterdetail[],
  master:'NONE'|'GENDER'|
  'CAP_ALLOTMENT' | 
  'REGION'| 'TITLE' | 'PLACE_OF_BIRTH' | 
  'DEFENCE_TYPE'| 'ACADEMIC_CLASS' | 'ENTRANCE_TYPE' 
  | 'LANGUAGES_KNOWN' | 'MARITAL_STATUS' | 'NUMBER_OF_SIBLING' | 'CHILD_NUMBER' | 'LIVING_STATUS'|
  'EMPLOYED_IN' | 'MONTH' | 'PERSON_TYPE' | 'ACCOUNT_TYPE' | 'VEHICLE_TYPE' | "GaurdainRELATION" | 'MEDIUM'|'ADMISSIONSTATUS'
}



export const slice = createSlice({
  name: "CommonMaster",
  initialState,
  reducers: {
    load: (state,actions:PayloadAction<number>) => {
      //load  nothing
    },
    setLoadCommonMaster:(state,action:PayloadAction<loadActionPayload>)=>{
      const {CommonMasterdetail,master} =action.payload
      switch (master) {
        case 'GENDER':
            state.getAllCommonMaster.GENDER = CommonMasterdetail;
          break;
        case 'CAP_ALLOTMENT':
            state.getAllCommonMaster.CAP_ALLOTMENT = CommonMasterdetail;
          break;
        case 'REGION':
            state.getAllCommonMaster.REGION = CommonMasterdetail;
          break;
        case 'TITLE':
            state.getAllCommonMaster.TITLE = CommonMasterdetail;
          break;
        case 'PLACE_OF_BIRTH':
            state.getAllCommonMaster.PLACE_OF_BIRTH = CommonMasterdetail;
          break;
        case 'DEFENCE_TYPE':
            state.getAllCommonMaster.DEFENCE_TYPE = CommonMasterdetail;
          break;
        case 'ACADEMIC_CLASS':
            state.getAllCommonMaster.ACADEMIC_CLASS = CommonMasterdetail;
          break;
        case 'ENTRANCE_TYPE':
            state.getAllCommonMaster.ENTRANCE_TYPE = CommonMasterdetail;
          break;
        case 'LANGUAGES_KNOWN':
            state.getAllCommonMaster.LANGUAGES_KNOWN = CommonMasterdetail;
          break;
        case 'MARITAL_STATUS':
            state.getAllCommonMaster.MARITAL_STATUS = CommonMasterdetail;
          break;
        case 'NUMBER_OF_SIBLING':
            state.getAllCommonMaster.NUMBER_OF_SIBLING = CommonMasterdetail;
          break;
        case 'CHILD_NUMBER':
            state.getAllCommonMaster.CHILD_NUMBER = CommonMasterdetail;
          break;
        case 'LIVING_STATUS':
            state.getAllCommonMaster.LIVING_STATUS = CommonMasterdetail;
          break;
        case 'EMPLOYED_IN':
            state.getAllCommonMaster.EMPLOYED_IN = CommonMasterdetail;
          break;
        case 'MONTH':
            state.getAllCommonMaster.MONTH = CommonMasterdetail;
          break;
        case 'PERSON_TYPE':
            state.getAllCommonMaster.PERSON_TYPE = CommonMasterdetail;
          break;
        case 'ACCOUNT_TYPE':
            state.getAllCommonMaster.ACCOUNT_TYPE = CommonMasterdetail;
          break;
        case 'VEHICLE_TYPE':
            state.getAllCommonMaster.VEHICLE_TYPE = CommonMasterdetail;
          break;
        case 'GaurdainRELATION':
            state.getAllCommonMaster.GaurdainRELATION = CommonMasterdetail;
          break;
        case 'MEDIUM':
            state.getAllCommonMaster.MEDIUM = CommonMasterdetail;
          break;
        case 'ADMISSIONSTATUS':
            state.getAllCommonMaster.ADMISSIONSTATUS = CommonMasterdetail;
          break;
        default:
          break;
      }
    },
    loadByCollegeId:(state,action:PayloadAction<number>)=>{

    },
    setLoadByCollegeId:(state,action:PayloadAction<ICommonMasterdetail[]>)=>{
      state.getAllCommonMasterByCollegeId = action.payload
    }
  },
});

export const { reducer, actions } = slice;


export const selectCommonMaster = (state: RootState) => state.commonMaster;

export const getAllCommonMaster = createSelector(
  selectCommonMaster,
  (state) => state.getAllCommonMaster
);


export const getAllCommonMasterByCollegeId = createSelector(
  selectCommonMaster,
  (s)=>s.getAllCommonMasterByCollegeId
)


