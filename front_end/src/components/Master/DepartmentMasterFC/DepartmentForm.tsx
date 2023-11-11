import React, { FC, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { Box, Paper, Button, } from "@mui/material";
import { ADD, UPDATE } from "../../../constant/statusCodes";
import { useNavigate } from "react-router-dom";
import {
    actions,
    getSaveUpdateDepartmentMaster,
    getbyIdDepartmentMaster,
} from "../../../store/Master/departmentMaster";
import { useDispatch, useSelector } from "react-redux";
import MastersHeader from "../../../layouts/MastersHeader";
import { useParams } from "react-router-dom";
import { useMasterTableStyles } from "../../../assets/style/mastersTableStyle";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";
import { DepartmentOptionHook } from "../../../hooks/masters/departmentHooks";
import { SelectController } from "../../../control/SelectController";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputController, CheckboxController } from "../../../control";

const departmentSchema = yup
    .object({
        name: yup
            .string()
            .matches(/^[a-zA-Z ]*$/, "Enter characters only")
            .required("Please enter department"),
        isActive: yup.boolean().default(false),
        description: yup
            .string()
            .required("Please enter description"),
        parentId: yup.string().required("Please select parent"),
    })
    .required();

const DepartmentForm: FC = () => {

    const { optionDepartmentData: Departmentsoption } = DepartmentOptionHook(true);
    if (Departmentsoption.length > 0) {
    }
    const { control, setValue, getValues, reset, resetField, handleSubmit } = useForm({
        resolver: yupResolver(departmentSchema),
        defaultValues: {
            description: "",
            name: "",
            isActive: false,
            parentId: "",
        },
        mode: "onChange",
    });
    const getSaveDetails = useSelector(getSaveUpdateDepartmentMaster);
    const getByIDDepartmentData = useSelector(getbyIdDepartmentMaster);
    const loaderStatus = useSelector(selectStatus);
    const navigate = useNavigate();
    const classes = useMasterTableStyles();
    const dispatch = useDispatch();
    const { id } = useParams();
    const numericId = id ? +id : undefined;

    useEffect(() => {
        if (id) {
            const fetchGetbyIDDepartmentData = async () => {
                try {
                    dispatch(actions.loadGetByIdDepartmentMaster(parseInt(id)));
                } catch (error: any) { }
            };
            fetchGetbyIDDepartmentData();
        }
    }, [id, setValue]);

    useEffect(() => {
        if (id) {
            const setGetbyIDDepartmentData = async () => {
                try {
                    if (getByIDDepartmentData) {
                        setValue("name", getByIDDepartmentData.name || "");
                        setValue("description", getByIDDepartmentData.description || "");
                        setValue("isActive", getByIDDepartmentData.isActive);
                        setValue("parentId", getByIDDepartmentData.parentId);
                    }
                } catch (error: any) { }
            };
            setGetbyIDDepartmentData();
        }
    }, [getByIDDepartmentData, id, setValue]);

    const onSubmit = (data: any) => {
        id ? updateDepartment() : addDepartment();
    };

    const addDepartment = () => {
        try {
            const request = {
                id: 0,
                description: getValues("description"),
                parentId: getValues("parentId"),
                isActive: getValues("isActive"),
                name: getValues("name").toUpperCase(),
            };
            dispatch(
                actions.loadSaveUpdateDepartmentMaster({ request, type: "ADD" })
            );
        } catch (error) {
        }
    };
    const updateDepartment = () => {
        try {

            const request = {
                id: numericId,
                description: getValues("description"),
                parentId: getValues("parentId"),
                isActive: getValues("isActive"),
                name: getValues("name").toUpperCase(),
            };
            dispatch(
                actions.loadSaveUpdateDepartmentMaster({ request, type: "EDIT" })
            );
        } catch (error) { }
    };

    useEffect(() => {
        if (getSaveDetails) {
            const redirectToList = async () => {
                if (
                    (getSaveDetails && getSaveDetails.statusCode === ADD) ||
                    getSaveDetails.statusCode === UPDATE
                ) {
                    navigate("/department");
                }
            };
            redirectToList();
        }
    }, [getSaveDetails]);

    const navigateToDepartmentList = () => {
        dispatch(actions.setSaveUpdateDepartmentMaster(null));
        navigate("/department");
        setValue("name", "");
        setValue("isActive", false);
    };

    return (
        <>
            {loaderStatus === "loading" && <Loader />}
            <div>
                <MastersHeader
                    title={id ? "Edit Department" : "Add Department"}
                    BreadcrumbTitle={"Department"}
                    BreadcrumSubTitle={id ? "Edit Department" : "Add Department"}
                />
            </div>

            <Paper elevation={3} className={classes.PaperLayout}>
                <Box p={3} pt={0}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={3} alignItems={"center"} my={3}>
                            <Grid item sm={4}>
                                <InputController
                                    control={control}
                                    name="name"
                                    label="Department"
                                    resetClick={() => resetField("name")}
                                />
                            </Grid>
                            <Grid item sm={4}>
                                <InputController
                                    control={control}
                                    name="description"
                                    label="Description"
                                    resetClick={() => resetField("description")}
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
                                    name="parentId"
                                    label="Parent"
                                    options={Departmentsoption}
                                />
                            </Grid>
                            <Grid item sm={2}>
                                <CheckboxController
                                    control={control}
                                    name="isActive"
                                    label="Active"
                                />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid container item sm={4} gap={1}>
                                <Box>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        className={classes.buttonLayout}
                                    >
                                        Submit
                                    </Button>
                                </Box>
                                <Box>
                                    <Button variant="outlined" onClick={navigateToDepartmentList}>
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

export default DepartmentForm;
