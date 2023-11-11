import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    actions,
    getAllOnlineAdmissionStudentDetails
} from "../../../store/Admission/onlineAdmission/onlineAdmissionApproval";

export const OnlineAdmissionStudentDetailsHook = (loadingOnlineAdmissionStudentDetails: boolean) => {
    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const getOnlineApprovalListData = useSelector(getAllOnlineAdmissionStudentDetails);
    useEffect(() => {
        const fetchData = async () => {
            try {
                clearPreviousData();
                dispatch(actions.load());
            } catch (error: any) {
                setData([]);
            }
        };
        if (loadingOnlineAdmissionStudentDetails) {
            fetchData();
        }
    }, [loadingOnlineAdmissionStudentDetails]);
    const clearPreviousData = () => {
        dispatch(actions.setUpdateOnlineAdmissionConfirmation(null));
        dispatch(actions.setUpdateOnlineAdmissionReject(null));
        dispatch(actions.setUpdateOnlineAdmissionStatusUpdate(null));
    };
    useEffect(() => {
        setData(getOnlineApprovalListData);
        // console.log(data);
    }, [getOnlineApprovalListData]);

    return { data, loading, setData };
};


