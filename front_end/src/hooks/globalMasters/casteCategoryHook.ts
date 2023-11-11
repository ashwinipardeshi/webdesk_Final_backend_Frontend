import { useEffect, useState } from "react";
import { ICastCategoryGMaster } from "../../interfaces/GlobalMaster/ICastCategoryGMaster";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getAllCasteCategoryMaster,
  getOptionCasteCategoryMaster,
} from "../../store/GlobalMaster/casteCategoryMaster";
export const CasteCategoryHook = (loadingCasteCategory: boolean) => {
  const [data, setData] = useState<ICastCategoryGMaster[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getCasteCategoryListData = useSelector(getAllCasteCategoryMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.load());
      } catch (error: any) {
        setData([]);
      }
    };
    if (loadingCasteCategory) {
      fetchData();
    }
  }, [loadingCasteCategory]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdCasteCategoryMaster(null));
    dispatch(actions.setSaveUpdateCasteCategoryMaster(null));
    //   dispatch(actions.setSaveUpdateCasteCategoryMaster(null));
  };
  useEffect(() => {
    if (getCasteCategoryListData && getCasteCategoryListData.length > 0) {
      setData([...getCasteCategoryListData]);
    }
  }, [getCasteCategoryListData]);

  return { data, loading, setData };
};

export const CasteCategoryOptionHook = (loadingCasteCategory: boolean) => {
  const [castecategoryoptiondata, setCasteCategoryOptionData] = useState<
    ICastCategoryGMaster[]
  >([]);
  const [castecategoryoptionloading, setCasteCategoryOptionLoading] =
    useState(false);
  const dispatch = useDispatch();
  const getCasteCategoryOptionListData = useSelector(
    getOptionCasteCategoryMaster
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.loadOptionCasteCategory());
      } catch (error: any) {
        setCasteCategoryOptionData([]);
      }
    };
    if (loadingCasteCategory) {
      fetchData();
    }
  }, [loadingCasteCategory]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdCasteCategoryMaster(null));
    dispatch(actions.setSaveUpdateCasteCategoryMaster(null));
  };
  useEffect(() => {
    setCasteCategoryOptionData([...getCasteCategoryOptionListData]);
  }, [getCasteCategoryOptionListData]);

  return {
    castecategoryoptiondata,
    castecategoryoptionloading,
    setCasteCategoryOptionData,
  };
};
