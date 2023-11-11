import { makeStyles } from "@material-ui/core";
import React, { useEffect, useMemo, useState } from "react";
import { BranchHook } from "../../../hooks/masters/branchMasterHook";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import TableLayout from "../../../layouts/tableLayout";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MastersHeader from "../../../layouts/MastersHeader";
import { useDispatch, useSelector } from "react-redux";
import DeleteConfirmation from "../../../layouts/deleteConfirmation";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";
import { actions, } from "../../../store/Master/branchMaster";
import { Box, Button, Grid, IconButton, Paper, TextField } from "@mui/material";
import { SelectController } from "../../../control";
import { ProgramOptionHook } from "../../../hooks/masters/programHooks";
import CloseIcon from "@mui/icons-material/Close";

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

const BranchList = () => {
  const [programMasterId, setProgramMasterId] = useState("");
  const { data: branchList } = BranchHook(true, Number(programMasterId));
  const { optionProgramData } = ProgramOptionHook(true);

  interface IFormInput {
    branchName: string;
    programMasterId: string;
  }
  const { control, watch } = useForm<IFormInput>({
    defaultValues: {
      branchName: "",
      programMasterId: "",
    },
    mode: "onChange",
  });
  const loaderStatus = useSelector(selectStatus);
  const navigate = useNavigate();
  const classes = useStyles();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const [search, setSearch] = useState(searchParams.get("filter") || "");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState<any>();


  const value = watch("programMasterId");


  useEffect(() => {
    setProgramMasterId(value)
  }, [value])

  useEffect(() => {
    actions.load(Number(programMasterId));
  }, [programMasterId]);

  const navigateToAddBranch = () => {
    navigate("/branch/add");
  };

  const handleActionClick = (event: any, rowData: any, type: string) => {
    setSelectedRowData(rowData);
    type === "View"
      ? navigate(`/branch/view/${rowData.id}`)
      : type === "Edit"
        ? navigate(`/branch/update/${rowData.id}`)
        : type === "Add"
          ? navigate("/branch/add")
          : setOpenDialog(true);
  };
  interface Column {
    field:
    | "name"
    | "programName"
    | "departmentName"
    // | "studyName"
    // | "code"
    // | "affiliationStatus"
    // | "isActive"
    | "action";
    headerName: string;
    minWidth?: number;
    maxWidth?: number;
    align?: "right";
    flex?: number;
    format?: (value: number) => string;
    renderCell?: any;
    headerClassName?: any;
  }
  const columns: Column[] = [
    {
      field: "name",
      headerName: "Branch Name",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "programName",
      headerName: "Program Name",
      flex: 1,
    },
    {
      field: "departmentName",
      headerName: "Department Name",
      flex: 1,
    },
    // {
    //   field: "studyName",
    //   headerName: "Study Type",
    //   flex: 1,
    //   maxWidth: 100,

    // },
    // {
    //   field: "code",
    //   headerName: "Code",
    //   flex: 1,
    // },
    // {
    //   field: "affiliationStatus",
    //   headerName: "Affiliation Status",
    //   flex: 1,
    // },
    // {
    //   field: "isActive",
    //   headerName: "Is Active",
    //   flex: 1,
    //   maxWidth: 100,
    // },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      // minWidth: 150,

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
  const deleteBranchClick = () => {
    if (selectedRowData) {
      dispatch(actions.loadDeleteBranchMaster(selectedRowData));
      setOpenDialog(false);
    }
  };


  const filteredData = useMemo(() => {
    return branchList.filter(
      (x) => !search || x.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [branchList, search]);


  return (
    <>
      {loaderStatus === "loading" && <Loader />}
      <div>
        {/* <!-- breadcrumb --> */}
        <MastersHeader
          title={"Branch List"}
          BreadcrumbTitle={"Branch"}
          BreadcrumSubTitle={"Branch List"}
        />
        {/* <!-- /breadcrumb --> */}
      </div>

      <Paper elevation={3}>
        <Grid container p={2} pt={0} gap={2}>
          <Grid item container mt={0} spacing={2} component={"form"}>
            <Grid item xs={12} sm={12} md={4}>
              <SelectController control={control} name="programMasterId" label="Program Master" options={optionProgramData} />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Controller
                render={({ field: any }) => (
                  <TextField
                    fullWidth
                    size="small"
                    type="text"
                    label="Search"
                    id="inputName"
                    placeholder="Search Branch"
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
                name="branchName"
                control={control}
                defaultValue=""
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} justifyContent={"left"}>
              <Button
                className={classes.searchButton}
                variant="contained"
                onClick={navigateToAddBranch}
                startIcon={<AddIcon />}
              >
                ADD NEW
              </Button>
            </Grid>
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
      </Paper>
      <DeleteConfirmation
        openDialog={openDialog}
        closeToggleDeleteDialog={handleClose}
        actionToggleDeleteDialog={deleteBranchClick}
        rowParam={selectedRowData}
        page={"Branch"}
      />
    </>
  );
};

export default BranchList;
