import { useEffect, useState } from "react";
import { ISMTPConfigMaster } from "../../interfaces/Master/ISMTPConfigMaster";
import { useDispatch, useSelector } from "react-redux";
import { 
    actions,
    getAllSMTPConfigMaster,
    getOptionSMTPConfigMaster,
 } from "../../store/Master/smtpConfigMaster";

 export function SMTPConfigHook(loadingSMTPConfig: boolean) {
    const [data, setData] = useState<ISMTPConfigMaster[]>([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const getSMTPConfigListData = useSelector(getAllSMTPConfigMaster);
    useEffect(() => {
        const fetchData = async () => {
            try {
                clearPreviousData();
                dispatch(actions.load());
            } catch (error: any) {
                setData([]);
            }
        };
        if (loadingSMTPConfig) {
            fetchData();
        }
    }, [loadingSMTPConfig,dispatch]);

    const clearPreviousData = () => {
        dispatch(actions.setGetByIdSMTPConfigMaster(null));
        dispatch(actions.setSaveUpdateSMTPConfigMaster(null));
    };
    useEffect(() => {
        setData([...getSMTPConfigListData]);
    }, [getSMTPConfigListData]);

    return { data, loading, setData };
}

export function SMTPConfigOptionHook(loadingSMTPConfig: boolean) {
    const [optionSMTPConfigData, setOptionSMTPConfigData] = useState<ISMTPConfigMaster[]>([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const getOptionSMTPConfigListData = useSelector(getOptionSMTPConfigMaster);
    useEffect(() => {
        const fetchData = async () => {
            try {
                clearPreviousData();
                dispatch(actions.loadOptions());
            } catch (error: any) {
                setOptionSMTPConfigData([]);
            }
        };
        if (loadingSMTPConfig) {
            fetchData();
        }
    }, [loadingSMTPConfig,dispatch]);

    const clearPreviousData = () => {
        dispatch(actions.setGetByIdSMTPConfigMaster(null));
        dispatch(actions.setSaveUpdateSMTPConfigMaster(null));     
    };
    useEffect(() => {
        setOptionSMTPConfigData([...getOptionSMTPConfigListData]);
    }, [getOptionSMTPConfigListData]);

    return { optionSMTPConfigData, loading, setOptionSMTPConfigData };
}