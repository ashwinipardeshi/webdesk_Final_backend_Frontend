import { useEffect, useState } from "react";
import { IApplicationRejectReasons } from "../../interfaces/Master";
import { useDispatch, useSelector } from "react-redux";
import {
    actions,
    getAllApplicationRejectReasonMaster,
    getOptionApplicationRejectReasonMaster,
} from "../../store/Master/applicationRejectReasonMaster";

export function ApplicationRejectReasonHook(loadingApplicationRejectReason: boolean) {
    const [data, setData] = useState<IApplicationRejectReasons[]>([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const getApplicationRejectReasonListData = useSelector(getAllApplicationRejectReasonMaster);
    useEffect(() => {
        const fetchData = async () => {
            try {
                clearPreviousData();
                dispatch(actions.load());
            } catch (error: any) {
                setData([]);
            }
        };
        if (loadingApplicationRejectReason) {
            fetchData();
        }
    }, [loadingApplicationRejectReason, dispatch]);

    const clearPreviousData = () => {
        dispatch(actions.setGetByIdApplicationRejectReasonMaster(null));
        dispatch(actions.setSaveUpdateApplicationRejectReasonMaster(null));
    };
    useEffect(() => {
        if (getApplicationRejectReasonListData && getApplicationRejectReasonListData.length > 0) {
            setData([...getApplicationRejectReasonListData]);
        }
    }, [getApplicationRejectReasonListData]);

    return { data, loading, setData };
}

export function ApplicationRejectReasonOptionHook(loadingApplicationRejectReason: boolean) {
    const [optionApplicationRejectReasonData, setOptionApplicationRejectReasonData] = useState<
        IApplicationRejectReasons[]
    >([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const getOptionApplicationRejectReasonListData = useSelector(
        getOptionApplicationRejectReasonMaster
    );
    useEffect(() => {
        const fetchData = async () => {
            try {
                clearPreviousData();
                dispatch(actions.loadOptionsApplicationRejectReason());
            } catch (error: any) {
                setOptionApplicationRejectReasonData([]);
            }
        };
        if (loadingApplicationRejectReason) {
            fetchData();
        }
    }, [loadingApplicationRejectReason, dispatch]);

    const clearPreviousData = () => {
        dispatch(actions.setGetByIdApplicationRejectReasonMaster(null));
        dispatch(actions.setSaveUpdateApplicationRejectReasonMaster(null));
    };
    useEffect(() => {
        setOptionApplicationRejectReasonData([...getOptionApplicationRejectReasonListData]);
    }, [getOptionApplicationRejectReasonListData]);

    return { optionApplicationRejectReasonData, loading, setOptionApplicationRejectReasonData };
}
