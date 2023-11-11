import React, { useEffect, useState } from "react";
import { IHandicapType } from "../../interfaces/GlobalMaster/IHandicapType";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getAllHandicapTypeMaster,
  getOptionHandicapTypeMaster,
} from "../../store/GlobalMaster/handicapType";
export const HandicapTypeHook = (loadingHandicpType: boolean) => {
  const [data, setData] = useState<IHandicapType[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getAllHandicapType = useSelector(getAllHandicapTypeMaster);

  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.load());
      } catch (error: any) {
        setData([]);
      }
    };
    if (loadingHandicpType) {
      fetchData();
    }
  }, [loadingHandicpType]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdHandicapType(null));
    dispatch(actions.setSaveUpdateHandicapType(null));
  };

  useEffect(() => {
    if (getAllHandicapType && getAllHandicapType.length > 0) {
      setData([...getAllHandicapType]);
    }
  }, [getAllHandicapType]);

  return { data, loading, setData };
};

export const HandicapTypeOptionHook = (loadingHandicpTypeOption: boolean) => {
  const [handicaptypeoptiondata, setHandicapTypeOptionData] = useState<
    IHandicapType[]
  >([]);
  const [handicaptypeoptionloading, setHandicapTypeOptionLoading] =
    useState(false);
  const dispatch = useDispatch();
  const getAllHandicapType = useSelector(getOptionHandicapTypeMaster);

  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.loadOptionHandicap());
      } catch (error: any) {
        setHandicapTypeOptionData([]);
      }
    };
    if (loadingHandicpTypeOption) {
      fetchData();
    }
  }, [loadingHandicpTypeOption]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdHandicapType(null));
    dispatch(actions.setSaveUpdateHandicapType(null));
  };

  useEffect(() => {
    setHandicapTypeOptionData([...getAllHandicapType]);
  }, [getAllHandicapType]);

  return {
    handicaptypeoptiondata,
    handicaptypeoptionloading,
    setHandicapTypeOptionData,
  };
};
