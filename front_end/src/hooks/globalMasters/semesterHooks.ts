import { useEffect, useState } from "react";
import { ISemesterMaster } from "../../interfaces/GlobalMaster/ISemesterMaster";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getAllSemesterMaster,
  getOptionSemesterMaster,
} from "../../store/GlobalMaster/semesterMaster";

export const SemesterHook = (loadingSemester: boolean) => {
  const [data, setData] = useState<ISemesterMaster[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getSemesterListData = useSelector(getAllSemesterMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.load());
      } catch (error: any) {
        setData([]);
      }
    };
    if (loadingSemester) {
      fetchData();
    }
  }, [loadingSemester]);
  const clearPreviousData = () => {
    dispatch(actions.setGetByIdSemesterMaster(null));
    dispatch(actions.setSaveUpdateSemesterMaster(null));
  };
  useEffect(() => {
    if (getSemesterListData && getSemesterListData.length > 0) {
      setData([...getSemesterListData]);
    }
  }, [getSemesterListData]);

  return { data, loading, setData };
};

export const SemesterOptionHook = (loadingSemesterOption: boolean) => {
  const [semesteroptiondata, setSemesterOptionData] = useState<
    ISemesterMaster[]
  >([]);
  const [semesteroptionloading, setSemesterOptionLoading] = useState(false);
  const dispatch = useDispatch();
  const getSemesterOptionListData = useSelector(getOptionSemesterMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.loadOptionSemester());
      } catch (error: any) {
        setSemesterOptionData([]);
      }
    };
    if (loadingSemesterOption) {
      fetchData();
    }
  }, [loadingSemesterOption]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdSemesterMaster(null));
    dispatch(actions.setSaveUpdateSemesterMaster(null));
  };
  useEffect(() => {
    setSemesterOptionData([...getSemesterOptionListData]);
  }, [getSemesterOptionListData]);

  return { semesteroptiondata, semesteroptionloading, setSemesterOptionData };
};
