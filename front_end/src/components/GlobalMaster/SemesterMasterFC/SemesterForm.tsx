import React, { FC, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useForm, Controller } from "react-hook-form";
import { Box, Paper, TextField, Button, IconButton } from "@mui/material";
import { ADD, UPDATE } from "../../../constant/statusCodes";
import { useNavigate } from "react-router-dom";
import {
  actions,
  getSaveUpdateSemesterMaster,
  getbyIdSemesterMaster,
} from "../../../store/GlobalMaster/semesterMaster";
import { useDispatch, useSelector } from "react-redux";
import MastersHeader from "../../../layouts/MastersHeader";
import { CheckBox } from "../../../control";
import { useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useMasterTableStyles } from "../../../assets/style/mastersTableStyle";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";

const SemesterForm: FC = () => {
  const { control, setValue, getValues, reset } = useForm({
    defaultValues: {
      semesterName: "",
      sortOrder: 0,
      isActive: false,
      submit: null,
    },
  });
  const getSaveDetails = useSelector(getSaveUpdateSemesterMaster);
  const getByIDSemesterData = useSelector(getbyIdSemesterMaster);
  const loaderStatus = useSelector(selectStatus);
  const navigate = useNavigate();
  const classes = useMasterTableStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const fetchGetbyIDSemesterData = async () => {
        try {
          dispatch(actions.loadGetByIdSemesterMaster(parseInt(id)));
        } catch (error: any) { }
      };
      fetchGetbyIDSemesterData();
    }
  }, [id, setValue]);

  useEffect(() => {
    if (id) {
      const setGetbyIDSemesterData = async () => {
        try {
          if (getByIDSemesterData) {
            setValue("semesterName", getByIDSemesterData.name);
            setValue("sortOrder", getByIDSemesterData.sortOrder);
            setValue("isActive", getByIDSemesterData.isActive);
          }
        } catch (error: any) { }
      };
      setGetbyIDSemesterData();
    }
  }, [getByIDSemesterData]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    id ? updateSemester() : addSemester();
  };
  const addSemester = () => {
    try {
      const request = {
        id: 0,
        isActive: getValues("isActive"),
        name: getValues("semesterName").toUpperCase(),
        sortOrder: getValues("sortOrder"),
      };
      dispatch(actions.loadSaveUpdateSemesterMaster({ request, type: "ADD" }));
    } catch (error) { }
  };
  const updateSemester = () => {
    try {
      const request = {
        id: id,
        isActive: getValues("isActive"),
        sortOrder: getValues("sortOrder"),
        name: getValues("semesterName").toUpperCase(),
      };
      dispatch(actions.loadSaveUpdateSemesterMaster({ request, type: "EDIT" }));
    } catch (error) { }
  };

  useEffect(() => {
    if (getSaveDetails) {
      const redirectToList = async () => {
        if (
          (getSaveDetails && getSaveDetails.statusCode === ADD) ||
          getSaveDetails.statusCode === UPDATE
        ) {
          navigate("/semester");
        }
      };
      redirectToList();
    }
  }, [getSaveDetails]);

  const navigateToRSemesterList = () => {
    dispatch(actions.setSaveUpdateSemesterMaster(null));
    navigate("/semester");
    setValue("semesterName", "");
    setValue("sortOrder", 0);
    setValue("isActive", false);
  };

  const onSearchData = (data: any) => {
    setValue("semesterName", data);
  };
  const onSearchSortOrderData = (data: any) => {
    setValue("sortOrder", data);
  };

  return (
    <>
      {loaderStatus === "loading" && <Loader />}
      <div>
        {/* <!-- breadcrumb --> */}
        <MastersHeader
          title={id ? "Edit Semester" : "Add Semester"}
          BreadcrumbTitle={"Semester"}
          BreadcrumSubTitle={id ? "Edit Semester" : "Add Semester"}
        />
        {/* <!-- /breadcrumb --> */}
      </div>
      <Paper elevation={3} className={classes.PaperLayout}>
        <Box p={2} pt={0}>
          <form onSubmit={onSubmit}>
            <Grid container mt={0} spacing={2}>
              <Grid
                item
                container
                alignItems={"center"}
                justifyContent={"left"}
                my={0}
                xs={4}
              >
                <Controller
                  render={({ field: any }) => (
                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      label="Semester"
                      id="inputName"
                      value={getValues("semesterName")}
                      onChange={(e) => onSearchData(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            size="small"
                            onClick={() =>
                              reset({ semesterName: "", isActive: false })
                            }
                            disabled={id ? true : false}
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        ),
                      }}
                    />
                  )}
                  name="semesterName"
                  control={control}
                  defaultValue=""
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
                <Controller
                  render={({ field: any }) => (
                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      label="Sort Order"
                      id="sortOrder"
                      placeholder="Sort Order"
                      value={getValues("sortOrder")}
                      inputProps={{ min: 0 }}
                      onChange={(e) => onSearchSortOrderData(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            size="small"
                            onClick={() => reset({ sortOrder: 0 })}
                            disabled={id ? true : false}
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        ),
                      }}
                    />
                  )}
                  name="sortOrder"
                  control={control}
                />
              </Grid>
              <Grid
                item
                container
                alignItems={"center"}
                justifyContent={"left"}
                my={0}
                xs={2}
              >
                <Controller
                  name="isActive"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CheckBox
                      name="isActive"
                      id="isActive"
                      label="Active"
                      value={getValues("isActive")}
                      onChange={(e: any) =>
                        setValue("isActive", e.target.value)
                      }
                      className=""
                    />
                  )}
                />
              </Grid>
              <Grid
                item
                container
                alignItems={"center"}
                justifyContent={"left"}
                my={0}
                xs={6}
              ></Grid>
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
                  Submit
                </Button>
              </Grid>
              <Grid
                item
                container
                alignItems={"center"}
                justifyContent={"left"}
                my={0}
                xs={1}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={navigateToRSemesterList}
                >
                  Back
                </Button>
              </Grid>
            </Grid>
            <Grid
              item
              container
              alignItems={"center"}
              justifyContent={"left"}
              my={0}
              xs={10}
            ></Grid>
          </form>
        </Box>
      </Paper>
    </>
  );
};

export default SemesterForm;
