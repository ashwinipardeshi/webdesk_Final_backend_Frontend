import { useEffect, useState } from "react";
import { IProgramTypeMaster } from "../../interfaces/Master/IProgramTypeMaster";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getAllProgramTypeMaster,
  getOptionProgramTypeMaster
} from "../../store/Master/programTypeMaster";

export function ProgramTypeHook(loadingProgramType: boolean) {
    const [data, setData] = useState<IProgramTypeMaster[]>([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const getProgramTypeListData = useSelector(getAllProgramTypeMaster);
    useEffect(() => {
        const fetchData = async () => {
            try {
                clearPreviousData();
                dispatch(actions.load());
            } catch (error: any) {
                setData([]);
            }
        };
        if (loadingProgramType) {
            fetchData();
        }
    }, [loadingProgramType,dispatch]);

    const clearPreviousData = () => {
        dispatch(actions.setGetByIdProgramTypeMaster(null));
        dispatch(actions.setSaveUpdateProgramTypeMaster(null));
    };
    useEffect(() => {
        setData([...getProgramTypeListData]);
    }, [getProgramTypeListData]);

    return { data, loading, setData };
}


export function ProgramTypeOptionHook(loadingProgramType: boolean) {
    const [optionProgramTypeData, setOptionProgramTypeData] = useState<IProgramTypeMaster[]>([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const getOptionProgramTypeListData = useSelector(getOptionProgramTypeMaster);
    useEffect(() => {
        const fetchData = async () => {
            try {
                clearPreviousData();
                dispatch(actions.loadOptions());
            } catch (error: any) {
                setOptionProgramTypeData([]);
            }
        };
        if (loadingProgramType) {
            fetchData();
        }
    }, [loadingProgramType,dispatch]);

    const clearPreviousData = () => {
        dispatch(actions.setGetByIdProgramTypeMaster(null));
        dispatch(actions.setSaveUpdateProgramTypeMaster(null));     
    };
    useEffect(() => {
        setOptionProgramTypeData([...getOptionProgramTypeListData]);
    }, [getOptionProgramTypeListData]);

    return { optionProgramTypeData, loading, setOptionProgramTypeData };
}

