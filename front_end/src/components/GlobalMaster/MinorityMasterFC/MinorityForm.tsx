import React, { FC, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Box, Paper, TextField, Button, IconButton } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { ADD, UPDATE } from "../../../constant/statusCodes";
import { useNavigate } from "react-router-dom";
import {
  actions,
  getSaveUpdateMinorityMaster,
  getbyIdMinorityMaster,
} from "../../../store/GlobalMaster/minorityMaster";

import { useDispatch, useSelector } from "react-redux";
import MastersHeader from "../../../layouts/MastersHeader";
import { CheckBox } from "../../../control";
import { useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useMasterTableStyles } from "../../../assets/style/mastersTableStyle";

const MinorityForm: FC = () => {
  const { control, setValue, getValues, reset } = useForm({
    defaultValues: {
      minorityName: "",
      isActive: false,
      submit: null,
    },
  });
  const getSaveDetails = useSelector(getSaveUpdateMinorityMaster);
  const getByIDMinorityData = useSelector(getbyIdMinorityMaster);
  const navigate = useNavigate();
  const classes = useMasterTableStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const fetchGetbyIDMinorityData = async () => {
        try {
          dispatch(actions.loadGetByIdMinorityMaster(parseInt(id)));
        } catch (error: any) { }
      };
      fetchGetbyIDMinorityData();
    }
  }, [id, setValue]);

  useEffect(() => {
    if (id) {
      const setGetbyIDMinorityData = async () => {
        try {
          if (getByIDMinorityData) {
            setValue("minorityName", getByIDMinorityData.name);
            setValue("isActive", getByIDMinorityData.isActive);
          }
        } catch (error: any) { }
      };
      setGetbyIDMinorityData();
    }
  }, [getByIDMinorityData]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    id ? updateMinority() : addMinority();
  };
  const addMinority = () => {
    try {
      const request = {
        id: 0,
        isActive: getValues("isActive"),
        name: getValues("minorityName").toUpperCase(),
      };
      dispatch(actions.loadSaveUpdateMinorityMaster({ request, type: "ADD" }));
    } catch (error) { }
  };
  const updateMinority = () => {
    try {
      const request = {
        id: id,
        isActive: getValues("isActive"),
        name: getValues("minorityName").toUpperCase(),
      };
      dispatch(actions.loadSaveUpdateMinorityMaster({ request, type: "EDIT" }));
    } catch (error) { }
  };

  useEffect(() => {
    if (getSaveDetails) {
      const redirectToList = async () => {
        if (
          (getSaveDetails && getSaveDetails.statusCode === ADD) ||
          getSaveDetails.statusCode === UPDATE
        ) {
          navigate("/minority");
        }
      };
      redirectToList();
    }
  }, [getSaveDetails]);

  const navigateToRMinorityList = () => {
    dispatch(actions.setSaveUpdateMinorityMaster(null));
    navigate("/minority");
    setValue("minorityName", "");
    setValue("isActive", false);
  };

  const onSearchData = (data: any) => {
    setValue("minorityName", data);
  };

  return (
    <>
      <div>
        {/* <!-- breadcrumb --> */}
        <MastersHeader
          title={id ? "Edit Minority" : "Add Minority"}
          BreadcrumbTitle={"Minority"}
          BreadcrumSubTitle={id ? "Edit Minority" : "Add Minority"}
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
                      label="Minority"
                      id="inputName"
                      value={getValues("minorityName")}
                      onChange={(e) => onSearchData(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            size="small"
                            onClick={() =>
                              reset({ minorityName: "", isActive: false })
                            }
                            disabled={id ? true : false}
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        ),
                      }}
                    />
                  )}
                  name="minorityName"
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
                  onClick={navigateToRMinorityList}
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

export default MinorityForm;
