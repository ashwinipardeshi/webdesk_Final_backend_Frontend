import { call, put, takeEvery, select } from "redux-saga/effects";
import { saveUpdateBankInformation } from "../../../services/Admission/onlineAdmission/bankInformation";
import { saveUpdateParentInformation } from "../../../services/Admission/onlineAdmission/parentInformation";
import {
  saveOnlineAdmission,
  updateOnlineAdmission,
} from "../../../services/Admission/onlineAdmission/studentInformation";
import {
  actions,
  getAllOnlineStudentData,
} from "../../../store/Admission/onlineAdmission/onlineAdmission";
import { globalErrorHandler } from "../../index";
import { actions as loaderActions } from "../../../store/loader";
import { ADD, UPDATE } from "../../../constant/statusCodes";
import { actions as snackbarActions } from "../../../store/snackbarToster";
import { saveUpdateCommunicationInformation } from "../../../services/Admission/onlineAdmission/communationInformation";
import { saveUpdateAcademicInformation } from "../../../services/Admission/onlineAdmission/academicInformation";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  getOnlineUserId,
  getCollegeId,
} from "../../../store/Authentication/authentication";
import { getOnlineStudentInfo } from "../../../services/Admission/onlineAdmission/studentInformation";


function* saveUpdateBankInfoOnlineAdmissionSaga(
  action: PayloadAction<any>
): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    let response: any = yield call(saveUpdateBankInformation, action.payload);
    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(actions.setsaveUpdateBankInfoOnlineAdmission(response.result));
      yield put(
        actions.setStatusOnlineStudentData(
          response.resMsg === "Record Saved Successfully" ? true : false
        )
      );
      yield put(actions.loadSaveOnlineStudentData());
      yield put(loaderActions.setStatus("idle"));
    } else {
      yield put(actions.setStatusOnlineStudentData(false));
      yield globalErrorHandler(
        "Something went wrong!!!",
        loaderActions,
        "idle"
      );
      yield put(
        snackbarActions.setSnackbarStatus({
          message: response.resMsg,
          severity: "error",
          open: true,
        })
      );
    }
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
    yield put(actions.setStatusOnlineStudentData(false));
    yield put(
      snackbarActions.setSnackbarStatus({
        message: "Something went wrong!!!",
        severity: "error",
        open: true,
      })
    );
  }
}

function* saveUpdateParentInfoOnlineAdmissionSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(
      saveUpdateParentInformation,
      action.payload
    );
    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(
        actions.setStatusOnlineStudentData(
          response.resMsg === "Record Saved Successfully" ? true : false
        )
      );
      yield put(
        actions.setsaveUpdateParentInfoOnlineAdmission(response.result)
      );
      yield put(actions.loadSaveOnlineStudentData());
      yield put(loaderActions.setStatus("idle"));
    } else {
      yield globalErrorHandler(
        "Something went wrong!!!",
        loaderActions,
        "idle"
      );
      yield put(
        snackbarActions.setSnackbarStatus({
          message: response.resMsg,
          severity: "error",
          open: true,
        })
      );
    }
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
    yield put(
      snackbarActions.setSnackbarStatus({
        message: "Something went wrong!!!",
        severity: "error",
        open: true,
      })
    );
  }
}

function* saveUpdateCommunicationInfoOnlineAdmissionSaga(
  action: PayloadAction<any>
): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const userId: any = yield select(getOnlineUserId);
    const allOnlineStudentData: any = yield select(getAllOnlineStudentData);
    const formData = action.payload;
    const data = {
      ...formData,
      onlineStudentAdmissionId: allOnlineStudentData.id,
      onlineUserId: userId,
    };
    const response: any = yield call(
      saveUpdateCommunicationInformation,
      data
    );
    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(
        actions.setStatusOnlineStudentData(
          response.resMsg === "Record Saved Successfully" ? true : false
        )
      );
      yield put(
        actions.setsaveUpdateCommunicationInfoOnlineAdmission(response)
      );
      yield put(actions.loadSaveOnlineStudentData());
      yield put(loaderActions.setStatus("idle"));
    } else {
      yield globalErrorHandler(
        "Something went wrong!!!",
        loaderActions,
        "idle"
      );
      yield put(
        snackbarActions.setSnackbarStatus({
          message: response.resMsg,
          severity: "error",
          open: true,
        })
      );
    }
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
    yield put(
      snackbarActions.setSnackbarStatus({
        message: "Something went wrong!!!",
        severity: "error",
        open: true,
      })
    );
  }
}
function* saveUpdateAcademicInfoOnlineAdmissionSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(
      saveUpdateAcademicInformation,
      action.payload
    );
    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(actions.setsaveUpdateAcademicInfoOnlineAdmission(response));
      yield put(actions.loadSaveOnlineStudentData());
      yield put(loaderActions.setStatus("idle"));
    } else {
      yield globalErrorHandler(
        "Something went wrong!!!",
        loaderActions,
        "idle"
      );
      yield put(
        snackbarActions.setSnackbarStatus({
          message: response.resMsg,
          severity: "error",
          open: true,
        })
      );
    }
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
    yield put(
      snackbarActions.setSnackbarStatus({
        message: "Something went wrong!!!",
        severity: "error",
        open: true,
      })
    );
  }
}

