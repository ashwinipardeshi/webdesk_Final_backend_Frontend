import { useEffect, useState } from "react";
import { IEvaluationMaster } from "../../interfaces/Master/IEvaluationMaster";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getAllEvaluationMaster,
  getOptionEvaluationMaster,
} from "../../store/Master/evaluationMaster";

export function EvaluationHook(loadingEvaluation: boolean) {
  const [data, setData] = useState<IEvaluationMaster[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getEvaluationListData = useSelector(getAllEvaluationMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.load());
      } catch (error: any) {
        setData([]);
      }
    };
    if (loadingEvaluation) {
      fetchData();
    }
  }, [loadingEvaluation, dispatch]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdEvaluationMaster(null));
    dispatch(actions.setSaveUpdateEvaluationMaster(null));
  };
  useEffect(() => {
    if (getEvaluationListData && getEvaluationListData.length > 0) {
      setData([...getEvaluationListData]);
    }
  }, [getEvaluationListData]);

  return { data, loading, setData };
}

export function EvaluationOptionHook(loadingEvaluation: boolean) {
  const [optionEvaluationData, setOptionEvaluationData] = useState<
    IEvaluationMaster[]
  >([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getOptionEvaluationListData = useSelector(getOptionEvaluationMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.loadOptions());
      } catch (error: any) {
        setOptionEvaluationData([]);
      }
    };
    if (loadingEvaluation) {
      fetchData();
    }
  }, [loadingEvaluation, dispatch]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdEvaluationMaster(null));
    dispatch(actions.setSaveUpdateEvaluationMaster(null));
  };
  useEffect(() => {
    setOptionEvaluationData([...getOptionEvaluationListData]);
  }, [getOptionEvaluationListData]);

  return { optionEvaluationData, loading, setOptionEvaluationData };
}
