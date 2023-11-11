import { useEffect, useState } from "react";
import { IFeeheadMaster } from "../../interfaces/Master";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getAllFeeHeadMaster,
  getOptionFeeHeadMaster,
} from "../../store/Master/feeheadMaster";
export const FeeHeadHook = (
  loadingFeeHead: boolean,
  feeHeadTypeMasterId: number
) => {
  const [feeheaddata, setFeeHeadData] = useState<IFeeheadMaster[]>([]);
  const [loadingfeehead, setLoadingFeeHead] = useState(false);
  const dispatch = useDispatch();
  const getFeeHeadListData = useSelector(getAllFeeHeadMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.load(feeHeadTypeMasterId));
      } catch (error: any) {
        setFeeHeadData([]);
      }
    };
    if (loadingFeeHead) {
      fetchData();
    }
  }, [loadingFeeHead, feeHeadTypeMasterId]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdFeeHeadMaster(null));
    dispatch(actions.setSaveUpdateFeeHeadMaster(null));
  };
  useEffect(() => {
    if (getFeeHeadListData && getFeeHeadListData.length > 0) {
      setFeeHeadData([...getFeeHeadListData]);
    }
  }, [getFeeHeadListData]);

  return { feeheaddata, loadingfeehead, setFeeHeadData };
};

export const FeeHeadOptionHook = (
  loadingFeeHeadOption: boolean,
  feeHeadTypeMasterId: number
) => {
  const [feeheadoptiondata, setFeeHeadOptionData] = useState<IFeeheadMaster[]>(
    []
  );
  const [feeheadoptionloading, setFeeHeadOptionLoading] = useState(false);
  const dispatch = useDispatch();
  const getFeeHeadOptionListData = useSelector(getOptionFeeHeadMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.loadOptions(feeHeadTypeMasterId));
      } catch (error: any) {
        setFeeHeadOptionData([]);
      }
    };
    if (loadingFeeHeadOption) {
      fetchData();
    }
  }, [loadingFeeHeadOption]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdFeeHeadMaster(null));
    dispatch(actions.setSaveUpdateFeeHeadMaster(null));
  };
  useEffect(() => {
    setFeeHeadOptionData([...getFeeHeadOptionListData]);
  }, [getFeeHeadOptionListData]);

  return { feeheadoptiondata, feeheadoptionloading, setFeeHeadOptionData };
};
