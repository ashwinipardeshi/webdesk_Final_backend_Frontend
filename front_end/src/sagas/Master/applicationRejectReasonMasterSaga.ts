import { call, put, select, takeEvery } from "redux-saga/effects";
import {
    getAllRejectReason,
    getByIdRejectReason,
    getOptionsRejectReason,
    addRejectReason,
    updateRejectReason,
    deleteRejectReason,
} from "../../services/Master/applicationRejectReasonService";
import { actions } from "../../store/Master/applicationRejectReasonMaster";
import { globalErrorHandler } from "..";
import { actions as loaderActions } from "../../store/loader";
import { actions as snackbarActions } from "../../store/snackbarToster";
import { ADD, UPDATE } from "../../constant/statusCodes";
import { getCollegeId } from "../../store/Authentication/authentication";

function* getAllApplicationRejectReasonMasterSaga(): Generator {
    try {
        yield put(loaderActions.setStatus("loading"));
        const CollegeID: any = yield select(getCollegeId);
        const response: any = yield call(getAllRejectReason, CollegeID);
        yield put(actions.setLoadGetAllApplicationRejectReasonMaster(response.result));
        yield put(loaderActions.setStatus("idle"));
    } catch (error: any) {
        yield globalErrorHandler(error, loaderActions, "error");
    }
}

function* getbyIdApplicationRejectReasonMasterSaga(action: any): Generator {
    try {
        yield put(loaderActions.setStatus("loading"));
        const response: any = yield call(getByIdRejectReason, action.payload);
        yield put(actions.setGetByIdApplicationRejectReasonMaster(response.result));
        yield put(loaderActions.setStatus("idle"));
    } catch (error: any) {
        yield globalErrorHandler(error, loaderActions, "error");
    }
}
function* saveApplicationRejectReasonMasterSaga(action: any): Generator {
    try {
        let { type, request } = action.payload;
        yield put(loaderActions.setStatus("loading"));
        const CollegeID: any = yield select(getCollegeId);
        request = {
            ...request,
            collegeId: CollegeID,
        };
        const response: any = yield call(
            type === "ADD" ? addRejectReason : updateRejectReason,
            request
        );
        if (response.statusCode === ADD || response.statusCode === UPDATE) {
            yield put(actions.setSaveUpdateApplicationRejectReasonMaster(response));
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

function* deleteApplicationRejectReasonMasterSaga(action: any): Generator {
    const { id } = action.payload;
    try {
        yield put(loaderActions.setStatus("loading"));
        const response: any = yield call(deleteRejectReason, id);
        yield put(actions.setDeleteApplicationRejectReasonMaster(response));
        const CollegeID: any = yield select(getCollegeId);
        const responseList: any = yield call(getAllRejectReason, CollegeID);
        yield put(actions.setLoadGetAllApplicationRejectReasonMaster(responseList.result));
        yield put(loaderActions.setStatus("idle"));
        yield put(
            snackbarActions.setSnackbarStatus({
                message: response.resMsg,
                severity: "success",
                open: true,
            })
        );
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

function* getOptionApplicationRejectReasonMasterSaga(): Generator {
    try {
        yield put(loaderActions.setStatus("loading"));
        const CollegeID: any = yield select(getCollegeId);
        const response: any = yield call(getOptionsRejectReason, CollegeID);
        yield put(actions.setLoadGetOptionApplicationRejectReasonMaster(response.result));
        yield put(loaderActions.setStatus("idle"));
    } catch (error: any) {
        yield globalErrorHandler(error, loaderActions, "error");
    }
}

export default function* applicationRejectReasonMasterSaga() {
    yield takeEvery(actions.load, getAllApplicationRejectReasonMasterSaga);
    yield takeEvery(
        actions.loadGetByIdApplicationRejectReasonMaster,
        getbyIdApplicationRejectReasonMasterSaga
    );
    yield takeEvery(
        actions.loadSaveUpdateApplicationRejectReasonMaster,
        saveApplicationRejectReasonMasterSaga
    );
    yield takeEvery(
        actions.loadDeleteApplicationRejectReasonMaster,
        deleteApplicationRejectReasonMasterSaga
    );
    yield takeEvery(actions.loadOptionsApplicationRejectReason, getOptionApplicationRejectReasonMasterSaga);
}
