import { useEffect, useState } from "react";
import { IDomicileMaster } from "../../interfaces/GlobalMaster/IDomicileMaster";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getAllDomicileMaster,
  getOptionDomicileMaster,
} from "../../store/GlobalMaster/domicileMaster";
export const DomicileHook = (loadingDomicile: boolean) => {
  const [data, setData] = useState<IDomicileMaster[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getDomicileListData = useSelector(getAllDomicileMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.load());
      } catch (error: any) {
        setData([]);
      }
    };
    if (loadingDomicile) {
      fetchData();
    }
  }, [loadingDomicile]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdDomicileMaster(null));
    dispatch(actions.setSaveUpdateDomicileMaster(null));
  };
  useEffect(() => {
    if (getDomicileListData && getDomicileListData.length > 0) {
      setData([...getDomicileListData]);
    }
  }, [getDomicileListData]);

  return { data, loading, setData };
};

export const DomicileOptionHook = (loadingOptionDomicile: boolean) => {
  const [optiondomiciledata, setOptionDomicileData] = useState<
    IDomicileMaster[]
  >([]);
  const [optiondomicileloading, setOptionDomicileLoading] = useState(false);
  const dispatch = useDispatch();
  const getDomicileListData = useSelector(getOptionDomicileMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.loadOptionDomicile());
      } catch (error: any) {
        setOptionDomicileData([]);
      }
    };
    if (loadingOptionDomicile) {
      fetchData();
    }
  }, [loadingOptionDomicile]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdDomicileMaster(null));
    dispatch(actions.setSaveUpdateDomicileMaster(null));
  };
  useEffect(() => {
    setOptionDomicileData([...getDomicileListData]);
  }, [getDomicileListData]);

  return { optiondomiciledata, optiondomicileloading, setOptionDomicileData };
};
