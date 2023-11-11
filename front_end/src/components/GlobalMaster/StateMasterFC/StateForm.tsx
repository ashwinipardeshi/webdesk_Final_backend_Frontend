import React, { FC, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { Box, Paper, TextField, Button, IconButton } from "@mui/material";
import { ADD, UPDATE } from "../../../constant/statusCodes";
import { useNavigate } from "react-router-dom";
import {
  actions,
  getSaveUpdateStateMaster,
  getbyIdStateMaster,
} from "../../../store/GlobalMaster/stateMaster";
import { CountryOptionHook } from "../../../hooks/globalMasters/countryHooks";
import { useDispatch, useSelector } from "react-redux";
import MastersHeader from "../../../layouts/MastersHeader";
import {
  CheckboxController,
  InputController,
  SelectController,
} from "../../../control";
import { useParams } from "react-router-dom";
import { useMasterTableStyles } from "../../../assets/style/mastersTableStyle";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const stateSchema = yup
  .object({
    countryId: yup.string().required("Please select country"),
    stateName: yup
      .string()
      .matches(/^[a-zA-Z ]*$/, "Enter only characters")
      .required("Please enter state"),
    isActive: yup.boolean().default(false),
  })
  .required();

const StateForm: FC = () => {
  const { optiondata: Countriesoption } = CountryOptionHook(true);
  const { control, setValue, getValues, resetField, handleSubmit } = useForm({
    resolver: yupResolver(stateSchema),
    defaultValues: {
      stateName: "",
      countryId: "",
      isActive: false,
    },
    mode: "onChange",
  });

  const getSaveDetails = useSelector(getSaveUpdateStateMaster);
  const getByIDStateData = useSelector(getbyIdStateMaster);
  const loaderStatus = useSelector(selectStatus);
  const navigate = useNavigate();
  const classes = useMasterTableStyles();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchGetbyIDStateData = async () => {
        try {
          dispatch(actions.loadGetByIdStateMaster(parseInt(id)));
        } catch (error: any) { }
      };
      fetchGetbyIDStateData();
    }
  }, [id, setValue]);

  useEffect(() => {
    if (id) {
      const setGetbyIDStateData = async () => {
        try {
          if (getByIDStateData) {
            setValue("stateName", getByIDStateData.name);
            setValue("countryId", getByIDStateData.countryId);
            setValue("isActive", getByIDStateData.isActive);
          }
        } catch (error: any) { }
      };
      setGetbyIDStateData();
    }
  }, [getByIDStateData]);

  const onSubmit = (data: any) => {
    id ? updateState() : addState();
  };

  const addState = () => {
    try {
      const request = {
        id: 0,
        isActive: getValues("isActive"),
        name: getValues("stateName").toUpperCase(),
        countryId: getValues("countryId"),
      };
      dispatch(actions.loadSaveUpdateStateMaster({ request, type: "ADD" }));
    } catch (error) { }
  };

  const updateState = () => {
    try {
      const request = {
        id: id,
        isActive: getValues("isActive"),
        name: getValues("stateName").toUpperCase(),
        countryId: getValues("countryId"),
      };
      dispatch(actions.loadSaveUpdateStateMaster({ request, type: "EDIT" }));
    } catch (error) { }
  };

  useEffect(() => {
    if (getSaveDetails) {
      const redirectToList = async () => {
        if (
          (getSaveDetails && getSaveDetails.statusCode === ADD) ||
          getSaveDetails.statusCode === UPDATE
        ) {
          navigate("/state");
        }
      };
      redirectToList();
    }
  }, [getSaveDetails]);

  const navigateToStateList = () => {
    dispatch(actions.setSaveUpdateStateMaster(null));
    navigate("/state");
    setValue("stateName", "");
    setValue("isActive", false);
  };

  return (
    <>
      {loaderStatus === "loading" && <Loader />}
      <div>
        {/* <!-- breadcrumb --> */}
        <MastersHeader
          title={id ? "Edit State" : "Add State"}
          BreadcrumbTitle={"State"}
          BreadcrumSubTitle={id ? "Edit State" : "Add State"}
        />
        {/* <!-- /breadcrumb --> */}
      </div>
      <Paper elevation={3} className={classes.PaperLayout}>
        <Box p={2} pt={0}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3} alignItems={"center"} my={3}>
              <Grid item sm={4}>
                <SelectController
                  control={control}
                  name="countryId"
                  label="Country"
                  options={Countriesoption}
                />
              </Grid>
              <Grid item sm={4}>
                <InputController
                  control={control}
                  name="stateName"
                  label="State"
                  resetClick={() => resetField("stateName")}
                />
              </Grid>
              <Grid item sm={4}>
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
                  <Button variant="outlined" onClick={navigateToStateList}>
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

export default StateForm;
