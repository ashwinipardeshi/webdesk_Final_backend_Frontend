import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getAllDivisionMaster,
  getOptionDivisionMaster,
} from "../../store/Master/divisionMaster";
import { IDivisionMaster } from "../../interfaces/Master/IDivisionMaster";

export function DivisionHook(loadingDivision: boolean) {
  const [data, setData] = useState<IDivisionMaster[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getDivisionListData = useSelector(getAllDivisionMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.load());
      } catch (error: any) {
        console.error("Error while fetching data:", error);
        setData([]);
      }
    };
    if (loadingDivision) {
      fetchData();
    }
  }, [loadingDivision, dispatch]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdDivisionMaster(null));
    dispatch(actions.setSaveUpdateDivisionMaster(null));
  };
  useEffect(() => {
    if (getDivisionListData && getDivisionListData.length > 0) {
      setData([...getDivisionListData]);
    }
  }, [getDivisionListData]);

  return { data, loading, setData };
}

export function DivisionOptionHook(loadingDivision: boolean) {
  const [optionDivisionData, setOptionDivisionData] = useState<
    IDivisionMaster[]
  >([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getOptionDivisionListData = useSelector(getOptionDivisionMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.loadOptions());
      } catch (error: any) {
        setOptionDivisionData([]);
      }
    };
    if (loadingDivision) {
      fetchData();
    }
  }, [loadingDivision, dispatch]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdDivisionMaster(null));
    dispatch(actions.setSaveUpdateDivisionMaster(null));
  };
  useEffect(() => {
    setOptionDivisionData([...getOptionDivisionListData]);
  }, [getOptionDivisionListData]);

  return { optionDivisionData, loading, setOptionDivisionData };
}
