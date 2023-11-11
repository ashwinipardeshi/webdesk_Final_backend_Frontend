import { call, put, takeEvery, select } from "redux-saga/effects";
import {
  actions,
  getAllOfflineStudentData as allStudentData,
} from "../../../store/Admission/offlineAdmission/offlineAdmission";
import { globalErrorHandler } from "../../index";
import { actions as loaderActions } from "../../../store/loader";
import { ADD, FAIL, UPDATE } from "../../../constant/statusCodes";
import { actions as snackbarActions } from "../../../store/snackbarToster";
import { saveUpdateCommunicationInformation } from "../../../services/Admission/offlineAdmission/communicationInformation";
import { saveUpdateAcademicInformation } from "../../../services/Admission/offlineAdmission/academicInformation";
import { saveUpdateBankInformation } from "../../../services/Admission/offlineAdmission/bankInformation";
import { saveUpdateParentInformation } from "../../../services/Admission/offlineAdmission/parentInformation";
import { saveUpdateInsuranceInformation } from "../../../services/Admission/offlineAdmission/insuranceInformation";
import { saveUpdateProgramInformation } from "../../../services/Admission/offlineAdmission/programInformation";
import { saveUpdateStudentInformation } from "../../../services/Admission/offlineAdmission/studentInformation";
import { saveUpdateVehicleInformation } from "../../../services/Admission/offlineAdmission/vehicleInformation";
import { insertOfflineMainForm } from "../../../services/Admission/offlineAdmission/offlineMainForm";
import {
  getCollegeId,
  getOnlineUserId,
} from "../../../store/Authentication/authentication";
import { PayloadAction } from "@reduxjs/toolkit";
import { getAllOfflineStudentDataService } from "../../../services/Admission/offlineAdmission/getAllOfflineStudentDataService";
import { IOfflineUserData } from "../../../interfaces/Admission/offlineAdmission/IOfflineUserData";

function* insertOfflineMainFormSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const collegeID: any = yield select(getCollegeId);
    const offlineUserID: any = yield select(getOnlineUserId);
    const response: any = yield call(insertOfflineMainForm, action.payload);

    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(actions.setInsertOfflineMainForm(response));
      yield put(actions.loadAllOfflineStudentData());
      yield put(
        snackbarActions.setSnackbarStatus({
          message: response.resMsg,
          severity: "success",
          open: true,
        })
      );
    } else {
      if (response.statusCode === FAIL) {
        yield put(
          snackbarActions.setSnackbarStatus({
            message: "Something went wrong!!!",
            severity: "error",
            open: true,
          })
        );
      } else {
        yield put(
          snackbarActions.setSnackbarStatus({
            message: response.resMsg,
            severity: "error",
            open: true,
          })
        );
      }
      yield globalErrorHandler(
        "Something went wrong!!!",
        loaderActions,
        "idle"
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

function* saveUpdateBankInfoOfflineAdmissionSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(saveUpdateBankInformation, action.payload);
    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(actions.setsaveUpdateBankInfoOfflineAdmission(response));
      yield put(actions.loadAllOfflineStudentData());
      yield put(
        snackbarActions.setSnackbarStatus({
          message: response.resMsg,
          severity: "success",
          open: true,
        })
      );
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
function* saveUpdateParentInfoOfflineAdmissionSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(
      saveUpdateParentInformation,
      action.payload
    );
    if (response.isSuccess) {
      yield put(
        actions.setsaveUpdateParentInfoOfflineAdmission(response.result)
      );
      yield put(actions.loadAllOfflineStudentData());
      yield put(loaderActions.setStatus("idle"));
      yield put(
        snackbarActions.setSnackbarStatus({
          message: response.resMsg,
          severity: "success",
          open: true,
        })
      );
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
function* saveUpdateCommunicationInfoOfflineAdmissionSaga(
  action: any
): Generator {
  try {
    const offlineStudentData: any = yield select(allStudentData);
    yield put(loaderActions.setStatus("loading"));
    const formData = action.payload;
    const data = {
      ...formData,
      studentAdmissionId: offlineStudentData.id,
      userId: offlineStudentData.userId,
    };
    const response: any = yield call(saveUpdateCommunicationInformation, data);
    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(
        actions.setsaveUpdateCommunicationInfoOfflineAdmission(response)
      );
      yield put(actions.loadAllOfflineStudentData());
      yield put(
        snackbarActions.setSnackbarStatus({
          message: response.resMsg,
          severity: "success",
          open: true,
        })
      );
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
function* saveUpdateAcademicInfoOfflineAdmissionSaga(
  action: PayloadAction<any>
): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(
      saveUpdateAcademicInformation,
      action.payload
    );
    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(actions.setsaveUpdateAcademicInfoOfflineAdmission(response));
      yield put(actions.loadAllOfflineStudentData());
      yield put(
        snackbarActions.setSnackbarStatus({
          message: response.resMsg,
          severity: "success",
          open: true,
        })
      );
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
function* saveUpdateInsuranceInfoOfflineAdmissionSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(
      saveUpdateInsuranceInformation,
      action.payload
    );
    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(actions.setsaveUpdateInsuranceInfoOfflineAdmission(response));
      yield put(actions.loadAllOfflineStudentData());
      yield put(
        snackbarActions.setSnackbarStatus({
          message: response.resMsg,
          severity: "success",
          open: true,
        })
      );
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
function* saveUpdateProgramInfoOfflineAdmissionSaga(
  action: PayloadAction<any>
): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const collegeId: any = yield select(getCollegeId);
    const offlineStudentData: any = yield select(allStudentData);
    const programDetails = {
      ...action.payload.offlineAdmissionStudentProgramDetailsVM,
      studentAdmissionId: offlineStudentData.id,
      userId: offlineStudentData.userId,
      collegeId,
      studentCode: offlineStudentData.studentCode,
      casteId: offlineStudentData.casteId,
      domicileId: offlineStudentData.domicileId,
      region: offlineStudentData.region,
      subCasteId: offlineStudentData.subCasteId,
      createdBy: 0,
      createdDate: offlineStudentData.createdDate
        ? offlineStudentData.createdDate
        : new Date(),
      updatedBy: 0,
      updatedDate: offlineStudentData.createdDate
        ? offlineStudentData.createdDate
        : new Date(),
    };

    const admissionAYDetail = {
      ...action.payload.offlineStudAdmissionAYDetailVM,
      studentAdmissionId: offlineStudentData.id,
      userId: offlineStudentData.userId,
      admissionCategoryId:
        offlineStudentData.offlineStudAdmissionAYDetailInsertVM
          .admissionCategoryId,
      passoutStatus:
        offlineStudentData.offlineStudAdmissionAYDetailInsertVM.passoutStatus,
      examStatus:
        offlineStudentData.offlineStudAdmissionAYDetailInsertVM.examStatus,
      createdBy: 0,
      createdDate: offlineStudentData.createdDate
        ? offlineStudentData.createdDate
        : new Date(),
      updatedBy: 0,
      updatedDate: offlineStudentData.createdDate
        ? offlineStudentData.createdDate
        : new Date(),
    };

    const data = {
      offlineAdmissionStudentProgramDetailsVM: programDetails,
      offlineStudAdmissionAYDetailVM: admissionAYDetail,
    };

    const response: any = yield call(saveUpdateProgramInformation, data);
    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(
        actions.setsaveUpdateProgramInfoOfflineAdmission(response.result)
      );
      yield put(actions.loadAllOfflineStudentData());
      yield put(loaderActions.setStatus("idle"));
      yield put(
        snackbarActions.setSnackbarStatus({
          message: response.resMsg,
          severity: "success",
          open: true,
        })
      );
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

function* saveUpdateStudentInfoOfflineAdmissionSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const userId: any = yield select(getOnlineUserId);
    const collegeId: any = yield select(getCollegeId);
    const formData = action.payload;
    const data = {
      ...formData,
      userId: userId,
      collegeId: collegeId,
      gender: formData.gender.toString(),
      languageKnown: formData.languageKnown.toString(),
      maritalStatus: formData.maritalStatus.toString(),
      motherTounge: formData.motherTounge.toString(),
      nationality: formData.nationality.toString(),
      region: formData.region.toString(),
      title: formData.title.toString(),
    };
    const response: any = yield call(saveUpdateStudentInformation, data);
    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(actions.setsaveUpdateStudentInfoOfflineAdmission(response));
      yield put(actions.loadAllOfflineStudentData());
      yield put(
        snackbarActions.setSnackbarStatus({
          message: response.resMsg,
          severity: "success",
          open: true,
        })
      );
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
function* saveUpdateVehicleInfoOfflineAdmissionSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(
      saveUpdateVehicleInformation,
      action.payload
    );
    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(actions.setsaveUpdateVehicleInfoOfflineAdmission(response));
      yield put(actions.loadAllOfflineStudentData());
      yield put(
        snackbarActions.setSnackbarStatus({
          message: response.resMsg,
          severity: "success",
          open: true,
        })
      );
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
function* getAllOfflineStudentData(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const id: any = yield select(getOnlineUserId);
    const responce: any = yield call(getAllOfflineStudentDataService, id);
    if (responce.isSuccess) {
      yield put(actions.setSaveUpdateAllOfflineStudentData(responce.result));
    } else {
      yield put(actions.setSaveUpdateAllOfflineStudentData(null));
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
      message: "Record save successfuly",
      severity: "success",
      open: true,
    })
  );
}

export default function* onlineAdmissionSaga() {
  yield takeEvery(
    actions.loadSaveUpdateBankInfoOfflineAdmission,
    saveUpdateBankInfoOfflineAdmissionSaga
  );
  yield takeEvery(
    actions.loadSaveUpdateParentInfoOfflineAdmission,
    saveUpdateParentInfoOfflineAdmissionSaga
  );
  yield takeEvery(
    actions.loadSaveUpdateCommunicationInfoOfflineAdmission,
    saveUpdateCommunicationInfoOfflineAdmissionSaga
  );
  yield takeEvery(
    actions.loadSaveUpdateAcademicInfoOfflineAdmission,
    saveUpdateAcademicInfoOfflineAdmissionSaga
  );
  yield takeEvery(
    actions.loadSaveUpdateInsuranceInfoOfflineAdmission,
    saveUpdateInsuranceInfoOfflineAdmissionSaga
  );
  yield takeEvery(
    actions.loadSaveUpdateProgramInfoOfflineAdmission,
    saveUpdateProgramInfoOfflineAdmissionSaga
  );
  yield takeEvery(
    actions.loadSaveUpdateStudentInfoOfflineAdmission,
    saveUpdateStudentInfoOfflineAdmissionSaga
  );
  yield takeEvery(
    actions.loadSaveUpdateVehicleInfoOfflineAdmission,
    saveUpdateVehicleInfoOfflineAdmissionSaga
  );
  yield takeEvery(
    actions.loadSaveMainFormOfflineAdmission,
    insertOfflineMainFormSaga
  );
  yield takeEvery(actions.loadAllOfflineStudentData, getAllOfflineStudentData);
  yield takeEvery(actions.loadFakeSnackBar, getFakeSnackBar);
}
