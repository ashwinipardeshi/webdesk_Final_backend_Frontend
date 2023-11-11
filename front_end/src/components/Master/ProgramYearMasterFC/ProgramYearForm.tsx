import React, { FC, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { Box, Paper, Button } from "@mui/material";
import { ADD, UPDATE } from "../../../constant/statusCodes";
import { useNavigate } from "react-router-dom";
import {
  actions,
  getSaveUpdateProgramYearMaster,
  getbyIdProgramYearMaster,
} from "../../../store/Master/programYearMaster";
import { useDispatch, useSelector } from "react-redux";
import MastersHeader from "../../../layouts/MastersHeader";
import {
  CheckboxController,
  InputController,
} from "../../../control";
import { useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useMasterTableStyles } from "../../../assets/style/mastersTableStyle";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const programYearSchema = yup
  .object({
    name: yup
      .string()
      .matches(/^[a-zA-Z ]*$/, "Enter only characters")
      .required("Please enter program year"),
    description: yup.string().default(""),
    isActive: yup.boolean().default(false),
  })
  .required();

const ProgramYearForm: FC = () => {
  const { control, setValue, getValues, resetField, handleSubmit } = useForm({
    resolver: yupResolver(programYearSchema),
    defaultValues: {
      name: "",
      description: "",
      isActive: false,
    },
    mode: "onChange",
  });
  const getSaveDetails = useSelector(getSaveUpdateProgramYearMaster);
  const getByIDProgramYearData = useSelector(getbyIdProgramYearMaster);
  const loaderStatus = useSelector(selectStatus);
  const navigate = useNavigate();
  const classes = useMasterTableStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const fetchGetbyIDProgramYearData = async () => {
        try {
          dispatch(actions.loadGetByIdProgramYearMaster(parseInt(id)));
        } catch (error: any) { }
      };
      fetchGetbyIDProgramYearData();
    }
  }, [id, setValue]);

  useEffect(() => {
    if (id) {
      const setGetbyIDProgramYearData = async () => {
        try {
          if (getByIDProgramYearData) {
            setValue("name", getByIDProgramYearData.name);
            setValue("description", getByIDProgramYearData.description);
            setValue("isActive", getByIDProgramYearData.isActive);
          }
        } catch (error: any) { }
      };
      setGetbyIDProgramYearData();
    }
  }, [getByIDProgramYearData]);

  const onSubmit = (data: any) => {
    id ? updateProgramYear() : addProgramYear();
  };
  const addProgramYear = () => {
    try {
      const request = {
        id: 0,
        isActive: getValues("isActive"),
        name: getValues("name").toUpperCase(),
        description: getValues("description"),
      };
      dispatch(
        actions.loadSaveUpdateProgramYearMaster({ request, type: "ADD" })
      );
    } catch (error) { }
  };
  const updateProgramYear = () => {
    try {
      const request = {
        id: id,
        isActive: getValues("isActive"),
        name: getValues("name").toUpperCase(),
        description: getValues("description"),
      };
      dispatch(
        actions.loadSaveUpdateProgramYearMaster({ request, type: "EDIT" })
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
          navigate("/program-year");
        }
      };
      redirectToList();
    }
  }, [getSaveDetails]);

  const navigateToProgramYearList = () => {
    dispatch(actions.setSaveUpdateProgramYearMaster(null));
    navigate("/program-year");
    setValue("name", "");
    setValue("description", "");
    setValue("isActive", false);
  };

  return (
    <>
      {loaderStatus === "loading" && <Loader />}
      <div>
        {/* <!-- breadcrumb --> */}
        <MastersHeader
          title={id ? "Edit Program Year" : "Add Program Year"}
          BreadcrumbTitle={"Program Year"}
          BreadcrumSubTitle={id ? "Edit Program Year" : "Add Program Year"}
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
                <InputController
                  control={control}
                  name="name"
                  label="Program Year"
                  resetClick={() => resetField("name")}
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
                  name="description"
                  label="Description"
                  resetClick={() => resetField("description")}
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
                  variant="contained"
                  color="primary"
                  onClick={navigateToProgramYearList}
                  className={classes.buttonLayout}
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

export default ProgramYearForm;
