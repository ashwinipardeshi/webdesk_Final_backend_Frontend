import { call, put, select, takeEvery } from "redux-saga/effects";
import { globalErrorHandler } from "..";
import { actions as loaderActions } from "../../store/loader";
import { ADD, UPDATE } from "../../constant/statusCodes";
import { actions } from "../../store/Master/applicationStatusMaster";
import { getCollegeId } from "../../store/Authentication/authentication";
import {
    getAllApplicationStatus,
    addApplicationStatus,
    deleteApplicationStatus,
    getByIdApplicationStatus,
    getOptionsApplicationStatus,
    updateApplicationStatus,
} from "../../services/Master/applicationStatusMasterService";
import { actions as snackbarActions } from "../../store/snackbarToster";

function* getAllApplicationStatusMasterSaga(): Generator {
    try {
        yield put(loaderActions.setStatus("loading"));
        const collegeID: any = yield select(getCollegeId);
        const response: any = yield call(getAllApplicationStatus, collegeID);
        yield put(actions.setLoadGetAllApplicationStatusMaster(response.result));
        yield put(loaderActions.setStatus("idle"));
    } catch (error: any) {
        yield globalErrorHandler(error, loaderActions, "error");
    }
}

function* getbyIdApplicationStatusMasterSaga(action: any): Generator {
    try {
        yield put(loaderActions.setStatus("loading"));
        const response: any = yield call(getByIdApplicationStatus, action.payload);
        yield put(actions.setGetByIdApplicationStatusMaster(response.result));
        yield put(loaderActions.setStatus("idle"));
    } catch (error: any) {
        yield globalErrorHandler(error, loaderActions, "error");
    }
}

function* saveApplicationStatusMasterSaga(action: any): Generator {
    try {
        let { type, request } = action.payload;
        yield put(loaderActions.setStatus("loading"));
        const collegeID: any = yield select(getCollegeId);
        request = {
            ...request,
            collegeId: collegeID,
        };
        const response: any = yield call(
            type === "ADD" ? addApplicationStatus : updateApplicationStatus,
            request
        );
        if (response.statusCode === ADD || response.statusCode === UPDATE) {
            yield put(actions.setSaveUpdateApplicationStatusMaster(response));
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
        yield put(loaderActions.setStatus("idle"));
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

function* deleteApplicationStatusMasterSaga(action: any): Generator {
    const { id } = action.payload;
    try {
        yield put(loaderActions.setStatus("loading"));
        const response: any = yield call(deleteApplicationStatus, id);
        yield put(actions.setDeleteApplicationStatusMaster(response));
        const collegeID: any = yield select(getCollegeId);
        const responseList: any = yield call(getAllApplicationStatus, collegeID);
        yield put(actions.setLoadGetAllApplicationStatusMaster(responseList.result));
        yield put(loaderActions.setStatus("idle"));
        yield put(
            snackbarActions.setSnackbarStatus({
                message: response.resMsg,
                severity: "success",
                open: true,
            })
        );
    } catch (error: any) {
        yield put(loaderActions.setStatus("idle"));
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

function* getOptionApplicationStatusMasterSaga(): Generator {
    try {
        yield put(loaderActions.setStatus("loading"));
        const collegeID: any = yield select(getCollegeId);
        const response: any = yield call(getOptionsApplicationStatus, collegeID);
        yield put(actions.setLoadGetOptionApplicationStatusMaster(response.result));
        yield put(loaderActions.setStatus("idle"));
    } catch (error: any) {
        yield put(loaderActions.setStatus("idle"));
        yield globalErrorHandler(error, loaderActions, "error");
    }
}

export default function* applicationStatusMasterSaga() {
    yield takeEvery(actions.load, getAllApplicationStatusMasterSaga);
    yield takeEvery(actions.loadGetByIdApplicationStatusMaster, getbyIdApplicationStatusMasterSaga);
    yield takeEvery(actions.loadSaveUpdateApplicationStatusMaster, saveApplicationStatusMasterSaga);
    yield takeEvery(actions.loadDeleteApplicationStatusMaster, deleteApplicationStatusMasterSaga);
    yield takeEvery(actions.load, getOptionApplicationStatusMasterSaga);
}
