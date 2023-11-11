import React, { FC, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { Box, Paper, Button } from "@mui/material";
import { ADD, UPDATE } from "../../../constant/statusCodes";
import { useNavigate } from "react-router-dom";
import {
    actions,
    getSaveUpdateEvaluationMaster,
    getbyIdEvaluationMaster,
} from "../../../store/Master/evaluationMaster";
import { useDispatch, useSelector } from "react-redux";
import MastersHeader from "../../../layouts/MastersHeader";
import { useParams } from "react-router-dom";
import { useMasterTableStyles } from "../../../assets/style/mastersTableStyle";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { InputController, CheckboxController } from "../../../control";

const evaluationSchema = yup.object({
    evaluationName: yup.string().matches(/^[a-zA-Z ]*$/, 'Enter only characters').required("Please enter evaluation"),
    isActive: yup.boolean().default(false),
}).required()

const EvaluationForm: FC = () => {
    const { control, setValue, getValues, handleSubmit, resetField } = useForm({
        resolver: yupResolver(evaluationSchema),
        defaultValues: {
            evaluationName: "",
            isActive: false,
        },
        mode: 'onChange'
    });
    const getSaveDetails = useSelector(getSaveUpdateEvaluationMaster);
    const loaderStatus = useSelector(selectStatus);
    const getByIDEvaluationData = useSelector(getbyIdEvaluationMaster);
    const navigate = useNavigate();
    const classes = useMasterTableStyles();
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const fetchGetbyIDEvaluationData = async () => {
                try {
                    dispatch(actions.loadGetByIdEvaluationMaster(parseInt(id)));
                } catch (error: any) { }
            };
            fetchGetbyIDEvaluationData();
        }
    }, [id, setValue]);

    useEffect(() => {
        if (id) {
            const setGetbyIDEvaluationData = async () => {
                try {
                    if (getByIDEvaluationData) {
                        setValue("evaluationName", getByIDEvaluationData.name);
                        setValue("isActive", getByIDEvaluationData.isActive);
                    }
                } catch (error: any) { }
            };
            setGetbyIDEvaluationData();
        }
    }, [getByIDEvaluationData]);

    const onSubmit = (data: any) => {
        id ? updateEvaluation() : addEvaluation();
    };
    const addEvaluation = () => {
        try {
            const request = {
                id: 0,
                isActive: getValues("isActive"),
                name: getValues("evaluationName").toUpperCase(),
            };
            dispatch(actions.loadSaveUpdateEvaluationMaster({ request, type: "ADD" }));
        } catch (error) { }
    };
    const updateEvaluation = () => {
        try {
            const request = {
                id: id,
                isActive: getValues("isActive"),
                name: getValues("evaluationName").toUpperCase(),
            };
            dispatch(actions.loadSaveUpdateEvaluationMaster({ request, type: "EDIT" }));
        } catch (error) { }
    };

    useEffect(() => {
        if (getSaveDetails) {
            const redirectToList = async () => {
                if (
                    (getSaveDetails && getSaveDetails.statusCode === ADD) ||
                    getSaveDetails.statusCode === UPDATE
                ) {
                    navigate("/evaluation");
                }
            };
            redirectToList();
        }
    }, [getSaveDetails]);

    const navigateToEvaluationList = () => {
        dispatch(actions.setSaveUpdateEvaluationMaster(null));
        dispatch(actions.loadGetByIdEvaluationMaster(null));
        navigate("/evaluation");
        setValue("evaluationName", "");
        setValue("isActive", false);
    };

    return (
        <>
            {loaderStatus === "loading" && <Loader />}
            <div>
                <MastersHeader
                    title={id ? "Edit Evaluation" : "Add Evaluation"}
                    BreadcrumbTitle={"Evaluation"}
                    BreadcrumSubTitle={id ? "Edit Evaluation" : "Add Evaluation"}
                />
                {/* <!-- /breadcrumb --> */}
            </div>
            <Paper elevation={3} className={classes.PaperLayout}>
                <Box p={3} pt={0}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={3} alignItems={'center'} my={3}>
                            <Grid item sm={4}>
                                <InputController control={control} name="evaluationName" label="Evaluation" resetClick={() => resetField("evaluationName")} />
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
                                    <Button variant="outlined" onClick={navigateToEvaluationList}>
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

export default EvaluationForm;