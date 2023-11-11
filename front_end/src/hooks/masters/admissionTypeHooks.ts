import { useEffect, useState } from "react";
import { IAdmissionTypeMaster } from "../../interfaces/Master/IAdmissionTypeMaster";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getAllAdmissionTypeMaster,
  getOptionAdmissionTypeMaster,
} from "../../store/Master/admissionTypeMaster";

export function AdmissionTypeHook(loadingAdmissionType: boolean) {
  const [data, setData] = useState<IAdmissionTypeMaster[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getAdmissionTypeListData = useSelector(getAllAdmissionTypeMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.load());
      } catch (error: any) {
        setData([]);
      }
    };
    if (loadingAdmissionType) {
      fetchData();
    }
  }, [loadingAdmissionType, dispatch]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdAdmissionTypeMaster(null));
    dispatch(actions.setSaveUpdateAdmissionTypeMaster(null));
  };
  useEffect(() => {
    if (getAdmissionTypeListData && getAdmissionTypeListData.length > 0) {
      setData([...getAdmissionTypeListData]);
    }
  }, [getAdmissionTypeListData]);

  return { data, loading, setData };
}

export function AdmissionTypeOptionHook(loadingAdmissionType: boolean) {
  const [optionAdmissionTypeData, setOptionAdmissionTypeData] = useState<
    IAdmissionTypeMaster[]
  >([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getOptionAdmissionTypeListData = useSelector(
    getOptionAdmissionTypeMaster
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.loadOptionsAdmissionType());
      } catch (error: any) {
        setOptionAdmissionTypeData([]);
      }
    };
    if (loadingAdmissionType) {
      fetchData();
    }
  }, [loadingAdmissionType, dispatch]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdAdmissionTypeMaster(null));
    dispatch(actions.setSaveUpdateAdmissionTypeMaster(null));
  };
  useEffect(() => {
    setOptionAdmissionTypeData([...getOptionAdmissionTypeListData]);
  }, [getOptionAdmissionTypeListData]);

  return { optionAdmissionTypeData, loading, setOptionAdmissionTypeData };
}
