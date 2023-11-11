import { useEffect, useState } from "react";
import { IAllotmentCategoryMaster } from "../../interfaces/Master";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getAllAllotmentCategoryMaster,
  getOptionAllotmentCategoryMaster,
} from "../../store/Master/allotmentCategoryMaster";

export function AllotmentCategoryHook(loadingAllotmentCategory: boolean) {
  const [data, setData] = useState<IAllotmentCategoryMaster[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getAllotmentCategoryListData = useSelector(
    getAllAllotmentCategoryMaster
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.load());
      } catch (error: any) {
        setData([]);
      }
    };
    if (loadingAllotmentCategory) {
      fetchData();
    }
  }, [loadingAllotmentCategory, dispatch]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdAllotmentCategoryMaster(null));
    dispatch(actions.setSaveUpdateAllotmentCategoryMaster(null));
  };
  useEffect(() => {
    if (
      getAllotmentCategoryListData &&
      getAllotmentCategoryListData.length > 0
    ) {
      setData([...getAllotmentCategoryListData]);
    }
  }, [getAllotmentCategoryListData]);

  return { data, loading, setData };
}

export function AllotmentCategoryOptionHook(loadingAllotmentCategory: boolean) {
  const [optionAllotmentCategoryData, setOptionAllotmentCategoryData] =
    useState<IAllotmentCategoryMaster[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getOptionAllotmentCategoryListData = useSelector(
    getOptionAllotmentCategoryMaster
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.loadOptions());
      } catch (error: any) {
        setOptionAllotmentCategoryData([]);
      }
    };
    if (loadingAllotmentCategory) {
      fetchData();
    }
  }, [loadingAllotmentCategory, dispatch]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdAllotmentCategoryMaster(null));
    dispatch(actions.setSaveUpdateAllotmentCategoryMaster(null));
  };
  useEffect(() => {
    setOptionAllotmentCategoryData([...getOptionAllotmentCategoryListData]);
  }, [getOptionAllotmentCategoryListData]);

  return {
    optionAllotmentCategoryData,
    loading,
    setOptionAllotmentCategoryData,
  };
}