function* SaveUpdateStudentInfoOnlineAdmissionSaga(
  action: PayloadAction<any>
): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const userId: any = yield select(getOnlineUserId);
    const collegeId: any = yield select(getCollegeId);
    const allOnlineStudentData: any = yield select(getAllOnlineStudentData);
    const formData = action.payload;
    const data = {
      ...formData,
      // onlineUserId: 1,
      onlineUserId: userId,
      collegeId,
      region: formData.region.toString(),
      title: formData.title.toString(),
      gender: formData.gender.toString(),
      nationality: formData.nationality.toString(),
      minorityDetailsId: formData.isMinority ? formData.minorityDetailsId : 0,
      minorityId: formData.isMinority ? formData.minorityId : 0,
      defenceType: formData.isDefenceParent
        ? formData.defenceType.toString()
        : "0",
      disabilityType: formData.physicallyChallaged
        ? formData.disabilityType
        : "0",
    };
    let response: any;
    if (!allOnlineStudentData) {
      response = yield call(saveOnlineAdmission, data);
    } else {
      response = yield call(updateOnlineAdmission, {
        ...data,
        id: allOnlineStudentData.id,
        createdBy: 0,
        createdDate: allOnlineStudentData.createdDate,
        updatedBy: 0,
        updatedDate: allOnlineStudentData.updatedDate,
      });
    }
    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(
        actions.setStatusOnlineStudentData(
          response.resMsg === "Record Saved Successfully" ? true : false
        )
      );
      yield put(
        actions.setSaveUpdateStudentInfoOnlineAdissionAdmission(response)
      );
      yield put(actions.loadSaveOnlineStudentData());
      yield put(loaderActions.setStatus("idle"));
    } else {
      yield put(actions.setStatusOnlineStudentData(false));
      yield globalErrorHandler(
        "Something went wrong!!!",
        loaderActions,
        "idle"
      );
      yield put(
        snackbarActions.setSnackbarStatus({
          message: response.resMsg,
          severity: "error",
          open: true,
        })
      );
    }
  } catch (error: any) {
    yield put(actions.setStatusOnlineStudentData(false));
    yield globalErrorHandler(error, loaderActions, "error");
    yield put(
      snackbarActions.setSnackbarStatus({
        message: "Something went wrong!!!",
        severity: "error",
        open: true,
      })
    );
  }
}

function* getAllOnlineStudentInfo(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const id: any = yield select(getOnlineUserId);
    const responce: any = yield call(getOnlineStudentInfo, id);
    if (responce.isSuccess) {
      yield put(actions.setSaveOnlineStudentData(responce.result));
    } else {
      yield put(actions.setSaveOnlineStudentData(null));
    }
    yield put(loaderActions.setStatus("idle"));
  } catch (error) {
    yield globalErrorHandler(error, loaderActions, "error");
    yield put(
      snackbarActions.setSnackbarStatus({
        message: "Something went wrong!!!",
        severity: "error",
        open: true,
      })
    );
  }
}
function* getFakeSnackBar(action:any): Generator{
  yield put(
    snackbarActions.setSnackbarStatus({
      message: "Form submitted successfully",
      severity: "success",
      open: true,
    })
  );
}
export default function* onlineAdmissionSaga() {
  yield takeEvery(
    actions.loadSaveUpdateBankInfoOnlineAdmission,
    saveUpdateBankInfoOnlineAdmissionSaga
  );
  yield takeEvery(
    actions.loadSaveUpdateParentInfoOnlineAdmission,
    saveUpdateParentInfoOnlineAdmissionSaga
  );
  yield takeEvery(
    actions.loadSaveUpdateCommunicationInfoOnlineAdmission,
    saveUpdateCommunicationInfoOnlineAdmissionSaga
  );
  yield takeEvery(
    actions.loadSaveUpdateAcademicInfoOnlineAdmission,
    saveUpdateAcademicInfoOnlineAdmissionSaga
  );
  yield takeEvery(
    actions.loadSaveUpdateStudentInfoOnlineAdissionAdmission,
    SaveUpdateStudentInfoOnlineAdmissionSaga
  );
  yield takeEvery(actions.loadSaveOnlineStudentData, getAllOnlineStudentInfo);
  yield takeEvery(actions.loadFakeSnackBar, getFakeSnackBar);
}
