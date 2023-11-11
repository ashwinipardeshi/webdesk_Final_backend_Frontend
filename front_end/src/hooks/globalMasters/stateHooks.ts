import { useEffect, useState } from "react";
import { IStateMaster } from "../../interfaces/GlobalMaster";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getAllStateMaster,
  getOptionStateMaster,
} from "../../store/GlobalMaster/stateMaster";
export const StateHook = (loadingState: boolean) => {
  const [data, setData] = useState<IStateMaster[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getStateListData = useSelector(getAllStateMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.load());
      } catch (error: any) {
        setData([]);
      }
    };
    if (loadingState) {
      fetchData();
    }
  }, [loadingState]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdStateMaster(null));
    dispatch(actions.setSaveUpdateStateMaster(null));
  };
  useEffect(() => {
    if (getStateListData && getStateListData.length > 0) {
      setData([...getStateListData]);
    }
  }, [getStateListData]);

  return { data, loading, setData };
};

export const StateOptionHook = (loadingState: boolean) => {
  const [optionstatedata, setoptionstateData] = useState<IStateMaster[]>([]);
  const [optionstateloading, setOptionStateLoading] = useState(false);
  const dispatch = useDispatch();
  const getStateOptionListData = useSelector(getOptionStateMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.loadOptionState());
      } catch (error: any) {
        setoptionstateData([]);
      }
    };
    if (loadingState) {
      fetchData();
    }
  }, [loadingState]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdStateMaster(null));
    dispatch(actions.setSaveUpdateStateMaster(null));
  };
  useEffect(() => {
    setoptionstateData([...getStateOptionListData]);
  }, [getStateOptionListData]);

  return { optionstatedata, optionstateloading, setoptionstateData };
};
