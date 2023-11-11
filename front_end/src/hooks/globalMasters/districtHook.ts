import { useEffect, useState } from "react";
import { IDistrictMaster } from "../../interfaces/GlobalMaster";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getAllDistrictMaster,
  getOptionDistrictMaster,
} from "../../store/GlobalMaster/districtMaster";
export const DistrictHook = (loadingDistrict: boolean) => {
  const [data, setData] = useState<IDistrictMaster[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getDistrictListData = useSelector(getAllDistrictMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.load());
      } catch (error: any) {
        setData([]);
      }
    };
    if (loadingDistrict) {
      fetchData();
    }
  }, [loadingDistrict]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdDistrictMaster(null));
    dispatch(actions.setSaveUpdateDistrictMaster(null));
  };
  useEffect(() => {
    if (getDistrictListData && getDistrictListData.length > 0) {
      setData([...getDistrictListData]);
    }
  }, [getDistrictListData]);

  return { data, loading, setData };
};

export const DistrictOptionHook = (loadingDistrict: boolean) => {
  const [optionDistrictdata, setoptiondistrictData] = useState<
    IDistrictMaster[]
  >([]);
  const [optionDistrictloading, setOptionDistrictLoading] = useState(false);
  const dispatch = useDispatch();
  const getDistrictOptionListData = useSelector(getOptionDistrictMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.loadOptionDistrict());
      } catch (error: any) {
        setoptiondistrictData([]);
      }
    };
    if (loadingDistrict) {
      fetchData();
    }
  }, [loadingDistrict]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdDistrictMaster(null));
    dispatch(actions.setSaveUpdateDistrictMaster(null));
  };
  useEffect(() => {
    setoptiondistrictData([...getDistrictOptionListData]);
  }, [getDistrictOptionListData]);

  return { optionDistrictdata, optionDistrictloading, setoptiondistrictData };
};
