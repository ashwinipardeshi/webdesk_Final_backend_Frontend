import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getAllMenuMaster,
  getOptionMenuMaster,
} from "../../store/Master/menuMaster";
import { actions } from "../../store/Master/menuMaster";
import { IMenuMaster } from "../../interfaces/Master/IMenuMaster";

export function MenuMasterHook(loadingMenu: boolean) {
  const [data, setData] = useState<IMenuMaster[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getMenuListData = useSelector(getAllMenuMaster);
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
    if (loadingMenu) {
      fetchData();
    }
  }, [loadingMenu, dispatch]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdMenuMaster(null));
    dispatch(actions.setSaveUpdateMenuMaster(null));
  };
  useEffect(() => {
    if (getMenuListData && getMenuListData.length > 0) {
      setData([...getMenuListData]);
    }
  }, [getMenuListData]);

  return { data, loading, setData };
}

export function MenuOptionHook(loadingMenu: boolean) {
  const [optionMenuData, setOptionMenuData] = useState<IMenuMaster[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getOptionMenuListData = useSelector(getOptionMenuMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.loadOptions());
      } catch (error: any) {
        setOptionMenuData([]);
      }
    };
    if (loadingMenu) {
      fetchData();
    }
  }, [loadingMenu, dispatch]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdMenuMaster(null));
    dispatch(actions.setSaveUpdateMenuMaster(null));
  };
  useEffect(() => {
    setOptionMenuData([...getOptionMenuListData]);
  }, [getOptionMenuListData]);

  return { optionMenuData, loading, setOptionMenuData };
}
