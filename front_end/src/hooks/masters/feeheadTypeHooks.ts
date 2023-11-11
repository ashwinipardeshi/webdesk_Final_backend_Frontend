import { useEffect, useState } from "react";
import { IFeeHeadTypeMaster } from "../../interfaces/Master";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getAllFeeHeadTypeMaster,
  getOptionFeeHeadTypeMaster,
} from "../../store/Master/feeheadTypeMaster";
export const FeeHeadTypeHook = (loadingFeeHeadType: boolean) => {
  const [feeheadtypedata, setFeeHeadTypeData] = useState<IFeeHeadTypeMaster[]>(
    []
  );
  const [loadingfeeheadtype, setLoadingFeeHeadType] = useState(false);
  const dispatch = useDispatch();
  const getFeeHeadTypeListData = useSelector(getAllFeeHeadTypeMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.load());
      } catch (error: any) {
        setFeeHeadTypeData([]);
      }
    };
    if (loadingFeeHeadType) {
      fetchData();
    }
  }, [loadingFeeHeadType]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdFeeHeadTypeMaster(null));
    dispatch(actions.setSaveUpdateFeeHeadTypeMaster(null));
  };
  useEffect(() => {
    if (getFeeHeadTypeListData && getFeeHeadTypeListData.length > 0) {
      setFeeHeadTypeData([...getFeeHeadTypeListData]);
    }
  }, [getFeeHeadTypeListData]);

  return { feeheadtypedata, loadingfeeheadtype, setFeeHeadTypeData };
};

export const FeeHeadTypeOptionHook = (loadingFeeHeadTypeOption: boolean) => {
  const [feeheadtypeoptiondata, setFeeHeadTypeOptionData] = useState<
    IFeeHeadTypeMaster[]
  >([]);
  const [feeheadtypeoptionloading, setFeeHeadTypeOptionLoading] =
    useState(false);
  const dispatch = useDispatch();
  const getFeeHeadTypeOptionListData = useSelector(getOptionFeeHeadTypeMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.loadOptions());
      } catch (error: any) {
        setFeeHeadTypeOptionData([]);
      }
    };
    if (loadingFeeHeadTypeOption) {
      fetchData();
    }
  }, [loadingFeeHeadTypeOption]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdFeeHeadTypeMaster(null));
    dispatch(actions.setSaveUpdateFeeHeadTypeMaster(null));
  };
  useEffect(() => {
    setFeeHeadTypeOptionData([...getFeeHeadTypeOptionListData]);
  }, [getFeeHeadTypeOptionListData]);

  return {
    feeheadtypeoptiondata,
    feeheadtypeoptionloading,
    setFeeHeadTypeOptionData,
  };
};
