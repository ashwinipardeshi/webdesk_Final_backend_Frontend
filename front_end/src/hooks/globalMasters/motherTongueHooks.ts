import { useEffect, useState } from "react";
import { IMotherTongueMaster } from "../../interfaces/GlobalMaster/IMotherTongueMaster";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getAllMotherTongueMaster,
  getOptionMotherTongueMaster,
} from "../../store/GlobalMaster/motherTongueMaster";

export const MotherTongueHook = (loadingMotherTongue: boolean) => {
  const [data, setData] = useState<IMotherTongueMaster[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getMotherTongueListData = useSelector(getAllMotherTongueMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.load());
      } catch (error: any) {
        setData([]);
      }
    };
    if (loadingMotherTongue) {
      fetchData();
    }
  }, [loadingMotherTongue]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdMotherTongueMaster(null));
    dispatch(actions.setSaveUpdateMotherTongueMaster(null));
  };
  useEffect(() => {
    if (getMotherTongueListData && getMotherTongueListData.length > 0) {
      setData([...getMotherTongueListData]);
    }
  }, [getMotherTongueListData]);

  return { data, loading, setData };
};

export const MotherTongueOptionHook = (loadingMotherTongue: boolean) => {
  const [optionmotherTonguedata, setoptionmotherTongueData] = useState<
    IMotherTongueMaster[]
  >([]);
  const [optionmotherTongueloading, setOptionMotherTongueLoading] =
    useState(false);
  const dispatch = useDispatch();
  const getMotherTongueOptionListData = useSelector(
    getOptionMotherTongueMaster
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.loadOptionMotherTongue());
      } catch (error: any) {
        setoptionmotherTongueData([]);
      }
    };
    if (loadingMotherTongue) {
      fetchData();
    }
  }, [loadingMotherTongue]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdMotherTongueMaster(null));
    dispatch(actions.setSaveUpdateMotherTongueMaster(null));
  };
  useEffect(() => {
    setoptionmotherTongueData([...getMotherTongueOptionListData]);
  }, [getMotherTongueOptionListData]);

  return {
    optionmotherTonguedata,
    optionmotherTongueloading,
    setoptionmotherTongueData,
  };
};
