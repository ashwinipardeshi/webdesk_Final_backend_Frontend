import { useEffect, useState } from "react";
import { IAnnualIncomeMaster } from "../../interfaces/GlobalMaster/IAnnualIncomeMaster";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getAllAnnualIncomeMaster,
  getOptionAnnualIncomeMaster,
} from "../../store/GlobalMaster/annualIncomeMaster";
export const AnnualIncomeHook = (loadingAnnualIncome: boolean) => {
  const [data, setData] = useState<IAnnualIncomeMaster[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getAnnualIncomeListData = useSelector(getAllAnnualIncomeMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.load());
      } catch (error: any) {
        setData([]);
      }
    };
    if (loadingAnnualIncome) {
      fetchData();
    }
  }, [loadingAnnualIncome]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdAnnualIncomeMaster(null));
    dispatch(actions.setSaveUpdateAnnualIncomeMaster(null));
  };
  useEffect(() => {
    setData([...getAnnualIncomeListData]);
  }, [getAnnualIncomeListData]);

  return { data, loading, setData };
};

export const AnnualIncomeOptionHook = (loadingAnnualIncome: boolean) => {
  const [optionannualIncomedata, setoptionannualIncomeData] = useState<
    IAnnualIncomeMaster[]
  >([]);
  const [optionannualIncomeloading, setOptionAnnualIncomeLoading] =
    useState(false);
  const dispatch = useDispatch();
  const getAnnualIncomeOptionListData = useSelector(
    getOptionAnnualIncomeMaster
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.loadOptionsAnnualIncome());
      } catch (error: any) {
        setoptionannualIncomeData([]);
      }
    };
    if (loadingAnnualIncome) {
      fetchData();
    }
  }, [loadingAnnualIncome]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdAnnualIncomeMaster(null));
    dispatch(actions.setSaveUpdateAnnualIncomeMaster(null));
  };
  useEffect(() => {
    if (
      getAnnualIncomeOptionListData &&
      getAnnualIncomeOptionListData.length > 0
    ) {
      setoptionannualIncomeData([...getAnnualIncomeOptionListData]);
    }
  }, [getAnnualIncomeOptionListData]);

  return {
    optionannualIncomedata,
    optionannualIncomeloading,
    setoptionannualIncomeData,
  };
};
