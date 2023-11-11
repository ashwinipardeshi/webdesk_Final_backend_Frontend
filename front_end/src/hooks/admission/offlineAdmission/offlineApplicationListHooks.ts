import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    actions,
    getAllOfflineAdmissionStudentDetails
} from "../../../store/Admission/offlineAdmission/offlineAdmissionList";

export const OfflineAdmissionStudentDetailsHook = (loadingOfflineAdmissionStudentDetails: boolean) => {
    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const getOfflineApplicationListData = useSelector(getAllOfflineAdmissionStudentDetails);
    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(actions.load());
            } catch (error: any) {
                setData([]);
            }
        };
        if (loadingOfflineAdmissionStudentDetails) {
            fetchData();
        }
    }, [loadingOfflineAdmissionStudentDetails]);
    useEffect(() => {
        setData(getOfflineApplicationListData);
    }, [getOfflineApplicationListData]);

    return { data, loading, setData };
};


