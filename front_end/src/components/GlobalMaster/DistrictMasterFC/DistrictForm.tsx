import React, { FC, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useForm, Controller } from "react-hook-form";
import { Box, Paper, TextField, Button, IconButton } from "@mui/material";
import { ADD, UPDATE } from "../../../constant/statusCodes";
import { useNavigate } from "react-router-dom";
import {
  actions,
  getSaveUpdateDistrictMaster,
  getbyIdDistrictMaster,
} from "../../../store/GlobalMaster/districtMaster";
import { StateOptionHook } from "../../../hooks/globalMasters/stateHooks";
import { useDispatch, useSelector } from "react-redux";
import MastersHeader from "../../../layouts/MastersHeader";
import { CheckBox } from "../../../control";
import { useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useMasterTableStyles } from "../../../assets/style/mastersTableStyle";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";
import {
  CheckboxController,
  InputController,
  SelectController,
} from "../../../control";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const districtSchema = yup
  .object({
    stateId: yup.string().required("Please select State"),
    districtName: yup
      .string()
      .matches(/^[a-zA-Z ]*$/, "Enter only characters")
      .required("Please enter district"),
    isActive: yup.boolean().default(false),
  })
  .required();

const DistrictForm: FC = () => {
  const { optionstatedata: Statesoption } = StateOptionHook(true);

  const { control, setValue, getValues, reset, resetField, handleSubmit } = useForm({
    resolver: yupResolver(districtSchema),
    defaultValues: {
      districtName: "",
      stateId: "",
      isActive: false,
    },
    mode: "onChange",
  });
  const getSaveDetails = useSelector(getSaveUpdateDistrictMaster);
  const getByIDDistrictData = useSelector(getbyIdDistrictMaster);
  const loaderStatus = useSelector(selectStatus);
  const navigate = useNavigate();
  const classes = useMasterTableStyles();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchGetbyIDDistrictData = async () => {
        try {
          dispatch(actions.loadGetByIdDistrictMaster(parseInt(id)));
        } catch (error: any) { }
      };
      fetchGetbyIDDistrictData();
    }
  }, [id, setValue]);

  useEffect(() => {
    if (id) {
      const setGetbyIDDistrictData = async () => {
        try {
          if (getByIDDistrictData) {
            setValue("districtName", getByIDDistrictData.name);
            setValue("stateId", getByIDDistrictData.stateId);
            setValue("isActive", getByIDDistrictData.isActive);
          }
        } catch (error: any) { }
      };
      setGetbyIDDistrictData();
    }
  }, [getByIDDistrictData]);

  const onSubmit = (data: any) => {
    id ? updateDistrict() : addDistrict();
  };
  const addDistrict = () => {
    try {
      const request = {
        id: 0,
        isActive: getValues("isActive"),
        name: getValues("districtName").toUpperCase(),
        stateId: getValues("stateId"),
      };
      dispatch(actions.loadSaveUpdateDistrictMaster({ request, type: "ADD" }));
    } catch (error) { }
  };
  const updateDistrict = () => {
    try {
      const request = {
        id: id,
        isActive: getValues("isActive"),
        name: getValues("districtName").toUpperCase(),
        stateId: getValues("stateId"),
      };
      dispatch(actions.loadSaveUpdateDistrictMaster({ request, type: "EDIT" }));
    } catch (error) { }
  };

  useEffect(() => {
    if (getSaveDetails) {
      const redirectToList = async () => {
        if (
          (getSaveDetails && getSaveDetails.statusCode === ADD) ||
          getSaveDetails.statusCode === UPDATE
        ) {
          navigate("/district");
        }
      };
      redirectToList();
    }
  }, [getSaveDetails]);

  const navigateToDistrictList = () => {
    dispatch(actions.setSaveUpdateDistrictMaster(null));
    navigate("/district");
    setValue("districtName", "");
    setValue("isActive", false);
  };

  return (
    <>
      {loaderStatus === "loading" && <Loader />}
      <div>
        {/* <!-- breadcrumb --> */}
        <MastersHeader
          title={id ? "Edit District" : "Add District"}
          BreadcrumbTitle={"District"}
          BreadcrumSubTitle={id ? "Edit District" : "Add District"}
        />
        {/* <!-- /breadcrumb --> */}
      </div>
      <Paper elevation={3} className={classes.PaperLayout}>
        <Box p={2} pt={0}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container mt={0} spacing={2}>
              <Grid
                item
                container
                alignItems={"center"}
                justifyContent={"left"}
                my={0}
                xs={4}
              >
                <SelectController
                  control={control}
                  label="State"
                  options={Statesoption}
                  name="stateId"
                />

              </Grid>
              <Grid
                item
                container
                alignItems={"center"}
                justifyContent={"left"}
                my={0}
                xs={4}
              >
                <InputController
                  control={control}
                  name="districtName"
                  label="District"
                  resetClick={() => resetField("districtName")}
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
                <CheckboxController
                  control={control}
                  name="isActive"
                  label="Active"
                />
              </Grid>
              <Grid
                item
                container
                alignItems={"left"}
                justifyContent={"left"}
                my={0}
                xs={0}
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
                  onClick={navigateToDistrictList}
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

export default DistrictForm;
