import { useEffect, useState } from "react";
import { ISubCasteMaster } from "../../interfaces/GlobalMaster/ISubCasteMaster";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getAllSubCasteMaster,
  getOptionSubCasteMaster,
} from "../../store/GlobalMaster/subCasteMaster";

export const SubCasteHook = (loadingSubCaste: boolean) => {
  const [data, setData] = useState<ISubCasteMaster[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getSubCasteListData = useSelector(getAllSubCasteMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.load());
      } catch (error: any) {
        setData([]);
      }
    };
    if (loadingSubCaste) {
      fetchData();
    }
  }, [loadingSubCaste]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdSubCasteMaster(null));
    dispatch(actions.setSaveUpdateSubCasteMaster(null));
  };
  useEffect(() => {
    if (getSubCasteListData && getSubCasteListData.length > 0) {
      setData([...getSubCasteListData]);
    }
  }, [getSubCasteListData]);

  return { data, loading, setData };
};

export const SubCasteOptionHook = (loadingSubCasteOption: boolean) => {
  const [optionSubCasteData, setOptionSubCasteData] = useState<
    ISubCasteMaster[]
  >([]);
  const [optionSubCasteloading, setOptionStateLoading] = useState(false);
  const dispatch = useDispatch();
  const getSubCasteOptionListData = useSelector(getOptionSubCasteMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.loadOptionSubCaste());
      } catch (error: any) {
        setOptionSubCasteData([]);
      }
    };
    if (loadingSubCasteOption) {
      fetchData();
    }
  }, [loadingSubCasteOption]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdSubCasteMaster(null));
    dispatch(actions.setSaveUpdateSubCasteMaster(null));
  };
  useEffect(() => {
    setOptionSubCasteData([...getSubCasteOptionListData]);
  }, [getSubCasteOptionListData]);

  return { optionSubCasteData, optionSubCasteloading, setOptionSubCasteData };
};
