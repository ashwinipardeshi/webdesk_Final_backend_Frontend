import React, { FC, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { Box, Paper, Button } from "@mui/material";
import { ADD, UPDATE } from "../../../constant/statusCodes";
import { useNavigate } from "react-router-dom";
import {
  actions,
  getSaveUpdateProgramDetailMaster,
  getbyIdProgramDetailMaster,
} from "../../../store/Master/programDetailMaster";
import { useDispatch, useSelector } from "react-redux";
import MastersHeader from "../../../layouts/MastersHeader";
import {
  CheckboxController,
  InputController,
  SelectController,
} from "../../../control";
import { useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useMasterTableStyles } from "../../../assets/style/mastersTableStyle";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";
import { Dropdown } from "../../../control";
import { ProgramTypeOptionHook } from "../../../hooks/masters/programTypeHooks";
import { SyllabusPatternOptionHook } from "../../../hooks/masters/syllabusPatternHooks";
import { ProgramOptionHook } from "../../../hooks/masters/programHooks";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const programDetailSchema = yup
  .object({
    programTypeId: yup.string().required("Please select program type"),
    programMasterId: yup.string().required("Please select program"),
    syllabusPatternMasterId: yup.string().required("Please select syllabus pattern"),
    duration: yup.string().required("Please enter duration")
      .when('$duration', (duration, schema) => {
        return (duration && duration.length)
          ? schema.matches(/^[0-9]+$/, 'Enter numbers only')
          : schema;
      }),
    noOfSem: yup.string().required("Please enter number of semester")
      .when('$noOfSem', (noOfSem, schema) => {
        return (noOfSem && noOfSem.length)
          ? schema.matches(/^[0-9]+$/, 'Enter numbers only')
          : schema;
      }),
    minCredit: yup.string().required("Please enter minimum credit")
      .when('$minCredit', (minCredit, schema) => {
        return (minCredit && minCredit.length)
          ? schema.matches(/^[0-9]+$/, 'Enter numbers only')
          : schema;
      }),
    maxCredit: yup.string().required("Please enter maximum credit")
      .when('$maxCredit', (maxCredit, schema) => {
        return (maxCredit && maxCredit.length)
          ? schema.matches(/^[0-9]+$/, 'Enter numbers only')
          : schema;
      }),
    isActive: yup.boolean().default(false),
  })
  .required();

const ProgramDetailForm: FC = () => {
  const { optionProgramTypeData: ProgramTypeoption } =
    ProgramTypeOptionHook(true);
  const { syllabusPatternoptiondata: syllabusPatternoption } =
    SyllabusPatternOptionHook(true);

  const { optionProgramData: Programoptions } =
    ProgramOptionHook(true);

  const { control, setValue, getValues, resetField, handleSubmit } = useForm({
    resolver: yupResolver(programDetailSchema),
    defaultValues: {
      programTypeId: "",
      programMasterId: "",
      syllabusPatternMasterId: "",
      duration: "",
      noOfSem: "",
      minCredit: "",
      maxCredit: "",
      isActive: false,
    },
    mode: "onChange",
  });
  const getSaveDetails = useSelector(getSaveUpdateProgramDetailMaster);
  const getByIDProgramDetailData = useSelector(getbyIdProgramDetailMaster);
  const loaderStatus = useSelector(selectStatus);
  const navigate = useNavigate();
  const classes = useMasterTableStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const fetchGetbyIDProgramDetailData = async () => {
        try {
          dispatch(actions.loadGetByIdProgramDetailMaster(parseInt(id)));
        } catch (error: any) { }
      };
      fetchGetbyIDProgramDetailData();
    }
  }, [id, setValue]);

  useEffect(() => {
    if (id) {
      const setGetbyIDProgramDetailData = async () => {
        try {
          if (getByIDProgramDetailData) {
            setValue("programTypeId", getByIDProgramDetailData.programTypeId);
            setValue(
              "programMasterId",
              getByIDProgramDetailData.programMasterId
            );
            setValue("duration", getByIDProgramDetailData.duration);
            setValue(
              "syllabusPatternMasterId",
              getByIDProgramDetailData.syllabusPatternMasterId
            );
            setValue("noOfSem", getByIDProgramDetailData.noOfSem);
            setValue("minCredit", getByIDProgramDetailData.minCredit);
            setValue("maxCredit", getByIDProgramDetailData.maxCredit);
            setValue("isActive", getByIDProgramDetailData.isActive);
          }
        } catch (error: any) { }
      };
      setGetbyIDProgramDetailData();
    }
  }, [getByIDProgramDetailData]);

  const onSubmit = (data: any) => {
    id ? updateProgramDetail() : addProgramDetail();
  };
  const addProgramDetail = () => {
    try {
      const request = {
        id: 0,
        isActive: getValues("isActive"),
        programTypeId: getValues("programTypeId"),
        programMasterId: getValues("programMasterId"),
        syllabusPatternMasterId: getValues("syllabusPatternMasterId"),
        duration: getValues("duration"),
        noOfSem: getValues("noOfSem"),
        minCredit: getValues("minCredit"),
        maxCredit: getValues("maxCredit"),
      };
      dispatch(
        actions.loadSaveUpdateProgramDetailMaster({ request, type: "ADD" })
      );
    } catch (error) { }
  };
  const updateProgramDetail = () => {
    try {
      const request = {
        id: id,
        isActive: getValues("isActive"),
        programTypeId: getValues("programTypeId"),
        programMasterId: getValues("programMasterId"),
        syllabusPatternMasterId: getValues("syllabusPatternMasterId"),
        duration: getValues("duration"),
        noOfSem: getValues("noOfSem"),
        minCredit: getValues("minCredit"),
        maxCredit: getValues("maxCredit"),
      };
      dispatch(
        actions.loadSaveUpdateProgramDetailMaster({ request, type: "EDIT" })
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
          navigate("/program-detail");
        }
      };
      redirectToList();
    }
  }, [getSaveDetails]);

  const navigateToProgramDetailList = () => {
    dispatch(actions.setSaveUpdateProgramDetailMaster(null));
    navigate("/program-detail");
    setValue("programTypeId", "");
    setValue("programMasterId", "");
    setValue("syllabusPatternMasterId", "");
    setValue("duration", "");
    setValue("noOfSem", "");
    setValue("minCredit", "");
    setValue("maxCredit", "");
    setValue("isActive", false);
  };

  return (
    <>
      {loaderStatus === "loading" && <Loader />}
      <div>
        {/* <!-- breadcrumb --> */}
        <MastersHeader
          title={id ? "Edit Program Detail" : "Add Program Detail"}
          BreadcrumbTitle={"Program Detail"}
          BreadcrumSubTitle={id ? "Edit Program Detail" : "Add Program Detail"}
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
                  label="Program Type"
                  options={ProgramTypeoption}
                  name="programTypeId"
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
                  name="duration"
                  label="Duration"
                  resetClick={() => resetField("duration")}
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
                  label="Syllabus Pattern"
                  options={syllabusPatternoption}
                  name="syllabusPatternMasterId"
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
                  name="noOfSem"
                  label="No. of Semesters"
                  resetClick={() => resetField("noOfSem")}
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
                  name="minCredit"
                  label="Min Credit"
                  resetClick={() => resetField("minCredit")}
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
                  name="maxCredit"
                  label="Max Credit"
                  resetClick={() => resetField("maxCredit")}
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
                  variant="contained"
                  color="primary"
                  onClick={navigateToProgramDetailList}
                  className={classes.buttonLayout}
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
      </Paper >
    </>
  );
};

export default ProgramDetailForm;
