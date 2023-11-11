import { useEffect, useState } from "react";
import { IMinorityDetailsMaster } from "../../interfaces/GlobalMaster/IMinorityDetailsMaster";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getAllMinorityDetailsMaster,
  getOptionMinorityDetailsMaster,
} from "../../store/GlobalMaster/minorityDetailsMaster";

export const MinorityDetailsHook = (loadingMinorityDetails: boolean) => {
  const [data, setData] = useState<IMinorityDetailsMaster[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getMinorityDetailsListData = useSelector(getAllMinorityDetailsMaster);

  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.load());
      } catch (error: any) {
        setData([]);
      }
    };
    if (loadingMinorityDetails) {
      fetchData();
    }
  }, [loadingMinorityDetails]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdMinorityDetailsMaster(null));
    dispatch(actions.setSaveUpdateMinorityDetailsMaster(null));
  };
  useEffect(() => {
    if (getMinorityDetailsListData && getMinorityDetailsListData.length > 0) {
      setData([...getMinorityDetailsListData]);
    }
  }, [getMinorityDetailsListData]);

  return { data, loading, setData };
};

export const MinorityDetailsOptionHook = (loadingMinorityDetails: boolean) => {
  const [optionminorityDetailsdata, setoptionminorityDetailsData] = useState<
    IMinorityDetailsMaster[]
  >([]);
  const [optionminorityDetailsloading, setOptionMinorityDetailsoading] =
    useState(false);
  const dispatch = useDispatch();
  const getMinorityDetailsOptionListData = useSelector(
    getOptionMinorityDetailsMaster
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.loadOptionMinority());
      } catch (error: any) {
        setoptionminorityDetailsData([]);
      }
    };
    if (loadingMinorityDetails) {
      fetchData();
    }
  }, [loadingMinorityDetails]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdMinorityDetailsMaster(null));
    dispatch(actions.setSaveUpdateMinorityDetailsMaster(null));
  };
  useEffect(() => {
    setoptionminorityDetailsData([...getMinorityDetailsOptionListData]);
  }, [getMinorityDetailsOptionListData]);

  return {
    optionminorityDetailsdata,
    optionminorityDetailsloading,
    setoptionminorityDetailsData,
  };
};
