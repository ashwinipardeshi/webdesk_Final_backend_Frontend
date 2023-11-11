import { FC, useMemo, useState } from "react";
import Grid from "@mui/material/Grid";
import { useForm, SubmitHandler } from "react-hook-form";
import { Box, Paper, Tooltip } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    actions
} from "../../../store/Admission/offlineAdmission/offlineAdmissionList";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import { useDispatch, useSelector } from "react-redux";
import { OfflineAdmissionStudentDetailsHook } from "../../../hooks/admission/offlineAdmission/offlineApplicationListHooks";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";
import { DataGrid } from "@mui/x-data-grid";
import { DATE_FORMAT_DATE_START } from "../../../utils/utils";
import moment from "moment";
import ViewOfflineData from "../../../layouts/viewOfflineData";


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
const SubmittedapplicationForm: FC = (props: any) => {

    const requestParams = props;
    const { data: offlineapprovals, setData: setUser } = OfflineAdmissionStudentDetailsHook(true);

    interface IFormInput {
        Id: number;
        StudentCode: string;
        NameAsMarkSheet: string;
        MobileNo: string;
        BranchName: string;
        ProgramYearName: string;
        AcademicYearName: string;

    }

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
        field: "StudentCode" | "Student Name" | "MobileNo" | "StudAdmissionAYDetailBranchName" | "StudAdmissionAYDetailProgramYearName" | "AcademicYearName" | "action";
        headerName: string;
        minWidth?: number;
        align?: "right";
        flex?: number;
        format?: (value: number) => string;
        renderCell?: any;
        headerClassName?: any;
    }

    const handlePrintClick = (data: any[]) => {
        window.print();
    };

    const columns: Column[] = [
        {
            field: "StudentCode",
            headerName: "Student Code",
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
            field: "StudAdmissionAYDetailBranchName",
            headerName: "Branch Name",
            flex: 1,
            minWidth: 120,
        },
        {
            field: "StudAdmissionAYDetailProgramYearName",
            headerName: "Program Year",
            flex: 1,
            minWidth: 120,
        },
        {
            field: "AcademicYearName",
            headerName: "Admission Year",
            flex: 1,
            minWidth: 120,
        },
        {
            field: "action",
            headerName: "Action",
            flex: 1,
            minWidth: 200,
            renderCell: (params: any) => {
                const viewData = [
                    params.row.ApplicationNo,
                    params.row.FirstName + ' ' + params.row.MiddleName + ' ' + params.row.LastName,
                    params.row.MobileNo,
                    params.row.BranchName,
                    params.row.ProgramYearName,
                ];
                const printData = [
                    params.row.Id,
                    params.row.StudentCode,
                    params.row.FirstName + ' ' + params.row.MiddleName + ' ' + params.row.LastName,
                    params.row.MobileNo,
                    params.row.offlineStudAdmissionAYDetailOData?.BranchName,
                    params.row.offlineStudAdmissionAYDetailOData?.ProgramYearName,
                    params.row.AcademicYearName,
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
                                        <PrintOutlinedIcon
                                            fontSize="small"
                                            style={{ color: "#4a4a69" }}
                                            onClick={() => {
                                                handlePrintClick(printData)
                                            }}
                                        />
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
        if (requestParams && requestParams.programyearid === "" && requestParams.programid === "" && requestParams.branchid === "" && requestParams.academicyearid !== "") {
            return offlineapprovals.filter(
                (x: any) => x.AcademicYearId === Number(requestParams.academicyearid)
            );
        } else if (requestParams && requestParams.programyearid === "" && requestParams.programid !== "" && requestParams.branchid !== "" && requestParams.academicyearid !== "") {

            return offlineapprovals.filter(
                (x: any) => x.AcademicYearId === Number(requestParams.academicyearid) && x.StudAdmissionAYDetailBranchId === Number(requestParams.branchid)
            );

        } else if (requestParams && requestParams.programyearid !== "" && requestParams.programid === "" && requestParams.branchid === "" && requestParams.academicyearid !== "") {

            return offlineapprovals.filter(
                (x: any) => x.AcademicYearId === Number(requestParams.academicyearid) && x.StudAdmissionAYDetailProgramYearId === Number(requestParams.programyearid)
            );
        } else if (requestParams && requestParams.programyearid && requestParams.programid && requestParams.branchid && requestParams.academicyearid) {

            return offlineapprovals.filter(
                (x: any) => x.AcademicYearId === Number(requestParams.academicyearid) && x.StudAdmissionAYDetailBranchId === Number(requestParams.branchid) && x.StudAdmissionAYDetailProgramYearId === Number(requestParams.programyearid)
            );
        } else {
            return offlineapprovals
        }
    }, [offlineapprovals, requestParams]);
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
            <ViewOfflineData
                openDialog={openDialog}
                closeToggleDeleteDialog={handleClose}
                rowParam={selectedRowData}
                actionToggleDeleteDialog={function (rowData?: any): void {
                    throw new Error("Function not implemented.");
                }} />
        </>
    );

};


export default SubmittedapplicationForm;