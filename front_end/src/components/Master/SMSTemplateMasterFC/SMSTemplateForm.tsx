import React, { FC, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useForm, } from "react-hook-form";
import { Box, Paper, Button } from "@mui/material";
import { ADD, UPDATE } from "../../../constant/statusCodes";
import { useNavigate } from "react-router-dom";
import {
    actions,
    getSaveUpdateSMSTemplateMaster,
    getbyIdSMSTemplateMaster,
} from "../../../store/Master/smsTemplateMaster";
import { useDispatch, useSelector } from "react-redux";
import MastersHeader from "../../../layouts/MastersHeader";
import { useParams } from "react-router-dom";
import { useMasterTableStyles } from "../../../assets/style/mastersTableStyle";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { InputController, CheckboxController } from "../../../control";

const smsTemplateSchema = yup.object({
    smsTemplateName: yup.string().matches(/^[a-zA-Z ]*$/, 'Enter only characters').required("Please enter SMS Template Name"),
    template: yup.string().matches(/^[a-zA-Z ]*$/, 'Enter only characters').required("Please enter template"),
    isActive: yup.boolean().default(false),
}).required()

const SMSTemplateForm: FC = () => {
    const { control, setValue, getValues, handleSubmit, resetField } = useForm({
        resolver: yupResolver(smsTemplateSchema),
        defaultValues: {
            smsTemplateName: "",
            template: "",
            isActive: false,
        },
        mode: 'onChange'
    });
    const getSaveDetails = useSelector(getSaveUpdateSMSTemplateMaster);
    const getByIDSMSTemplateData = useSelector(getbyIdSMSTemplateMaster);
    const loaderStatus = useSelector(selectStatus);
    const navigate = useNavigate();
    const classes = useMasterTableStyles();
    const dispatch = useDispatch();
    const { id } = useParams();
    useEffect(() => {
        if (id) {
            const fetchGetbyIDSMSTemplateData = async () => {
                try {
                    dispatch(actions.loadGetByIdSMSTemplateMaster(parseInt(id)));
                } catch (error: any) { }
            };
            fetchGetbyIDSMSTemplateData();
        }
    }, [id, setValue]);

    useEffect(() => {
        if (id) {
            const setGetbyIDSMSTemplateData = async () => {
                try {
                    if (getByIDSMSTemplateData) {
                        setValue("smsTemplateName", getByIDSMSTemplateData.name);
                        setValue("template", getByIDSMSTemplateData.template);
                        setValue("isActive", getByIDSMSTemplateData.isActive);
                    }
                } catch (error: any) { }
            };
            setGetbyIDSMSTemplateData();
        }
    }, [getByIDSMSTemplateData]);

    const onSubmit = (data: any) => {
        id ? updateSMSTemplate() : addSMSTemplate();
    };
    const addSMSTemplate = () => {
        try {
            const request = {
                id: 0,
                isActive: getValues("isActive"),
                name: getValues("smsTemplateName").toUpperCase(),
                template: getValues("template"),
            };
            dispatch(actions.loadSaveUpdateSMSTemplateMaster({ request, type: "ADD" }));
        } catch (error) { }
    };
    const updateSMSTemplate = () => {
        try {
            const request = {
                id: id,
                isActive: getValues("isActive"),
                name: getValues("smsTemplateName").toUpperCase(),
                template: getValues("template"),
            };
            dispatch(actions.loadSaveUpdateSMSTemplateMaster({ request, type: "EDIT" }));
        } catch (error) { }
    };

    useEffect(() => {
        if (getSaveDetails) {
            const redirectToList = async () => {
                if (
                    (getSaveDetails && getSaveDetails.statusCode === ADD) ||
                    getSaveDetails.statusCode === UPDATE
                ) {
                    navigate("/sms-template");
                }
            };
            redirectToList();
        }
    }, [getSaveDetails]);

    const navigateToSMSTemplateList = () => {
        dispatch(actions.setSaveUpdateSMSTemplateMaster(null));
        navigate("/sms-template");
        setValue("smsTemplateName", "");
        setValue("template", "");
        setValue("isActive", false);
    };

    return (
        <>
            {loaderStatus === "loading" && <Loader />}
            <div>
                <MastersHeader
                    title={id ? "Edit SMS Template" : "Add SMS Template"}
                    BreadcrumbTitle={"SMS Template"}
                    BreadcrumSubTitle={id ? "Edit SMS Template" : "Add SMS Template"}
                />
                {/* <!-- /breadcrumb --> */}
            </div>
            <Paper elevation={3} className={classes.PaperLayout}>
                <Box p={3} pt={0}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={3} alignItems={'center'} my={3}>
                            <Grid item sm={4}>
                                <InputController control={control} name="smsTemplateName" label="SMS Template" resetClick={() => resetField("smsTemplateName")} />
                            </Grid>
                            <Grid item sm={4}>
                                <InputController control={control} name="template" label="Template" resetClick={() => resetField("template")} />
                            </Grid>
                            <Grid item sm={2}>
                                <CheckboxController control={control} name="isActive" label="Active" />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid container item sm={4} gap={1}>
                                <Box>
                                    <Button type="submit" variant="contained" className={classes.buttonLayout}>
                                        Submit
                                    </Button>
                                </Box>
                                <Box>
                                    <Button variant="outlined" onClick={navigateToSMSTemplateList}>
                                        Back
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Paper>
        </>
    );
};

export default SMSTemplateForm;
