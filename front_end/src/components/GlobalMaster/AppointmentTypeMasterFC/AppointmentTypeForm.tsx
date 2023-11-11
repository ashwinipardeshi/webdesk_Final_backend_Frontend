import React, { FC, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Box, Paper, TextField, Button, IconButton } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { ADD, UPDATE } from "../../../constant/statusCodes";
import { useNavigate } from "react-router-dom";
import {
  actions,
  getSaveUpdateAppointmentTypeMaster,
  getbyIdAppointmentTypeMaster,
} from "../../../store/GlobalMaster/appointmentTypeMaster";
import { useDispatch, useSelector } from "react-redux";
import MastersHeader from "../../../layouts/MastersHeader";
import { CheckBox } from "../../../control";
import { useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useMasterTableStyles } from "../../../assets/style/mastersTableStyle";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";

const AppointmentTypeForm: FC = () => {
  const { control, setValue, getValues, reset } = useForm({
    defaultValues: {
      name: "",
      isActive: false,
      submit: null,
    },
  });
  const getSaveDetails = useSelector(getSaveUpdateAppointmentTypeMaster);
  const getByIDAppointmentTypeData = useSelector(getbyIdAppointmentTypeMaster);
  const loaderStatus = useSelector(selectStatus);
  const navigate = useNavigate();
  const classes = useMasterTableStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const fetchGetbyIDAppointmentTypeData = async () => {
        try {
          dispatch(actions.loadGetByIdAppointmentTypeMaster(parseInt(id)));
        } catch (error: any) { }
      };
      fetchGetbyIDAppointmentTypeData();
    }
  }, [id, setValue]);

  useEffect(() => {
    if (id) {
      const setGetbyIDAppointmentTypeData = async () => {
        try {
          if (getByIDAppointmentTypeData) {
            setValue("name", getByIDAppointmentTypeData.name);
            setValue("isActive", getByIDAppointmentTypeData.isActive);
          }
        } catch (error: any) { }
      };
      setGetbyIDAppointmentTypeData();
    }
  }, [getByIDAppointmentTypeData]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    id ? updateAppointmentType() : addAppointmentType();
  };
  const addAppointmentType = () => {
    try {
      const request = {
        id: 0,
        isActive: getValues("isActive"),
        name: getValues("name").toUpperCase(),
      };
      dispatch(
        actions.loadSaveUpdateAppointmentTypeMaster({ request, type: "ADD" })
      );
    } catch (error) { }
  };
  const updateAppointmentType = () => {
    try {
      const request = {
        id: id,
        isActive: getValues("isActive"),
        name: getValues("name").toUpperCase(),
      };
      dispatch(
        actions.loadSaveUpdateAppointmentTypeMaster({ request, type: "EDIT" })
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
          navigate("/appointment-type");
        }
      };
      redirectToList();
    }
  }, [getSaveDetails]);

  const navigateToRAppointmentTypeList = () => {
    dispatch(actions.setSaveUpdateAppointmentTypeMaster(null));
    navigate("/appointment-type");
    setValue("name", "");
    setValue("isActive", false);
  };

  const onSearchData = (data: any) => {
    setValue("name", data);
  };

  return (
    <>
      {loaderStatus === "loading" && <Loader />}
      <div>
        {/* <!-- breadcrumb --> */}
        <MastersHeader
          title={id ? "Edit Appointment Type" : "Add Appointment Type"}
          BreadcrumbTitle={"Appointment Type"}
          BreadcrumSubTitle={
            id ? "Edit Appointment Type" : "Add Appointment Type"
          }
        />
        {/* <!-- /breadcrumb --> */}
      </div>
      <Paper elevation={3} className={classes.PaperLayout}>
        <Box p={2} pt={0}>
          <form onSubmit={onSubmit}>
            <Grid container mt={0} spacing={2}>
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
                      type="text"
                      label="Appointment Type"
                      id="inputName"
                      value={getValues("name")}
                      onChange={(e) => onSearchData(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            size="small"
                            onClick={() => reset({ name: "", isActive: false })}
                            disabled={id ? true : false}
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        ),
                      }}
                    />
                  )}
                  name="name"
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
                xs={2}
              >
                <Controller
                  name="isActive"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CheckBox
                      name="isActive"
                      id="isActive"
                      label="Active"
                      value={getValues("isActive")}
                      onChange={(e: any) =>
                        setValue("isActive", e.target.value)
                      }
                      className=""
                    />
                  )}
                />
              </Grid>
              <Grid
                item
                container
                alignItems={"center"}
                justifyContent={"left"}
                my={0}
                xs={6}
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
                  onClick={navigateToRAppointmentTypeList}
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

export default AppointmentTypeForm;
