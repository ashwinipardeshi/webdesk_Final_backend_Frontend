import { useEffect, useState } from "react";
import { ISemesterDetailsMaster } from "../../interfaces/Master";
import { useDispatch, useSelector } from "react-redux";
import {
    actions,
    getAllSemesterDetailsMaster
} from "../../store/Master/semesterDetailsMaster";
export const SemesterDetailsHook = (loadingSemesterDetails: boolean) => {
    const [semesterDetailsData, setSemesterDetailsData] = useState<ISemesterDetailsMaster[]>([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const getSemesterDetailsListData = useSelector(getAllSemesterDetailsMaster);
    useEffect(() => {
        const fetchData = async () => {
            try {
                clearPreviousData();
                dispatch(actions.load());
            } catch (error: any) {
                setSemesterDetailsData([]);
            }
        };
        if (loadingSemesterDetails) {
            fetchData();
        }
    }, [loadingSemesterDetails]);

    const clearPreviousData = () => {
        dispatch(actions.setGetByIdSemesterDetailsMaster(null));
        dispatch(actions.setSaveUpdateSemesterDetailsMaster(null));
    };
    useEffect(() => {
        setSemesterDetailsData([...getSemesterDetailsListData]);
    }, [getSemesterDetailsListData]);

    return { semesterDetailsData, loadingSemesterDetails, setSemesterDetailsData };
};


