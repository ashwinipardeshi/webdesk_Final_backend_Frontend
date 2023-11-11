import { useEffect, useState } from "react";
import { IModeOfAdmissionMaster } from "../../interfaces/Master";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getAllModeOfAdmissionMaster,
  getOptionModeOfAdmissionMaster,
} from "../../store/Master/modeOfAdmissionMaster";

export function ModeOfAdmissionHook(loadingModeOfAdmission: boolean) {
  const [data, setData] = useState<IModeOfAdmissionMaster[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getModeOfAdmissionListData = useSelector(getAllModeOfAdmissionMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.load());
      } catch (error: any) {
        setData([]);
      }
    };
    if (loadingModeOfAdmission) {
      fetchData();
    }
  }, [loadingModeOfAdmission, dispatch]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdModeOfAdmissionMaster(null));
    dispatch(actions.setSaveUpdateModeOfAdmissionMaster(null));
  };
  useEffect(() => {
    if (getModeOfAdmissionListData && getModeOfAdmissionListData.length > 0) {
      setData([...getModeOfAdmissionListData]);
    }
  }, [getModeOfAdmissionListData]);

  return { data, loading, setData };
}

export function ModeOfAdmissionOptionHook(loadingModeOfAdmission: boolean) {
  const [optionModeOfAdmissionData, setOptionModeOfAdmissionData] = useState<
    IModeOfAdmissionMaster[]
  >([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getOptionModeOfAdmissionListData = useSelector(
    getOptionModeOfAdmissionMaster
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.loadOptions());
      } catch (error: any) {
        setOptionModeOfAdmissionData([]);
      }
    };
    if (loadingModeOfAdmission) {
      fetchData();
    }
  }, [loadingModeOfAdmission, dispatch]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdModeOfAdmissionMaster(null));
    dispatch(actions.setSaveUpdateModeOfAdmissionMaster(null));
  };
  useEffect(() => {
    setOptionModeOfAdmissionData([...getOptionModeOfAdmissionListData]);
  }, [getOptionModeOfAdmissionListData]);

  return { optionModeOfAdmissionData, loading, setOptionModeOfAdmissionData };
}
