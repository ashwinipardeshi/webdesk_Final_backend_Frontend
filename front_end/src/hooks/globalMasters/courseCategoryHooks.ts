import { useEffect, useState } from "react";
import { ICourseCategoryMaster } from "../../interfaces/GlobalMaster/ICourseCategoryMaster";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getAllCourseCategoryMaster,
  getOptionCourseCategoryMaster,
} from "../../store/GlobalMaster/courseCategoryMaster";
export const CourseCategoryHook = (loadingCourseCategory: boolean) => {
  const [data, setData] = useState<ICourseCategoryMaster[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getCourseCategoryListData = useSelector(getAllCourseCategoryMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.load());
      } catch (error: any) {
        setData([]);
      }
    };
    if (loadingCourseCategory) {
      fetchData();
    }
  }, [loadingCourseCategory]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdCourseCategoryMaster(null));
    dispatch(actions.setSaveUpdateCourseCategoryMaster(null));
  };
  useEffect(() => {
    if (getCourseCategoryListData && getCourseCategoryListData.length > 0) {
      setData([...getCourseCategoryListData]);
    }
  }, [getCourseCategoryListData]);

  return { data, loading, setData };
};

export const CourseCategoryOptionHook = (loadingCourseCategory: boolean) => {
  const [optioncoursecategorydata, setCourseCategoryOptionData] = useState<
    ICourseCategoryMaster[]
  >([]);
  const [optioncoursecategoryloading, setCourseCategoryOptionLoading] =
    useState(false);
  const dispatch = useDispatch();
  const getCourseCategoryOptionListData = useSelector(
    getOptionCourseCategoryMaster
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.loadOptionCourse());
      } catch (error: any) {
        setCourseCategoryOptionData([]);
      }
    };
    if (loadingCourseCategory) {
      fetchData();
    }
  }, [loadingCourseCategory]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdCourseCategoryMaster(null));
    dispatch(actions.setSaveUpdateCourseCategoryMaster(null));
  };
  useEffect(() => {
    setCourseCategoryOptionData([...getCourseCategoryOptionListData]);
  }, [getCourseCategoryOptionListData]);

  return {
    optioncoursecategorydata,
    optioncoursecategoryloading,
    setCourseCategoryOptionData,
  };
};
