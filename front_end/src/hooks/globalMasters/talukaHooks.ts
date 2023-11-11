import { useEffect, useState } from "react";
import { ITalukaMaster } from "../../interfaces/GlobalMaster";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getAllTalukaMaster,
  getOptionTalukaMaster,
} from "../../store/GlobalMaster/talukaMaster";

export function TalukaHook(loadingTaluka: boolean) {
  const [data, setData] = useState<ITalukaMaster[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getTalukaListData = useSelector(getAllTalukaMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.load());
      } catch (error: any) {
        setData([]);
      }
    };
    if (loadingTaluka) {
      fetchData();
    }
  }, [loadingTaluka, dispatch]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdTalukaMaster(null));
    dispatch(actions.setSaveUpdateTalukaMaster(null));
  };
  useEffect(() => {
    if (getTalukaListData && getTalukaListData.length > 0) {
      setData([...getTalukaListData]);
    }
  }, [getTalukaListData]);

  return { data, loading, setData };
}

export function TalukaOptionHook(loadingTaluka: boolean) {
  const [optionTalukaData, setOptionTalukaData] = useState<ITalukaMaster[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getOptionTalukaListData = useSelector(getOptionTalukaMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.loadOptionTaluka());
      } catch (error: any) {
        setOptionTalukaData([]);
      }
    };
    if (loadingTaluka) {
      fetchData();
    }
  }, [loadingTaluka, dispatch]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdTalukaMaster(null));
    dispatch(actions.setSaveUpdateTalukaMaster(null));
  };
  useEffect(() => {
    setOptionTalukaData([...getOptionTalukaListData]);
  }, [getOptionTalukaListData]);

  return { optionTalukaData, loading, setOptionTalukaData };
}
