import React, { FC, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useForm, Controller } from "react-hook-form";
import { Box, Paper, TextField, Button, IconButton } from "@mui/material";
import { ADD, UPDATE } from "../../../constant/statusCodes";
import { useNavigate } from "react-router-dom";
import {
    actions,
    getSaveUpdateAccreditationMaster,
    getbyIdAccreditationMaster
} from "../../../store/Master/accreditationMaster";
import { StreamOptionHook } from "../../../hooks/masters/streamHooks";
import { SelectController } from "../../../control/SelectController";
import { useDispatch, useSelector } from "react-redux";
import MastersHeader from "../../../layouts/MastersHeader";
import { CheckboxController } from "../../../control/CheckboxController";
import { InputController } from "../../../control/InputController";
import { useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useMasterTableStyles } from "../../../assets/style/mastersTableStyle";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";

const accreditationSchema = yup.object({

    name: yup.string().matches(/^[a-zA-Z ]*$/, 'Enter characters only').required("Please enter accreditation name"),
    isActive: yup.boolean().default(false),
    streamId: yup.string().required("Please select stream"),
    year: yup.string().required("Please enter year")
        .when('$year', (year, schema) => {
            return (year && year.length)
                ? schema.matches(/^[0-9]+$/, 'Enter numbers only')
                : schema;
        }),
    grade: yup.string().required("Please enter grade"),
    validTill: yup.string().default(""),

}).required()

const AccreditationForm: FC = () => {

    const { optionStreamData: Streamoption } = StreamOptionHook(true);
    const { control, setValue, getValues, reset, resetField, handleSubmit } = useForm({
        resolver: yupResolver(accreditationSchema),
        defaultValues: {
            name: "",
            streamId: "",
            validTill: "",
            year: "",
            grade: "",
            isActive: false,
        },
    });
    const getSaveDetails = useSelector(getSaveUpdateAccreditationMaster);
    const getByIDAccreditationData = useSelector(getbyIdAccreditationMaster);
    const loaderStatus = useSelector(selectStatus);
    const navigate = useNavigate();
    const classes = useMasterTableStyles();
    const dispatch = useDispatch();
    const { id } = useParams();
    useEffect(() => {
        if (id) {
            const fetchGetbyIDAccreditationData = async () => {
                try {
                    dispatch(actions.loadGetByIdAccreditationMaster(parseInt(id)));
                } catch (error: any) { }
            };
            fetchGetbyIDAccreditationData();
        }
    }, [id, setValue]);

    useEffect(() => {
        if (id) {
            const setGetbyIDAccreditationData = async () => {
                try {
                    if (getByIDAccreditationData) {
                        setValue("name", getByIDAccreditationData.name);
                        setValue("validTill", getByIDAccreditationData.validTill || "");
                        setValue("year", getByIDAccreditationData.year);
                        setValue("streamId", getByIDAccreditationData.streamId);
                        setValue("grade", getByIDAccreditationData.grade);
                        setValue("isActive", getByIDAccreditationData.isActive);
                    }
                } catch (error: any) { }
            };
            setGetbyIDAccreditationData();
        }
    }, [getByIDAccreditationData]);

    const onSubmit = (data: any) => {
        id ? updateAccreditation() : addAccreditation();
    };
    const addAccreditation = () => {
        try {
            const request = {
                id: 0,
                isActive: getValues("isActive"),
                name: getValues("name").toUpperCase(),
                streamId: getValues("streamId"),
                year: getValues("year"),
                grade: getValues("grade"),
                validTill: getValues("validTill"),
            };
            dispatch(actions.loadSaveUpdateAccreditationMaster({ request, type: "ADD" }));
        } catch (error) { }
    };
    const updateAccreditation = () => {
        try {
            const request = {
                id: id,
                isActive: getValues("isActive"),
                name: getValues("name").toUpperCase(),
                streamId: getValues("streamId"),
                year: getValues("year"),
                grade: getValues("grade"),
                validTill: getValues("validTill"),

            };
            dispatch(actions.loadSaveUpdateAccreditationMaster({ request, type: "EDIT" }));
        } catch (error) { }
    };

    useEffect(() => {
        if (getSaveDetails) {
            const redirectToList = async () => {
                if (
                    (getSaveDetails && getSaveDetails.statusCode === ADD) ||
                    getSaveDetails.statusCode === UPDATE
                ) {
                    navigate("/accreditation");
                }
            };
            redirectToList();
        }
    }, [getSaveDetails]);

    const navigateToAccreditationList = () => {
        dispatch(actions.setSaveUpdateAccreditationMaster(null));
        navigate("/accreditation");
        setValue("name", "");
        setValue("grade", "");
        setValue("year", "");
        setValue("isActive", false);
    };

    return (
        <>
            {loaderStatus === "loading" && <Loader />}
            <div>
                <MastersHeader
                    title={id ? "Edit Accreditation" : "Add Accreditation"}
                    BreadcrumbTitle={"Accreditation"}
                    BreadcrumSubTitle={id ? "Edit Accreditation" : "Add Accreditation"}
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
                                    options={Streamoption}
                                />
                            </Grid>

                            <Grid item sm={4}>
                                <InputController control={control} name="year" label="Year" resetClick={() => resetField("year")} />
                            </Grid>

                            <Grid item sm={4}>
                                <InputController control={control} name="grade" label="Grade" resetClick={() => resetField("grade")} />
                            </Grid>

                            <Grid
                                item
                                container
                                alignItems={"center"}
                                justifyContent={"left"}
                                style={{ marginTop: 0 }}
                                my={0}
                                xs={4}
                            >
                                <Controller
                                    render={({ field: any }) => (
                                        <TextField
                                            fullWidth
                                            size="small"
                                            type="date"
                                            label="Valid Till"
                                            id="validTill"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            value={getValues("validTill")}
                                            onChange={(e) => setValue("validTill", e.target.value)}
                                            InputProps={{
                                                endAdornment: (
                                                    <IconButton
                                                        size="small"
                                                        onClick={() =>
                                                            reset({ validTill: "", isActive: false })
                                                        }
                                                        disabled={id ? true : false}
                                                    >
                                                        <CloseIcon fontSize="small" />
                                                    </IconButton>
                                                ),
                                            }}
                                        />
                                    )}
                                    name="validTill"
                                    control={control}
                                    defaultValue=""
                                />
                            </Grid>

                            <Grid item sm={4}>
                                <InputController control={control} name="name" label="Accreditation" resetClick={() => resetField("name")} />
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
                                    variant="outlined"
                                    color="primary"
                                    onClick={navigateToAccreditationList}
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

export default AccreditationForm;

