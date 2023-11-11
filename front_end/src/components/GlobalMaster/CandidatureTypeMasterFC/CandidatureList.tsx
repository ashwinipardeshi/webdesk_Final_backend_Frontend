import { FC, useMemo, useState } from "react";
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
import { CandidatureTypeHook } from "../../../hooks/globalMasters/candidatureTypeHooks";
import DeleteConfirmation from "../../../layouts/deleteConfirmation";
import {
  actions,
  getDeleteCandidatureTypeMaster,
} from "../../../store/GlobalMaster/candidatureTypeMaster";
import { useDispatch, useSelector } from "react-redux";
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
const CandidatureList: FC = () => {
  const { data: candidatures, setData: setUser } = CandidatureTypeHook(true);

  interface IFormInput {
    CandidatureTypeName: string;
  }
  const { control, handleSubmit } = useForm({
    defaultValues: {
      CandidatureTypeName: "",
      submit: null,
    },
  });
  const getDeleteCandidatureTypeData = useSelector(getDeleteCandidatureTypeMaster);
  const navigate = useNavigate();
  const classes = useStyles();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const [search, setSearch] = useState(searchParams.get("filter") || "");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };
  const navigateToAddCandidatureType = () => {
    navigate("/candidature-type/add");
  };

  const handleActionClick = (event: any, rowData: any, type: string) => {
    setSelectedRowData(rowData);
    type === "View"
      ? navigate(`/candidature-type/view/${rowData.id}`)
      : type === "Edit"
        ? navigate(`/candidature-type/update/${rowData.id}`)
        : type === "Add"
          ? navigate("/candidature-type/add")
          : setOpenDialog(true);
  };
  interface Column {
    field: "name" | "isActive" | "action";
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
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 500,
    },
    {
      field: "isActive",
      headerName: "isActive",
      flex: 1,
      minWidth: 500,
      renderCell: (rowData: any) => (rowData.value ? "Active" : "In Active"),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 200,
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
  const deleteCandidatureTypeClick = () => {
    if (selectedRowData) {
      dispatch(actions.loadDeleteCandidatureTypeMaster(selectedRowData));
      setOpenDialog(false);
    }
  };
  const clearFormData = (e: any) => {
    setSearch("");
  };
  const filteredData = useMemo(() => {
    return candidatures.filter(
      (x: any) => !search || x.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [candidatures, search]);
  return (
    <>
      <div>
        <MastersHeader
          title={"Candidature Type List"}
          BreadcrumbTitle={"Candidature Type"}
          BreadcrumSubTitle={"Candidature Type List"}
        />
      </div>
      <Paper elevation={3}>
        <Box p={2} pt={0}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container mt={0} spacing={2}>
              <Grid
                item
                container
                display={"flex"}
                gap={2}
                flexWrap={"nowrap"}
                alignItems={"center"}
              >
                <Grid
                  item
                  my={0}
                  sx={{
                    width: "100%",
                  }}
                >
                  <Controller
                    render={({ field: any }) => (
                      <TextField
                        fullWidth
                        size="small"
                        type="text"
                        label="Search"
                        id="inputName"
                        placeholder="Search CandidatureType"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        InputProps={{
                          endAdornment: (
                            <IconButton
                              size="small"
                              onClick={(e) => clearFormData(e)}
                            >
                              <CloseIcon fontSize="small" />
                            </IconButton>
                          ),
                        }}
                      />
                    )}
                    name="CandidatureTypeName"
                    control={control}
                    defaultValue=""
                  />
                </Grid>
                <Grid item my={0} flexShrink={0}>
                  <Controller
                    name="submit"
                    control={control}
                    render={({ field }) => (
                      <Button
                        className={classes.searchButton}
                        variant="contained"
                        onClick={navigateToAddCandidatureType}
                        startIcon={<AddIcon />}
                      >
                        ADD NEW
                      </Button>
                    )}
                  />
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
          </form>
        </Box>
      </Paper>
      <DeleteConfirmation
        openDialog={openDialog}
        closeToggleDeleteDialog={handleClose}
        actionToggleDeleteDialog={deleteCandidatureTypeClick}
        rowParam={selectedRowData}
        page={"candidatureType"}
      />
    </>
  );
};

export default CandidatureList;
