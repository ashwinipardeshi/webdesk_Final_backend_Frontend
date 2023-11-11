import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getAllApplicationStatusMaster,
  getOptionApplicationStatusMaster,
} from "../../store/Master/applicationStatusMaster";
import { IApplicationStatusMaster } from "../../interfaces/Master";

export function ApplicationStatusHook(loadingApplicationStatus: boolean) {
  const [data, setData] = useState<IApplicationStatusMaster[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getApplicationStatusListData = useSelector(
    getAllApplicationStatusMaster
  );
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
    if (loadingApplicationStatus) {
      fetchData();
    }
  }, [loadingApplicationStatus, dispatch]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdApplicationStatusMaster(null));
    dispatch(actions.setSaveUpdateApplicationStatusMaster(null));
  };
  useEffect(() => {
    if (
      getApplicationStatusListData &&
      getApplicationStatusListData.length > 0
    ) {
      setData([...getApplicationStatusListData]);
    }
  }, [getApplicationStatusListData]);

  return { data, loading, setData };
}

export function ApplicationStatusOptionHook(loadingApplicationStatus: boolean) {
  const [optionApplicationStatusData, setOptionApplicationStatusData] =
    useState<IApplicationStatusMaster[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getOptionApplicationStatusListData = useSelector(
    getOptionApplicationStatusMaster
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.load());
      } catch (error: any) {
        setOptionApplicationStatusData([]);
      }
    };
    if (loadingApplicationStatus) {
      fetchData();
    }
  }, [loadingApplicationStatus, dispatch]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdApplicationStatusMaster(null));
    dispatch(actions.setSaveUpdateApplicationStatusMaster(null));
  };
  useEffect(() => {
    setOptionApplicationStatusData([...getOptionApplicationStatusListData]);
  }, [getOptionApplicationStatusListData]);

  return {
    optionApplicationStatusData,
    loading,
    setOptionApplicationStatusData,
  };
}
