import { useEffect, useState } from "react";
import { IStreamMaster } from "../../interfaces/Master";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getAllStreamMaster,
  getOptionStreamMaster
} from "../../store/Master/streamMaster";

export function StreamHook(loadingStream: boolean) {
    const [data, setData] = useState<IStreamMaster[]>([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const getStreamListData = useSelector(getAllStreamMaster);
    useEffect(() => {
        const fetchData = async () => {
            try {
                clearPreviousData();
                dispatch(actions.load());
            } catch (error: any) {
                setData([]);
            }
        };
        if (loadingStream) {
            fetchData();
        }
    }, [loadingStream,dispatch]);

    const clearPreviousData = () => {
        dispatch(actions.setGetByIdStreamMaster(null));
        dispatch(actions.setSaveUpdateStreamMaster(null));
    };
    useEffect(() => {
        setData([...getStreamListData]);
    }, [getStreamListData]);

    return { data, loading, setData };
}


export function StreamOptionHook(loadingStream: boolean) {
    const [optionStreamData, setOptionStreamData] = useState<IStreamMaster[]>([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const getOptionStreamListData = useSelector(getOptionStreamMaster);
    useEffect(() => {
        const fetchData = async () => {
            try {
                clearPreviousData();
                dispatch(actions.loadOptions());
            } catch (error: any) {
                setOptionStreamData([]);
            }
        };
        if (loadingStream) {
            fetchData();
        }
    }, [loadingStream,dispatch]);

    const clearPreviousData = () => {
        dispatch(actions.setGetByIdStreamMaster(null));
        dispatch(actions.setSaveUpdateStreamMaster(null));     
    };
    useEffect(() => {
        setOptionStreamData([...getOptionStreamListData]);
    }, [getOptionStreamListData]);

    return { optionStreamData, loading, setOptionStreamData };
}

