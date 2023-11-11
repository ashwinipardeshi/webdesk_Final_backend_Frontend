import { useEffect, useState } from "react";
import { IEmployeeTypeMaster } from "../../interfaces/GlobalMaster";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getAllEmployeeTypeMaster,
} from "../../store/GlobalMaster/employeeTypeMaster";
export const EmployeeTypeHook = (loadingEmployeeType: boolean) => {
  const [data, setData] = useState<IEmployeeTypeMaster[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getEmployeeTypeListData = useSelector(getAllEmployeeTypeMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.load());
      } catch (error: any) {
        setData([]);
      }
    };
    if (loadingEmployeeType) {
      fetchData();
    }
  }, [loadingEmployeeType]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdEmployeeTypeMaster(null));
    dispatch(actions.setSaveUpdateEmployeeTypeMaster(null));
  };
  useEffect(() => {
    if (getEmployeeTypeListData && getEmployeeTypeListData.length > 0) {
      setData([...getEmployeeTypeListData]);
    }
  }, [getEmployeeTypeListData]);

  return { data, loading, setData };
};

export const EmployeeTypeOptionHook = (loadingEmployeeTypeOption: boolean) => {
  const [employeetypeoptiondata, setEmployeeTypeOptionData] = useState<
    IEmployeeTypeMaster[]
  >([]);
  const [employeetypeoptionloading, setEmployeeTypeOptionLoading] =
    useState(false);
  const dispatch = useDispatch();
  const getEmployeeTypeListData = useSelector(getAllEmployeeTypeMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.loadOptionEmployee());
      } catch (error: any) {
        setEmployeeTypeOptionData([]);
      }
    };
    if (loadingEmployeeTypeOption) {
      fetchData();
    }
  }, [loadingEmployeeTypeOption]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdEmployeeTypeMaster(null));
    dispatch(actions.setSaveUpdateEmployeeTypeMaster(null));
  };
  useEffect(() => {
    setEmployeeTypeOptionData([...getEmployeeTypeListData]);
  }, [getEmployeeTypeListData]);

  return {
    employeetypeoptiondata,
    employeetypeoptionloading,
    setEmployeeTypeOptionData,
  };
};
