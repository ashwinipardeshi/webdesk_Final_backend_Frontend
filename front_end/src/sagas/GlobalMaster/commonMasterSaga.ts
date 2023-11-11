import { globalErrorHandler } from "..";
import { actions as loaderActions } from "../../store/loader";
import { actions as snackbarActions } from "../../store/snackbarToster";
import {CommonMasterService,CommonMasterApplicationForService} from '../../services/GlobalMaster/commonMasterService'
import { call, put, select, takeEvery } from "redux-saga/effects";
import {actions as commonActions} from '../../store/GlobalMaster/commonMaster'
import { PayloadAction } from "@reduxjs/toolkit";
import { getCollegeId } from "../../store/Authentication/authentication";
import {commonMastersIds} from '../../utils/commonMasterIds'

export const findKeyByValue = (obj:any  , value :number) => {
  for (const key in obj) {
      if (obj[key] === value) {
          switch (key) {
            case 'GENDER':
                return 'GENDER'
              
            case 'CAP_ALLOTMENT':
              return 'CAP_ALLOTMENT'
                
            case 'REGION':
                return 'REGION'

            case 'TITLE':
                return 'TITLE'

            case 'PLACE_OF_BIRTH':
                return 'PLACE_OF_BIRTH'

            case 'DEFENCE_TYPE':
                return 'DEFENCE_TYPE'
              
            case 'ACADEMIC_CLASS':
                return 'ACADEMIC_CLASS'

            case 'ENTRANCE_TYPE':
                return 'ENTRANCE_TYPE'

            case 'LANGUAGES_KNOWN':
                return 'LANGUAGES_KNOWN'
              
            case 'MARITAL_STATUS':
                return 'MARITAL_STATUS'

            case 'NUMBER_OF_SIBLING':
                return 'NUMBER_OF_SIBLING'

            case 'CHILD_NUMBER':
                return 'CHILD_NUMBER'

              
            case 'LIVING_STATUS':
                return 'LIVING_STATUS'

            case 'EMPLOYED_IN':
                return 'EMPLOYED_IN'
              
            case 'MONTH':
                return 'MONTH'

            case 'PERSON_TYPE':
                return 'PERSON_TYPE'

            case 'ACCOUNT_TYPE':
                return 'ACCOUNT_TYPE'

            case 'VEHICLE_TYPE':
                return 'VEHICLE_TYPE'

            case 'GaurdainRELATION':
                return 'GaurdainRELATION'

            case 'MEDIUM':
                return 'MEDIUM'
            case 'ADMISSIONSTATUS':
                return 'ADMISSIONSTATUS'
            default:
              
          }
      }
  }
  return "NONE"; 
};

function* getAllCommonMasterSaga(actions:PayloadAction<number>): Generator {
    const id = actions.payload
    const master = findKeyByValue(commonMastersIds,id)
    try {
      yield put(loaderActions.setStatus("loading"));
      const response: any = yield call(CommonMasterService,id);
      yield put(commonActions.setLoadCommonMaster({CommonMasterdetail:response.result,master}));
      yield put(loaderActions.setStatus("idle"));
    } catch (error: any) {
      yield globalErrorHandler(error, loaderActions, "error");
    }
  }

  function* getAllCommonMasterByCollegeIdSaga(actions:PayloadAction<number>): Generator {
    const collegeID:any=yield select(getCollegeId)
    const id = actions.payload
    try {
      yield put(loaderActions.setStatus("loading"));
      const response: any = yield call(CommonMasterApplicationForService,id,collegeID);
      yield put(commonActions.setLoadByCollegeId(response.result));
      yield put(loaderActions.setStatus("idle"));
    } catch (error: any) {
      yield globalErrorHandler(error, loaderActions, "error");
    }
  }

  export default function* commonMasterSaga() {
    yield takeEvery(commonActions.load, getAllCommonMasterSaga);
    yield takeEvery(commonActions.loadByCollegeId, getAllCommonMasterByCollegeIdSaga);
  }