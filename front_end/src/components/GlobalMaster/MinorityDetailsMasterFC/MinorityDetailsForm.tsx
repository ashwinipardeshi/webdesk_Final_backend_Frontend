import React, { FC, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Paper,
  TextField,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { ADD, UPDATE } from "../../../constant/statusCodes";
import { useNavigate } from "react-router-dom";
import {
  actions,
  getSaveUpdateMinorityDetailsMaster,
  getbyIdMinorityDetailsMaster,
} from "../../../store/GlobalMaster/minorityDetailsMaster";
import { MinorityOptionHook } from "../../../hooks/globalMasters/minorityHooks";
import { useDispatch, useSelector } from "react-redux";
import MastersHeader from "../../../layouts/MastersHeader";
import { CheckBox, SelectController } from "../../../control";
import { useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useMasterTableStyles } from "../../../assets/style/mastersTableStyle";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";
import { Dropdown } from "../../../control/Dropdown";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputController, CheckboxController } from "../../../control";

const minorityDetailsSchema = yup
  .object({
    minorityDetailsName: yup
      .string()
      .matches(/^[a-zA-Z ]*$/, "Enter only characters")
      .required("Please enter Minority Details"),
    isActive: yup.boolean().default(false),
    minorityMasterId: yup.string().matches(/^[0-9 ]*$/, "Please select minority ")
      .required("Please enter Minority Details"),
  })
  .required();


const MinorityDetailsForm: FC = () => {
  const { minorityoptiondata: Minoritiesoption } = MinorityOptionHook(true);

  const { control, setValue, getValues, handleSubmit, resetField } = useForm({
    resolver: yupResolver(minorityDetailsSchema),
    defaultValues: {
      minorityDetailsName: "",
      minorityMasterId: "",
      isActive: false,
    },
    mode: "onChange",
  });
  const getSaveDetails = useSelector(getSaveUpdateMinorityDetailsMaster);
  const getByIDMinorityDetailsData = useSelector(getbyIdMinorityDetailsMaster);
  const loaderStatus = useSelector(selectStatus);
  const navigate = useNavigate();
  const classes = useMasterTableStyles();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchGetbyIDMinorityDetailsData = async () => {
        try {
          dispatch(actions.loadGetByIdMinorityDetailsMaster(parseInt(id)));
        } catch (error: any) { }
      };
      fetchGetbyIDMinorityDetailsData();
    }
  }, [id, setValue]);

  useEffect(() => {
    if (id) {
      const setGetbyIDMinorityDetailsData = async () => {
        try {
          if (getByIDMinorityDetailsData) {
            setValue("minorityDetailsName", getByIDMinorityDetailsData.name);
            setValue(
              "minorityMasterId",
              getByIDMinorityDetailsData.minorityMasterId
            );
            setValue("isActive", getByIDMinorityDetailsData.isActive);
          }
        } catch (error: any) { }
      };
      setGetbyIDMinorityDetailsData();
    }
  }, [getByIDMinorityDetailsData]);

  const onSubmit = (data: any) => {
    id ? updateMinorityDetails() : addMinorityDetails();
  };
  const addMinorityDetails = () => {
    try {
      const request = {
        id: 0,
        isActive: getValues("isActive"),
        name: getValues("minorityDetailsName").toUpperCase(),
        minorityMasterId: getValues("minorityMasterId"),
      };
      dispatch(
        actions.loadSaveUpdateMinorityDetailsMaster({ request, type: "ADD" })
      );
    } catch (error) { }
  };
  const updateMinorityDetails = () => {
    try {
      const request = {
        id: id,
        isActive: getValues("isActive"),
        name: getValues("minorityDetailsName").toUpperCase(),
        minorityMasterId: getValues("minorityMasterId"),
      };
      dispatch(
        actions.loadSaveUpdateMinorityDetailsMaster({ request, type: "EDIT" })
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
          navigate("/minority-details");
        }
      };
      redirectToList();
    }
  }, [getSaveDetails]);

  const navigateToMinorityDetailsList = () => {
    dispatch(actions.setSaveUpdateMinorityDetailsMaster(null));
    navigate("/minority-details");
    setValue("minorityDetailsName", "");
    setValue("isActive", false);
  };

  return (
    <>
      {loaderStatus === "loading" && <Loader />}
      <div>
        <MastersHeader
          title={id ? "Edit Minority Details" : "Add Minority Details"}
          BreadcrumbTitle={"Minority Details"}
          BreadcrumSubTitle={id ? "Edit Minority Details" : "Add Minority Details"}
        />
        {/* <!-- /breadcrumb --> */}
      </div>
      <Paper elevation={3} className={classes.PaperLayout}>
        <Box p={3} pt={0}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3} alignItems={"center"} my={3}>
              <Grid item sm={4}>
                <SelectController
                  control={control}
                  options={Minoritiesoption}
                  name="minorityMasterId"
                  label="Minority Name"
                />
              </Grid>
              <Grid item sm={4}>
                <InputController
                  control={control}
                  name="minorityDetailsName"
                  label="Minority Details"
                  resetClick={() => resetField("minorityDetailsName")}
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
                  <Button variant="outlined" onClick={navigateToMinorityDetailsList}>
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
export default MinorityDetailsForm;
