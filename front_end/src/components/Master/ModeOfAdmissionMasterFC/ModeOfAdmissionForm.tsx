import React, { FC, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { Box, Paper, Button } from "@mui/material";
import { ADD, UPDATE } from "../../../constant/statusCodes";
import { useNavigate } from "react-router-dom";
import {
    actions,
    getSaveUpdateModeOfAdmissionMaster,
    getbyIdModeOfAdmissionMaster,
} from "../../../store/Master/modeOfAdmissionMaster";
import { useDispatch, useSelector } from "react-redux";
import MastersHeader from "../../../layouts/MastersHeader";
import { useParams } from "react-router-dom";
import { useMasterTableStyles } from "../../../assets/style/mastersTableStyle";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { InputController, CheckboxController } from "../../../control";

const admissionModeSchema = yup.object({
    admissionModeName: yup
        .string()
        .matches(/^[a-zA-Z0-9 ]*$/, 'Characters or numbers allowed only')
        .required('Please enter admission mode'),
    isActive: yup.boolean().default(false),
}).required()

const ModeOfAdmissionForm: FC = () => {
    const { control, setValue, getValues, handleSubmit, resetField } = useForm({
        resolver: yupResolver(admissionModeSchema),
        defaultValues: {
            admissionModeName: "",
            isActive: false,
        },
        mode: 'onChange'
    });
    const getSaveDetails = useSelector(getSaveUpdateModeOfAdmissionMaster);
    const loaderStatus = useSelector(selectStatus);
    const getByIDModeOfAdmissionData = useSelector(getbyIdModeOfAdmissionMaster);
    const navigate = useNavigate();
    const classes = useMasterTableStyles();
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const fetchGetbyIDModeOfAdmissionData = async () => {
                try {
                    dispatch(actions.loadGetByIdModeOfAdmissionMaster(parseInt(id)));
                } catch (error: any) { }
            };
            fetchGetbyIDModeOfAdmissionData();
        }
    }, [id, setValue]);

    useEffect(() => {
        if (id) {
            const setGetbyIDModeOfAdmissionData = async () => {
                try {
                    if (getByIDModeOfAdmissionData) {
                        setValue("admissionModeName", getByIDModeOfAdmissionData.name);
                        setValue("isActive", getByIDModeOfAdmissionData.isActive);
                    }
                } catch (error: any) { }
            };
            setGetbyIDModeOfAdmissionData();
        }
    }, [getByIDModeOfAdmissionData]);

    const onSubmit = (data: any) => {
        id ? updateModeOfAdmission() : addModeOfAdmission();
    };
    const addModeOfAdmission = () => {
        try {
            const request = {
                id: 0,
                isActive: getValues("isActive"),
                name: getValues("admissionModeName").toUpperCase(),
            };
            dispatch(actions.loadSaveUpdateModeOfAdmissionMaster({ request, type: "ADD" }));
        } catch (error) { }
    };
    const updateModeOfAdmission = () => {
        try {
            const request = {
                id: id,
                isActive: getValues("isActive"),
                name: getValues("admissionModeName").toUpperCase(),
            };
            dispatch(actions.loadSaveUpdateModeOfAdmissionMaster({ request, type: "EDIT" }));
        } catch (error) { }
    };

    useEffect(() => {
        if (getSaveDetails) {
            const redirectToList = async () => {
                if (
                    (getSaveDetails && getSaveDetails.statusCode === ADD) ||
                    getSaveDetails.statusCode === UPDATE
                ) {
                    navigate("/admission-mode");
                }
            };
            redirectToList();
        }
    }, [getSaveDetails]);

    const navigateToModeOfAdmissionList = () => {
        dispatch(actions.setSaveUpdateModeOfAdmissionMaster(null));
        dispatch(actions.loadGetByIdModeOfAdmissionMaster(null));
        navigate("/admission-mode");
        setValue("admissionModeName", "");
        setValue("isActive", false);
    };

    return (
        <>
            {loaderStatus === "loading" && <Loader />}
            <div>
                <MastersHeader
                    title={id ? "Edit Mode Of Admission" : "Add Mode Of Admission"}
                    BreadcrumbTitle={"Mode Of Admission"}
                    BreadcrumSubTitle={id ? "Edit Mode Of Admission" : "Add Mode Of Admission"}
                />
                {/* <!-- /breadcrumb --> */}
            </div>
            <Paper elevation={3} className={classes.PaperLayout}>
                <Box p={3} pt={0}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={3} alignItems={'center'} my={3}>
                            <Grid item sm={4}>
                                <InputController control={control} name="admissionModeName" label="Mode Of Admission" resetClick={() => resetField("admissionModeName")} />
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
                                    <Button variant="outlined" onClick={navigateToModeOfAdmissionList}>
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

export default ModeOfAdmissionForm;