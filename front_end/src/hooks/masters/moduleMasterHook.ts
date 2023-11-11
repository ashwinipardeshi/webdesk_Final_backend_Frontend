import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getAllModuleMaster,
  getOptionModuleMaster,
} from "../../store/Master/moduleMaster";
import { IModuleMaster } from "../../interfaces/Master/IModuleMaster";

export function ModuleHook(loadingModule: boolean) {
  const [data, setData] = useState<IModuleMaster[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getModuleListData = useSelector(getAllModuleMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.load());
      } catch (error: any) {
        console.error("Error while fetching data:", error);
        setData([]);
      }
    };
    if (loadingModule) {
      fetchData();
    }
  }, [loadingModule, dispatch]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdModuleMaster(null));
    dispatch(actions.setSaveUpdateModuleMaster(null));
  };
  useEffect(() => {
    if (getModuleListData && getModuleListData.length > 0) {
      setData([...getModuleListData]);
    }
  }, [getModuleListData]);

  return { data, loading, setData };
}

export function ModuleOptionHook(loadingModule: boolean) {
  const [optionModuleData, setOptionModuleData] = useState<IModuleMaster[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getOptionModuleListData = useSelector(getOptionModuleMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.loadOptions());
      } catch (error: any) {
        setOptionModuleData([]);
      }
    };
    if (loadingModule) {
      fetchData();
    }
  }, [loadingModule, dispatch]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdModuleMaster(null));
    dispatch(actions.setSaveUpdateModuleMaster(null));
  };
  useEffect(() => {
    setOptionModuleData([...getOptionModuleListData]);
  }, [getOptionModuleListData]);

  return { optionModuleData, loading, setOptionModuleData };
}
