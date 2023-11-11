import { useEffect, useState } from "react";
import { IMinorityMaster } from "../../interfaces/GlobalMaster/IMinorityMaster";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getAllMinorityMaster,
  getOptionMinorityMaster,
} from "../../store/GlobalMaster/minorityMaster";
export const MinorityHook = (loadingMinority: boolean) => {
  const [data, setData] = useState<IMinorityMaster[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getMinorityListData = useSelector(getAllMinorityMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.load());
      } catch (error: any) {
        setData([]);
      }
    };
    if (loadingMinority) {
      fetchData();
    }
  }, [loadingMinority]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdMinorityMaster(null));
    dispatch(actions.setSaveUpdateMinorityMaster(null));
  };
  useEffect(() => {
    if (getMinorityListData && getMinorityListData.length > 0) {
      setData([...getMinorityListData]);
    }
  }, [getMinorityListData]);

  return { data, loading, setData };
};

export const MinorityOptionHook = (loadingMinorityOption: boolean) => {
  const [minorityoptiondata, setMinorityOptionData] = useState<
    IMinorityMaster[]
  >([]);
  const [minorityoptionloading, setMinorityOptionLoading] = useState(false);
  const dispatch = useDispatch();
  const getMinorityListData = useSelector(getOptionMinorityMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.loadOptionMinorityMaster());
      } catch (error: any) {
        setMinorityOptionData([]);
      }
    };
    if (loadingMinorityOption) {
      fetchData();
    }
  }, [loadingMinorityOption]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdMinorityMaster(null));
    dispatch(actions.setSaveUpdateMinorityMaster(null));
  };
  useEffect(() => {
    setMinorityOptionData([...getMinorityListData]);
  }, [getMinorityListData]);

  return { minorityoptiondata, minorityoptionloading, setMinorityOptionData };
};
