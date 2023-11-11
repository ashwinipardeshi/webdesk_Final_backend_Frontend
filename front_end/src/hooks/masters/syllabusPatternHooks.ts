import { useEffect, useState } from "react";
import { ISyllabusPatternMaster } from "../../interfaces/Master";
import { useDispatch, useSelector } from "react-redux";
import {
    actions,
    getAllSyllabusPatternMaster,
    getOptionSyllabusPatternMaster,
} from "../../store/Master/syllabusPatternMaster";
export const SyllabusPatternHook = (loadingSyllabusPattern: boolean) => {
    const [syllabusPatterndata, setSyllabusPatternData] = useState<ISyllabusPatternMaster[]>([]);
    const [loadingsyllabusPattern, setLoadingSyllabusPattern] = useState(false);
    const dispatch = useDispatch();
    const getSyllabusPatternListData = useSelector(getAllSyllabusPatternMaster);
    useEffect(() => {
        const fetchData = async () => {
            try {
                clearPreviousData();
                dispatch(actions.load());
            } catch (error: any) {
                setSyllabusPatternData([]);
            }
        };
        if (loadingSyllabusPattern) {
            fetchData();
        }
    }, [loadingSyllabusPattern]);

    const clearPreviousData = () => {
        dispatch(actions.setGetByIdSyllabusPatternMaster(null));
        dispatch(actions.setSaveUpdateSyllabusPatternMaster(null));
    };
    useEffect(() => {
        setSyllabusPatternData([...getSyllabusPatternListData]);
    }, [getSyllabusPatternListData]);

    return { syllabusPatterndata, loadingsyllabusPattern, setSyllabusPatternData };
};

export const SyllabusPatternOptionHook = (loadingSyllabusPatternOption: boolean) => {
    const [syllabusPatternoptiondata, setSyllabusPatternOptionData] = useState<ISyllabusPatternMaster[]>([]);
    const [syllabusPatternoptionloading, setSyllabusPatternOptionLoading] = useState(false);
    const dispatch = useDispatch();
    const getSyllabusPatternOptionListData = useSelector(getOptionSyllabusPatternMaster);
    useEffect(() => {
        const fetchData = async () => {
            try {
                clearPreviousData();
                dispatch(actions.loadOptions());
            } catch (error: any) {
                setSyllabusPatternOptionData([]);
            }
        };
        if (loadingSyllabusPatternOption) {
            fetchData();
        }
    }, [loadingSyllabusPatternOption]);

    const clearPreviousData = () => {
        dispatch(actions.setGetByIdSyllabusPatternMaster(null));
        dispatch(actions.setSaveUpdateSyllabusPatternMaster(null));
    };
    useEffect(() => {
        setSyllabusPatternOptionData([...getSyllabusPatternOptionListData]);
    }, [getSyllabusPatternOptionListData]);

    return { syllabusPatternoptiondata, syllabusPatternoptionloading, setSyllabusPatternOptionData };
};
