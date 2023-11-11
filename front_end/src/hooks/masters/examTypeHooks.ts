import { useEffect, useState } from "react";
import { IExamTypeMaster } from "../../interfaces/Master";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getAllExamTypeMaster,
  getOptionExamTypeMaster,
} from "../../store/Master/examTypeMaster";
export const ExamTypeHook = (loadingExamType: boolean) => {
  const [examtypedata, setExamTypeData] = useState<IExamTypeMaster[]>([]);
  const [loadingexamtype, setLoadingExamType] = useState(false);
  const dispatch = useDispatch();
  const getExamTypeListData = useSelector(getAllExamTypeMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.load());
      } catch (error: any) {
        setExamTypeData([]);
      }
    };
    if (loadingExamType) {
      fetchData();
    }
  }, [loadingExamType]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdExamTypeMaster(null));
    dispatch(actions.setSaveUpdateExamTypeMaster(null));
  };
  useEffect(() => {
    if (getExamTypeListData && getExamTypeListData.length > 0) {
      setExamTypeData([...getExamTypeListData]);
    }
  }, [getExamTypeListData]);

  return { examtypedata, loadingexamtype, setExamTypeData };
};

export const ExamTypeOptionHook = (loadingExamTypeOption: boolean) => {
  const [examtypeoptiondata, setExamTypeOptionData] = useState<
    IExamTypeMaster[]
  >([]);
  const [examtypeoptionloading, setExamTypeOptionLoading] = useState(false);
  const dispatch = useDispatch();
  const getExamTypeOptionListData = useSelector(getOptionExamTypeMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.loadOptions());
      } catch (error: any) {
        setExamTypeOptionData([]);
      }
    };
    if (loadingExamTypeOption) {
      fetchData();
    }
  }, [loadingExamTypeOption]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdExamTypeMaster(null));
    dispatch(actions.setSaveUpdateExamTypeMaster(null));
  };
  useEffect(() => {
    setExamTypeOptionData([...getExamTypeOptionListData]);
  }, [getExamTypeOptionListData]);

  return { examtypeoptiondata, examtypeoptionloading, setExamTypeOptionData };
};
