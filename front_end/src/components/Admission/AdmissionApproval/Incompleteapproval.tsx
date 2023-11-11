import { FC, useMemo, useState } from "react";
import Grid from "@mui/material/Grid";
import { useForm, SubmitHandler } from "react-hook-form";
import { Box, Paper, Tooltip } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate, useSearchParams } from "react-router-dom";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { useDispatch, useSelector } from "react-redux";
import { OnlineAdmissionStudentDetailsHook } from "../../../hooks/admission/onlineAdmission/onlineAdmissionApprovalHooks";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";
import { DataGrid } from "@mui/x-data-grid";
import { DATE_FORMAT_DATE_START } from "../../../utils/utils";
import moment from "moment";
import { ApplicationStatusOptionHook } from "../../../hooks/masters/applicationStatusHooks";
import ViewData from "../../../layouts/viewData";



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
const IncompleteapprovalForm: FC = (props: any) => {

    const requestParams = props;

    const { data: onlineapprovals, setData: setUser } = OnlineAdmissionStudentDetailsHook(true);
    const { optionApplicationStatusData: applicationstatusoptions } = ApplicationStatusOptionHook(true);

    interface IFormInput {
        Id: number;
        ApplicationNo: string;
        NameAsMarkSheet: string;
        MobileNo: string;
        BranchName: string;

    }
    const { control, handleSubmit } = useForm({
        defaultValues: {
            ApplicationNo: "",
            NameAsMarkSheet: "",
            MobileNo: "",
            BranchName: "",
            submit: null,
        },
    });
    const loaderStatus = useSelector(selectStatus);
    const navigate = useNavigate();
    const classes = useStyles();
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const [search, setSearch] = useState(searchParams.get("filter") || "");
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const onSubmit: SubmitHandler<IFormInput> = (data) => {
    };

    const handleActionClick = (event: any, rowData: any, type: string) => {
        setSelectedRowData(rowData);
        setOpenDialog(true);
    };


    interface Column {
        field: "ApplicationNo" | "Student Name" | "MobileNo" | "BranchName" | "ProgramYearName" | "CreatedDate" | "ApplicationFor" | "StudentCategoryName" | "ApplicationStatusName" | "action";
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
            field: "ApplicationStatusName",
            headerName: "Application Status",
            flex: 1,
            minWidth: 150,
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
    };

    const clearFormData = (e: any) => {
        setSearch("");
    };
    const filteredData = useMemo(() => {
        if (requestParams && requestParams.academicyearid !== "" && requestParams.programid === "" && requestParams.programyearid === "" && requestParams.branchid === "" && requestParams.fromdate === "" && requestParams.todate === "") {
            return onlineapprovals.filter(
                (x: any) => x.AdmissionStatus === "INCOMPLETE" && x.AcademicYearId === Number(requestParams.academicyearid)
            );
        } else if (requestParams && requestParams.academicyearid !== "" && requestParams.programid !== "" && requestParams.programyearid === "" && requestParams.branchid !== "" && requestParams.fromdate === "" && requestParams.todate === "") {

            return onlineapprovals.filter(
                (x: any) => x.AdmissionStatus === "INCOMPLETE" && x.AcademicYearId === Number(requestParams.academicyearid) && x.BranchId === Number(requestParams.branchid)
            );

        } else if (requestParams && requestParams.academicyearid !== "" && requestParams.programid === "" && requestParams.programyearid !== "" && requestParams.branchid === "" && requestParams.fromdate === "" && requestParams.todate === "") {

            return onlineapprovals.filter(
                (x: any) => x.AdmissionStatus === "INCOMPLETE" && x.AcademicYearId === Number(requestParams.academicyearid) && x.ProgramYearId === Number(requestParams.programyearid)
            );
        } else if (requestParams && requestParams.academicyearid !== "" && requestParams.programid !== "" && requestParams.programyearid !== "" && requestParams.branchid !== "" && requestParams.fromdate === "" && requestParams.todate === "") {

            return onlineapprovals.filter(
                (x: any) => x.AdmissionStatus === "INCOMPLETE" && x.AcademicYearId === Number(requestParams.academicyearid) && x.BranchId === Number(requestParams.branchid) && x.ProgramYearId === Number(requestParams.programyearid)
            );
        } else if (requestParams && requestParams.academicyearid && requestParams.programid && requestParams.branchid && requestParams.programyearid && requestParams.fromdate && requestParams.todate) {

            return onlineapprovals.filter(
                (x: any) => x.AdmissionStatus === "INCOMPLETE" && x.AcademicYearId === Number(requestParams.academicyearid) && x.BranchId === Number(requestParams.branchid) && x.ProgramYearId === Number(requestParams.programyearid) && x.CreatedDate >= requestParams.fromdate && x.CreatedDate <= requestParams.todate
            );
        } else {
            return onlineapprovals.filter(
                (x: any) => x.AdmissionStatus === "INCOMPLETE"
            );
        }
    }, [onlineapprovals, requestParams]);
    return (
        <>
            {loaderStatus === "loading" && <Loader />}

            <Box p={2} pt={0}>
                <form>
                    <Grid container mt={0} spacing={2}>
                        {/* <Grid
                                item
                                container
                                alignItems={"center"}
                                justifyContent={"left"}
                                my={0}
                                xs={4}
                            >
                                <SelectController
                                    control={control}
                                    label="Application Status"
                                    options={applicationstatusoptions}
                                    name="applicationreStatusName"
                                />

                            </Grid> */}
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
        </>
    );

};


export default IncompleteapprovalForm;