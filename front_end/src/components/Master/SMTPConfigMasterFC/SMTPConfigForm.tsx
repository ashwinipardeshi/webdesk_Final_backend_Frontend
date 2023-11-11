import React, { FC, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { Box, Paper, Button } from "@mui/material";
import { ADD, UPDATE } from "../../../constant/statusCodes";
import { useNavigate } from "react-router-dom";
import {
    actions,
    getSaveUpdateSMTPConfigMaster,
    getbyIdSMTPConfigMaster,
} from "../../../store/Master/smtpConfigMaster";
import { useDispatch, useSelector } from "react-redux";
import MastersHeader from "../../../layouts/MastersHeader";
import { useParams } from "react-router-dom";
import { useMasterTableStyles } from "../../../assets/style/mastersTableStyle";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { InputController, CheckboxController } from "../../../control";

const smtpConfigSchema = yup.object({
    smtpConfigName: yup.string().matches(/^[a-zA-Z0-9]*$/, 'Enter only characters').required("Please enter SMTP Config"),
    isActive: yup.boolean().default(false),
}).required()


const SMTPConfigForm: FC = () => {
    const { control, setValue, getValues, handleSubmit, resetField } = useForm({
        resolver: yupResolver(smtpConfigSchema),
        defaultValues: {
            smtpConfigName: "",
            isActive: false,
        },
        mode: 'onChange'
    });
    const getSaveDetails = useSelector(getSaveUpdateSMTPConfigMaster);
    const loaderStatus = useSelector(selectStatus);
    const getByIDSMTPConfigData = useSelector(getbyIdSMTPConfigMaster);
    const navigate = useNavigate();
    const classes = useMasterTableStyles();
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const fetchGetbyIDSMTPConfigData = async () => {
                try {
                    dispatch(actions.loadGetByIdSMTPConfigMaster(parseInt(id)));
                } catch (error: any) { }
            };
            fetchGetbyIDSMTPConfigData();
        }
    }, [id, setValue]);

    useEffect(() => {
        if (id) {
            const setGetbyIDSMTPConfigData = async () => {
                try {
                    if (getByIDSMTPConfigData) {
                        setValue("smtpConfigName", getByIDSMTPConfigData.name);
                        setValue("isActive", getByIDSMTPConfigData.isActive);
                    }
                } catch (error: any) { }
            };
            setGetbyIDSMTPConfigData();
        }
    }, [getByIDSMTPConfigData]);

    const onSubmit = (data: any) => {
        id ? updateSMTPConfig() : addSMTPConfig();
    };
    const addSMTPConfig = () => {
        try {
            const request = {
                id: 0,
                isActive: getValues("isActive"),
                name: getValues("smtpConfigName").toUpperCase(),
            };
            dispatch(actions.loadSaveUpdateSMTPConfigMaster({ request, type: "ADD" }));
        } catch (error) { }
    };
    const updateSMTPConfig = () => {
        try {
            const request = {
                id: id,
                isActive: getValues("isActive"),
                name: getValues("smtpConfigName").toUpperCase(),
            };
            dispatch(actions.loadSaveUpdateSMTPConfigMaster({ request, type: "EDIT" }));
        } catch (error) { }
    };

    useEffect(() => {
        if (getSaveDetails) {
            const redirectToList = async () => {
                if (
                    (getSaveDetails && getSaveDetails.statusCode === ADD) ||
                    getSaveDetails.statusCode === UPDATE
                ) {
                    navigate("/smtp-config");
                }
            };
            redirectToList();
        }
    }, [getSaveDetails]);

    const navigateToSMTPConfigList = () => {
        dispatch(actions.setSaveUpdateSMTPConfigMaster(null));
        dispatch(actions.loadGetByIdSMTPConfigMaster(null));
        navigate("/smtp-config");
        setValue("smtpConfigName", "");
        setValue("isActive", false);
    };

    return (
        <>
            {loaderStatus === "loading" && <Loader />}
            <div>
                <MastersHeader
                    title={id ? "Edit SMTP Config" : "Add SMTP Config"}
                    BreadcrumbTitle={"SMTP Config"}
                    BreadcrumSubTitle={id ? "Edit SMTP Config" : "Add SMTP Config"}
                />
                {/* <!-- /breadcrumb --> */}
            </div>
            <Paper elevation={3} className={classes.PaperLayout}>
                <Box p={3} pt={0}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={3} alignItems={'center'} my={3}>
                            <Grid item sm={4}>
                                <InputController control={control} name="smtpConfigName" label="SMTP Config" resetClick={() => resetField("smtpConfigName")} />
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
                                    <Button variant="outlined" onClick={navigateToSMTPConfigList}>
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

export default SMTPConfigForm;
