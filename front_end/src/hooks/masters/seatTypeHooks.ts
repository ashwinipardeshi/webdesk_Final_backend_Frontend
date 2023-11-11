import { useEffect, useState } from "react";
import { ISeatTypeMaster } from "../../interfaces/Master";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getAllSeatTypeMaster,
  getOptionSeatTypeMaster
} from "../../store/Master/seatTypeMaster";

export function SeatTypeHook(loadingSeatType: boolean) {
    const [data, setData] = useState<ISeatTypeMaster[]>([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const getSeatTypeListData = useSelector(getAllSeatTypeMaster);
    useEffect(() => {
        const fetchData = async () => {
            try {
                clearPreviousData();
                dispatch(actions.load());
            } catch (error: any) {
                setData([]);
            }
        };
        if (loadingSeatType) {
            fetchData();
        }
    }, [loadingSeatType,dispatch]);

    const clearPreviousData = () => {
        dispatch(actions.setGetByIdSeatTypeMaster(null));
        dispatch(actions.setSaveUpdateSeatTypeMaster(null));
    };
    useEffect(() => {
        setData([...getSeatTypeListData]);
    }, [getSeatTypeListData]);

    return { data, loading, setData };
}


export function SeatTypeOptionHook(loadingSeatType: boolean) {
    const [optionSeatTypeData, setOptionSeatTypeData] = useState<ISeatTypeMaster[]>([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const getOptionSeatTypeListData = useSelector(getOptionSeatTypeMaster);
    useEffect(() => {
        const fetchData = async () => {
            try {
                clearPreviousData();
                dispatch(actions.loadOptions());
            } catch (error: any) {
                setOptionSeatTypeData([]);
            }
        };
        if (loadingSeatType) {
            fetchData();
        }
    }, [loadingSeatType,dispatch]);

    const clearPreviousData = () => {
        dispatch(actions.setGetByIdSeatTypeMaster(null));
        dispatch(actions.setSaveUpdateSeatTypeMaster(null));     
    };
    useEffect(() => {
        setOptionSeatTypeData([...getOptionSeatTypeListData]);
    }, [getOptionSeatTypeListData]);

    return { optionSeatTypeData, loading, setOptionSeatTypeData };
}

