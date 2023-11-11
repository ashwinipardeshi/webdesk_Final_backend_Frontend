import { useEffect, useState } from "react";
import { IProgramYearMaster } from "../../interfaces/Master";
import { useDispatch, useSelector } from "react-redux";
import {
    actions,
    getAllProgramYearMaster,
    getOptionProgramYearMaster,
} from "../../store/Master/programYearMaster";
export const ProgramYearHook = (loadingProgramYear: boolean) => {
    const [programyeardata, setProgramYearData] = useState<IProgramYearMaster[]>([]);
    const [loadingprogramyear, setLoadingCourseType] = useState(false);
    const dispatch = useDispatch();
    const getProgramYearListData = useSelector(getAllProgramYearMaster);
    useEffect(() => {
        const fetchData = async () => {
            try {
                clearPreviousData();
                dispatch(actions.load());
            } catch (error: any) {
                setProgramYearData([]);
            }
        };
        if (loadingProgramYear) {
            fetchData();
        }
    }, [loadingProgramYear]);

    const clearPreviousData = () => {
        dispatch(actions.setGetByIdProgramYearMaster(null));
        dispatch(actions.setSaveUpdateProgramYearMaster(null));
    };
    useEffect(() => {
        setProgramYearData([...getProgramYearListData]);
    }, [getProgramYearListData]);

    return { programyeardata, loadingprogramyear, setProgramYearData };
};

export const ProgramYearOptionHook = (loadingProgramYearOption: boolean) => {
    const [programyearoptiondata, setProgramYearOptionData] = useState<IProgramYearMaster[]>([]);
    const [programyearoptionloading, setProgramYearOptionLoading] = useState(false);
    const dispatch = useDispatch();
    const getProgramYearOptionListData = useSelector(getOptionProgramYearMaster);
    useEffect(() => {
        const fetchData = async () => {
            try {
                clearPreviousData();
                dispatch(actions.loadOptions());
            } catch (error: any) {
                setProgramYearOptionData([]);
            }
        };
        if (loadingProgramYearOption) {
            fetchData();
        }
    }, [loadingProgramYearOption]);

    const clearPreviousData = () => {
        dispatch(actions.setGetByIdProgramYearMaster(null));
        dispatch(actions.setSaveUpdateProgramYearMaster(null));
    };
    useEffect(() => {
        setProgramYearOptionData([...getProgramYearOptionListData]);
    }, [getProgramYearOptionListData]);

    return { programyearoptiondata, programyearoptionloading, setProgramYearOptionData };
};
