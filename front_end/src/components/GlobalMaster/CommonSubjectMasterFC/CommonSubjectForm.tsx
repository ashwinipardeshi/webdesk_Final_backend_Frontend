import React, { FC, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { Box, Paper, Button } from "@mui/material";
import { ADD, UPDATE } from "../../../constant/statusCodes";
import { useNavigate } from "react-router-dom";
import {
  actions,
  getSaveUpdateCommonSubjectMaster,
  getbyIdCommonSubjectMaster,
} from "../../../store/GlobalMaster/commonSubjectMaster";
import { useDispatch, useSelector } from "react-redux";
import MastersHeader from "../../../layouts/MastersHeader";
import { useParams } from "react-router-dom";
import { useMasterTableStyles } from "../../../assets/style/mastersTableStyle";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputController, CheckboxController } from "../../../control";

const commonSubjectSchema = yup
  .object({
    commonSubjectName: yup
      .string()
      .matches(/^[a-zA-Z ]*$/, "Enter characters only")
      .required("Please enter common subject"),
    isActive: yup.boolean().default(false),
  })
  .required();

const CommonSubjectForm: FC = () => {
  const { control, setValue, getValues, resetField, handleSubmit } = useForm({
    resolver: yupResolver(commonSubjectSchema),
    defaultValues: {
      commonSubjectName: "",
      isActive: false,
    },
    mode: 'onChange',
  });

  const getSaveDetails = useSelector(getSaveUpdateCommonSubjectMaster);
  const getByIDCommonSubjectData = useSelector(getbyIdCommonSubjectMaster);
  const loaderStatus = useSelector(selectStatus);
  const navigate = useNavigate();
  const classes = useMasterTableStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const fetchGetbyIDCommonSubjectData = async () => {
        try {
          dispatch(actions.loadGetByIdCommonSubjectMaster(parseInt(id)));
        } catch (error: any) { }
      };
      fetchGetbyIDCommonSubjectData();
    }
  }, [id, setValue]);

  useEffect(() => {
    if (id) {
      const setGetbyIDCommonSubjectData = async () => {
        try {
          if (getByIDCommonSubjectData) {
            setValue("commonSubjectName", getByIDCommonSubjectData.name);
            setValue("isActive", getByIDCommonSubjectData.isActive);
          }
        } catch (error: any) { }
      };
      setGetbyIDCommonSubjectData();
    }
  }, [getByIDCommonSubjectData]);

  const onSubmit = (data: any) => {
    id ? updateCommonSubject() : addCommonSubject();
  };

  const addCommonSubject = () => {
    try {
      const request = {
        id: 0,
        isActive: getValues("isActive"),
        name: getValues("commonSubjectName").toUpperCase(),
        type: "new",
      };

      dispatch(
        actions.loadSaveUpdateCommonSubjectMaster({ request, type: "ADD" })
      );
    } catch (error) { }
  };

  const updateCommonSubject = () => {
    try {
      const request = {
        id: id,
        isActive: getValues("isActive"),
        name: getValues("commonSubjectName").toUpperCase(),
        type: "new",
      };
      dispatch(
        actions.loadSaveUpdateCommonSubjectMaster({ request, type: "EDIT" })
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
          navigate("/common-subject");
        }
      };
      redirectToList();
    }
  }, [getSaveDetails]);

  const navigateToCommonSubjectList = () => {
    dispatch(actions.setSaveUpdateCommonSubjectMaster(null));
    navigate("/common-subject");
    setValue("commonSubjectName", "");
    setValue("isActive", false);
  };

  return (
    <>
      {loaderStatus === "loading" && <Loader />}
      <div>
        <MastersHeader
          title={id ? "Edit Common Subject" : "Add Common Subject"}
          BreadcrumbTitle={"Common Subject"}
          BreadcrumSubTitle={id ? "Edit Common Subject" : "Add Common Subject"}
        />
      </div>
      <Paper elevation={3} className={classes.PaperLayout}>
        <Box p={3} pt={0}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3} alignItems={"center"} my={3}>
              <Grid item sm={4}>
                <InputController
                  control={control}
                  name="commonSubjectName"
                  label="Common Subject"
                  resetClick={() => resetField("commonSubjectName")}
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
                  <Button variant="outlined" onClick={navigateToCommonSubjectList}>
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

export default CommonSubjectForm;
