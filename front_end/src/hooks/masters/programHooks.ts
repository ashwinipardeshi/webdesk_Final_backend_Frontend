import { useEffect, useState } from "react";
import { IProgramMaster } from "../../interfaces/Master/IProgramMaster";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getAllProgramMaster,
  getOptionProgramMaster,
  getSignOptionProgramMaster,
} from "../../store/Master/programMaster";

export function ProgramHook(loadingProgram: boolean) {
  const [data, setData] = useState<IProgramMaster[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getProgramListData = useSelector(getAllProgramMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.load());
      } catch (error: any) {
        setData([]);
      }
    };
    if (loadingProgram) {
      fetchData();
    }
  }, [loadingProgram, dispatch]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdProgramMaster(null));
    dispatch(actions.setSaveUpdateProgramMaster(null));
  };
  useEffect(() => {
    setData([...getProgramListData]);
  }, [getProgramListData]);

  return { data, loading, setData };
}

export function ProgramOptionHook(loadingProgram: boolean) {
  const [optionProgramData, setOptionProgramData] = useState<IProgramMaster[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getOptionProgramListData = useSelector(getOptionProgramMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.loadOptions());
      } catch (error: any) {
        setOptionProgramData([]);
      }
    };
    if (loadingProgram) {
      fetchData();
    }
  }, [loadingProgram, dispatch]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdProgramMaster(null));
    dispatch(actions.setSaveUpdateProgramMaster(null));
  };
  useEffect(() => {
    if (getOptionProgramListData && getOptionProgramListData.length > 0) {
      setOptionProgramData([...getOptionProgramListData]);
    }
  }, [getOptionProgramListData]);

  return { optionProgramData, loading, setOptionProgramData };
}

export function ProgramSignOptionHook(loadingSignProgram: boolean, collegeId: number, streamId: number) {
  const [optionSignProgramData, setOptionSignProgramData] = useState<IProgramMaster[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getSignOptionProgramListData = useSelector(getSignOptionProgramMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.loadSignOptions({ collegeId, streamId }));
      } catch (error: any) {
        setOptionSignProgramData([]);
      }
    };
    if (loadingSignProgram) {
      fetchData();
    }
  }, [loadingSignProgram, dispatch]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdProgramMaster(null));
    dispatch(actions.setSaveUpdateProgramMaster(null));
  };
  useEffect(() => {
    if (getSignOptionProgramListData && getSignOptionProgramListData.length > 0) {
      setOptionSignProgramData([...getSignOptionProgramListData]);
    }
  }, [getSignOptionProgramListData]);

  return { optionSignProgramData, loading, setOptionSignProgramData };
}

