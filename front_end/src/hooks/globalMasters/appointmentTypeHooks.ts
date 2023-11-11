import { useEffect, useState } from "react";
import { IAppointmentTypeMaster } from "../../interfaces/GlobalMaster";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getAllAppointmentTypeMaster,
  getOptionAppointmentTypeMaster,
} from "../../store/GlobalMaster/appointmentTypeMaster";
export const AppointmentTypeHook = (loadingAppointmentType: boolean) => {
  const [data, setData] = useState<IAppointmentTypeMaster[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getAppointmentTypeListData = useSelector(getAllAppointmentTypeMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.load());
      } catch (error: any) {
        setData([]);
      }
    };
    if (loadingAppointmentType) {
      fetchData();
    }
  }, [loadingAppointmentType]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdAppointmentTypeMaster(null));
    dispatch(actions.setSaveUpdateAppointmentTypeMaster(null));
  };
  useEffect(() => {
    if (getAppointmentTypeListData && getAppointmentTypeListData.length > 0) {
      setData([...getAppointmentTypeListData]);
    }
  }, [getAppointmentTypeListData]);

  return { data, loading, setData };
};

export const AppointmentTypeOptionHook = (loadingAppointmentType: boolean) => {
  const [optionappointmenttypedata, setOptionAppointmentTypeData] = useState<
    IAppointmentTypeMaster[]
  >([]);
  const [optionappointmenttypeloading, setOptionAppointmentTypeLoading] =
    useState(false);
  const dispatch = useDispatch();
  const getAppointmentTypeOptionListData = useSelector(
    getOptionAppointmentTypeMaster
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.loadOptionAppointmentType());
      } catch (error: any) {
        setOptionAppointmentTypeData([]);
      }
    };
    if (loadingAppointmentType) {
      fetchData();
    }
  }, [loadingAppointmentType]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdAppointmentTypeMaster(null));
    dispatch(actions.setSaveUpdateAppointmentTypeMaster(null));
  };
  useEffect(() => {
    setOptionAppointmentTypeData([...getAppointmentTypeOptionListData]);
  }, [getAppointmentTypeOptionListData]);

  return {
    optionappointmenttypedata,
    optionappointmenttypeloading,
    setOptionAppointmentTypeData,
  };
};
