import { useEffect, useState } from "react";
import { IAcademicStatusMaster } from "../../interfaces/Master/IAcademicStatusMaster";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getAllAcademicStatusMaster,
  getOptionAcademicStatusMaster,
} from "../../store/Master/academicStatusMaster";

export function AcademicStatusHook(loadingAcademicStatus: boolean) {
  const [data, setData] = useState<IAcademicStatusMaster[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getAcademicStatusListData = useSelector(getAllAcademicStatusMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.load());
      } catch (error: any) {
        setData([]);
      }
    };
    if (loadingAcademicStatus) {
      fetchData();
    }
  }, [loadingAcademicStatus, dispatch]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdAcademicStatusMaster(null));
    dispatch(actions.setSaveUpdateAcademicStatusMaster(null));
  };
  useEffect(() => {
    if (getAcademicStatusListData && getAcademicStatusListData.length > 0) {
      setData([...getAcademicStatusListData]);
    }
  }, [getAcademicStatusListData]);

  return { data, loading, setData };
}

export function AcademicStatusOptionHook(loadingAcademicStatus: boolean) {
  const [optionAcademicStatusData, setOptionAcademicStatusData] = useState<
    IAcademicStatusMaster[]
  >([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getOptionAcademicStatusListData = useSelector(
    getOptionAcademicStatusMaster
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.loadOptionsAcademicStatus());
      } catch (error: any) {
        setOptionAcademicStatusData([]);
      }
    };
    if (loadingAcademicStatus) {
      fetchData();
    }
  }, [loadingAcademicStatus, dispatch]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdAcademicStatusMaster(null));
    dispatch(actions.setSaveUpdateAcademicStatusMaster(null));
  };
  useEffect(() => {
    setOptionAcademicStatusData([...getOptionAcademicStatusListData]);
  }, [getOptionAcademicStatusListData]);

  return { optionAcademicStatusData, loading, setOptionAcademicStatusData };
}
