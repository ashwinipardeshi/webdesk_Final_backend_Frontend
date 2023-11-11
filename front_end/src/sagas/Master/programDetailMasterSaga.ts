import { call, put, select, takeEvery } from "redux-saga/effects";
import {
    getAllProgramDetail,
    getByIdProgramDetail,
    addProgramDetail,
    updateProgramDetail,
    deleteProgramDetail,
} from "../../services/Master/programDetailMasterService";
import { actions } from "../../store/Master/programDetailMaster";
import { actions as loaderActions } from "../../store/loader";
import { actions as snackbarActions } from "../../store/snackbarToster";
import { globalErrorHandler } from "..";

function* getAllProgramDetailMasterSaga(): Generator {
    try {
        yield put(loaderActions.setStatus("loading"));
        const response: any = yield call(getAllProgramDetail);
        yield put(actions.setLoadGetAllProgramDetailMaster(response.result));
        yield put(loaderActions.setStatus("idle"));
    } catch (error: any) {
        yield globalErrorHandler(error, loaderActions, "error");
    }
}

function* getbyIdProgramDetailMasterSaga(action: any): Generator {
    try {
        yield put(loaderActions.setStatus("loading"));
        const response: any = yield call(getByIdProgramDetail, action.payload);
        yield put(actions.setGetByIdProgramDetailMaster(response.result));
        yield put(loaderActions.setStatus("idle"));
    } catch (error: any) {
        yield globalErrorHandler(error, loaderActions, "error");
    }
}
function* saveProgramDetailMasterSaga(action: any): Generator {
    try {
        let { type, request } = action.payload;
        yield put(loaderActions.setStatus("loading"));
        request = {
            ...request,
        };
        const response: any = yield call(
            type === "ADD" ? addProgramDetail : updateProgramDetail,
            request
        );
        if (response.statusCode === 201 || response.statusCode === 202) {
            yield put(actions.setSaveUpdateProgramDetailMaster(response));
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
        // eventually better error handling
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

function* deleteProgramDetailMasterSaga(action: any): Generator {
    const { id } = action.payload;
    try {
        yield put(loaderActions.setStatus("loading"));
        const response: any = yield call(deleteProgramDetail, id);
        yield put(actions.setDeleteProgramDetailMaster(response));
        const responseList: any = yield call(getAllProgramDetail);
        yield put(actions.setLoadGetAllProgramDetailMaster(responseList.result));
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

// single entry point to start all Sagas at once
export default function* programDetailMasterSaga() {
    yield takeEvery(actions.load, getAllProgramDetailMasterSaga);
    yield takeEvery(
        actions.loadGetByIdProgramDetailMaster,
        getbyIdProgramDetailMasterSaga
    );
    yield takeEvery(
        actions.loadSaveUpdateProgramDetailMaster,
        saveProgramDetailMasterSaga
    );
    yield takeEvery(
        actions.loadDeleteProgramDetailMaster,
        deleteProgramDetailMasterSaga
    );
}
