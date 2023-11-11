import React, { FC, useEffect, useMemo, useState } from "react";
import Grid from "@mui/material/Grid";
import { useForm, } from "react-hook-form";
import { Box, Paper, Button, Tabs, Tab, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SelectController, DateController } from "../../../control";
import { AcademicYearOptionHook } from "../../../hooks/masters/academicYearHooks";
import { ProgramOptionHook } from "../../../hooks/masters/programHooks";
import { ProgramYearOptionHook } from "../../../hooks/masters/programYearHooks";
import { BranchOptionHook } from "../../../hooks/masters/branchMasterHook";
import { BranchHook } from "../../../hooks/masters/branchMasterHook";
import MastersHeader from "../../../layouts/MastersHeader";
import { useMasterTableStyles } from "../../../assets/style/mastersTableStyle";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";
import ConfirmapprovalForm from "./Confirmapproval";
import RejectedapprovalForm from "./Rejectedapproval";
import IncompleteapprovalForm from "./Incompleteapproval";
import SubmittedapprovalForm from "./Submittedapproval";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { OnlineAdmissionStudentDetailsHook } from "../../../hooks/admission/onlineAdmission/onlineAdmissionApprovalHooks";
import { OfflineAdmissionStudentDetailsHook } from "../../../hooks/admission/offlineAdmission/offlineApplicationListHooks";

const approvalSchema = yup
    .object({
        academicyearid: yup.string().required("Please select academic year"),
        branchid: yup.string().default(""),
        programid: yup.string().default(""),
        programyearid: yup.string().default(""),
        fromdate: yup.string().default(""),
        todate: yup.string().default(""),
    })
    .required();

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}


function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box marginTop={'1rem'}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}


