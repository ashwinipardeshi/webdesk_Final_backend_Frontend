import React, { FC, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { Box, Paper, Button } from "@mui/material";
import { ADD, UPDATE } from "../../../constant/statusCodes";
import { useNavigate } from "react-router-dom";
import {
    actions,
    getSaveUpdateProgramMaster,
    getbyIdProgramMaster
} from "../../../store/Master/programMaster";
import { useDispatch, useSelector } from "react-redux";
import MastersHeader from "../../../layouts/MastersHeader";
import { useParams } from "react-router-dom";
import { useMasterTableStyles } from "../../../assets/style/mastersTableStyle";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { StreamOptionHook } from "../../../hooks/masters/streamHooks";
import { InputController } from "../../../control/InputController";
import { SelectController } from "../../../control/SelectController";
import { ProgramTypeOptionHook } from "../../../hooks/masters/programTypeHooks";
import { CheckboxController } from "../../../control/CheckboxController";

const programSchema = yup.object({

    name: yup.string().matches(/^[a-zA-Z ]*$/, 'Enter characters only').required("Please enter program"),
    isActive: yup.boolean().default(false),
    programTypeId: yup.string().required("Please select program type"),
    streamId: yup.string().required("Please select stream"),
    shortName: yup.string().required("Please enter short name"),
    description: yup.string().default(""),

}).required()

const ProgramForm: FC = () => {
    const { optionProgramTypeData: ProgramTypeOption } = ProgramTypeOptionHook(true);
    const { optionStreamData: StreamOption } = StreamOptionHook(true);

    const { control, setValue, getValues, resetField, handleSubmit } = useForm({
        resolver: yupResolver(programSchema),
        defaultValues: {
            programTypeId: "",
            streamId: "",
            shortName: "",
            name: "",
            description: "",
            isActive: false,
        },
        mode: 'onChange'
    });

    const getSaveDetails = useSelector(getSaveUpdateProgramMaster);
    const getByIDProgramData = useSelector(getbyIdProgramMaster);
    const loaderStatus = useSelector(selectStatus);
    const navigate = useNavigate();
    const classes = useMasterTableStyles();
    const dispatch = useDispatch();
    const { id } = useParams();
    useEffect(() => {
        if (id) {
            const fetchGetbyIDProgramData = async () => {
                try {
                    dispatch(actions.loadGetByIdProgramMaster(parseInt(id)));
                } catch (error: any) { }
            };
            fetchGetbyIDProgramData();
        }
    }, [id, setValue]);

    useEffect(() => {
        if (id) {
            const setGetbyIDProgramData = async () => {
                try {
                    if (getByIDProgramData) {
                        setValue("name", getByIDProgramData.name);
                        setValue("programTypeId", getByIDProgramData.programTypeId);
                        setValue("shortName", getByIDProgramData.shortName);
                        setValue("streamId", getByIDProgramData.streamId);
                        setValue("description", getByIDProgramData.description);
                        setValue("isActive", getByIDProgramData.isActive);
                    }
                } catch (error: any) { }
            };
            setGetbyIDProgramData();
        }
    }, [getByIDProgramData]);

    const onSubmit = (data: any) => {
        id ? updateProgram() : addProgram();
    };

    const addProgram = () => {
        try {
            const request = {
                id: 0,
                isActive: getValues("isActive"),
                name: getValues("name").toUpperCase(),
                programTypeId: getValues("programTypeId"),
                streamId: getValues("streamId"),
                shortName: getValues("shortName"),
                description: getValues("description"),
            };
            dispatch(actions.loadSaveUpdateProgramMaster({ request, type: "ADD" }));
        } catch (error) { }
    };
    const updateProgram = () => {
        try {
            const request = {
                id: id,
                isActive: getValues("isActive"),
                name: getValues("name").toUpperCase(),
                programTypeId: getValues("programTypeId"),
                streamId: getValues("streamId"),
                shortName: getValues("shortName"),
                description: getValues("description"),
            };
            dispatch(actions.loadSaveUpdateProgramMaster({ request, type: "EDIT" }));
        } catch (error) { }
    };

    useEffect(() => {
        if (getSaveDetails) {
            const redirectToList = async () => {
                if (
                    (getSaveDetails && getSaveDetails.statusCode === ADD) ||
                    getSaveDetails.statusCode === UPDATE
                ) {
                    navigate("/program");
                }
            };
            redirectToList();
        }
    }, [getSaveDetails]);

    const navigateToProgramList = () => {
        dispatch(actions.setSaveUpdateProgramMaster(null));
        navigate("/program");
        setValue("name", "");
        setValue("shortName", "");
        setValue("description", "");
        setValue("isActive", false);
    };

    return (
        <>
            {loaderStatus === "loading" && <Loader />}
            <div>
                <MastersHeader
                    title={id ? "Edit Program" : "Add Program"}
                    BreadcrumbTitle={"Program"}
                    BreadcrumSubTitle={id ? "Edit Program" : "Add Program"}
                />
            </div>
            <Paper elevation={3} className={classes.PaperLayout}>
                <Box p={2} pt={0}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container mt={0} spacing={2}>
                            <Grid
                                item
                                container
                                alignItems={"center"}
                                justifyContent={"left"}
                                my={0}
                                xs={4}
                            >
                                <SelectController
                                    control={control}
                                    defaultValue=""
                                    name="streamId"
                                    label="Stream"
                                    options={StreamOption}
                                />
                            </Grid>

                            <Grid
                                item
                                container
                                alignItems={"center"}
                                justifyContent={"left"}
                                my={0}
                                xs={4}
                            >
                                <SelectController
                                    control={control}
                                    defaultValue=""
                                    name="programTypeId"
                                    label="Program Type"
                                    options={ProgramTypeOption}
                                />
                            </Grid>

                            <Grid item sm={4}>
                                <InputController control={control} name="name" label="Program" resetClick={() => resetField("name")} />
                            </Grid>

                            <Grid item sm={4}>
                                <InputController control={control} name="shortName" label="Short Name" resetClick={() => resetField("shortName")} />
                            </Grid>

                            <Grid item sm={4}>
                                <InputController control={control} name="description" label="Description" resetClick={() => resetField("description")} />
                            </Grid>

                            <Grid item sm={2}>
                                <CheckboxController control={control} name="isActive" label="Active" />
                            </Grid>

                            <Grid
                                item
                                container
                                alignItems={"left"}
                                justifyContent={"left"}
                                my={0}
                                xs={0}
                            ></Grid>

                            <Grid
                                item
                                container
                                alignItems={"center"}
                                justifyContent={"left"}
                                my={0}
                                xs={1}
                            >
                                {" "}
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.buttonLayout}
                                >
                                    Submit
                                </Button>
                            </Grid>

                            <Grid
                                item
                                container
                                alignItems={"center"}
                                justifyContent={"left"}
                                my={0}
                                xs={1}
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={navigateToProgramList}
                                    className={classes.buttonLayout}
                                >
                                    Back
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            container
                            alignItems={"center"}
                            justifyContent={"left"}
                            my={0}
                            xs={10}
                        ></Grid>
                    </form>
                </Box>
            </Paper>
        </>
    );
};

export default ProgramForm;
