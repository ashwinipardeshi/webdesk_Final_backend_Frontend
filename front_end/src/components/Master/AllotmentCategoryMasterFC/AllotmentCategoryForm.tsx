import React, { FC, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useForm, } from "react-hook-form";
import { Box, Paper, Button } from "@mui/material";
import { ADD, UPDATE } from "../../../constant/statusCodes";
import { useNavigate } from "react-router-dom";
import {
    actions,
    getSaveUpdateAllotmentCategoryMaster,
    getbyIdAllotmentCategoryMaster,
} from "../../../store/Master/allotmentCategoryMaster";
import { useDispatch, useSelector } from "react-redux";
import MastersHeader from "../../../layouts/MastersHeader";
import { useParams } from "react-router-dom";
import { useMasterTableStyles } from "../../../assets/style/mastersTableStyle";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { InputController, CheckboxController } from "../../../control";

const allotmentCategorySchema = yup.object({
    name: yup.string().matches(/^[a-zA-Z ]*$/, 'Enter only characters').required("Please enter Allotment Category"),
    isActive: yup.boolean().default(false),
}).required()


const AllotmentCategoryForm: FC = () => {
    const { control, setValue, getValues, handleSubmit, resetField } = useForm({
        resolver: yupResolver(allotmentCategorySchema),
        defaultValues: {
            name: "",
            isActive: false,
        },
        mode: 'onChange'
    });
    const getSaveDetails = useSelector(getSaveUpdateAllotmentCategoryMaster);
    const loaderStatus = useSelector(selectStatus);
    const getByIDAllotmentCategoryData = useSelector(getbyIdAllotmentCategoryMaster);
    const navigate = useNavigate();
    const classes = useMasterTableStyles();
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const fetchGetbyIDAllotmentCategoryData = async () => {
                try {
                    dispatch(actions.loadGetByIdAllotmentCategoryMaster(parseInt(id)));
                } catch (error: any) { }
            };
            fetchGetbyIDAllotmentCategoryData();
        }
    }, [id, setValue]);

    useEffect(() => {
        if (id) {
            const setGetbyIDAllotmentCategoryData = async () => {
                try {
                    if (getByIDAllotmentCategoryData) {
                        setValue("name", getByIDAllotmentCategoryData.name);
                        setValue("isActive", getByIDAllotmentCategoryData.isActive);
                    }
                } catch (error: any) { }
            };
            setGetbyIDAllotmentCategoryData();
        }
    }, [getByIDAllotmentCategoryData]);

    const onSubmit = (data: any) => {
        id ? updateAllotmentCategory() : addAllotmentCategory();
    };
    const addAllotmentCategory = () => {
        try {
            const request = {
                id: 0,
                isActive: getValues("isActive"),
                name: getValues("name").toUpperCase(),
            };
            dispatch(actions.loadSaveUpdateAllotmentCategoryMaster({ request, type: "ADD" }));
        } catch (error) { }
    };
    const updateAllotmentCategory = () => {
        try {
            const request = {
                id: id,
                isActive: getValues("isActive"),
                name: getValues("name").toUpperCase(),
            };
            dispatch(actions.loadSaveUpdateAllotmentCategoryMaster({ request, type: "EDIT" }));
        } catch (error) { }
    };

    useEffect(() => {
        if (getSaveDetails) {
            const redirectToList = async () => {
                if (
                    (getSaveDetails && getSaveDetails.statusCode === ADD) ||
                    getSaveDetails.statusCode === UPDATE
                ) {
                    navigate("/allotment-category");
                }
            };
            redirectToList();
        }
    }, [getSaveDetails]);

    const navigateToAllotmentCategoryList = () => {
        dispatch(actions.setSaveUpdateAllotmentCategoryMaster(null));
        dispatch(actions.loadGetByIdAllotmentCategoryMaster(null));
        navigate("/allotment-category");
        setValue("name", "");
        setValue("isActive", false);
    };

    return (
        <>
            {loaderStatus === "loading" && <Loader />}
            <div>
                <MastersHeader
                    title={id ? "Edit Allotment Category" : "Add Allotment Category"}
                    BreadcrumbTitle={"Allotment Category"}
                    BreadcrumSubTitle={id ? "Edit Allotment Category" : "Add Allotment Category"}
                />
                {/* <!-- /breadcrumb --> */}
            </div>
            <Paper elevation={3} className={classes.PaperLayout}>
                <Box p={3} pt={0}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={3} alignItems={'center'} my={3}>
                            <Grid item sm={4}>
                                <InputController control={control} name="name" label="Allotment Category" resetClick={() => resetField("name")} />
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
                                    <Button variant="outlined" onClick={navigateToAllotmentCategoryList}>
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

export default AllotmentCategoryForm;