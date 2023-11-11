import { useEffect, useState } from "react";
import { IProgramDetailMaster } from "../../interfaces/Master";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getAllProgramDetailMaster,
} from "../../store/Master/programDetailMaster";
export const ProgramDetailHook = (loadingProgramDetail: boolean) => {
  const [programDetaildata, setProgramDetailData] = useState<
    IProgramDetailMaster[]
  >([]);
  const [loadingprogramDetail, setLoadingProgramDetail] = useState(false);
  const dispatch = useDispatch();
  const getProgramDetailListData = useSelector(getAllProgramDetailMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.load());
      } catch (error: any) {
        setProgramDetailData([]);
      }
    };
    if (loadingProgramDetail) {
      fetchData();
    }
  }, [loadingProgramDetail]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdProgramDetailMaster(null));
    dispatch(actions.setSaveUpdateProgramDetailMaster(null));
  };
  useEffect(() => {
    if (getProgramDetailListData && getProgramDetailListData.length > 0) {
      setProgramDetailData([...getProgramDetailListData]);
    }
  }, [getProgramDetailListData]);

  return { programDetaildata, loadingprogramDetail, setProgramDetailData };
};