const MainapprovalForm: FC = () => {
    const [requestData, setRequestData] = useState<any>({});
    const [selectedProgram, setSelectedProgram] = useState("");
    const { optionAcademicYearData: AcademicYearoption } =
        AcademicYearOptionHook(true);
    const { optionProgramData: Programoptions } =
        ProgramOptionHook(true);
    const { programyearoptiondata: Programyearoption } =
        ProgramYearOptionHook(true);
    const { data: Branchoption, setData: setUser } =
        BranchHook(true, Number(selectedProgram));
    const { data: onlineapprovals, setData: setData } = OnlineAdmissionStudentDetailsHook(true);
    const { data: offlineapprovals } = OfflineAdmissionStudentDetailsHook(true);
    const [values, setValues] = useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValues(newValue);

    };

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
        resolver: yupResolver(approvalSchema),
        defaultValues: {
            academicyearid: "",
            branchid: "",
            programid: "",
            programyearid: "",
            fromdate: "",
            todate: "",
        },
        mode: "onChange",
    });
    const loaderStatus = useSelector(selectStatus);
    const navigate = useNavigate();
    const classes = useMasterTableStyles();
    const dispatch = useDispatch();


    const onSubmit = (data: any) => {
        setRequestData(data);
        SubmittedData();
        ConfirmData();
        IncompleteData();
        RejectData();
    };

    const value = watch("programid");

    useEffect(() => {

        setSelectedProgram(value)
    }, [value])


    const SubmittedData = useMemo(() => {
        if (requestData && requestData.academicyearid !== "" && requestData.programid === "" && requestData.programyearid === "" && requestData.branchid === "" && requestData.fromdate === "" && requestData.todate === "") {
            return onlineapprovals.filter(
                (x: any) => x.AdmissionStatus !== "CONFIRM" && x.AdmissionStatus !== "INCOMPLETE" && x.AdmissionStatus !== "REJECT" && x.AcademicYearId === Number(requestData.academicyearid)
            );
        } else if (requestData && requestData.academicyearid !== "" && requestData.programid !== "" && requestData.programyearid === "" && requestData.branchid !== "" && requestData.fromdate === "" && requestData.todate === "") {

            return onlineapprovals.filter(
                (x: any) => x.AdmissionStatus !== "CONFIRM" && x.AdmissionStatus !== "INCOMPLETE" && x.AdmissionStatus !== "REJECT" && x.AcademicYearId === Number(requestData.academicyearid) && x.BranchId === Number(requestData.branchid)
            );

        } else if (requestData && requestData.academicyearid !== "" && requestData.programid === "" && requestData.programyearid !== "" && requestData.branchid === "" && requestData.fromdate === "" && requestData.todate === "") {

            return onlineapprovals.filter(
                (x: any) => x.AdmissionStatus !== "CONFIRM" && x.AdmissionStatus !== "INCOMPLETE" && x.AdmissionStatus !== "REJECT" && x.AcademicYearId === Number(requestData.academicyearid) && x.ProgramYearId === Number(requestData.programyearid)
            );
        } else if (requestData && requestData.academicyearid !== "" && requestData.programid !== "" && requestData.programyearid !== "" && requestData.branchid !== "" && requestData.fromdate === "" && requestData.todate === "") {

            return onlineapprovals.filter(
                (x: any) => x.AdmissionStatus !== "CONFIRM" && x.AdmissionStatus !== "INCOMPLETE" && x.AdmissionStatus !== "REJECT" && x.AcademicYearId === Number(requestData.academicyearid) && x.BranchId === Number(requestData.branchid) && x.ProgramYearId === Number(requestData.programyearid)
            );
        } else if (requestData && requestData.academicyearid && requestData.programid && requestData.branchid && requestData.programyearid && requestData.fromdate && requestData.todate) {

            return onlineapprovals.filter(
                (x: any) => x.AdmissionStatus !== "CONFIRM" && x.AdmissionStatus !== "INCOMPLETE" && x.AdmissionStatus !== "REJECT" && x.AcademicYearId === Number(requestData.academicyearid) && x.BranchId === Number(requestData.branchid) && x.ProgramYearId === Number(requestData.programyearid) && x.CreatedDate >= requestData.fromdate && x.CreatedDate <= requestData.todate
            );
        } else {
            return onlineapprovals.filter(
                (x: any) => x.AdmissionStatus !== "CONFIRM" && x.AdmissionStatus !== "INCOMPLETE" && x.AdmissionStatus !== "REJECT"
            );
        }
    }, [onlineapprovals, requestData]);

    const ConfirmData = useMemo(() => {
        if (requestData && requestData.academicyearid !== "" && requestData.programid === "" && requestData.programyearid === "" && requestData.branchid === "" && requestData.fromdate === "" && requestData.todate === "") {
            return offlineapprovals.filter(
                (x: any) => x.AcademicYearId === Number(requestData.academicyearid)
            );
        } else if (requestData && requestData.academicyearid !== "" && requestData.programid !== "" && requestData.programyearid === "" && requestData.branchid !== "" && requestData.fromdate === "" && requestData.todate === "") {

            return offlineapprovals.filter(
                (x: any) => x.AcademicYearId === Number(requestData.academicyearid) && x.StudAdmissionAYDetailBranchId === Number(requestData.branchid)
            );

        } else if (requestData && requestData.academicyearid !== "" && requestData.programid === "" && requestData.programyearid !== "" && requestData.branchid === "" && requestData.fromdate === "" && requestData.todate === "") {

            return offlineapprovals.filter(
                (x: any) => x.AcademicYearId === Number(requestData.academicyearid) && x.StudAdmissionAYDetailProgramYearId === Number(requestData.programyearid)
            );
        } else if (requestData && requestData.academicyearid !== "" && requestData.programid !== "" && requestData.programyearid !== "" && requestData.branchid !== "" && requestData.fromdate === "" && requestData.todate === "") {

            return offlineapprovals.filter(
                (x: any) => x.AcademicYearId === Number(requestData.academicyearid) && x.StudAdmissionAYDetailBranchId === Number(requestData.branchid) && x.StudAdmissionAYDetailProgramYearId === Number(requestData.programyearid)
            );
        } else if (requestData && requestData.academicyearid && requestData.programid && requestData.branchid && requestData.programyearid && requestData.fromdate && requestData.todate) {

            return offlineapprovals.filter(
                (x: any) => x.AcademicYearId === Number(requestData.academicyearid) && x.StudAdmissionAYDetailBranchId === Number(requestData.branchid) && x.StudAdmissionAYDetailProgramYearId === Number(requestData.programyearid) && x.CreatedDate >= requestData.fromdate && x.CreatedDate <= requestData.todate
            );
        } else {
            return offlineapprovals
        }
    }, [offlineapprovals, requestData]);


    const IncompleteData = useMemo(() => {
        if (requestData && requestData.academicyearid !== "" && requestData.programid === "" && requestData.programyearid === "" && requestData.branchid === "" && requestData.fromdate === "" && requestData.todate === "") {
            return onlineapprovals.filter(
                (x: any) => x.AdmissionStatus === "INCOMPLETE" && x.AcademicYearId === Number(requestData.academicyearid)
            );
        } else if (requestData && requestData.academicyearid !== "" && requestData.programid !== "" && requestData.programyearid === "" && requestData.branchid !== "" && requestData.fromdate === "" && requestData.todate === "") {

            return onlineapprovals.filter(
                (x: any) => x.AdmissionStatus === "INCOMPLETE" && x.AcademicYearId === Number(requestData.academicyearid) && x.BranchId === Number(requestData.branchid)
            );

        } else if (requestData && requestData.academicyearid !== "" && requestData.programid === "" && requestData.programyearid !== "" && requestData.branchid === "" && requestData.fromdate === "" && requestData.todate === "") {

            return onlineapprovals.filter(
                (x: any) => x.AdmissionStatus === "INCOMPLETE" && x.AcademicYearId === Number(requestData.academicyearid) && x.ProgramYearId === Number(requestData.programyearid)
            );
        } else if (requestData && requestData.academicyearid !== "" && requestData.programid !== "" && requestData.programyearid !== "" && requestData.branchid !== "" && requestData.fromdate === "" && requestData.todate === "") {

            return onlineapprovals.filter(
                (x: any) => x.AdmissionStatus === "INCOMPLETE" && x.AcademicYearId === Number(requestData.academicyearid) && x.BranchId === Number(requestData.branchid) && x.ProgramYearId === Number(requestData.programyearid)
            );
        } else if (requestData && requestData.academicyearid && requestData.programid && requestData.branchid && requestData.programyearid && requestData.fromdate && requestData.todate) {

            return onlineapprovals.filter(
                (x: any) => x.AdmissionStatus === "INCOMPLETE" && x.AcademicYearId === Number(requestData.academicyearid) && x.BranchId === Number(requestData.branchid) && x.ProgramYearId === Number(requestData.programyearid) && x.CreatedDate >= requestData.fromdate && x.CreatedDate <= requestData.todate
            );
        } else {
            return onlineapprovals.filter(
                (x: any) => x.AdmissionStatus === "INCOMPLETE"
            );
        }
    }, [onlineapprovals, requestData]);

    const RejectData = useMemo(() => {
        if (requestData && requestData.academicyearid !== "" && requestData.programid === "" && requestData.programyearid === "" && requestData.branchid === "" && requestData.fromdate === "" && requestData.todate === "") {
            return onlineapprovals.filter(
                (x: any) => x.AdmissionStatus === "REJECT" && x.AcademicYearId === Number(requestData.academicyearid)
            );
        } else if (requestData && requestData.academicyearid !== "" && requestData.programid !== "" && requestData.programyearid === "" && requestData.branchid !== "" && requestData.fromdate === "" && requestData.todate === "") {

            return onlineapprovals.filter(
                (x: any) => x.AdmissionStatus === "REJECT" && x.AcademicYearId === Number(requestData.academicyearid) && x.BranchId === Number(requestData.branchid)
            );

        } else if (requestData && requestData.academicyearid !== "" && requestData.programid === "" && requestData.programyearid !== "" && requestData.branchid === "" && requestData.fromdate === "" && requestData.todate === "") {

            return onlineapprovals.filter(
                (x: any) => x.AdmissionStatus === "REJECT" && x.AcademicYearId === Number(requestData.academicyearid) && x.ProgramYearId === Number(requestData.programyearid)
            );
        } else if (requestData && requestData.academicyearid !== "" && requestData.programid !== "" && requestData.programyearid !== "" && requestData.branchid !== "" && requestData.fromdate === "" && requestData.todate === "") {

            return onlineapprovals.filter(
                (x: any) => x.AdmissionStatus === "REJECT" && x.AcademicYearId === Number(requestData.academicyearid) && x.BranchId === Number(requestData.branchid) && x.ProgramYearId === Number(requestData.programyearid)
            );
        } else if (requestData && requestData.academicyearid && requestData.programid && requestData.branchid && requestData.programyearid && requestData.fromdate && requestData.todate) {

            return onlineapprovals.filter(
                (x: any) => x.AdmissionStatus === "REJECT" && x.AcademicYearId === Number(requestData.academicyearid) && x.BranchId === Number(requestData.branchid) && x.ProgramYearId === Number(requestData.programyearid) && x.CreatedDate >= requestData.fromdate && x.CreatedDate <= requestData.todate
            );
        } else {
            return onlineapprovals.filter(
                (x: any) => x.AdmissionStatus === "REJECT"
            );
        }
    }, [onlineapprovals, requestData]);



    return (
        <>
            {loaderStatus === "loading" ? <Loader /> : ""}
            <div>
                {/* <!-- breadcrumb --> */}
                <MastersHeader
                    title={"Pending Admission List"}
                    BreadcrumbTitle={"Pending Admission List"}
                    BreadcrumSubTitle={"Pending Admission List"}
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
                                xs={4}
                            >
                                <SelectController
                                    control={control}
                                    label="Branch"
                                    options={Branchoption}
                                    name="branchid"
                                />

                            </Grid>
                            <Grid item container my={0} sm={4}>
                                <DateController
                                    fullWidth
                                    control={control}
                                    size="small"
                                    type="text"
                                    label="From Date"
                                    id="fromdate"
                                    placeholder="From Date"
                                    value={getValues("fromdate")}
                                    name={"fromdate"}
                                />

                            </Grid>
                            <Grid item container my={0} sm={4}>
                                <DateController
                                    fullWidth
                                    control={control}
                                    size="small"
                                    type="text"
                                    label="To Date"
                                    id="todate"
                                    placeholder="To Date"
                                    value={getValues("todate")}
                                    name={"todate"}
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
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <Tabs value={values} onChange={handleChange}>
                                <Tab label={`Submitted:${SubmittedData.length}`} />
                                <Tab label={`Confirm:${ConfirmData.length}`} />
                                <Tab label={`Rejected:${RejectData.length}`} />
                                <Tab label={`Incomplete:${IncompleteData.length}`} />
                            </Tabs>
                        </Box>

                        <TabPanel value={values} index={0}>
                            <SubmittedapprovalForm  {...requestData} />
                        </TabPanel>
                        <TabPanel value={values} index={1}>
                            <ConfirmapprovalForm {...requestData} />
                        </TabPanel>
                        <TabPanel value={values} index={2}>
                            <RejectedapprovalForm {...requestData} />
                        </TabPanel>
                        <TabPanel value={values} index={3}>
                            <IncompleteapprovalForm {...requestData} />
                        </TabPanel>
                    </div>
                </Box>
            </Paper>
        </>
    )
};
export default MainapprovalForm;
