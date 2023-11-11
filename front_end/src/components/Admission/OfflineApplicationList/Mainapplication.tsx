import React, { FC, useEffect, useMemo, useState } from "react";
import Grid from "@mui/material/Grid";
import { useForm, } from "react-hook-form";
import { Box, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SelectController } from "../../../control";
import { AcademicYearOptionHook } from "../../../hooks/masters/academicYearHooks";
import { ProgramOptionHook } from "../../../hooks/masters/programHooks";
import { ProgramYearOptionHook } from "../../../hooks/masters/programYearHooks";
import { BranchOptionHook } from "../../../hooks/masters/branchMasterHook";
import MastersHeader from "../../../layouts/MastersHeader";
import { useMasterTableStyles } from "../../../assets/style/mastersTableStyle";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { OfflineAdmissionStudentDetailsHook } from "../../../hooks/admission/offlineAdmission/offlineApplicationListHooks";
import SubmittedapplicationForm from "./Submittedapplicationlist";

const applicationSchema = yup
    .object({
        academicyearid: yup.string().required("Please select academic year"),
        branchid: yup.string().default(""),
        programid: yup.string().default(""),
        programyearid: yup.string().default(""),
    })
    .required();

const MainapplicationForm: FC = () => {
    const [requestData, setRequestData] = useState<any>({});
    const [selectedProgram, setSelectedProgram] = useState("");
    const { optionAcademicYearData: AcademicYearoption } =
        AcademicYearOptionHook(true);
    const { optionProgramData: Programoptions } =
        ProgramOptionHook(true);
    const { programyearoptiondata: Programyearoption } =
        ProgramYearOptionHook(true);
    const { optionBranchData: Branchoption, setOptionBranchData: setUser } =
        BranchOptionHook(true, Number(selectedProgram));
    const { data: offlineapplication, setData: setData } = OfflineAdmissionStudentDetailsHook(true);

    interface IFormInput {
        programid: string;
        branchid: string;
    }

    const {
        control,
        setValue,
        getValues,
        watch,
        resetField,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(applicationSchema),
        defaultValues: {
            academicyearid: "",
            branchid: "",
            programid: "",
            programyearid: "",
        },
        mode: "onChange",
    });
    const loaderStatus = useSelector(selectStatus);
    const navigate = useNavigate();
    const classes = useMasterTableStyles();
    const dispatch = useDispatch();


    const onSubmit = (data: any) => {
        setRequestData(data);
    };

    const value = watch("programid");

    useEffect(() => {

        setSelectedProgram(value)
    }, [value])


    return (
        <>
            {loaderStatus === "loading" ? <Loader /> : ""}
            <div>
                {/* <!-- breadcrumb --> */}
                <MastersHeader
                    title={"Confirm Admission List"}
                    BreadcrumbTitle={"Confirm Admission List"}
                    BreadcrumSubTitle={"Confirm Admission List"}
                />
                {/* <!-- /breadcrumb --> */}
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
                                    label="Academic Year"
                                    options={AcademicYearoption}
                                    name="academicyearid"
                                />

                            </Grid>
                        </Grid>
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
                                    label="Program"
                                    options={Programoptions}
                                    name="programid"
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
                                    label="Branch"
                                    options={Branchoption}
                                    name="branchid"
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
                                    label="Program Year"
                                    options={Programyearoption}
                                    name="programyearid"
                                />

                            </Grid>
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
                                    Search
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
                <Box p={2} pt={0}>
                    <div>
                        <SubmittedapplicationForm {...requestData} />
                    </div>
                </Box>
            </Paper>
        </>
    )
};
export default MainapplicationForm;
