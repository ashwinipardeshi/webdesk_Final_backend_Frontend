import { useEffect, useState } from "react";
import { IReservationCategoryMaster } from "../../interfaces/Master/IReservationCategoryMaster";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getAllReservationCategoryMaster,
  getOptionReservationCategoryMaster,
} from "../../store/Master/reservationCategoryMaster";

export function ReservationCategoryHook(loadingReservationCategory: boolean) {
  const [data, setData] = useState<IReservationCategoryMaster[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getReservationCategoryListData = useSelector(
    getAllReservationCategoryMaster
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
    if (loadingReservationCategory) {
      fetchData();
    }
  }, [loadingReservationCategory, dispatch]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdReservationCategoryMaster(null));
    dispatch(actions.setSaveUpdateReservationCategoryMaster(null));
  };
  useEffect(() => {
    if (
      getReservationCategoryListData &&
      getReservationCategoryListData.length > 0
    ) {
      setData([...getReservationCategoryListData]);
    }
  }, [getReservationCategoryListData]);

  return { data, loading, setData };
}

export function ReservationCategoryOptionHook(
  loadingReservationCategory: boolean
) {
  const [optionReservationCategoryData, setOptionReservationCategoryData] =
    useState<IReservationCategoryMaster[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getOptionReservationCategoryListData = useSelector(
    getOptionReservationCategoryMaster
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.loadOptions());
      } catch (error: any) {
        setOptionReservationCategoryData([]);
      }
    };
    if (loadingReservationCategory) {
      fetchData();
    }
  }, [loadingReservationCategory, dispatch]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdReservationCategoryMaster(null));
    dispatch(actions.setSaveUpdateReservationCategoryMaster(null));
  };
  useEffect(() => {
    setOptionReservationCategoryData([...getOptionReservationCategoryListData]);
  }, [getOptionReservationCategoryListData]);

  return {
    optionReservationCategoryData,
    loading,
    setOptionReservationCategoryData,
  };
}
