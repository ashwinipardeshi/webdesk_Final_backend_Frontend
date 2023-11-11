import { Box, Button, Grid, IconButton, Paper, TextField } from '@mui/material';
import React, { useMemo, useState } from 'react'
import { CasteCategoryHook } from '../../../hooks/globalMasters/casteCategoryHook';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getDeleteCasteCategoryMaster } from '../../../store/GlobalMaster/casteCategoryMaster';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { actions } from '../../../store/GlobalMaster/casteCategoryMaster';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import MastersHeader from '../../../layouts/MastersHeader';
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import TableLayout from '../../../layouts/tableLayout';
import DeleteConfirmation from '../../../layouts/deleteConfirmation';

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

 
 
const CasteCategoryList = () => {
  const { data: casteCategories, setData: setUser } = CasteCategoryHook(true);

  interface IFormInput {
    casteCategory: string;
  }
  const { control, handleSubmit } = useForm({
    defaultValues: {
      casteCategory: "",
      submit: null,
    },
  });
  const getDeleteCasteCategoryData = useSelector(getDeleteCasteCategoryMaster);
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
  const navigateToAddCasteCategory = () => {
    navigate("/caste-category/add");
  };

  const handleActionClick = (event: any, rowData: any, type: string) => {
    setSelectedRowData(rowData);
    type === "View"
      ? navigate(`/caste-category/view/${rowData.id}`)
      : type === "Edit"
      ? navigate(`/caste-category/update/${rowData.id}`)
      : type === "Add"
      ? navigate("/caste-category/add")
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
  const deleteCasteCategoryClick = () => {
    if (selectedRowData) {
      dispatch(actions.loadDeleteCasteCategoryMaster(selectedRowData));
      setOpenDialog(false);
    }
  };
  const clearFormData = (e: any) => {
    setSearch("");
  };
  const filteredData = useMemo(() => {
    return casteCategories.filter(
      (x: any) => !search || x.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [casteCategories, search]);
  
  return (
    <>
    <div>
      {/* <!-- breadcrumb --> */}
      <MastersHeader
        title={"Caste Category List"}
        BreadcrumbTitle={"Caste Category"}
        BreadcrumSubTitle={"Caste Category List"}
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
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      label="Search"
                      id="inputName"
                      placeholder="Search Caste Category"
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
                  name="casteCategory"
                  control={control}
                  defaultValue=""
                />
              </Grid>
              <Grid item my={0} flexShrink={0}>
                <Controller
                  name="submit"
                  control={control}
                  // eslint-disable-next-line no-unused-vars
                  render={({ field }) => (
                    <Button
                      className={classes.searchButton}
                      variant="contained"
                      onClick={navigateToAddCasteCategory}
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
      actionToggleDeleteDialog={deleteCasteCategoryClick}
      rowParam={selectedRowData}
      page={"Caste Category"}
    />
  </>
  )
}

export default CasteCategoryList