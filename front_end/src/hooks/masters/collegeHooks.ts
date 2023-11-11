import { useEffect, useState } from "react";
import { ICollegeMaster } from "../../interfaces/Master";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getAllCollegeMaster,
  getOptionCollegeMaster,
} from "../../store/Master/collegeMaster";

export function CollegeHook(loadingCollege: boolean) {
  const [data, setData] = useState<ICollegeMaster[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getCollegeListData = useSelector(getAllCollegeMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.load());
      } catch (error: any) {
        setData([]);
      }
    };
    if (loadingCollege) {
      fetchData();
    }
  }, [loadingCollege, dispatch]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdCollegeMaster(null));
    dispatch(actions.setSaveUpdateCollegeMaster(null));
  };
  useEffect(() => {
    if (getCollegeListData && getCollegeListData.length > 0) {
      setData([...getCollegeListData]);
    }
  }, [getCollegeListData]);

  return { data, loading, setData };
}

export function CollegeOptionHook(loadingCollege: boolean) {
  const [optionCollegeData, setOptionCollegeData] = useState<ICollegeMaster[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getOptionCollegeListData = useSelector(getOptionCollegeMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.loadOptions());
      } catch (error: any) {
        setOptionCollegeData([]);
      }
    };
    if (loadingCollege) {
      fetchData();
    }
  }, [loadingCollege, dispatch]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdCollegeMaster(null));
    dispatch(actions.setSaveUpdateCollegeMaster(null));
  };
  useEffect(() => {
    setOptionCollegeData([...getOptionCollegeListData]);
  }, [getOptionCollegeListData]);

  return { optionCollegeData, loading, setOptionCollegeData };
}
