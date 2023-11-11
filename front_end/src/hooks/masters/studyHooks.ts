import { useEffect, useState } from "react";
import { IStudyMaster } from "../../interfaces/Master/IStudyMaster";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getAllStudyMaster,
  getOptionStudyMaster
} from "../../store/Master/studyMaster";

export function StudyHook(loadingStudy: boolean) {
    const [data, setData] = useState<IStudyMaster[]>([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const getStudyListData = useSelector(getAllStudyMaster);
    useEffect(() => {
        const fetchData = async () => {
            try {
                clearPreviousData();
                dispatch(actions.load());
            } catch (error: any) {
                setData([]);
            }
        };
        if (loadingStudy) {
            fetchData();
        }
    }, [loadingStudy,dispatch]);

    const clearPreviousData = () => {
        dispatch(actions.setGetByIdStudyMaster(null));
        dispatch(actions.setSaveUpdateStudyMaster(null));
    };
    useEffect(() => {
        setData([...getStudyListData]);
    }, [getStudyListData]);

    return { data, loading, setData };
}


export function StudyOptionHook(loadingStudy: boolean) {
    const [optionStudyData, setOptionStudyData] = useState<IStudyMaster[]>([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const getOptionStudyListData = useSelector(getOptionStudyMaster);
    useEffect(() => {
        const fetchData = async () => {
            try {
                clearPreviousData();
                dispatch(actions.loadOptions());
            } catch (error: any) {
                setOptionStudyData([]);
            }
        };
        if (loadingStudy) {
            fetchData();
        }
    }, [loadingStudy,dispatch]);

    const clearPreviousData = () => {
        dispatch(actions.setGetByIdStudyMaster(null));
        dispatch(actions.setSaveUpdateStudyMaster(null));     
    };
    useEffect(() => {
        setOptionStudyData([...getOptionStudyListData]);
    }, [getOptionStudyListData]);

    return { optionStudyData, loading, setOptionStudyData };
}

