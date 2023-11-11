import { useDispatch, useSelector } from "react-redux";
import { IDocumentMaster } from "../../interfaces/Master/IDocumentMaster";
import { useEffect, useState } from "react";
import {
  getAllDocumentMaster,
  getOptionDocumentMaster,
} from "../../store/Master/documentMaster";
import { actions } from "../../store/Master/documentMaster";

export function DocumentHook(loadingDocument: boolean) {
  const [data, setData] = useState<IDocumentMaster[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getDocumentListData = useSelector(getAllDocumentMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.load());
      } catch (error: any) {
        console.error("Error while fetching data:", error);
        setData([]);
      }
    };
    if (loadingDocument) {
      fetchData();
    }
  }, [loadingDocument, dispatch]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdDocumentMaster(null));
    dispatch(actions.setSaveUpdateDocumentMaster(null));
  };
  useEffect(() => {
    if (getDocumentListData && getDocumentListData.length > 0) {
      setData([...getDocumentListData]);
    }
  }, [getDocumentListData]);

  return { data, loading, setData };
}

export function DocumentOptionHook(loadingDocument: boolean) {
  const [optionDocumentData, setOptionDocumentData] = useState<
    IDocumentMaster[]
  >([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getOptionDocumentListData = useSelector(getOptionDocumentMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.loadOptions());
      } catch (error: any) {
        setOptionDocumentData([]);
      }
    };
    if (loadingDocument) {
      fetchData();
    }
  }, [loadingDocument, dispatch]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdDocumentMaster(null));
    dispatch(actions.setSaveUpdateDocumentMaster(null));
  };
  useEffect(() => {
    setOptionDocumentData([...getOptionDocumentListData]);
  }, [getOptionDocumentListData]);

  return { optionDocumentData, loading, setOptionDocumentData };
}
