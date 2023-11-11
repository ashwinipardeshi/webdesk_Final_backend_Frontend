import { useEffect, useState } from "react";
import { IBoardMaster } from "../../interfaces/GlobalMaster/IBoardMaster";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getAllBoardMaster,
  getOptionBoardMaster,
} from "../../store/GlobalMaster/boardMaster";
export const BoardHook = (loadingBoard: boolean) => {
  const [data, setData] = useState<IBoardMaster[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getBoardListData = useSelector(getAllBoardMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.load());
      } catch (error: any) {
        setData([]);
      }
    };
    if (loadingBoard) {
      fetchData();
    }
  }, [loadingBoard]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdBoardMaster(null));
    dispatch(actions.setSaveUpdateBoardMaster(null));
  };
  useEffect(() => {
    if (getBoardListData && getBoardListData.length > 0) {
      setData([...getBoardListData]);
    }
  }, [getBoardListData]);

  return { data, loading, setData };
};

export const BoardOptionHook = (loadingOptionBoard: boolean) => {
  const [boardoptiondata, setBoardOptionData] = useState<IBoardMaster[]>([]);
  const [boardoptionloading, setBoardOptionLoading] = useState(false);
  const dispatch = useDispatch();
  const getBoardOptionListData = useSelector(getOptionBoardMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.loadOptionBoard());
      } catch (error: any) {
        setBoardOptionData([]);
      }
    };
    if (loadingOptionBoard) {
      fetchData();
    }
  }, [loadingOptionBoard]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdBoardMaster(null));
    dispatch(actions.setSaveUpdateBoardMaster(null));
  };
  useEffect(() => {
    setBoardOptionData([...getBoardOptionListData]);
  }, [getBoardOptionListData]);

  return { boardoptiondata, boardoptionloading, setBoardOptionData };
};
