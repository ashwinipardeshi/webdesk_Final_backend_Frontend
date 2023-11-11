import { useEffect, useState } from "react";
import { ICandidatureTypeMaster } from "../../interfaces/GlobalMaster/ICandidatureTypeMaster";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getAllCandidatureTypeMaster,
  getOptionCandidatureTypeMaster,
} from "../../store/GlobalMaster/candidatureTypeMaster";
export const CandidatureTypeHook = (loadingCandidatureType: boolean) => {
  const [data, setData] = useState<ICandidatureTypeMaster[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getCandidatureTypeListData = useSelector(getAllCandidatureTypeMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.load());
      } catch (error: any) {
        setData([]);
      }
    };
    if (loadingCandidatureType) {
      fetchData();
    }
  }, [loadingCandidatureType]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdCandidatureTypeMaster(null));
    dispatch(actions.setSaveUpdateCandidatureTypeMaster(null));
  };
  useEffect(() => {
    if (getCandidatureTypeListData && getCandidatureTypeListData.length > 0) {
      setData([...getCandidatureTypeListData]);
    }
  }, [getCandidatureTypeListData]);

  return { data, loading, setData };
};

export const CandidatureTypeOptionHook = (loadingCandidatureType: boolean) => {
  const [candidaturetypeoptiondata, setCandidatureTypeOptionData] = useState<
    ICandidatureTypeMaster[]
  >([]);
  const [candidaturetypeoptionloading, setCandidatureTypeOptionLoading] =
    useState(false);
  const dispatch = useDispatch();
  const getCandidatureTypeOptionListData = useSelector(
    getOptionCandidatureTypeMaster
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.loadCandidatureType());
      } catch (error: any) {
        setCandidatureTypeOptionData([]);
      }
    };
    if (loadingCandidatureType) {
      fetchData();
    }
  }, [loadingCandidatureType]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdCandidatureTypeMaster(null));
    dispatch(actions.setSaveUpdateCandidatureTypeMaster(null));
  };
  useEffect(() => {
    setCandidatureTypeOptionData([...getCandidatureTypeOptionListData]);
  }, [getCandidatureTypeOptionListData]);

  return {
    candidaturetypeoptiondata,
    candidaturetypeoptionloading,
    setCandidatureTypeOptionData,
  };
};
