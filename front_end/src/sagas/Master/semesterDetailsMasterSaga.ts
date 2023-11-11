import { call, put, select, takeEvery } from "redux-saga/effects";
import {
    getAllSemesterDetails,
    getByIdSemesterDetails,
    addSemesterDetails,
    updateSemesterDetails,
    deleteSemesterDetails,
} from "../../services/Master/semesterDetailsService";
import { actions } from "../../store/Master/semesterDetailsMaster";
import { actions as loaderActions } from "../../store/loader";
import { actions as snackbarActions } from "../../store/snackbarToster";
import { globalErrorHandler } from "..";
import { getAcademicYearMasterId } from "../../store/Authentication/authentication";
const programMasterId = 1;
const programYearId = 7;

function* getAllSemesterDetailsMasterSaga(): Generator {
    try {
        yield put(loaderActions.setStatus("loading"));
        const academicYearMasterId: any = yield select(getAcademicYearMasterId);
        const response: any = yield call(getAllSemesterDetails, programMasterId, programYearId, academicYearMasterId);
        yield put(actions.setLoadGetAllSemesterDetailsMaster(response.result));
        yield put(loaderActions.setStatus("idle"));
    } catch (error: any) {
        yield globalErrorHandler(error, loaderActions, "error");
    }
}

function* getbyIdSemesterDetailsMasterSaga(action: any): Generator {
    try {
        yield put(loaderActions.setStatus("loading"));
        const response: any = yield call(getByIdSemesterDetails, action.payload);
        yield put(actions.setGetByIdSemesterDetailsMaster(response.result));
        yield put(loaderActions.setStatus("idle"));
    } catch (error: any) {
        yield globalErrorHandler(error, loaderActions, "error");
    }
}
function* saveSemesterDetailsMasterSaga(action: any): Generator {
    try {
        let { type, request } = action.payload;
        yield put(loaderActions.setStatus("loading"));
        request = {
            ...request,
        };
        const response: any = yield call(
            type === "ADD" ? addSemesterDetails : updateSemesterDetails,
            request
        );
        if (response.statusCode === 201 || response.statusCode === 202) {
            yield put(actions.setSaveUpdateSemesterDetailsMaster(response));
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

function* deleteSemesterDetailsMasterSaga(action: any): Generator {
    const { id } = action.payload;
    try {
        yield put(loaderActions.setStatus("loading"));
        const academicYearMasterId: any = yield select(getAcademicYearMasterId);
        const response: any = yield call(deleteSemesterDetails, id);
        yield put(actions.setDeleteSemesterDetailsMaster(response));
        const responseList: any = yield call(getAllSemesterDetails, programMasterId, programYearId, academicYearMasterId);
        yield put(actions.setLoadGetAllSemesterDetailsMaster(responseList.result));
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
export default function* semesterDetailsMasterSaga() {
    yield takeEvery(actions.load, getAllSemesterDetailsMasterSaga);
    yield takeEvery(
        actions.loadGetByIdSemesterDetailsMaster,
        getbyIdSemesterDetailsMasterSaga
    );
    yield takeEvery(
        actions.loadSaveUpdateSemesterDetailsMaster,
        saveSemesterDetailsMasterSaga
    );
    yield takeEvery(
        actions.loadDeleteSemesterDetailsMaster,
        deleteSemesterDetailsMasterSaga
    );
}
