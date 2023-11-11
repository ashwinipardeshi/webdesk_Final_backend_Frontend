import { useEffect, useState } from "react";
import { ICourseTypeMaster } from "../../interfaces/Master";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getAllCourseTypeMaster,
  getOptionCourseTypeMaster,
} from "../../store/Master/courseTypeMaster";
export const CourseTypeHook = (loadingCourseType: boolean) => {
  const [coursetypedata, setCourseTypeData] = useState<ICourseTypeMaster[]>([]);
  const [loadingcoursetype, setLoadingCourseType] = useState(false);
  const dispatch = useDispatch();
  const getCourseTypeListData = useSelector(getAllCourseTypeMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.load());
      } catch (error: any) {
        setCourseTypeData([]);
      }
    };
    if (loadingCourseType) {
      fetchData();
    }
  }, [loadingCourseType]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdCourseTypeMaster(null));
    dispatch(actions.setSaveUpdateCourseTypeMaster(null));
  };
  useEffect(() => {
    if (getCourseTypeListData && getCourseTypeListData.length > 0) {
      setCourseTypeData([...getCourseTypeListData]);
    }
  }, [getCourseTypeListData]);

  return { coursetypedata, loadingcoursetype, setCourseTypeData };
};

export const CourseTypeOptionHook = (loadingCourseTypeOption: boolean) => {
  const [coursetypeoptiondata, setCourseTypeOptionData] = useState<
    ICourseTypeMaster[]
  >([]);
  const [coursetypeoptionloading, setCourseTypeOptionLoading] = useState(false);
  const dispatch = useDispatch();
  const getCourseTypeOptionListData = useSelector(getOptionCourseTypeMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.loadOptions());
      } catch (error: any) {
        setCourseTypeOptionData([]);
      }
    };
    if (loadingCourseTypeOption) {
      fetchData();
    }
  }, [loadingCourseTypeOption]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdCourseTypeMaster(null));
    dispatch(actions.setSaveUpdateCourseTypeMaster(null));
  };
  useEffect(() => {
    setCourseTypeOptionData([...getCourseTypeOptionListData]);
  }, [getCourseTypeOptionListData]);

  return {
    coursetypeoptiondata,
    coursetypeoptionloading,
    setCourseTypeOptionData,
  };
};
