import { useEffect, useState } from "react";
import { IDesignationMaster } from "../../interfaces/Master/IDesignationMaster";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getAllDesignationMaster,
  getOptionDesignationMaster,
} from "../../store/Master/designationMaster";

export function DesignationHook(loadingDesignation: boolean) {
  const [data, setData] = useState<IDesignationMaster[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getDesignationListData = useSelector(getAllDesignationMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.load());
      } catch (error: any) {
        setData([]);
      }
    };
    if (loadingDesignation) {
      fetchData();
    }
  }, [loadingDesignation, dispatch]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdDesignationMaster(null));
    dispatch(actions.setSaveUpdateDesignationMaster(null));
  };
  useEffect(() => {
    if (getDesignationListData && getDesignationListData.length > 0) {
      setData([...getDesignationListData]);
    }
  }, [getDesignationListData]);

  return { data, loading, setData };
}

export function DesignationOptionHook(loadingDesignation: boolean) {
  const [optionDesignationData, setOptionDesignationData] = useState<
    IDesignationMaster[]
  >([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getOptionDesignationListData = useSelector(getOptionDesignationMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.loadOptions());
      } catch (error: any) {
        setOptionDesignationData([]);
      }
    };
    if (loadingDesignation) {
      fetchData();
    }
  }, [loadingDesignation, dispatch]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdDesignationMaster(null));
    dispatch(actions.setSaveUpdateDesignationMaster(null));
  };
  useEffect(() => {
    setOptionDesignationData([...getOptionDesignationListData]);
  }, [getOptionDesignationListData]);

  return { optionDesignationData, loading, setOptionDesignationData };
}
