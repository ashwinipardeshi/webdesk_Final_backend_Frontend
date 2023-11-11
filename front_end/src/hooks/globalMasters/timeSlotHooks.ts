import { useEffect, useState } from "react";
import { ITimeSlotMaster } from "../../interfaces/GlobalMaster";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getAllTimeSlotMaster,
} from "../../store/GlobalMaster/timeSlotMaster";
export const TimeSlotHook = (loadingTimeSlot: boolean) => {
  const [data, setData] = useState<ITimeSlotMaster[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getTimeSlotListData = useSelector(getAllTimeSlotMaster);
  useEffect(() => {
    const fetchData = async () => {
      try {
        clearPreviousData();
        dispatch(actions.load());
      } catch (error: any) {
        setData([]);
      }
    };
    if (loadingTimeSlot) {
      fetchData();
    }
  }, [loadingTimeSlot]);

  const clearPreviousData = () => {
    dispatch(actions.setGetByIdTimeSlotMaster(null));
    dispatch(actions.setSaveUpdateTimeSlotMaster(null));
  };
  useEffect(() => {
    if (getTimeSlotListData && getTimeSlotListData.length > 0) {
      setData([...getTimeSlotListData]);
    }
  }, [getTimeSlotListData]);

  return { data, loading, setData };
};
