import { call, put, takeEvery } from "redux-saga/effects";
import {
    getAllOfflineAdmissionStudentDetails,
} from "../../../services/Admission/offlineAdmission/offlineAdmissionList";
import { actions } from "../../../store/Admission/offlineAdmission/offlineAdmissionList";
import { actions as loaderActions } from "../../../store/loader";
import { globalErrorHandler } from "../..";

function* getAllOfflineAdmissionStudentDetailsSaga(): Generator {
    try {
        yield put(loaderActions.setStatus("loading"));
        const response: any = yield call(getAllOfflineAdmissionStudentDetails);
        yield put(actions.setLoadGetAllOfflineAdmissionStudentDetails(response.value));
        yield put(loaderActions.setStatus("idle"));
    } catch (error: any) {
        yield globalErrorHandler(error, loaderActions, "error");
    }
}

export default function* offlineAdmissionStudentDetailsSaga() {
    yield takeEvery(actions.load, getAllOfflineAdmissionStudentDetailsSaga);
}
