import { useEffect, useState } from "react";
import { ISMSTemplateMaster } from "../../interfaces/Master";
import { useDispatch, useSelector } from "react-redux";
import { 
    actions,
    getOptionSMSTemplateMaster,
    getAllSMSTemplateMaster,
} from "../../store/Master/smsTemplateMaster";


export function SMSTemplateHook(loadingSMSTemplate: boolean) {
    const [data, setData] = useState<ISMSTemplateMaster[]>([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const getSMSTemplateListData = useSelector(getAllSMSTemplateMaster);
    useEffect(() => {
        const fetchData = async () => {
            try {
                clearPreviousData();
                dispatch(actions.load());
            } catch (error: any) {
                console.error("Error while fetching data:", error);
                setData([]);
            }
        };
        if (loadingSMSTemplate) {
            fetchData();
        }
    }, [loadingSMSTemplate,dispatch]);

    const clearPreviousData = () => {
        dispatch(actions.setGetByIdSMSTemplateMaster(null));
        dispatch(actions.setSaveUpdateSMSTemplateMaster(null));
    };
    useEffect(() => {
        setData([...getSMSTemplateListData]);
    }, [getSMSTemplateListData]);

    return { data, loading, setData };
}


export function SMSTemplateOptionHook(loadingSMSTemplate: boolean) {
    const [optionSMSTemplateData, setOptionSMSTemplateData] = useState<ISMSTemplateMaster[]>([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const getOptionSMSTemplateListData = useSelector(getOptionSMSTemplateMaster);
    useEffect(() => {
        const fetchData = async () => {
            try {
                clearPreviousData();
                dispatch(actions.loadOptions());
            } catch (error: any) {
                setOptionSMSTemplateData([]);
            }
        };
        if (loadingSMSTemplate) {
            fetchData();
        }
    }, [loadingSMSTemplate,dispatch]);

    const clearPreviousData = () => {
        dispatch(actions.setGetByIdSMSTemplateMaster(null));
        dispatch(actions.setSaveUpdateSMSTemplateMaster(null));     
    };
    useEffect(() => {
        setOptionSMSTemplateData([...getOptionSMSTemplateListData]);
    }, [getOptionSMSTemplateListData]);

    return { optionSMSTemplateData, loading, setOptionSMSTemplateData };
}

