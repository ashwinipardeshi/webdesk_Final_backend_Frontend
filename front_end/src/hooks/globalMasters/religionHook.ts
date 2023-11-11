import { useEffect, useState } from "react";
import { IReligionMaster } from "../../interfaces/GlobalMaster/IReligionMaster";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getAllReligionMaster,
  getOptionReligionMaster,
} from "../../store/GlobalMaster/religionMaster";

export const ReligionHook = (loadingReligion: boolean) => {
  const [data, setData] = useState<IReligionMaster[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getReligionListData = useSelector(getAllReligionMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.load());
      } catch (error: any) {
        setData([]);
      }
    };
    if (loadingReligion) {
      fetchData();
    }
  }, [loadingReligion]);
  const clearPreviousData = () => {
    dispatch(actions.setGetByIdReligionMaster(null));
    dispatch(actions.setSaveUpdateReligionMaster(null));
  };
  useEffect(() => {
    if (getReligionListData && getReligionListData.length > 0) {
      setData([...getReligionListData]);
    }
  }, [getReligionListData]);

  return { data, loading, setData };
};

export const ReligionOptionHook = (loadingOptionReligion: boolean) => {
  const [religionoptiondata, setReligionOptionData] = useState<
    IReligionMaster[]
  >([]);
  const [religionoptionloading, setReligionOptionLoading] = useState(false);
  const dispatch = useDispatch();
  const getReligionOptionListData = useSelector(getOptionReligionMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.loadOptionReligion());
      } catch (error: any) {
        setReligionOptionData([]);
      }
    };
    if (loadingOptionReligion) {
      fetchData();
    }
  }, [loadingOptionReligion]);
  const clearPreviousData = () => {
    dispatch(actions.setGetByIdReligionMaster(null));
    dispatch(actions.setSaveUpdateReligionMaster(null));
  };
  useEffect(() => {
    setReligionOptionData([...getReligionOptionListData]);
  }, [getReligionOptionListData]);

  return { religionoptiondata, religionoptionloading, setReligionOptionData };
};
