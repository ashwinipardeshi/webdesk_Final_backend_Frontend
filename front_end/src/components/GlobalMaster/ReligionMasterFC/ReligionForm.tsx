import React, { FC, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Box, Paper, TextField, Button, IconButton } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { ADD, UPDATE } from "../../../constant/statusCodes";
import { useNavigate } from "react-router-dom";
import {
  actions,
  getSaveUpdateReligionMaster,
  getbyIdReligionMaster,
} from "../../../store/GlobalMaster/religionMaster";
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

const religionSchema = yup
  .object({
    religionName: yup
      .string()
      .matches(/^[a-zA-Z0-9 ]*$/, "Enter only characters")
      .required("Please enter Religion"),
    isActive: yup.boolean().default(false),
  })
  .required();


const ReligionForm: FC = () => {
  const { control, setValue, getValues, handleSubmit, resetField } = useForm({
    resolver: yupResolver(religionSchema),
    defaultValues: {
      religionName: "",
      isActive: false,
    },
    mode: "onChange",
  });
  const getSaveDetails = useSelector(getSaveUpdateReligionMaster);
  const getByIDReligionData = useSelector(getbyIdReligionMaster);
  const loaderStatus = useSelector(selectStatus);
  const navigate = useNavigate();
  const classes = useMasterTableStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const fetchGetbyIDReligionData = async () => {
        try {
          dispatch(actions.loadGetByIdReligionMaster(parseInt(id)));
        } catch (error: any) { }
      };
      fetchGetbyIDReligionData();
    }
  }, [id, setValue]);

  useEffect(() => {
    if (id) {
      const setGetbyIDReligionData = async () => {
        try {
          if (getByIDReligionData) {
            setValue("religionName", getByIDReligionData.name);
            setValue("isActive", getByIDReligionData.isActive);
          }
        } catch (error: any) { }
      };
      setGetbyIDReligionData();
    }
  }, [getByIDReligionData]);

  const onSubmit = (data: any) => {
    id ? updateReligion() : addReligion();
  };
  const addReligion = () => {
    try {
      const request = {
        id: 0,
        isActive: getValues("isActive"),
        name: getValues("religionName").toUpperCase(),
      };
      dispatch(actions.loadSaveUpdateReligionMaster({ request, type: "ADD" }));
    } catch (error) { }
  };
  const updateReligion = () => {
    try {
      const request = {
        id: id,
        isActive: getValues("isActive"),
        name: getValues("religionName").toUpperCase(),
      };
      console.log(request);
      dispatch(actions.loadSaveUpdateReligionMaster({ request, type: "EDIT" }));
    } catch (error) { }
  };
  useEffect(() => {
    if (getSaveDetails) {
      const redirectToList = async () => {
        if (
          (getSaveDetails && getSaveDetails.statusCode === ADD) ||
          getSaveDetails.statusCode === UPDATE
        ) {
          navigate("/religion");
        }
      };
      redirectToList();
    }
  }, [getSaveDetails]);

  const navigateToReligionList = () => {
    dispatch(actions.setSaveUpdateReligionMaster(null));
    navigate("/religion");
    setValue("religionName", "");
    setValue("isActive", false);
  };

  const onSearchData = (data: any) => {
    setValue("religionName", data);
  };


  return (
    <>
      {loaderStatus === "loading" && <Loader />}
      <div>
        <MastersHeader
          title={id ? "Edit Religion" : "Add Religion"}
          BreadcrumbTitle={"Religion"}
          BreadcrumSubTitle={id ? "Edit Religion" : "Add Religion"}
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
                  name="religionName"
                  label="Religion"
                  resetClick={() => resetField("religionName")}
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
                  <Button variant="outlined" onClick={navigateToReligionList}>
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

export default ReligionForm;
