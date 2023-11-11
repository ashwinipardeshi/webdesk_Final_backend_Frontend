import React, { FC, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Box, Paper, TextField, Button, IconButton } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { ADD, UPDATE } from "../../../constant/statusCodes";
import { useNavigate } from "react-router-dom";
import {
  actions,
  getSaveUpdateMotherTongueMaster,
  getbyIdMotherTongueMaster,
} from "../../../store/GlobalMaster/motherTongueMaster";
import { useDispatch, useSelector } from "react-redux";
import MastersHeader from "../../../layouts/MastersHeader";
import { CheckBox } from "../../../control";
import { useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useMasterTableStyles } from "../../../assets/style/mastersTableStyle";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputController, CheckboxController } from "../../../control";

const motherTongueSchema = yup
  .object({
    motherTongueName: yup
      .string()
      .matches(/^[a-zA-Z ]*$/, "Enter characters only")
      .required("Please enter mother tongue"),
    isActive: yup.boolean().default(false),
  })
  .required();

const MotherTongueForm: FC = () => {
  const { control, setValue, getValues, resetField, handleSubmit } = useForm({
    resolver: yupResolver(motherTongueSchema),
    defaultValues: {
      motherTongueName: "",
      isActive: false,
    },
    mode: "onChange",
  });
  const getSaveDetails = useSelector(getSaveUpdateMotherTongueMaster);
  const getByIDMotherTongueData = useSelector(getbyIdMotherTongueMaster);
  const loaderStatus = useSelector(selectStatus);
  const navigate = useNavigate();
  const classes = useMasterTableStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const fetchGetbyIDMotherTongueData = async () => {
        try {
          dispatch(actions.loadGetByIdMotherTongueMaster(parseInt(id)));
        } catch (error: any) { }
      };
      fetchGetbyIDMotherTongueData();
    }
  }, [id, setValue]);

  useEffect(() => {
    if (id) {
      const setGetbyIDMotherTongueData = async () => {
        try {
          if (getByIDMotherTongueData) {
            setValue("motherTongueName", getByIDMotherTongueData.name);
            setValue("isActive", getByIDMotherTongueData.isActive);
          }
        } catch (error: any) { }
      };
      setGetbyIDMotherTongueData();
    }
  }, [getByIDMotherTongueData]);

  const onSubmit = (data: any) => {
    id ? updateMotherTongue() : addMotherTongue();
  };

  const addMotherTongue = () => {
    try {
      const request = {
        id: 0,
        isActive: getValues("isActive"),
        name: getValues("motherTongueName").toUpperCase(),
      };
      dispatch(
        actions.loadSaveUpdateMotherTongueMaster({ request, type: "ADD" })
      );
    } catch (error) { }
  };
  const updateMotherTongue = () => {
    try {
      const request = {
        id: id,
        isActive: getValues("isActive"),
        name: getValues("motherTongueName").toUpperCase(),
      };
      dispatch(
        actions.loadSaveUpdateMotherTongueMaster({ request, type: "EDIT" })
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
          navigate("/mother-tongue");
        }
      };
      redirectToList();
    }
  }, [getSaveDetails]);

  const navigateToMotherTongueList = () => {
    dispatch(actions.setSaveUpdateMotherTongueMaster(null));
    navigate("/mother-tongue");
    setValue("motherTongueName", "");
    setValue("isActive", false);
  };

  return (
    <>
      {loaderStatus === "loading" && <Loader />}
      <div>
        {/* <!-- breadcrumb --> */}
        <MastersHeader
          title={id ? "Edit Mother Tongue" : "Add Mother Tongue"}
          BreadcrumbTitle={"Mother Tongue"}
          BreadcrumSubTitle={id ? "Edit Mother Tongue" : "Add Mother Tongue"}
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
                  name="motherTongueName"
                  label="Mother Tongue"
                  resetClick={() => resetField("motherTongueName")}
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
                  <Button variant="outlined" onClick={navigateToMotherTongueList}>
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

export default MotherTongueForm;
