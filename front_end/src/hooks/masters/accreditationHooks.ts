import { useEffect, useState } from "react";
import { IAccreditationMaster } from "../../interfaces/Master/IAccreditationMaster";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getAllAccreditationMaster,
  getOptionAccreditationMaster,
} from "../../store/Master/accreditationMaster";

export function AccreditationHook(loadingAccreditation: boolean, streamId: number) {
  const [data, setData] = useState<IAccreditationMaster[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getAccreditationListData = useSelector(getAllAccreditationMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.load(streamId));
      } catch (error: any) {
        setData([]);
      }
    };
    if (loadingAccreditation) {
      fetchData();
    }
  }, [loadingAccreditation, dispatch, streamId]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdAccreditationMaster(null));
    dispatch(actions.setSaveUpdateAccreditationMaster(null));
  };
  useEffect(() => {
    if (getAccreditationListData && getAccreditationListData.length > 0) {
      setData([...getAccreditationListData]);
    }
  }, [getAccreditationListData]);

  return { data, loading, setData };
}

export function AccreditationOptionHook(loadingAccreditation: boolean, streamId: number) {
  const [optionAccreditationData, setOptionAccreditationData] = useState<
    IAccreditationMaster[]
  >([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getOptionAccreditationListData = useSelector(
    getOptionAccreditationMaster
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.loadOptionsAccrediationMaster(streamId));
      } catch (error: any) {
        setOptionAccreditationData([]);
      }
    };
    if (loadingAccreditation) {
      fetchData();
    }
  }, [loadingAccreditation, dispatch, streamId]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdAccreditationMaster(null));
    dispatch(actions.setSaveUpdateAccreditationMaster(null));
  };
  useEffect(() => {
    setOptionAccreditationData([...getOptionAccreditationListData]);
  }, [getOptionAccreditationListData]);

  return { optionAccreditationData, loading, setOptionAccreditationData };
}
