import React, { FC, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Box, Paper, TextField, Button, IconButton } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { ADD, UPDATE } from "../../../constant/statusCodes";
import { useNavigate } from "react-router-dom";
import {
  actions,
  getSaveUpdateCountryMaster,
  getbyIdCountryMaster,
} from "../../../store/GlobalMaster/countryMaster";
import { useDispatch, useSelector } from "react-redux";
import MastersHeader from "../../../layouts/MastersHeader";
import { CheckBox } from "../../../control";
import { useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useMasterTableStyles } from "../../../assets/style/mastersTableStyle";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";

// const schema = yup.object({
//   countryName: yup.string().matches(/^[a-zA-Z ]*$/,"Enter only character").required('Enter Country'),
//   isActive: yup.boolean().required(),
// }).required();

const CountryForm: FC = () => {
  const {
    control,
    setValue,
    getValues,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(schema),
    defaultValues: {
      countryName: "",
      isActive: false,
      submit: null,
    },
  });

  const getSaveDetails = useSelector(getSaveUpdateCountryMaster);
  const getByIDCountryData = useSelector(getbyIdCountryMaster);
  const loaderStatus = useSelector(selectStatus);
  const navigate = useNavigate();
  const classes = useMasterTableStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const fetchGetbyIDCountryData = async () => {
        try {
          dispatch(actions.loadGetByIdCountryMaster(parseInt(id)));
        } catch (error: any) { }
      };
      fetchGetbyIDCountryData();
    }
  }, [id, setValue]);

  useEffect(() => {
    if (id) {
      const setGetbyIDCountryData = async () => {
        try {
          if (getByIDCountryData) {
            setValue("countryName", getByIDCountryData.name);
            setValue("isActive", getByIDCountryData.isActive);
          }
        } catch (error: any) { }
      };
      setGetbyIDCountryData();
    }
  }, [getByIDCountryData]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    id ? updateCountry() : addCountry();
  };
  const addCountry = () => {
    try {
      const request = {
        id: 0,
        isActive: getValues("isActive"),
        name: getValues("countryName").toUpperCase(),
      };
      if (!request.name) {
        setError('countryName', { type: "required", message: "*Country name required" });
      }
      else if (!/^[a-zA-Z ]*$/.test(request.name)) {
        setError('countryName', { type: "required", message: "*Invalid Country" });
        return
      }
      else {
        dispatch(actions.loadSaveUpdateCountryMaster({ request, type: "ADD" }));
      }
    } catch (error) { }
  };
  const updateCountry = () => {
    try {
      const request = {
        id: id,
        isActive: getValues("isActive"),
        name: getValues("countryName").toUpperCase(),
      };
      dispatch(actions.loadSaveUpdateCountryMaster({ request, type: "EDIT" }));
    } catch (error) { }
  };

  useEffect(() => {
    if (getSaveDetails) {
      const redirectToList = async () => {
        if (
          (getSaveDetails && getSaveDetails.statusCode === ADD) ||
          getSaveDetails.statusCode === UPDATE
        ) {
          navigate("/country");
        }
      };
      redirectToList();
    }
  }, [getSaveDetails]);

  const navigateToRCountryList = () => {
    dispatch(actions.setSaveUpdateCountryMaster(null));
    navigate("/country");
    setValue("countryName", "");
    setValue("isActive", false);
  };

  const onSearchData = (data: any) => {
    if (data) {
      if (!/^[a-zA-Z ]*$/.test(data)) {
        setError('countryName', { type: "required", message: "only alphabetical characters allowed" });
      }
      else {
        clearErrors('countryName');
      }
      setValue("countryName", data);
    }
  };

  return (
    <>
      {loaderStatus === "loading" ? <Loader /> : ""}
      <div>
        {/* <!-- breadcrumb --> */}
        <MastersHeader
          title={id ? "Edit Country" : "Add Country"}
          BreadcrumbTitle={"Country"}
          BreadcrumSubTitle={id ? "Edit Country" : "Add Country"}
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
                xs={12}
                sm={12}
                md={4}
              >
                <Controller
                  rules={{ required: true }}
                  render={({ field: any }) => (
                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      label="Country"
                      id="inputName"
                      value={getValues("countryName")}
                      onChange={(e) => onSearchData(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            size="small"
                            onClick={() =>
                              reset({ countryName: "", isActive: false })
                            }
                            disabled={id ? true : false}
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        ),
                      }}
                      error={!!errors?.countryName?.message}
                      helperText={errors.countryName?.message}
                    />
                  )}
                  name="countryName"
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
                xs={12}
                sm={12}
                md={8}
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
                xs={3}
                md={1}
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
                xs={3}
                md={1}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={navigateToRCountryList}
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

export default CountryForm;
