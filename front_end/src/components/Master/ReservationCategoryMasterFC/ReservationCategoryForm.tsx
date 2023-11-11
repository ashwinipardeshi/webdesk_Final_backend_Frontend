import React, { FC, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { Box, Paper, Button } from "@mui/material";
import { ADD, UPDATE } from "../../../constant/statusCodes";
import { useNavigate } from "react-router-dom";
import {
    actions,
    getSaveUpdateReservationCategoryMaster,
    getbyIdReservationCategoryMaster,
} from "../../../store/Master/reservationCategoryMaster";
import { useDispatch, useSelector } from "react-redux";
import MastersHeader from "../../../layouts/MastersHeader";
import { useParams } from "react-router-dom";
import { useMasterTableStyles } from "../../../assets/style/mastersTableStyle";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { InputController, CheckboxController } from "../../../control";

const reservationCategorySchema = yup.object({
    reservationCategoryName: yup.string().matches(/^[a-zA-Z ]*$/, 'Enter only characters').required("Please enter Reservation Category"),
    isActive: yup.boolean().default(false),
}).required()


const ReservationCategoryForm: FC = () => {
    const { control, setValue, getValues, handleSubmit, resetField } = useForm({
        resolver: yupResolver(reservationCategorySchema),
        defaultValues: {
            reservationCategoryName: "",
            isActive: false,
        },
        mode: 'onChange'
    });
    const getSaveDetails = useSelector(getSaveUpdateReservationCategoryMaster);
    const loaderStatus = useSelector(selectStatus);
    const getByIDReservationCategoryData = useSelector(getbyIdReservationCategoryMaster);
    const navigate = useNavigate();
    const classes = useMasterTableStyles();
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const fetchGetbyIDReservationCategoryData = async () => {
                try {
                    dispatch(actions.loadGetByIdReservationCategoryMaster(parseInt(id)));
                } catch (error: any) { }
            };
            fetchGetbyIDReservationCategoryData();
        }
    }, [id, setValue]);

    useEffect(() => {
        if (id) {
            const setGetbyIDReservationCategoryData = async () => {
                try {
                    if (getByIDReservationCategoryData) {
                        setValue("reservationCategoryName", getByIDReservationCategoryData.name);
                        setValue("isActive", getByIDReservationCategoryData.isActive);
                    }
                } catch (error: any) { }
            };
            setGetbyIDReservationCategoryData();
        }
    }, [getByIDReservationCategoryData]);

    const onSubmit = (data: any) => {
        id ? updateReservationCategory() : addReservationCategory();
    };
    const addReservationCategory = () => {
        try {
            const request = {
                id: 0,
                isActive: getValues("isActive"),
                name: getValues("reservationCategoryName").toUpperCase(),
            };
            dispatch(actions.loadSaveUpdateReservationCategoryMaster({ request, type: "ADD" }));
        } catch (error) { }
    };
    const updateReservationCategory = () => {
        try {
            const request = {
                id: id,
                isActive: getValues("isActive"),
                name: getValues("reservationCategoryName").toUpperCase(),
            };
            dispatch(actions.loadSaveUpdateReservationCategoryMaster({ request, type: "EDIT" }));
        } catch (error) { }
    };

    useEffect(() => {
        if (getSaveDetails) {
            const redirectToList = async () => {
                if (
                    (getSaveDetails && getSaveDetails.statusCode === ADD) ||
                    getSaveDetails.statusCode === UPDATE
                ) {
                    navigate("/reservation-category");
                }
            };
            redirectToList();
        }
    }, [getSaveDetails]);

    const navigateToReservationCategoryList = () => {
        dispatch(actions.setSaveUpdateReservationCategoryMaster(null));
        dispatch(actions.loadGetByIdReservationCategoryMaster(null));
        navigate("/reservation-category");
        setValue("reservationCategoryName", "");
        setValue("isActive", false);
    };

    return (
        <>
            {loaderStatus === "loading" && <Loader />}
            <div>
                <MastersHeader
                    title={id ? "Edit Reservation Category" : "Add Reservation Category"}
                    BreadcrumbTitle={"Reservation Category"}
                    BreadcrumSubTitle={id ? "Edit Reservation Category" : "Add Reservation Category"}
                />
                {/* <!-- /breadcrumb --> */}
            </div>
            <Paper elevation={3} className={classes.PaperLayout}>
                <Box p={3} pt={0}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={3} alignItems={'center'} my={3}>
                            <Grid item sm={4}>
                                <InputController control={control} name="reservationCategoryName" label="Reservation Category" resetClick={() => resetField("reservationCategoryName")} />
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
                                    <Button variant="outlined" onClick={navigateToReservationCategoryList}>
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

export default ReservationCategoryForm;