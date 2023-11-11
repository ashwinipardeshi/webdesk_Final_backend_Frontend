import { useEffect, useState } from "react";
import { IBankMaster } from "../../interfaces/Master";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getAllBankMaster,
  getOptionBankMaster,
} from "../../store/Master/bankMaster";
export const BankHook = (loadingBank: boolean) => {
  const [bankdata, setBankData] = useState<IBankMaster[]>([]);
  const [loadingbank, setLoadingBank] = useState(false);
  const dispatch = useDispatch();
  const getBankListData = useSelector(getAllBankMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.load());
      } catch (error: any) {
        setBankData([]);
      }
    };
    if (loadingBank) {
      fetchData();
    }
  }, [loadingBank]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdBankMaster(null));
    dispatch(actions.setSaveUpdateBankMaster(null));
  };
  useEffect(() => {
    if (getBankListData && getBankListData.length > 0) {
      setBankData([...getBankListData]);
    }
  }, [getBankListData]);

  return { bankdata, loadingbank, setBankData };
};

export const BankOptionHook = (loadingBankOption: boolean) => {
  const [bankoptiondata, setBankOptionData] = useState<IBankMaster[]>([]);
  const [bankoptionloading, setBankOptionLoading] = useState(false);
  const dispatch = useDispatch();
  const getBankOptionListData = useSelector(getOptionBankMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.loadOptions());
      } catch (error: any) {
        setBankOptionData([]);
      }
    };
    if (loadingBankOption) {
      fetchData();
    }
  }, [loadingBankOption]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdBankMaster(null));
    dispatch(actions.setSaveUpdateBankMaster(null));
  };
  useEffect(() => {
    setBankOptionData([...getBankOptionListData]);
  }, [getBankOptionListData]);

  return { bankoptiondata, bankoptionloading, setBankOptionData };
};
