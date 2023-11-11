import React, { FC, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { Box, Paper, Button } from "@mui/material";
import { ADD, UPDATE } from "../../../constant/statusCodes";
import { useNavigate } from "react-router-dom";
import {
  actions,
  getSaveUpdateStudyMaster,
  getbyIdStudyMaster,
} from "../../../store/Master/studyMaster";
import { useDispatch, useSelector } from "react-redux";
import MastersHeader from "../../../layouts/MastersHeader";
import { useParams } from "react-router-dom";
import { useMasterTableStyles } from "../../../assets/style/mastersTableStyle";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputController, CheckboxController } from "../../../control";

const studySchema = yup
  .object({
    studyName: yup
      .string()
      .matches(/^[a-zA-Z ]*$/, "Enter characters only")
      .required("Please enter study name"),
    isActive: yup.boolean().default(false),
  })
  .required();

const StudyForm: FC = () => {
  const { control, setValue, getValues, resetField, handleSubmit } = useForm({
    resolver: yupResolver(studySchema),
    defaultValues: {
      studyName: "",
      isActive: false,
    },
    mode: "onChange",
  });

  const getSaveDetails = useSelector(getSaveUpdateStudyMaster);
  const getByIDStudyData = useSelector(getbyIdStudyMaster);
  const loaderStatus = useSelector(selectStatus);
  const navigate = useNavigate();
  const classes = useMasterTableStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const fetchGetbyIDStudyData = async () => {
        try {
          dispatch(actions.loadGetByIdStudyMaster(parseInt(id)));
        } catch (error: any) { }
      };
      fetchGetbyIDStudyData();
    }
  }, [id, setValue]);

  useEffect(() => {
    if (id) {
      const setGetbyIDStudyData = async () => {
        try {
          if (getByIDStudyData) {
            setValue("studyName", getByIDStudyData.name);
            setValue("isActive", getByIDStudyData.isActive);
          }
        } catch (error: any) { }
      };
      setGetbyIDStudyData();
    }
  }, [getByIDStudyData]);

  const onSubmit = (data: any) => {
    id ? updateStudy() : addStudy();
  };

  const addStudy = () => {
    try {
      const request = {
        id: 0,
        isActive: getValues("isActive"),
        name: getValues("studyName").toUpperCase(),
      };
      dispatch(actions.loadSaveUpdateStudyMaster({ request, type: "ADD" }));
    } catch (error) { }
  };
  const updateStudy = () => {
    try {
      const request = {
        id: id,
        isActive: getValues("isActive"),
        name: getValues("studyName").toUpperCase(),
      };
      dispatch(actions.loadSaveUpdateStudyMaster({ request, type: "EDIT" }));
    } catch (error) { }
  };

  useEffect(() => {
    if (getSaveDetails) {
      const redirectToList = async () => {
        if (
          (getSaveDetails && getSaveDetails.statusCode === ADD) ||
          getSaveDetails.statusCode === UPDATE
        ) {
          navigate("/study");
        }
      };
      redirectToList();
    }
  }, [getSaveDetails]);

  const navigateToStudyList = () => {
    dispatch(actions.setSaveUpdateStudyMaster(null));
    navigate("/study");
    setValue("studyName", "");
    setValue("isActive", false);
  };

  return (
    <>
      {loaderStatus === "loading" && <Loader />}
      <div>
        <MastersHeader
          title={id ? "Edit Study" : "Add Study"}
          BreadcrumbTitle={"Study"}
          BreadcrumSubTitle={id ? "Edit Study" : "Add Study"}
        />
      </div>

      <Paper elevation={3} className={classes.PaperLayout}>
        <Box p={3} pt={0}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3} alignItems={"center"} my={3}>
              <Grid item sm={4}>
                <InputController
                  control={control}
                  name="studyName"
                  label="Study"
                  resetClick={() => resetField("studyName")}
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
                  <Button variant="outlined" onClick={navigateToStudyList}>
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

export default StudyForm;
