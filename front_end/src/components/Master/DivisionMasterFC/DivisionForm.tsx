import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  getSaveUpdateDivisionMaster,
  getbyIdDivisionMaster,
} from "../../../store/Master/divisionMaster";
import { useDispatch, useSelector } from "react-redux";
import MastersHeader from "../../../layouts/MastersHeader";
import { CheckboxController, InputController } from "../../../control";
import { useNavigate, useParams } from "react-router-dom";
import { useMasterTableStyles } from "../../../assets/style/mastersTableStyle";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";
import { actions } from "../../../store/Master/divisionMaster";
import { ADD, UPDATE } from "../../../constant/statusCodes";
import { Box, Button, Grid, Paper } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const DivisionForm = () => {

  const divisionSchema = yup.object({
    divisionName: yup.string().matches(/^[a-zA-Z ]*$/, "Enter only characters").required('Please enter Division'),
    isActive: yup.boolean().notRequired()
  }).required()

  const { control, setValue, getValues, resetField, handleSubmit } = useForm({
    defaultValues: {
      divisionName: "",
      isActive: false,
    },
    mode: 'onChange',
    resolver: yupResolver(divisionSchema)
  });
  const getSaveDetails = useSelector(getSaveUpdateDivisionMaster);
  const getByIDDivisionData = useSelector(getbyIdDivisionMaster);
  const loaderStatus = useSelector(selectStatus);
  const navigate = useNavigate();
  const classes = useMasterTableStyles();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchGetbyIDDivisionData = async () => {
        try {
          dispatch(actions.loadGetByIdDivisionMaster(parseInt(id)));
        } catch (error: any) { }
      };
      fetchGetbyIDDivisionData();
    }
  }, [id, setValue]);

  useEffect(() => {
    if (id) {
      const setGetbyIDDivisionData = async () => {
        try {
          if (getByIDDivisionData) {
            setValue("divisionName", getByIDDivisionData.name);
            setValue("isActive", getByIDDivisionData.isActive);
          }
        } catch (error: any) { }
      };
      setGetbyIDDivisionData();
    }
  }, [getByIDDivisionData]);

  const onSubmit = (data: any) => {
    id ? updateDivision() : addDivision();
  };
  const addDivision = () => {
    try {
      const request = {
        id: 0,
        isActive: getValues("isActive"),
        name: getValues("divisionName").toUpperCase(),
      };
      dispatch(actions.loadSaveUpdateDivisionMaster({ request, type: "ADD" }));
    } catch (error) { }
  };
  const updateDivision = () => {
    try {
      const request = {
        id: id,
        isActive: getValues("isActive"),
        name: getValues("divisionName").toUpperCase(),
      };
      dispatch(actions.loadSaveUpdateDivisionMaster({ request, type: "EDIT" }));
    } catch (error) { }
  };

  useEffect(() => {
    if (getSaveDetails) {
      const redirectToList = async () => {
        if (
          (getSaveDetails && getSaveDetails.statusCode === ADD) ||
          getSaveDetails.statusCode === UPDATE
        ) {
          navigate("/division");
        }
      };
      redirectToList();
    }
  }, [getSaveDetails]);

  const navigateToDivisionList = () => {
    dispatch(actions.setSaveUpdateDivisionMaster(null));
    navigate("/division");
    setValue("divisionName", "");
    setValue("isActive", false);
  };

  return (
    <>
      {loaderStatus === "loading" && <Loader />}
      <div>
        <MastersHeader
          title={id ? "Edit Division" : "Add Division"}
          BreadcrumbTitle={"Division"}
          BreadcrumSubTitle={id ? "Edit Division" : "Add Division"}
        />
        {/* <!-- /breadcrumb --> */}
      </div>
      <Paper elevation={3} className={classes.PaperLayout}>
        <Box p={2} pt={0}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container mt={0} spacing={2}>
              <Grid item container spacing={2}>
                <Grid
                  item
                  container
                  alignItems={"center"}
                  justifyContent={"left"}
                  my={0}
                  xs={4}
                >
                  <InputController control={control} name="divisionName" label="Division" resetClick={() => resetField('divisionName')} />
                </Grid>

                <Grid
                  item
                  container
                  alignItems={"center"}
                  justifyContent={"left"}
                  my={0}
                  xs={2}
                >
                  <CheckboxController control={control} name="isActive" label='Active' />
                </Grid>
              </Grid>
              <Grid item container spacing={2}>
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
                  xs={1}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={navigateToDivisionList}
                  >
                    Back
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Paper>
    </>
  );
};

export default DivisionForm;
