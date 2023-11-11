import { call, put, takeEvery } from "redux-saga/effects";
import { ADD, UPDATE } from "../../constant/statusCodes";
import {
  getAllBoard,
  getByIdBoard,
  addBoard,
  updateBoard,
  deleteBoard,
  getOptionsBoard,
} from "../../services/GlobalMaster/boardMasterService";
import { actions } from "../../store/GlobalMaster/boardMaster";
import { actions as snackbarActions } from "../../store/snackbarToster";
import { globalErrorHandler } from "..";
import { actions as loaderActions } from "../../store/loader";

function* getAllBoardMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getAllBoard);
    yield put(actions.setLoadGetAllBoardMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

function* getbyIdBoardMasterSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getByIdBoard, action.payload);
    yield put(actions.setGetByIdBoardMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}
function* saveBoardMasterSaga(action: any): Generator {
  try {
    const { type, request } = action.payload;
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(
      type === "ADD" ? addBoard : updateBoard,
      request
    );

    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(actions.setSaveUpdateBoardMaster(response));
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

function* deleteBoardMasterSaga(action: any): Generator {
  const { id } = action.payload;

  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(deleteBoard, id);
    yield put(actions.setDeleteBoardMaster(response));
    const responseList: any = yield call(getAllBoard);
    yield put(actions.setLoadGetAllBoardMaster(responseList.result));
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

function* getOptionsBoardMasterSaga(): Generator {
  try {
    yield put(actions.setStatus("loading"));
    const response: any = yield call(getOptionsBoard);
    yield put(actions.setLoadGetOptionBoardMaster(response.result));
    yield put(actions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

export default function* boardMasterSaga() {
  yield takeEvery(actions.load, getAllBoardMasterSaga);
  yield takeEvery(actions.loadGetByIdBoardMaster, getbyIdBoardMasterSaga);
  yield takeEvery(actions.loadSaveUpdateBoardMaster, saveBoardMasterSaga);
  yield takeEvery(actions.loadDeleteBoardMaster, deleteBoardMasterSaga);
  yield takeEvery(actions.loadOptionBoard, getOptionsBoardMasterSaga);
}
