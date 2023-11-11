import { FC, useEffect, useMemo, useState } from "react";
import Grid from "@mui/material/Grid";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Box, Paper, TextField, Button, IconButton } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate, useSearchParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import TableLayout from "../../../layouts/tableLayout";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MastersHeader from "../../../layouts/MastersHeader";
import { AccreditationHook } from "../../../hooks/masters/accreditationHooks";
import DeleteConfirmation from "../../../layouts/deleteConfirmation";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";
import { SelectController } from "../../../control";
import {
    actions,
    getDeleteAccreditationMaster,
} from "../../../store/Master/accreditationMaster";
import { useDispatch, useSelector } from "react-redux";
import { StreamOptionHook } from "../../../hooks/masters/streamHooks";
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
}));
const AccreditationList: FC = () => {
    const [streamId, setStreamId] = useState("");
    const { data: Accreditations, setData: setUser } = AccreditationHook(true, Number(streamId));
    const { optionStreamData } = StreamOptionHook(true);

    interface IFormInput {
        accreditationName: string;
        streamId: string;
    }
    const { control, handleSubmit, watch } = useForm({
        defaultValues: {
            accreditationName: "",
            submit: null,
            streamId: "",
        },
        mode: "onChange",
    });
    const loaderStatus = useSelector(selectStatus);
    const getDeleteAccreditationData = useSelector(getDeleteAccreditationMaster);
    const navigate = useNavigate();
    const classes = useStyles();
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const [search, setSearch] = useState(searchParams.get("filter") || "");
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);

    const value = watch("streamId");

    useEffect(() => {
        setStreamId(value)
    }, [value])

    useEffect(() => {
        actions.load(Number(streamId));
    }, [streamId]);

    const onSubmit: SubmitHandler<IFormInput> = (data) => {

    };
    const navigateToAddAccreditation = () => {
        navigate("/accreditation/add");
    };

    const handleActionClick = (event: any, rowData: any, type: string) => {
        setSelectedRowData(rowData);
        type === "View"
            ? navigate(`/accreditation/view/${rowData.id}`)
            : type === "Edit"
                ? navigate(`/accreditation/update/${rowData.id}`)
                : type === "Add"
                    ? navigate("/accreditation/add")
                    : setOpenDialog(true);
    };
    interface Column {
        field: "name" | "streamName" | "year" | "grade" | "isActive" | "action";
        headerName: string;
        minWidth?: number;
        align?: "right";
        flex?: number;
        format?: any;
        renderCell?: any;
        headerClassName?: any;
    }
    const columns: Column[] = [
        {
            field: "name",
            headerName: "Name",
            flex: 1,
        },
        {
            field: "streamName",
            headerName: "Stream Name",
            flex: 1,
        },
        {
            field: "year",
            headerName: "Year",
            flex: 1,
        },
        {
            field: "grade",
            headerName: "Grade",
            flex: 1,
        },
        {
            field: "isActive",
            headerName: "isActive",
            flex: 1,
            renderCell: (rowData: any) => (rowData.value ? "Active" : "In Active"),
        },
        {
            field: "action",
            headerName: "Action",
            flex: 1,
            minWidth: 100,
            renderCell: (params: any) => {
                return (
                    <>
                        <Grid sx={{ flexGrow: 1 }} container spacing={3}>
                            <Grid item xs={12}>
                                <Grid container justifyContent="left" spacing={3}>
                                    <Grid item>
                                        <EditOutlinedIcon
                                            fontSize="small"
                                            style={{ color: "#4a4a69" }}
                                            onClick={(e) => handleActionClick(e, params.row, "Edit")}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <RemoveRedEyeOutlinedIcon
                                            fontSize="small"
                                            style={{ color: "#4a4a69" }}
                                            onClick={(e) => handleActionClick(e, params.row, "View")}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <DeleteOutlineIcon
                                            fontSize="small"
                                            style={{ color: "#4a4a69" }}
                                            onClick={(e) =>
                                                handleActionClick(e, params.row, "Delete")
                                            }
                                        />
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
    const deleteAccreditationClick = () => {
        if (selectedRowData) {
            dispatch(actions.loadDeleteAccreditationMaster(selectedRowData));
            setOpenDialog(false);
        }
    };

    const filteredData = useMemo(() => {
        return Accreditations.filter(
            (x: any) => !search || x.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [Accreditations, search]);
    return (
        <>
            {loaderStatus === "loading" && <Loader />}
            <div>
                <MastersHeader
                    title={"Accreditation List"}
                    BreadcrumbTitle={"Accreditation"}
                    BreadcrumSubTitle={"Accreditation List"}
                />
            </div>
            <Paper elevation={3}>
                <Box p={2} pt={0}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container mt={0} spacing={2}>
                            <Grid item xs={12} sm={12} md={5}>
                                <SelectController control={control} name="streamId" label="Stream Master" options={optionStreamData} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={5}>
                                <Controller
                                    render={({ field: any }) => (
                                        <TextField
                                            fullWidth
                                            size="small"
                                            type="text"
                                            label="Search"
                                            id="inputName"
                                            placeholder="Search Accreditation"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            InputProps={{
                                                endAdornment: (
                                                    <IconButton size="small" onClick={() => setSearch("")}>
                                                        <CloseIcon fontSize="small" />
                                                    </IconButton>
                                                ),
                                            }}
                                        />
                                    )}
                                    name="accreditationName"
                                    control={control}
                                    defaultValue=""
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={2} justifyContent={"left"}>
                                <Button
                                    className={classes.searchButton}
                                    variant="contained"
                                    onClick={navigateToAddAccreditation}
                                    startIcon={<AddIcon />}
                                >
                                    ADD NEW
                                </Button>
                            </Grid>

                            <Grid
                                item
                                container
                                alignItems={"center"}
                                justifyContent={"left"}
                                my={0}
                                xs={12}
                            >
                                <Box className={classes.tableBox}>
                                    <TableLayout columns={columns} rows={filteredData} />
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Paper>
            <DeleteConfirmation
                openDialog={openDialog}
                closeToggleDeleteDialog={handleClose}
                actionToggleDeleteDialog={deleteAccreditationClick}
                rowParam={selectedRowData}
                page={"Accreditation"}
            />
        </>
    );
};

export default AccreditationList;
