import React, { FC, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useForm, Controller } from "react-hook-form";
import { Box, Paper, TextField, Button, IconButton } from "@mui/material";
import { ADD, UPDATE } from "../../../constant/statusCodes";
import { useNavigate } from "react-router-dom";
import {
  actions,
  getSaveUpdateSyllabusPatternMaster,
  getbyIdSyllabusPatternMaster,
} from "../../../store/Master/syllabusPatternMaster";
import { useDispatch, useSelector } from "react-redux";
import MastersHeader from "../../../layouts/MastersHeader";
import {
  CheckboxController,
  InputController,
  SelectController,
} from "../../../control";
import { useParams } from "react-router-dom";
import { useMasterTableStyles } from "../../../assets/style/mastersTableStyle";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";
import { AcademicYearOptionHook } from "../../../hooks/masters/academicYearHooks";
import { ProgramOptionHook } from "../../../hooks/masters/programHooks";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const syllabusPatternSchema = yup
  .object({
    academicMasterId: yup.string().required("Please select academic year"),
    programMasterId: yup.string().required("Please select program"),
    name: yup
      .string()
      .matches(/^[a-zA-Z ]*$/, "Enter only characters")
      .required("Please enter name"),
    isActive: yup.boolean().default(false),
  })
  .required();

const SyllabusPatternForm: FC = () => {
  const { optionAcademicYearData: AcademicYearoption } =
    AcademicYearOptionHook(true);

  const { optionProgramData: Programoptions } =
    ProgramOptionHook(true);

  const { control, setValue, getValues, resetField, handleSubmit } = useForm({
    resolver: yupResolver(syllabusPatternSchema),
    defaultValues: {
      name: "",
      academicMasterId: "",
      programMasterId: "",
      isActive: false,
    },
    mode: "onChange",
  });
  const getSaveDetails = useSelector(getSaveUpdateSyllabusPatternMaster);
  const getByIDSyllabusPatternData = useSelector(getbyIdSyllabusPatternMaster);
  const loaderStatus = useSelector(selectStatus);
  const navigate = useNavigate();
  const classes = useMasterTableStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const fetchGetbyIDSyllabusPatternData = async () => {
        try {
          dispatch(actions.loadGetByIdSyllabusPatternMaster(parseInt(id)));
        } catch (error: any) { }
      };
      fetchGetbyIDSyllabusPatternData();
    }
  }, [id, setValue]);

  useEffect(() => {
    if (id) {
      const setGetbyIDSyllabusPatternData = async () => {
        try {
          if (getByIDSyllabusPatternData) {
            setValue("name", getByIDSyllabusPatternData.name);
            setValue(
              "academicMasterId",
              getByIDSyllabusPatternData.academicMasterId
            );
            setValue(
              "programMasterId",
              getByIDSyllabusPatternData.programMasterId
            );
            setValue("isActive", getByIDSyllabusPatternData.isActive);
          }
        } catch (error: any) { }
      };
      setGetbyIDSyllabusPatternData();
    }
  }, [getByIDSyllabusPatternData]);

  const onSubmit = (data: any) => {
    id ? updateSyllabusPattern() : addSyllabusPattern();
  };
  const addSyllabusPattern = () => {
    try {
      const request = {
        id: 0,
        isActive: getValues("isActive"),
        name: getValues("name").toUpperCase(),
        academicMasterId: getValues("academicMasterId"),
        programMasterId: getValues("programMasterId"),
      };
      dispatch(
        actions.loadSaveUpdateSyllabusPatternMaster({ request, type: "ADD" })
      );
    } catch (error) { }
  };
  const updateSyllabusPattern = () => {
    try {
      const request = {
        id: id,
        isActive: getValues("isActive"),
        name: getValues("name").toUpperCase(),
        academicMasterId: getValues("academicMasterId"),
        programMasterId: getValues("programMasterId"),
      };
      dispatch(
        actions.loadSaveUpdateSyllabusPatternMaster({ request, type: "EDIT" })
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
          navigate("/syllabus-pattern");
        }
      };
      redirectToList();
    }
  }, [getSaveDetails]);

  const navigateToSyllabusPatternList = () => {
    dispatch(actions.setSaveUpdateSyllabusPatternMaster(null));
    navigate("/syllabus-pattern");
    setValue("name", "");
    setValue("academicMasterId", "");
    setValue("programMasterId", "");
    setValue("isActive", false);
  };

  return (
    <>
      {loaderStatus === "loading" && <Loader />}
      <div>
        {/* <!-- breadcrumb --> */}
        <MastersHeader
          title={id ? "Edit Syllabus Pattern" : "Add Syllabus Pattern"}
          BreadcrumbTitle={"Syllabus Pattern"}
          BreadcrumSubTitle={
            id ? "Edit Syllabus Pattern" : "Add Syllabus Pattern"
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
                  name="academicMasterId"
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
                <InputController
                  control={control}
                  name="name"
                  label="Syllabus Pattern"
                  resetClick={() => resetField("name")}
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
                  onClick={navigateToSyllabusPatternList}
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

export default SyllabusPatternForm;
