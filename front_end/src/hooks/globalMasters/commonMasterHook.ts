import { useEffect, useState } from "react";
import { ICommonMasterdetail } from "../../interfaces/GlobalMaster/ICommonMasterdetail";
import { useDispatch, useSelector } from "react-redux";
import {
  AllCommonMasters,
  actions,
  getAllCommonMaster,
  getAllCommonMasterByCollegeId,
} from "../../store/GlobalMaster/commonMaster";
import { commonMastersIds } from "../../utils/commonMasterIds";
import { findKeyByValue } from "../../sagas/GlobalMaster/commonMasterSaga";

const getValueOBJ = (obj: any, key: any) => obj[key];

export const CommonOptionHook = (loadingOptionCommon: boolean, id: number) => {
  const master = findKeyByValue(commonMastersIds, id);
  const [optionCommonData, setOptionCommonData] = useState<AllCommonMasters>({
    ACADEMIC_CLASS: [],
    ACCOUNT_TYPE: [],
    ADMISSIONSTATUS: [],
    CAP_ALLOTMENT: [],
    CHILD_NUMBER: [],
    DEFENCE_TYPE: [],
    EMPLOYED_IN: [],
    ENTRANCE_TYPE: [],
    GaurdainRELATION: [],
    GENDER: [],
    LANGUAGES_KNOWN: [],
    LIVING_STATUS: [],
    MARITAL_STATUS: [],
    MEDIUM: [],
    MONTH: [],
    NUMBER_OF_SIBLING: [],
    PERSON_TYPE: [],
    PLACE_OF_BIRTH: [],
    REGION: [],
    TITLE: [],
    VEHICLE_TYPE: [],
  });
  const [optionloading, setOptionLoading] = useState(false);
  const dispatch = useDispatch();
  const getCommonOptionListData = useSelector(getAllCommonMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.load(id));
      } catch (error: any) {
        setOptionCommonData({
          ACADEMIC_CLASS: [],
          ACCOUNT_TYPE: [],
          ADMISSIONSTATUS: [],
          CAP_ALLOTMENT: [],
          CHILD_NUMBER: [],
          DEFENCE_TYPE: [],
          EMPLOYED_IN: [],
          ENTRANCE_TYPE: [],
          GaurdainRELATION: [],
          GENDER: [],
          LANGUAGES_KNOWN: [],
          LIVING_STATUS: [],
          MARITAL_STATUS: [],
          MEDIUM: [],
          MONTH: [],
          NUMBER_OF_SIBLING: [],
          PERSON_TYPE: [],
          PLACE_OF_BIRTH: [],
          REGION: [],
          TITLE: [],
          VEHICLE_TYPE: [],
        });
      }
    };
    if (loadingOptionCommon) {
      fetchData();
    }
  }, [loadingOptionCommon, id]);

  const clearPreviousData = () => {
    dispatch(
      actions.setLoadCommonMaster({ CommonMasterdetail: [], master: "NONE" })
    );
  };
  useEffect(() => {
    if (getCommonOptionListData) {
      setOptionCommonData(getCommonOptionListData);
    }
  }, [getCommonOptionListData]);
  let value: ICommonMasterdetail = getValueOBJ(optionCommonData, master);
  return { value, optionloading, setOptionCommonData };
};

export const CommonOptionApplicationForHook = (
  loadingOptionCommon: boolean,
  id: number
) => {
  const [optionApplicationForData, setOptionCommonData] = useState<
    ICommonMasterdetail[] | null
  >([]);
  const [optionloading, setOptionLoading] = useState(false);
  const dispatch = useDispatch();
  const getCommonOptionListData = useSelector(getAllCommonMasterByCollegeId);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.loadByCollegeId(id));
      } catch (error: any) {
        setOptionCommonData([]);
      }
    };
    if (loadingOptionCommon) {
      fetchData();
    }
  }, [loadingOptionCommon, id]);

  const clearPreviousData = () => {
    dispatch(actions.setLoadByCollegeId([]));
  };
  useEffect(() => {
    setOptionCommonData(
      getCommonOptionListData ? [...getCommonOptionListData] : null
    );
  }, [getCommonOptionListData]);

  return { optionApplicationForData, optionloading, setOptionCommonData };
};
