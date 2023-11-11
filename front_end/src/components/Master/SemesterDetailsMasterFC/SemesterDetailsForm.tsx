import React, { FC, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { Box, Paper, Button } from "@mui/material";
import { ADD, UPDATE } from "../../../constant/statusCodes";
import { useNavigate } from "react-router-dom";
import {
  actions,
  getSaveUpdateSemesterDetailsMaster,
  getbyIdSemesterDetailsMaster,
} from "../../../store/Master/semesterDetailsMaster";
import { useDispatch, useSelector } from "react-redux";
import MastersHeader from "../../../layouts/MastersHeader";
import {
  CheckboxController,
  SelectController,
} from "../../../control";
import moment from "moment-timezone";
import { useParams } from "react-router-dom";
import { useMasterTableStyles } from "../../../assets/style/mastersTableStyle";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";
import { DateController } from "../../../control";
import { AcademicYearOptionHook } from "../../../hooks/masters/academicYearHooks";
import { ProgramYearOptionHook } from "../../../hooks/masters/programYearHooks";
import { SemesterOptionHook } from "../../../hooks/globalMasters/semesterHooks";
import { ProgramOptionHook } from "../../../hooks/masters/programHooks";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { DATE_FORMAT_YEARSTART } from "../../../utils/utils";

const semesterDetailsSchema = yup
  .object({
    semesterMasterId: yup.string().required("Please select semester"),
    programMasterId: yup.string().required("Please select program"),
    programYearId: yup.string().required("Please select program year"),
    academicYearId: yup.string().required("Please select scademic year"),
    startDate: yup.string().default(""),
    endDate: yup.string().default(""),
    year: yup.string().default(""),
    isActive: yup.boolean().default(false),
  })
  .required();

const SemesterDetailsForm: FC = () => {
  const { optionAcademicYearData: AcademicYearoption } =
    AcademicYearOptionHook(true);
  const { optionProgramData: Programoptions } =
    ProgramOptionHook(true);
  const { programyearoptiondata: programyearoption } =
    ProgramYearOptionHook(true);
  const { semesteroptiondata: semesteroption } = SemesterOptionHook(true);

  const { control, setValue, getValues, resetField, handleSubmit } = useForm({
    resolver: yupResolver(semesterDetailsSchema),
    defaultValues: {
      semesterMasterId: "",
      programMasterId: "",
      programYearId: "",
      academicYearId: "",
      startDate: "",
      endDate: "",
      year: "New",
      isActive: false,
    },
    mode: "onChange",
  });
  const getSaveDetails = useSelector(getSaveUpdateSemesterDetailsMaster);
  const getByIDSemesterDetailsData = useSelector(getbyIdSemesterDetailsMaster);
  const loaderStatus = useSelector(selectStatus);
  const navigate = useNavigate();
  const classes = useMasterTableStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const fetchGetbyIDSemesterDetailsData = async () => {
        try {
          dispatch(actions.loadGetByIdSemesterDetailsMaster(parseInt(id)));
        } catch (error: any) { }
      };
      fetchGetbyIDSemesterDetailsData();
    }
  }, [id, setValue]);

  useEffect(() => {
    if (id) {
      const setGetbyIDSemesterDetailsData = async () => {
        try {
          if (getByIDSemesterDetailsData) {
            setValue(
              "semesterMasterId",
              getByIDSemesterDetailsData.semesterMasterId
            );
            setValue(
              "programMasterId",
              getByIDSemesterDetailsData.programMasterId
            );
            setValue("programYearId", getByIDSemesterDetailsData.programYearId);
            setValue(
              "academicYearId",
              getByIDSemesterDetailsData.academicYearId
            );
            setValue("startDate", getByIDSemesterDetailsData.startDate);
            setValue("endDate", getByIDSemesterDetailsData.endDate);
            setValue("year", getByIDSemesterDetailsData.year);
            setValue("isActive", getByIDSemesterDetailsData.isActive);
          }
        } catch (error: any) { }
      };
      setGetbyIDSemesterDetailsData();
    }
  }, [getByIDSemesterDetailsData]);


  const onSubmit = (data: any) => {
    id ? updateSemesterDetails() : addSemesterDetails();
  };
  const addSemesterDetails = () => {
    try {
      const request = {
        id: 0,
        isActive: getValues("isActive"),
        semesterMasterId: getValues("semesterMasterId"),
        programMasterId: getValues("programMasterId"),
        programYearId: getValues("programYearId"),
        academicYearId: getValues("academicYearId"),
        startDate: moment(new Date(getValues("startDate")))
          .utc(true)
          .local()
          .format(DATE_FORMAT_YEARSTART),
        endDate: moment(new Date(getValues("endDate")))
          .utc(true)
          .local()
          .format(DATE_FORMAT_YEARSTART),
        year: getValues("year"),
      };

      dispatch(
        actions.loadSaveUpdateSemesterDetailsMaster({ request, type: "ADD" })
      );
    } catch (error) { }
  };
  const updateSemesterDetails = () => {
    try {
      const request = {
        id: id,
        isActive: getValues("isActive"),
        semesterMasterId: getValues("semesterMasterId"),
        programMasterId: getValues("programMasterId"),
        programYearId: getValues("programYearId"),
        academicYearId: getValues("academicYearId"),
        startDate: getValues("startDate"),
        endDate: getValues("endDate"),
        year: getValues("year"),
      };
      dispatch(
        actions.loadSaveUpdateSemesterDetailsMaster({ request, type: "EDIT" })
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
          navigate("/semester-details");
        }
      };
      redirectToList();
    }
  }, [getSaveDetails]);

  const navigateToSemesterDetailsList = () => {
    dispatch(actions.setSaveUpdateSemesterDetailsMaster(null));
    navigate("/semester-details");
    setValue("semesterMasterId", "");
    setValue("programMasterId", "");
    setValue("programYearId", "");
    setValue("academicYearId", "");
    setValue("startDate", "");
    setValue("endDate", "");
    setValue("year", "");
    setValue("isActive", false);
  };

  return (
    <>
      {loaderStatus === "loading" && <Loader />}
      <div>
        {/* <!-- breadcrumb --> */}
        <MastersHeader
          title={id ? "Edit Semester Details" : "Add Semester Details"}
          BreadcrumbTitle={"Semester Details"}
          BreadcrumSubTitle={
            id ? "Edit Semester Details" : "Add Semester Details"
          }
        />
        {/* <!-- /breadcrumb --> */}
      </div>
      <Paper elevation={3} className={classes.PaperLayout}>
        <Box p={2} pt={0}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container mt={0} spacing={2}>
              <Grid
                item
                container
                alignItems={"center"}
                justifyContent={"left"}
                my={0}
                xs={4}
              >
                <SelectController
                  control={control}
                  label="Acedemic Year"
                  options={AcademicYearoption}
                  name="academicYearId"
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
                <SelectController
                  control={control}
                  label="Program"
                  options={Programoptions}
                  name="programMasterId"
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
                <SelectController
                  control={control}
                  label="Program Year"
                  options={programyearoption}
                  name="programYearId"
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
                <SelectController
                  control={control}
                  label="Semester"
                  options={semesteroption}
                  name="semesterMasterId"
                />
              </Grid>
              <Grid item container my={0} sm={4}>
                <DateController
                  fullWidth
                  control={control}
                  size="small"
                  type="text"
                  label="Start Date"
                  id="startDate"
                  placeholder="Start Date"
                  value={getValues("startDate")}
                  name={"startDate"}
                />

              </Grid>
              <Grid item container my={0} sm={4}>
                <DateController
                  fullWidth
                  control={control}
                  size="small"
                  type="text"
                  label="End Date"
                  id="endDate"
                  placeholder="End Date"
                  value={getValues("endDate")}
                  name={"endDate"}
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
                <CheckboxController
                  control={control}
                  name="isActive"
                  label="Active"
                />
              </Grid>
              <Grid
                item
                container
                alignItems={"left"}
                justifyContent={"left"}
                my={0}
                xs={0}
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
                  onClick={navigateToSemesterDetailsList}
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

export default SemesterDetailsForm;
