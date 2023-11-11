import React, { FC, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { useForm, Controller } from "react-hook-form";
import { Box, Paper, TextField, Button, IconButton } from "@mui/material";
import { ADD, UPDATE } from "../../../constant/statusCodes";
import { useNavigate } from "react-router-dom";
import {
  actions,
  getSaveUpdateTimeSlotMaster,
  getbyIdTimeSlotMaster,
} from "../../../store/GlobalMaster/timeSlotMaster";
import { useDispatch, useSelector } from "react-redux";
import MastersHeader from "../../../layouts/MastersHeader";
import { CheckBox } from "../../../control";
import { useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useMasterTableStyles } from "../../../assets/style/mastersTableStyle";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";
import TimePickerComponet from "../../../control/timePicker";
import moment from "moment-timezone";
const TimeSlotForm: FC = () => {
  const { control, setValue, getValues, reset } = useForm({
    defaultValues: {
      timeSlotName: "",
      fromTime: new Date(),
      toTime: new Date(),
      isActive: false,
      submit: null,
    },
  });
  const getSaveDetails = useSelector(getSaveUpdateTimeSlotMaster);
  const getByIDTimeSlotData = useSelector(getbyIdTimeSlotMaster);
  const loaderStatus = useSelector(selectStatus);
  const navigate = useNavigate();
  const classes = useMasterTableStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const fetchGetbyIDTimeSlotData = async () => {
        try {
          dispatch(actions.loadGetByIdTimeSlotMaster(parseInt(id)));
        } catch (error: any) { }
      };
      fetchGetbyIDTimeSlotData();
    }
  }, [id, setValue]);

  useEffect(() => {
    if (id) {
      const setGetbyIDTimeSlotData = async () => {
        try {
          if (getByIDTimeSlotData) {
            setValue("timeSlotName", getByIDTimeSlotData.name);
            setValue("isActive", getByIDTimeSlotData.isActive);
            setValue("fromTime", getByIDTimeSlotData.fromTime);
            setValue("toTime", getByIDTimeSlotData.toTime);
          }
        } catch (error: any) { }
      };
      setGetbyIDTimeSlotData();
    }
  }, [getByIDTimeSlotData]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    id ? updateTimeSlot() : addTimeSlot();
  };
  const addTimeSlot = () => {
    try {
      const request = {
        id: 0,
        isActive: getValues("isActive"),
        name: getValues("timeSlotName"),
        fromTime: getValues("fromTime"),
        toTime: getValues("toTime"),
      };
      dispatch(actions.loadSaveUpdateTimeSlotMaster({ request, type: "ADD" }));
    } catch (error) { }
  };
  const updateTimeSlot = () => {
    try {
      const request = {
        id: id,
        isActive: getValues("isActive"),
        name: getValues("timeSlotName"),
        fromTime: getValues("fromTime"),
        toTime: getValues("toTime"),
      };
      dispatch(actions.loadSaveUpdateTimeSlotMaster({ request, type: "EDIT" }));
    } catch (error) { }
  };

  useEffect(() => {
    if (getSaveDetails) {
      const redirectToList = async () => {
        if (
          (getSaveDetails && getSaveDetails.statusCode === ADD) ||
          getSaveDetails.statusCode === UPDATE
        ) {
          navigate("/time-slot");
        }
      };
      redirectToList();
    }
  }, [getSaveDetails]);

  const navigateToRTimeSlotList = () => {
    dispatch(actions.setSaveUpdateTimeSlotMaster(null));
    navigate("/time-slot");
    setValue("timeSlotName", "");
    setValue("fromTime", new Date());
    setValue("toTime", new Date());
    setValue("isActive", false);
  };

  const onSearchData = (data: any) => {
    setValue("timeSlotName", data);
  };

  const onTimerChange = (data: any, type: string) => {
    type === "fromTime"
      ? setValue("fromTime", new Date(data))
      : setValue("toTime", new Date(data));
  };

  return (
    <>
      {loaderStatus === "loading" && <Loader />}
      <div>
        {/* <!-- breadcrumb --> */}
        <MastersHeader
          title={id ? "Edit Time slot" : "Add Time slot"}
          BreadcrumbTitle={"Time slot"}
          BreadcrumSubTitle={id ? "Edit Time slot" : "Add Time slot"}
        />
        {/* <!-- /breadcrumb --> */}
      </div>
      <Paper elevation={3} className={classes.PaperLayout}>
        <Box p={2} pt={0}>
          <form onSubmit={onSubmit}>
            <Grid container spacing={2}>
              <Grid item container sm={4} mt={1}>
                <Controller
                  render={({ field: any }) => (
                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      label="Time Slot"
                      id="inputName"
                      placeholder="Time slot Name"
                      value={getValues("timeSlotName")}
                      onChange={(e) => onSearchData(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            size="small"
                            onClick={() =>
                              reset({ timeSlotName: "", isActive: false })
                            }
                            disabled={id ? true : false}
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        ),
                      }}
                    />
                  )}
                  name="timeSlotName"
                  control={control}
                  defaultValue=""
                />
              </Grid>

              <Grid item container sm={4}>
                <Controller
                  render={({ field: { onChange } }) => (
                    <TimePickerComponet
                      value={moment
                        .utc(getValues("fromTime"))
                        .utcOffset(moment().utcOffset())
                        .format("L LT")}
                      onChange={onChange}
                      label={"Start Time"}
                    />
                  )}
                  name="fromTime"
                  control={control}
                //defaultValue=""
                />
              </Grid>

              <Grid item container sm={4}>
                <Controller
                  render={({ field: { onChange } }) => (
                    <TimePickerComponet
                      value={moment
                        .utc(getValues("toTime"))
                        .utcOffset(moment().utcOffset())
                        .format("L LT")}
                      onChange={onChange}
                      label={"To Time"}
                    />
                  )}
                  name="toTime"
                  control={control}
                //defaultValue=""
                />
              </Grid>

              <Grid item container sm={4}>
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

              <Grid item container sm={4} gap={2}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="small"
                  className={classes.buttonLayout}
                >
                  Submit
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={navigateToRTimeSlotList}
                  className={classes.buttonLayout}
                >
                  Back
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Paper>
    </>
  );
};

export default TimeSlotForm;
