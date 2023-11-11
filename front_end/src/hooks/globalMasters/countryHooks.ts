import { useEffect, useState } from "react";
import { ICountryMaster } from "../../interfaces/GlobalMaster";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getAllCountryMaster,
  getOptionCountryMaster,
} from "../../store/GlobalMaster/countryMaster";
export const CountryHook = (loadingCountry: boolean) => {
  const [data, setData] = useState<ICountryMaster[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getCountryListData = useSelector(getAllCountryMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.load());
      } catch (error: any) {
        setData([]);
      }
    };
    if (loadingCountry) {
      fetchData();
    }
  }, [loadingCountry]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdCountryMaster(null));
    dispatch(actions.setSaveUpdateCountryMaster(null));
  };
  useEffect(() => {
    if (getCountryListData && getCountryListData.length > 0) {
      setData([...getCountryListData]);
    }
  }, [getCountryListData]);

  return { data, loading, setData };
};

export const CountryOptionHook = (loadingCountry: boolean) => {
  const [optiondata, setOptionData] = useState<ICountryMaster[]>([]);
  const [optionloading, setOptionLoading] = useState(false);
  const dispatch = useDispatch();
  const getCountryOptionListData = useSelector(getOptionCountryMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.loadOptionCountry());
      } catch (error: any) {
        setOptionData([]);
      }
    };
    if (loadingCountry) {
      fetchData();
    }
  }, [loadingCountry]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdCountryMaster(null));
    dispatch(actions.setSaveUpdateCountryMaster(null));
    dispatch(actions.setSaveUpdateCountryMaster(null));
  };
  useEffect(() => {
    setOptionData([...getCountryOptionListData]);
  }, [getCountryOptionListData]);

  return { optiondata, optionloading, setOptionData };
};
