import { makeStyles } from "@material-ui/core";
import React, { useMemo, useState } from "react";
import { MenuMasterHook } from "../../../hooks/masters/menuMasterHook";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import TableLayout from "../../../layouts/tableLayout";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MastersHeader from "../../../layouts/MastersHeader";
import DeleteConfirmation from "../../../layouts/deleteConfirmation";
import { useDispatch, useSelector } from "react-redux";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Box, Button, Grid, IconButton, Paper, TextField } from "@mui/material";
import { getDeleteMenuMaster } from "../../../store/Master/menuMaster";
import { actions } from "../../../store/Master/menuMaster";

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
const MenuList = () => {
  interface IFormInput {
    name: string;
  }
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      submit: null,
    },
  });

  const loaderStatus = useSelector(selectStatus);
  const getDeleteMenuData = useSelector(getDeleteMenuMaster);
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

  const navigateToAddMenu = () => {
    navigate("/menu/add");
  };
  const handleActionClick = (event: any, rowData: any, type: string) => {
    setSelectedRowData(rowData);
    type === "View"
      ? navigate(`/menu/view/${rowData.id}`)
      : type === "Edit"
      ? navigate(`/menu/update/${rowData.id}`)
      : type === "Add"
      ? navigate("/menu/add")
      : setOpenDialog(true);
  };

  interface Column {
    field: "name" | "description" | "isActive" | "action";
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
      headerName: "Menu",
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
  const { data: menuList } = MenuMasterHook(true);
  const handleClose = () => {
    setOpenDialog(false);
  };
  const deleteMenuClick = () => {
    if (selectedRowData) {
      dispatch(actions.loadDeleteMenuMaster(selectedRowData));
      setOpenDialog(false);
    }
  };
  const clearFormData = (e: any) => {
    setSearch("");
  };
  const filteredData = useMemo(() => {
    return menuList.filter(
      (x: any) => !search || x.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [menuList, search]);
  return (
    <>
      {loaderStatus === "loading" && <Loader />}
      <div>
        {/* <!-- breadcrumb --> */}
        <MastersHeader
          title={"Menu List"}
          BreadcrumbTitle={"Menu"}
          BreadcrumSubTitle={"Menu List"}
        />
        {/* <!-- /breadcrumb --> */}
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
                        placeholder="Search Menu"
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
                    name="name"
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
                        onClick={navigateToAddMenu}
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
        actionToggleDeleteDialog={deleteMenuClick}
        rowParam={selectedRowData}
        page={"Menu"}
      />
    </>
  );
};

export default MenuList;
