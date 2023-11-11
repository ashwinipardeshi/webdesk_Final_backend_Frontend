import { useEffect, useState } from "react";
import { IDepartmentMaster } from "../../interfaces/Master/IDepartmentMaster";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getAllDepartmentMaster,
  getOptionDepartmentMaster,
} from "../../store/Master/departmentMaster";

export function DepartmentHook(loadingDepartment: boolean) {
  const [data, setData] = useState<IDepartmentMaster[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getDepartmentListData = useSelector(getAllDepartmentMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.load());
      } catch (error: any) {
        setData([]);
      }
    };
    if (loadingDepartment) {
      fetchData();
    }
  }, [loadingDepartment, dispatch]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdDepartmentMaster(null));
    dispatch(actions.setSaveUpdateDepartmentMaster(null));
  };
  useEffect(() => {
    if (getDepartmentListData && getDepartmentListData.length > 0) {
      setData([...getDepartmentListData]);
    }
  }, [getDepartmentListData]);

  return { data, loading, setData };
}

export function DepartmentOptionHook(loadingDepartment: boolean) {
  const [optionDepartmentData, setOptionDepartmentData] = useState<
    IDepartmentMaster[]
  >([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getOptionDepartmentListData = useSelector(getOptionDepartmentMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.loadOptions());
      } catch (error: any) {
        setOptionDepartmentData([]);
      }
    };
    if (loadingDepartment) {
      fetchData();
    }
  }, [loadingDepartment, dispatch]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdDepartmentMaster(null));
    dispatch(actions.setSaveUpdateDepartmentMaster(null));
  };
  useEffect(() => {
    setOptionDepartmentData([...getOptionDepartmentListData]);
  }, [getOptionDepartmentListData]);

  return { optionDepartmentData, loading, setOptionDepartmentData };
}
