import React, { useEffect } from "react";
import {  useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import MastersHeader from "../../../layouts/MastersHeader";
import {
  CheckboxController,
  DateController,
  InputController,
  SelectController,
} from "../../../control";
import { useNavigate, useParams } from "react-router-dom";
import { useMasterTableStyles } from "../../../assets/style/mastersTableStyle";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";
import {
  getbyIdBranchMaster,
  getSaveUpdateBranchMaster,
  actions,
} from "../../../store/Master/branchMaster";
import { ADD, UPDATE } from "../../../constant/statusCodes";
import { Box, Button, Grid, Paper } from "@mui/material";
import { ProgramOptionHook } from "../../../hooks/masters/programHooks";
import { StudyOptionHook } from "../../../hooks/masters/studyHooks";
import { DepartmentOptionHook } from "../../../hooks/masters/departmentHooks";
import { CommonOptionHook } from "../../../hooks/globalMasters/commonMasterHook";
import { commonMastersIds } from "../../../utils/commonMasterIds";
import { SelectCommonController } from "../../../control/SelectCommonController";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const BranchForm = () => {
  const getByIDBranchData = useSelector(getbyIdBranchMaster);
  const { id } = useParams();

  const branchSchema = yup.object().shape({
    programMasterId: yup
      .string()
      .matches(/^[0-9]*$/, "Please select program")
      .required("Please select program"),
    studyMasterId: yup
      .string()
      .matches(/^[0-9]*$/, "Please select program")
      .required("Please select study type"),
    departmentId: yup
      .string()
      .matches(/^[0-9]*$/, "Please select program")
      .required("Please select department name"),
    branchPrefix: yup
      .string()
      .matches(/^[a-zA-Z ]*$/, "Enter only characters")
      .required("Please enter branch prefix"),
    name: yup
      .string()
      .matches(/^[a-zA-Z ]*$/, "Enter only characters")
      .required("Please enter branch name"),
    code: yup
      .string()
      .matches(/^[a-zA-Z0-9 ]*$/, "Enter only characters and numbers")
      .required("Please enter code"),
    abbreviation: yup
      .string()
      .matches(/^[a-zA-Z ]*$/, "Enter only characters")
      .required("Please enter abbreviation"),
    dateOfIntrodution: yup
      .string()
      .required("Please select date of introduction"),
    mediumOfInstruction: yup
      .string()
      .required("Please select medium of introduction"),
    affiliationStatus: yup
      .string()
      .matches(/^[a-zA-Z ]*$/, "Enter only characters")
      .required("Please enter affliation status"),
    accreditationstatus: yup
      .string()
      .matches(/^[a-zA-Z ]*$/, "Enter only characters")
      .required("Please enter accreditation status"),
    collegeId: yup.number().required(),
    collegeName: yup.string().notRequired(),
    id: yup.number().required(),
    programName: yup.string().notRequired(),
    studyName: yup.string().notRequired(),
    departmentName: yup.string().notRequired(),
    isActive: yup.boolean().default(false),
  });

  const { control, setValue, getValues, reset, handleSubmit, resetField } =
    useForm({
      defaultValues: {
        programMasterId: "",
        studyMasterId: "",
        departmentId: "",
        branchPrefix: "",
        name: "",
        code: "",
        abbreviation: "",
        dateOfIntrodution: "",
        mediumOfInstruction: "",
        affiliationStatus: "",
        accreditationstatus: "",
        collegeId: 0,
        collegeName: "",
        id: 0,
        programName: "",
        studyName: "",
        departmentName: "",
        isActive: false,
      },
      mode: "onChange",
      resolver: yupResolver(branchSchema),
    });

  const onSubmit = (data: any) => {
    id ? updateBranch() : addBranch();
  };

  const getSaveDetails = useSelector(getSaveUpdateBranchMaster);

  const { optionProgramData } = ProgramOptionHook(true);
  const { optionStudyData } = StudyOptionHook(true);
  const { optionDepartmentData } = DepartmentOptionHook(true);
  const { value:optionCommonData } = CommonOptionHook(true, commonMastersIds.MEDIUM);

  const loaderStatus = useSelector(selectStatus);
  const navigate = useNavigate();
  const classes = useMasterTableStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      const fetchGetbyIDBranchData = async () => {
        try {
          dispatch(actions.loadGetByIdBranchMaster(parseInt(id)));
        } catch (error: any) {}
      };
      fetchGetbyIDBranchData();
    }
  }, [id, setValue]);

  useEffect(() => {
    if (id) {
      const setGetbyIDBranchData = async () => {
        try {
          if (getByIDBranchData) {
            setValue("name", getByIDBranchData.name);
            setValue("abbreviation", getByIDBranchData.abbreviation);
            setValue(
              "accreditationstatus",
              getByIDBranchData.accreditationstatus
            );
            setValue("affiliationStatus", getByIDBranchData.affiliationStatus);
            setValue("branchPrefix", getByIDBranchData.branchPrefix);
            setValue("code", getByIDBranchData.code);
            setValue("programMasterId", getByIDBranchData.programMasterId);
            setValue("studyMasterId", getByIDBranchData.studyMasterId);
            setValue("departmentId", getByIDBranchData.departmentId);
            setValue("dateOfIntrodution", getByIDBranchData.dateOfIntrodution);
            setValue(
              "mediumOfInstruction",
              getByIDBranchData.mediumOfInstruction
            );
            setValue("collegeName", getByIDBranchData.collegeName);
            setValue("departmentName", getByIDBranchData.departmentName);
            setValue("id", getByIDBranchData.id);
            setValue("id", getByIDBranchData.id);
            setValue("id", getByIDBranchData.id);
            setValue("isActive", getByIDBranchData.isActive);
          }
        } catch (error: any) {}
      };
      setGetbyIDBranchData();
    }
  }, [getByIDBranchData]);

  const addBranch = () => {
    try {
      const request = {
        ...getValues(),
        id: getValues("id"),
        name: getValues("name").toUpperCase(),
        abbreviation: getValues("abbreviation").toUpperCase(),
        branchPrefix: getValues("branchPrefix").toUpperCase(),
        mediumOfInstruction: getValues("mediumOfInstruction").toUpperCase(),
        affiliationStatus: getValues("affiliationStatus").toUpperCase(),
        accreditationstatus: getValues("accreditationstatus").toUpperCase(),
      };
      dispatch(actions.loadSaveUpdateBranchMaster({ request, type: "ADD" }));
    } catch (error) {}
  };
  const updateBranch = () => {
    try {
      const request = {
        ...getValues(),
        id: getValues("id"),
        name: getValues("name").toUpperCase(),
        abbreviation: getValues("abbreviation").toUpperCase(),
        branchPrefix: getValues("branchPrefix").toUpperCase(),
        mediumOfInstruction: getValues("mediumOfInstruction").toUpperCase(),
        affiliationStatus: getValues("affiliationStatus").toUpperCase(),
        accreditationstatus: getValues("accreditationstatus").toUpperCase(),
      };
      dispatch(actions.loadSaveUpdateBranchMaster({ request, type: "EDIT" }));
    } catch (error) {}
  };

  useEffect(() => {
    if (getSaveDetails) {
      const redirectToList = async () => {
        if (
          (getSaveDetails && getSaveDetails.statusCode === ADD) ||
          getSaveDetails.statusCode === UPDATE
        ) {
          navigate("/Branch");
        }
      };
      redirectToList();
    }
  }, [getSaveDetails]);

  const navigateToBranchList = () => {
    dispatch(actions.setSaveUpdateBranchMaster(null));
    navigate("/branch");
    reset();
  };

  return (
    <>
      {loaderStatus === "loading" && <Loader />}
      <div>
        <MastersHeader
          title={id ? "Edit Branch" : "Add Branch"}
          BreadcrumbTitle={"Branch"}
          BreadcrumSubTitle={id ? "Edit Branch" : "Add Branch"}
        />
        {/* <!-- /breadcrumb --> */}
      </div>

      <Paper elevation={3} className={classes.PaperLayout}>
        <Box p={2} pt={0}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container>
              <Grid item container mt={0} spacing={2}>
                <Grid item xs={12} sm={12} md={4}>
                  <SelectController
                    control={control}
                    name="programMasterId"
                    label="Program Name"
                    options={optionProgramData}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <SelectController
                    control={control}
                    name="studyMasterId"
                    label="Study Type"
                    options={optionStudyData ? optionStudyData : []}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <SelectController
                    control={control}
                    name="departmentId"
                    label="Department Name"
                    options={optionDepartmentData ? optionDepartmentData : []}
                  />
                </Grid>
              </Grid>

              <Grid item container mt={0} spacing={2}>
                <Grid item xs={12} sm={12} md={4}>
                  <InputController
                    control={control}
                    name="branchPrefix"
                    label="Branch Prefix"
                    resetClick={() => resetField("branchPrefix")}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <InputController
                    control={control}
                    name="name"
                    label="Branch Name"
                    resetClick={() => resetField("name")}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <InputController
                    control={control}
                    name="code"
                    label="code"
                    resetClick={() => resetField("code")}
                  />
                </Grid>
              </Grid>

              <Grid item container mt={0} spacing={2}>
                <Grid item xs={12} sm={12} md={4}>
                  <InputController
                    control={control}
                    name="abbreviation"
                    label="Abbreviation"
                    resetClick={() => resetField("abbreviation")}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <DateController
                    control={control}
                    name="dateOfIntrodution"
                    label="Date of Introduction"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <SelectCommonController
                    control={control}
                    name="mediumOfInstruction"
                    label="Medium of Instructions"
                    options={optionCommonData ? optionCommonData : []}
                  />
                </Grid>
              </Grid>

              <Grid item container mt={0} spacing={2}>
                <Grid item xs={12} sm={12} md={4}>
                  <InputController
                    control={control}
                    name="affiliationStatus"
                    label="Affiliation Status"
                    resetClick={() => resetField("affiliationStatus")}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <InputController
                    control={control}
                    name="accreditationstatus"
                    label="Accreditation Status"
                    resetClick={() => resetField("accreditationstatus")}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <CheckboxController
                    control={control}
                    name="isActive"
                    label="Active"
                  />
                </Grid>
              </Grid>

              <Grid item container mt={0} spacing={2}>
                <Grid item xs={3} sm={3} md={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    className={classes.buttonLayout}
                  >
                    Submit
                  </Button>
                </Grid>
                <Grid item xs={3} sm={3} md={2} justifyContent={"start"}>
                  <Button variant="outlined" onClick={navigateToBranchList}>
                    Back
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Paper>
    </>
  );
};

export default BranchForm;
