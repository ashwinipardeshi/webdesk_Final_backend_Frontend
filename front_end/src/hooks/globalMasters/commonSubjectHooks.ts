import { useEffect, useState } from "react";
import { ICommonSubjectMaster } from "../../interfaces/GlobalMaster/ICommonSubjectMaster";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getAllCommonSubjectMaster,
  getOptionCommonSubjectMaster,
} from "../../store/GlobalMaster/commonSubjectMaster";

export const CommonSubjectHook = (loadingCommonSubject: boolean) => {
  const [data, setData] = useState<ICommonSubjectMaster[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getCommonSubjectListData = useSelector(getAllCommonSubjectMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.load());
      } catch (error: any) {
        setData([]);
      }
    };
    if (loadingCommonSubject) {
      fetchData();
    }
  }, [loadingCommonSubject]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdCommonSubjectMaster(null));
    dispatch(actions.setSaveUpdateCommonSubjectMaster(null));
  };
  useEffect(() => {
    if (getCommonSubjectListData && getCommonSubjectListData.length > 0) {
      setData([...getCommonSubjectListData]);
    }
  }, [getCommonSubjectListData]);

  return { data, loading, setData };
};

export const CommonSubjectOptionHook = (loadingCommonSubject: boolean) => {
  const [optioncommonSubjectdata, setoptioncommonSubjectData] = useState<
    ICommonSubjectMaster[]
  >([]);
  const [optioncommonSubjectloading, setOptionCommonSubjectLoading] =
    useState(false);
  const dispatch = useDispatch();
  const getCommonSubjectOptionListData = useSelector(
    getOptionCommonSubjectMaster
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.loadOptionCommon());
      } catch (error: any) {
        setoptioncommonSubjectData([]);
      }
    };
    if (loadingCommonSubject) {
      fetchData();
    }
  }, [loadingCommonSubject]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdCommonSubjectMaster(null));
    dispatch(actions.setSaveUpdateCommonSubjectMaster(null));
  };
  useEffect(() => {
    setoptioncommonSubjectData([...getCommonSubjectOptionListData]);
  }, [getCommonSubjectOptionListData]);

  return {
    optioncommonSubjectdata,
    optioncommonSubjectloading,
    setoptioncommonSubjectData,
  };
};
