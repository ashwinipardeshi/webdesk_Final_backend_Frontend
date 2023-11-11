import { useEffect, useState } from "react";
import { IBloodGroupMaster } from "../../interfaces/GlobalMaster/IBloodGroupMaster";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getAllBloodGroupMaster,
  getOptionBloodGroupMaster,
} from "../../store/GlobalMaster/bloodGroupMaster";

export const BloodGroupHook = (loadingBloodGroup: boolean) => {
  const [data, setData] = useState<IBloodGroupMaster[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getBloodGroupListData = useSelector(getAllBloodGroupMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.load());
      } catch (error: any) {
        setData([]);
      }
    };
    if (loadingBloodGroup) {
      fetchData();
    }
  }, [loadingBloodGroup]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdBloodGroupMaster(null));
    dispatch(actions.setSaveUpdateBloodGroupMaster(null));
  };
  useEffect(() => {
    if (getBloodGroupListData && getBloodGroupListData.length > 0) {
      setData([...getBloodGroupListData]);
    }
  }, [getBloodGroupListData]);

  return { data, loading, setData };
};

export const BloodGroupOptionHook = (loadingBloodGroup: boolean) => {
  const [optionbloodGroupdata, setoptionbloodGroupData] = useState<
    IBloodGroupMaster[]
  >([]);
  const [optionbloodGrouploading, setOptionBloodGroupLoading] = useState(false);
  const dispatch = useDispatch();
  const getBloodGroupOptionListData = useSelector(getOptionBloodGroupMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.loadOptionOptionBloodGroup());
      } catch (error: any) {
        setoptionbloodGroupData([]);
      }
    };
    if (loadingBloodGroup) {
      fetchData();
    }
  }, [loadingBloodGroup]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdBloodGroupMaster(null));
    dispatch(actions.setSaveUpdateBloodGroupMaster(null));
  };
  useEffect(() => {
    setoptionbloodGroupData([...getBloodGroupOptionListData]);
  }, [getBloodGroupOptionListData]);

  return {
    optionbloodGroupdata,
    optionbloodGrouploading,
    setoptionbloodGroupData,
  };
};
