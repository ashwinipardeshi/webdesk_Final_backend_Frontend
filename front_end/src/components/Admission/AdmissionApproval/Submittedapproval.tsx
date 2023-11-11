import { FC, useMemo, useState } from "react";
import Grid from "@mui/material/Grid";
import { useForm, SubmitHandler } from "react-hook-form";
import { Box, Paper, Tooltip, Select, MenuItem } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    actions,
    getUpdateOnlineAdmissionConfirmation,
    getUpdateOnlineAdmissionReject,
} from "../../../store/Admission/onlineAdmission/onlineAdmissionApproval";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import { useDispatch, useSelector } from "react-redux";
import { OnlineAdmissionStudentDetailsHook } from "../../../hooks/admission/onlineAdmission/onlineAdmissionApprovalHooks";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";
import { DataGrid } from "@mui/x-data-grid";
import { DATE_FORMAT_DATE_START } from "../../../utils/utils";
import moment from "moment";
import { ReservationCategoryHook } from "../../../hooks/masters/reservationCategoryHooks";
import { ApplicationStatusOptionHook } from "../../../hooks/masters/applicationStatusHooks";
import ViewData from "../../../layouts/viewData";
import RejectData from "../../../layouts/rejectData";

const useStyles = makeStyles((theme: any) => ({
    searchButton: {
        backgroundColor: "#197cd2",
        color: "#fff",
    },
    tableBox: {
        width: "100%",
    },
    tableCol: {
        ".MuiDataGrid-columnHeaders": {
            backgroundColor: "black",
        },
    },
    pagination: {
        textTransform: 'capitalize', '& p': {
            marginBottom: 0
        }
    }
}));
const SubmittedapprovalForm: FC = (props: any) => {

    const requestParams = props;
    const { data: onlineapprovals, setData: setUser } = OnlineAdmissionStudentDetailsHook(true);
    const { data: Reservationcategoryoptions } = ReservationCategoryHook(true);
    const { optionApplicationStatusData: applicationstatusoptions } = ApplicationStatusOptionHook(true);
    const [admissionCategoryId, setAdmissionCategoryId] = useState(0);
    const [applicationStatusId, setApplicationStatusId] = useState(0);

    interface IFormInput {
        Id: number;
        ApplicationNo: string;
        NameAsMarkSheet: string;
        MobileNo: string;
        BranchName: string;

    }
    const { control, setValue, getValues, reset, resetField, handleSubmit } = useForm({
        defaultValues: {
            admissionCategoryId: "",
            applicationStatusId: "",
        },
        mode: "onChange",
    });

    const handleAdmissionCategoryId = (e: any) => {
        const AdmissionCategoryId = e.target.value;
        setAdmissionCategoryId(AdmissionCategoryId);
    };

    const handleApplicationStatusId = (e: any) => {
        const ApplicationStatusId = e.target.value;
        setApplicationStatusId(ApplicationStatusId);
    };

    const loaderStatus = useSelector(selectStatus);
    const navigate = useNavigate();
    const classes = useStyles();
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const [search, setSearch] = useState(searchParams.get("filter") || "");
    const [openDialog, setOpenDialog] = useState(false);
    const [openDialogs, setOpenDialogs] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [rejectedData, setRejectedData] = useState(null);
    const onSubmit: SubmitHandler<IFormInput> = (data) => {
    };

    const handleActionClick = (event: any, rowData: any, type: string) => {
        setSelectedRowData(rowData);
        setOpenDialog(true);
    };

    const showRejectAdmissionModal = (event: any, rowData: any, type: string) => {
        const requestData = {
            ...rowData,
            admissionCategoryId: admissionCategoryId,
            applicationStatusId: applicationStatusId,
        };
        setRejectedData(requestData);
        setOpenDialogs(true);
    };

    const admissionApprove = (event: any, rowData: any, type: any) => {
        try {
            const request = {
                onlineStudentAdmissionId: rowData.Id,
                admissionCategoryId: admissionCategoryId,
                applicationStatusId: applicationStatusId,
                admissionStatus: "CONFIRM",
                applicationRejectReasonId: 0,
            };
            dispatch(actions.loadUpdateOnlineAdmissionConfirmation({ request }));

        } catch (error) { }
    }

    const admissionUpdateData = (event: any, rowData: any, type: any) => {
        try {
            const request = {
                onlineStudentAdmissionId: rowData.Id,
                admissionCategoryId: admissionCategoryId,
                applicationStatusId: applicationStatusId,
                admissionStatus: "CONFIRM",
                applicationRejectReasonId: 0,
            };
            dispatch(actions.loadUpdateOnlineAdmissionStatusUpdate({ request }));

        } catch (error) { }
    }

    interface Column {
        field: "ApplicationNo" | "Student Name" | "MobileNo" | "BranchName" | "ProgramYearName" | "CreatedDate" | "ApplicationFor" | "StudentCategoryName" | "AdmissionCategoryName" | "ApplicationStatusName" | "action";
        headerName: string;
        minWidth?: number;
        align?: "right";
        flex?: number;
        format?: (value: number) => string;
        renderCell?: any;
        headerClassName?: any;
    }
    const columns: Column[] = [
        {
            field: "ApplicationNo",
            headerName: "Application No",
            flex: 1,
            minWidth: 120,
        },
        {
            field: "Student Name",
            headerName: "Student Name",
            flex: 1,
            minWidth: 160,
            renderCell: (data: any) => {
                const studentName = data.row.FirstName + ' ' + data.row.MiddleName + ' ' + data.row.LastName
                const studName = data.row.FirstName + ' ' + data.row.LastName
                return (
                    <>
                        {data.row.MiddleName ? studentName : studName}
                    </>
                )
            }
        },
        {
            field: "MobileNo",
            headerName: "Mobile No",
            flex: 1,
            minWidth: 120,
        },
        {
            field: "BranchName",
            headerName: "Branch Name",
            flex: 1,
            minWidth: 120,
        },
        {
            field: "ProgramYearName",
            headerName: "Program Year",
            flex: 1,
            minWidth: 120,
        },
        {
            field: "CreatedDate",
            headerName: "Application Date",
            flex: 1,
            minWidth: 120,
            renderCell: (data: any) => {
                let createDt = moment(new Date(data.row.CreatedDate)).utc(true).local().format(DATE_FORMAT_DATE_START);
                return (
                    <span>{createDt}</span>
                )
            }
        },
        {
            field: "ApplicationFor",
            headerName: "Application For",
            flex: 1,
            minWidth: 120,
        },
        {
            field: "StudentCategoryName",
            headerName: "Student Category",
            flex: 1,
            minWidth: 120,
        },
        {
            field: "AdmissionCategoryName",
            headerName: "Admission Category",
            flex: 1,
            minWidth: 200,
            renderCell: (params: any) => {
                return (
                    <Select
                        sx={{ "& legend": { display: "none" }, "& fieldset": { top: 0 } }}
                        id="admissionCategoryId"
                        label="Admission Category"
                        defaultValue={0}
                        fullWidth
                        onChange={handleAdmissionCategoryId}
                        size="small"
                    >
                        <MenuItem value={0} >Select</MenuItem>
                        {Reservationcategoryoptions.map((data: any, key: any) => (
                            <MenuItem key={key} value={data.id}>
                                {data.name}
                            </MenuItem>
                        ))}
                    </Select>
                );
            },
        },
        {
            field: "ApplicationStatusName",
            headerName: "Application Status",
            flex: 1,
            minWidth: 200,
            renderCell: (params: any) => {
                return (
                    <Select
                        sx={{ "& legend": { display: "none" }, "& fieldset": { top: 0 } }}
                        id="applicationStatusId"
                        label="Application Status"
                        defaultValue={0}
                        fullWidth
                        onChange={handleApplicationStatusId}
                        size="small"
                    >
                        <MenuItem value={0} >Select</MenuItem>
                        {applicationstatusoptions.map((data: any, key: any) => (
                            <MenuItem key={key} value={data.id}>
                                {data.name}
                            </MenuItem>
                        ))}
                    </Select>
                );
            },
        },
        {
            field: "action",
            headerName: "Action",
            flex: 1,
            minWidth: 200,
            renderCell: (params: any) => {
                const viewData = [
                    params.row.ApplicationNo,
                    params.row.NameAsMarkSheet,
                    params.row.MobileNo,
                    params.row.BranchName,
                    params.row.ProgramYearName,
                ];
                const acceptData =
                    [params.row.Id, params.row.ApplicationNo];
                const rejectData = [
                    params.row.Id,
                    params.row.AdmissionCategoryId,
                    params.row.ApplicationStatusId,
                ];
                return (
                    <>
                        <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                            <Grid item xs={12}>
                                <Grid container justifyContent="left" spacing={2}>
                                    <Grid item>
                                        <Tooltip title="View">
                                            <RemoveRedEyeOutlinedIcon
                                                fontSize="small"
                                                style={{ color: "#4a4a69" }}
                                                onClick={(e) => handleActionClick(e, params.row, "View")}
                                            />
                                        </Tooltip>
                                    </Grid>
                                    <Grid item>
                                        <Tooltip title="Approve">
                                            <CheckOutlinedIcon
                                                fontSize="small"
                                                style={{ color: "#4a4a69" }}
                                                onClick={(e) =>
                                                    admissionApprove(e, params.row, "Approve")
                                                }

                                            />
                                        </Tooltip>
                                    </Grid>
                                    <Grid item>
                                        <Tooltip title="Reject">
                                            <CloseOutlinedIcon
                                                fontSize="small"
                                                style={{ color: "#4a4a69" }}
                                                onClick={(e) => {
                                                    showRejectAdmissionModal(e, params.row, "Reject");
                                                }}
                                            />
                                        </Tooltip>
                                    </Grid>
                                    <Grid item>
                                        <Tooltip title="Update">
                                            <SaveAsOutlinedIcon
                                                fontSize="small"
                                                style={{ color: "#4a4a69" }}
                                                onClick={(e) =>
                                                    admissionUpdateData(e, params.row, "Update")
                                                }
                                            />
                                        </Tooltip>
                                    </Grid>
                                    {/* <Grid item>
                                        <DownloadOutlinedIcon
                                            fontSize="small"
                                            style={{ color: "#4a4a69" }}
                                        // onClick={(e) =>
                                        //     handleActionClick(e, params.row, "Delete")
                                        // }
                                        />
                                    </Grid> */}
                                    {/* <Grid item>
                                        <PrintOutlinedIcon
                                            fontSize="small"
                                            style={{ color: "#4a4a69" }}
                                        // onClick={(e) =>
                                        //     handleActionClick(e, params.row, "Delete")
                                        // }
                                        />
                                    </Grid> */}
                                </Grid>
                            </Grid>{" "}
                        </Grid>
                    </>
                );
            },
        },
    ];
    const handleClose = () => {
        setOpenDialog(false);
        setOpenDialogs(false);
    };

    const clearFormData = (e: any) => {
        setSearch("");
    };
    const filteredData = useMemo(() => {
        if (requestParams && requestParams.academicyearid !== "" && requestParams.programid === "" && requestParams.programyearid === "" && requestParams.branchid === "" && requestParams.fromdate === "" && requestParams.todate === "") {
            return onlineapprovals.filter(
                (x: any) => x.AdmissionStatus !== "CONFIRM" && x.AdmissionStatus !== "INCOMPLETE" && x.AdmissionStatus !== "REJECT" && x.AcademicYearId === Number(requestParams.academicyearid)
            );
        } else if (requestParams && requestParams.academicyearid !== "" && requestParams.programid !== "" && requestParams.programyearid === "" && requestParams.branchid !== "" && requestParams.fromdate === "" && requestParams.todate === "") {

            return onlineapprovals.filter(
                (x: any) => x.AdmissionStatus !== "CONFIRM" && x.AdmissionStatus !== "INCOMPLETE" && x.AdmissionStatus !== "REJECT" && x.AcademicYearId === Number(requestParams.academicyearid) && x.BranchId === Number(requestParams.branchid)
            );

        } else if (requestParams && requestParams.academicyearid !== "" && requestParams.programid === "" && requestParams.programyearid !== "" && requestParams.branchid === "" && requestParams.fromdate === "" && requestParams.todate === "") {

            return onlineapprovals.filter(
                (x: any) => x.AdmissionStatus !== "CONFIRM" && x.AdmissionStatus !== "INCOMPLETE" && x.AdmissionStatus !== "REJECT" && x.AcademicYearId === Number(requestParams.academicyearid) && x.ProgramYearId === Number(requestParams.programyearid)
            );
        } else if (requestParams && requestParams.academicyearid !== "" && requestParams.programid !== "" && requestParams.programyearid !== "" && requestParams.branchid !== "" && requestParams.fromdate === "" && requestParams.todate === "") {

            return onlineapprovals.filter(
                (x: any) => x.AdmissionStatus !== "CONFIRM" && x.AdmissionStatus !== "INCOMPLETE" && x.AdmissionStatus !== "REJECT" && x.AcademicYearId === Number(requestParams.academicyearid) && x.BranchId === Number(requestParams.branchid) && x.ProgramYearId === Number(requestParams.programyearid)
            );
        } else if (requestParams && requestParams.academicyearid && requestParams.programid && requestParams.branchid && requestParams.programyearid && requestParams.fromdate && requestParams.todate) {

            return onlineapprovals.filter(
                (x: any) => x.AdmissionStatus !== "CONFIRM" && x.AdmissionStatus !== "INCOMPLETE" && x.AdmissionStatus !== "REJECT" && x.AcademicYearId === Number(requestParams.academicyearid) && x.BranchId === Number(requestParams.branchid) && x.ProgramYearId === Number(requestParams.programyearid) && x.CreatedDate >= requestParams.fromdate && x.CreatedDate <= requestParams.todate
            );
        } else {
            return onlineapprovals.filter(
                (x: any) => x.AdmissionStatus !== "CONFIRM" && x.AdmissionStatus !== "INCOMPLETE" && x.AdmissionStatus !== "REJECT"
            );
        }
    }, [onlineapprovals, requestParams]);
    return (
        <>
            {loaderStatus === "loading" && <Loader />}

            <Box p={2} pt={0}>
                <form>
                    <Grid container mt={0} spacing={2}>
                        <Grid
                            item
                            container
                            alignItems={"center"}
                            justifyContent={"left"}
                            my={0}
                            xs={12}
                        >
                            <Box className={classes.tableBox}>
                                <div style={{ height: 400, width: "100%" }}>
                                    <DataGrid
                                        getRowId={(row: any) => row.Id}
                                        rows={filteredData}
                                        columns={columns}
                                        initialState={{
                                            pagination: {

                                            },
                                        }}
                                        className={classes.tableBox}
                                    />
                                </div>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Box>
            <ViewData
                openDialog={openDialog}
                closeToggleDeleteDialog={handleClose}
                rowParam={selectedRowData}
                actionToggleDeleteDialog={function (rowData?: any): void {
                    throw new Error("Function not implemented.");
                }} />

            <RejectData
                openDialog={openDialogs}
                closeToggleDeleteDialog={handleClose}
                rowParam={rejectedData}
            />
        </>
    );

};


export default SubmittedapprovalForm;