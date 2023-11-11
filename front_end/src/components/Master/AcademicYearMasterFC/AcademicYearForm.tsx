import React, { FC, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useForm, Controller } from "react-hook-form";
import { Box, Paper, TextField, Button, IconButton } from "@mui/material";
import { ADD, UPDATE } from "../../../constant/statusCodes";
import { useNavigate } from "react-router-dom";
import {
  actions,
  getSaveUpdateAcademicYearMaster,
  getbyIdAcademicYearMaster,
} from "../../../store/Master/academicYearMaster";
import { useDispatch, useSelector } from "react-redux";
import MastersHeader from "../../../layouts/MastersHeader";
import { useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useMasterTableStyles } from "../../../assets/style/mastersTableStyle";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputController, CheckboxController } from "../../../control";

const academicYearSchema = yup
  .object({
    name: yup
      .string()
      .matches(/^[a-zA-Z ]*$/, "Enter characters only")
      .required("Please enter academic year"),
    isActive: yup.boolean().default(false),
    description: yup
      .string()
      .required("Please enter description"),
    startYear: yup.string().default(""),
    endYear: yup.string().default(""),
  })
  .required();

const AcademicYearForm: FC = () => {
  const { control, setValue, getValues, resetField, handleSubmit, reset } = useForm({
    resolver: yupResolver(academicYearSchema),
    defaultValues: {
      description: "",
      startYear: "",
      endYear: "",
      name: "",
      isActive: false,
    },
    mode: "onChange",
  });

  const getSaveDetails = useSelector(getSaveUpdateAcademicYearMaster);
  const getByIDAcademicYearData = useSelector(getbyIdAcademicYearMaster);
  const loaderStatus = useSelector(selectStatus);
  const navigate = useNavigate();
  const classes = useMasterTableStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  const numericId = id ? +id : undefined;

  useEffect(() => {
    if (id) {
      const fetchGetbyIDAcademicYearData = async () => {
        try {
          dispatch(actions.loadGetByIdAcademicYearMaster(parseInt(id)));
        } catch (error: any) { }
      };
      fetchGetbyIDAcademicYearData();
    }
  }, [id, setValue]);

  useEffect(() => {
    if (id) {
      const setGetbyIDAcademicYearData = async () => {
        try {
          if (getByIDAcademicYearData) {
            setValue("name", getByIDAcademicYearData.name || "");
            setValue("description", getByIDAcademicYearData.description || "");
            setValue("isActive", getByIDAcademicYearData.isActive);
            setValue("startYear", getByIDAcademicYearData.startYear || "");
            setValue("endYear", getByIDAcademicYearData.endYear || "");
          }
        } catch (error: any) { }
      };
      setGetbyIDAcademicYearData();
    }
  }, [getByIDAcademicYearData, id, setValue]);

  const onSubmit = (data: any) => {
    id ? updateAcademicYear() : addAcademicYear();
  };

  const addAcademicYear = () => {
    try {
      const request = {
        id: 0,
        streamId: 1,
        description: getValues("description"),
        startYear: getValues("startYear"),
        endYear: getValues("endYear"),
        isActive: getValues("isActive"),
        name: getValues("name").toUpperCase(),
      };
      dispatch(
        actions.loadSaveUpdateAcademicYearMaster({ request, type: "ADD" })
      );
    } catch (error) { }
  };
  const updateAcademicYear = () => {
    try {
      const request = {
        id: numericId,
        streamId: 1,
        description: getValues("description"),
        startYear: getValues("startYear"),
        endYear: getValues("endYear"),
        isActive: getValues("isActive"),
        name: getValues("name").toUpperCase(),
      };
      dispatch(
        actions.loadSaveUpdateAcademicYearMaster({ request, type: "EDIT" })
      );
    } catch (error) { }
  };

  useEffect(() => {
    if (getSaveDetails) {
      const redirectToList = async () => {
        if (
          (getSaveDetails && getSaveDetails.statusCode === ADD) ||
          getSaveDetails.statusCode === UPDATE
        ) {
          navigate("/academic-year");
        }
      };
      redirectToList();
    }
  }, [getSaveDetails]);

  const navigateToAcademicYearList = () => {
    dispatch(actions.setSaveUpdateAcademicYearMaster(null));
    navigate("/academic-year");
    setValue("name", "");
    setValue("isActive", false);
  };

  return (
    <>
      {loaderStatus === "loading" && <Loader />}
      <div>
        <MastersHeader
          title={id ? "Edit Academic Year" : "Add Academic Year"}
          BreadcrumbTitle={"Academic Year"}
          BreadcrumSubTitle={id ? "Edit Academic Year" : "Add Academic Year"}
        />
      </div>

      <Paper elevation={3} className={classes.PaperLayout}>
        <Box p={3} pt={0}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3} alignItems={"center"} my={3}>
              <Grid item sm={4}>
                <InputController
                  control={control}
                  name="name"
                  label="Academic Year"
                  resetClick={() => resetField("name")}
                />
              </Grid>
              <Grid item sm={4}>
                <InputController
                  control={control}
                  name="description"
                  label="Description"
                  resetClick={() => resetField("description")}
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
                      type="date"
                      label="Start Year"
                      id="startYear"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={getValues("startYear")}
                      onChange={(e) => setValue("startYear", e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            size="small"
                            onClick={() =>
                              reset({ startYear: "", isActive: false })
                            }
                            disabled={id ? true : false}
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        ),
                      }}
                    />
                  )}
                  name="startYear"
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
                      type="date"
                      label="End Year"
                      id="endYear"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={getValues("endYear")}
                      onChange={(e) => setValue("endYear", e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            size="small"
                            onClick={() =>
                              reset({ endYear: "", isActive: false })
                            }
                            disabled={id ? true : false}
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        ),
                      }}
                    />
                  )}
                  name="endYear"
                  control={control}
                  defaultValue=""
                />
              </Grid>

              <Grid item sm={2}>
                <CheckboxController
                  control={control}
                  name="isActive"
                  label="Active"
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid container item sm={4} gap={1}>
                <Box>
                  <Button
                    type="submit"
                    variant="contained"
                    className={classes.buttonLayout}
                  >
                    Submit
                  </Button>
                </Box>
                <Box>
                  <Button variant="outlined" onClick={navigateToAcademicYearList}>
                    Back
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Paper>
    </>
  );
};

export default AcademicYearForm;
