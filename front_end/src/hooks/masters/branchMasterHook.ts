import { useEffect, useState } from "react";
import { IBranchMaster } from "../../interfaces/Master";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getAllBranchMaster,
  getOptionBranchMaster,
} from "../../store/Master/branchMaster";

export function BranchHook(loadingBranch: boolean, programMasterId: number) {
  const [data, setData] = useState<IBranchMaster[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getBranchListData = useSelector(getAllBranchMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.load(programMasterId));
      } catch (error: any) {
        setData([]);
      }
    };
    if (loadingBranch) {
      fetchData();
    }
  }, [loadingBranch, dispatch, programMasterId]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdBranchMaster(null));
    dispatch(actions.setSaveUpdateBranchMaster(null));
  };
  useEffect(() => {
    if (getBranchListData && getBranchListData.length > 0) {
      setData([...getBranchListData]);
    }
  }, [getBranchListData]);

  return { data, loading, setData };
}

export function BranchOptionHook(
  loadingBranch: boolean,
  programMasterId: number
) {
  const [optionBranchData, setOptionBranchData] = useState<IBranchMaster[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getOptionBranchListData = useSelector(getOptionBranchMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.loadOptionsBranchMaster(programMasterId));
      } catch (error: any) {
        setOptionBranchData([]);
      }
    };
    if (loadingBranch) {
      fetchData();
    }
  }, [loadingBranch, dispatch, programMasterId]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdBranchMaster(null));
    dispatch(actions.setSaveUpdateBranchMaster(null));
  };
  useEffect(() => {
    if (getOptionBranchListData && getOptionBranchListData.length > 0) {
      setOptionBranchData([...getOptionBranchListData]);
    }
  }, [getOptionBranchListData]);

  return { optionBranchData, loading, setOptionBranchData };
}
