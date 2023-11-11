import { useEffect, useState } from "react";
import { ICasteMaster } from "../../interfaces/GlobalMaster";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getAllCasteMaster,
  getOptionCasteMaster,
} from "../../store/GlobalMaster/casteMaster";
export const CasteHook = (loadingCaste: boolean) => {
  const [data, setData] = useState<ICasteMaster[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getCasteListData = useSelector(getAllCasteMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.load());
      } catch (error: any) {
        setData([]);
      }
    };
    if (loadingCaste) {
      fetchData();
    }
  }, [loadingCaste]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdCasteMaster(null));
    dispatch(actions.setSaveUpdateCasteMaster(null));
  };
  useEffect(() => {
    if (getCasteListData && getCasteListData.length > 0) {
      setData([...getCasteListData]);
    }
  }, [getCasteListData]);

  return { data, loading, setData };
};
export const CasteOptionHook = (loadingOptionCaste: boolean) => {
  const [optionCasteData, setOptionCasteData] = useState<ICasteMaster[]>([]);
  const [optionloading, setOptionLoading] = useState(false);
  const dispatch = useDispatch();
  const getCasteOptionListData = useSelector(getOptionCasteMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.loadOptionCaste());
      } catch (error: any) {
        setOptionCasteData([]);
      }
    };
    if (loadingOptionCaste) {
      fetchData();
    }
  }, [loadingOptionCaste]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdCasteMaster(null));
    dispatch(actions.setSaveUpdateCasteMaster(null));
  };
  useEffect(() => {
    setOptionCasteData([...getCasteOptionListData]);
  }, [getCasteOptionListData]);

  return { optionCasteData, optionloading, setOptionCasteData };
};
