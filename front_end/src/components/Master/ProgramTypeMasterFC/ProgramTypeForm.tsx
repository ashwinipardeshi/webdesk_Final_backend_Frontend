import React, { FC, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { Box, Paper, Button, } from "@mui/material";
import { ADD, UPDATE } from "../../../constant/statusCodes";
import { useNavigate } from "react-router-dom";
import {
  actions,
  getSaveUpdateProgramTypeMaster,
  getbyIdProgramTypeMaster,
} from "../../../store/Master/programTypeMaster";
import { useDispatch, useSelector } from "react-redux";
import MastersHeader from "../../../layouts/MastersHeader";
import { useParams } from "react-router-dom";
import { useMasterTableStyles } from "../../../assets/style/mastersTableStyle";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputController, CheckboxController } from "../../../control";

const programTypeSchema = yup
  .object({
    programTypeName: yup
      .string()
      .matches(/^[a-zA-Z ]*$/, "Enter characters only")
      .required("Please enter program type"),
    isActive: yup.boolean().default(false),
    description: yup
      .string()
      .required("Please enter description"),
  })
  .required();

const ProgramTypeForm: FC = () => {
  const { control, setValue, getValues, resetField, handleSubmit } = useForm({
    resolver: yupResolver(programTypeSchema),
    defaultValues: {
      programTypeName: "",
      description: "",
      isActive: false,
    },
    mode: "onChange",
  });

  const getSaveDetails = useSelector(getSaveUpdateProgramTypeMaster);
  const getByIDProgramTypeData = useSelector(getbyIdProgramTypeMaster);
  const loaderStatus = useSelector(selectStatus);
  const navigate = useNavigate();
  const classes = useMasterTableStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const fetchGetbyIDProgramTypeData = async () => {
        try {
          dispatch(actions.loadGetByIdProgramTypeMaster(parseInt(id)));
        } catch (error: any) { }
      };
      fetchGetbyIDProgramTypeData();
    }
  }, [id, setValue]);

  useEffect(() => {
    if (id) {
      const setGetbyIDProgramTypeData = async () => {
        try {
          if (getByIDProgramTypeData) {
            setValue("programTypeName", getByIDProgramTypeData.name);
            setValue("description", getByIDProgramTypeData.description);
            setValue("isActive", getByIDProgramTypeData.isActive);
          }
        } catch (error: any) { }
      };
      setGetbyIDProgramTypeData();
    }
  }, [getByIDProgramTypeData]);

  const onSubmit = (data: any) => {
    id ? updateProgramType() : addProgramType();
  };

  const addProgramType = () => {
    try {
      const request = {
        id: 0,
        isActive: getValues("isActive"),
        name: getValues("programTypeName").toUpperCase(),
        description: getValues("description"),
      };
      dispatch(
        actions.loadSaveUpdateProgramTypeMaster({ request, type: "ADD" })
      );
    } catch (error) { }
  };
  const updateProgramType = () => {
    try {
      const request = {
        id: id,
        isActive: getValues("isActive"),
        name: getValues("programTypeName").toUpperCase(),
        description: getValues("description"),
      };
      dispatch(
        actions.loadSaveUpdateProgramTypeMaster({ request, type: "EDIT" })
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
          navigate("/program-type");
        }
      };
      redirectToList();
    }
  }, [getSaveDetails]);

  const navigateToProgramTypeList = () => {
    dispatch(actions.setSaveUpdateProgramTypeMaster(null));
    navigate("/program-type");
    setValue("programTypeName", "");
    setValue("description", "");
    setValue("isActive", false);
  };

  return (
    <>
      {loaderStatus === "loading" && <Loader />}
      <div>
        <MastersHeader
          title={id ? "Edit Program Type" : "Add Program Type"}
          BreadcrumbTitle={"Program Type"}
          BreadcrumSubTitle={id ? "Edit Program Type" : "Add Program Type"}
        />
        {/* <!-- /breadcrumb --> */}
      </div>
      <Paper elevation={3} className={classes.PaperLayout}>
        <Box p={3} pt={0}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3} alignItems={"center"} my={3}>
              <Grid item sm={4}>
                <InputController
                  control={control}
                  name="programTypeName"
                  label="Program Type"
                  resetClick={() => resetField("programTypeName")}
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
                  <Button variant="outlined" onClick={navigateToProgramTypeList}>
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

export default ProgramTypeForm;
