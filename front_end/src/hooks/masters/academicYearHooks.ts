import { useEffect, useState } from "react";
import { IAcademicYearMaster } from "../../interfaces/Master/IAcademicYearMaster";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getAllAcademicYearMaster,
  getOptionAcademicYearMaster,
  getSignOptionAcademicYearMaster
} from "../../store/Master/academicYearMaster";

export function AcademicYearHook(loadingAcademicYear: boolean) {
  const [data, setData] = useState<IAcademicYearMaster[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getAcademicYearListData = useSelector(getAllAcademicYearMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.load());
      } catch (error: any) {
        setData([]);
      }
    };
    if (loadingAcademicYear) {
      fetchData();
    }
  }, [loadingAcademicYear, dispatch]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdAcademicYearMaster(null));
    dispatch(actions.setSaveUpdateAcademicYearMaster(null));
  };
  useEffect(() => {
    if (getAcademicYearListData && getAcademicYearListData.length > 0) {
      setData([...getAcademicYearListData]);
    }
  }, [getAcademicYearListData]);

  return { data, loading, setData };
}

export function AcademicYearOptionHook(loadingAcademicYear: boolean) {
  const [optionAcademicYearData, setOptionAcademicYearData] = useState<
    IAcademicYearMaster[]
  >([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getOptionAcademicYearListData = useSelector(
    getOptionAcademicYearMaster
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.loadOptionsAcademicYear());
      } catch (error: any) {
        setOptionAcademicYearData([]);
      }
    };
    if (loadingAcademicYear) {
      fetchData();
    }
  }, [loadingAcademicYear, dispatch]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdAcademicYearMaster(null));
    dispatch(actions.setSaveUpdateAcademicYearMaster(null));
  };
  useEffect(() => {
    setOptionAcademicYearData([...getOptionAcademicYearListData]);
  }, [getOptionAcademicYearListData]);

  return { optionAcademicYearData, loading, setOptionAcademicYearData };
}

export function AcademicYearSignOptionHook(loadingSignAcademicYear: boolean, collegeId: number, streamId: number) {
  const [optionSignAcademicYearData, setOptionSignAcademicYearData] = useState<
    IAcademicYearMaster[]
  >([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getSignOptionAcademicYearListData = useSelector(
    getOptionAcademicYearMaster
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.loadSignOptions({ collegeId, streamId }));
      } catch (error: any) {
        setOptionSignAcademicYearData([]);
      }
    };
    if (loadingSignAcademicYear) {
      fetchData();
    }
  }, [loadingSignAcademicYear, dispatch]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdAcademicYearMaster(null));
    dispatch(actions.setSaveUpdateAcademicYearMaster(null));
  };
  useEffect(() => {
    setOptionSignAcademicYearData([...getSignOptionAcademicYearListData]);
  }, [getSignOptionAcademicYearMaster]);

  return { optionSignAcademicYearData, loading, setOptionSignAcademicYearData };
}
