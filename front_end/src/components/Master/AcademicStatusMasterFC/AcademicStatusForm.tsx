import React, { FC, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useForm, Controller } from "react-hook-form";
import { Box, Paper, TextField, Button, IconButton } from "@mui/material";
import { ADD, UPDATE } from "../../../constant/statusCodes";
import { useNavigate } from "react-router-dom";
import {
  actions,
  getSaveUpdateAcademicStatusMaster,
  getbyIdAcademicStatusMaster,
} from "../../../store/Master/academicStatusMaster";
import { useDispatch, useSelector } from "react-redux";
import MastersHeader from "../../../layouts/MastersHeader";
import { CheckBox } from "../../../control";
import { useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useMasterTableStyles } from "../../../assets/style/mastersTableStyle";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { InputController, CheckboxController } from "../../../control";

const AcademicStatusSchema = yup.object({
  name: yup.string().matches(/^[a-zA-Z ]*$/, 'Enter only characters').required("Please enter Academic Status"),
  isActive: yup.boolean().default(false),
}).required()

const AcademicStatusForm: FC = () => {
  const { control, setValue, getValues, reset } = useForm({
    defaultValues: {
      name: "",
      isActive: false
    },
  });
  const getSaveDetails = useSelector(getSaveUpdateAcademicStatusMaster);
  const getByIDAcademicStatusData = useSelector(getbyIdAcademicStatusMaster);
  const loaderStatus = useSelector(selectStatus);
  const navigate = useNavigate();
  const classes = useMasterTableStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  const numericId = id ? +id : undefined;

  useEffect(() => {
    if (id) {
      const fetchGetbyIDAcademicStatusData = async () => {
        try {
          dispatch(actions.loadGetByIdAcademicStatusMaster(parseInt(id)));
        } catch (error: any) { }
      };
      fetchGetbyIDAcademicStatusData();
    }
  }, [id, setValue]);

  useEffect(() => {
    if (id) {
      const setGetbyIDAcademicStatusData = async () => {
        try {
          if (getByIDAcademicStatusData) {
            setValue("name", getByIDAcademicStatusData.name || "");
            setValue("isActive", getByIDAcademicStatusData.isActive);
          }
        } catch (error: any) { }
      };
      setGetbyIDAcademicStatusData();
    }
  }, [getByIDAcademicStatusData, id, setValue]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    id ? updateAcademicStatus() : addAcademicStatus();
  };
  const addAcademicStatus = () => {
    try {
      const request = {
        id: 0,
        isActive: getValues("isActive"),
        name: getValues("name").toUpperCase(),
      };
      dispatch(
        actions.loadSaveUpdateAcademicStatusMaster({ request, type: "ADD" })
      );
    } catch (error) { }
  };
  const updateAcademicStatus = () => {
    try {
      const request = {
        id: numericId,
        isActive: getValues("isActive"),
        name: getValues("name").toUpperCase(),
      };
      dispatch(
        actions.loadSaveUpdateAcademicStatusMaster({ request, type: "EDIT" })
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
          navigate("/academic-status");
        }
      };
      redirectToList();
    }
  }, [getSaveDetails]);

  const navigateToAcademicStatusList = () => {
    dispatch(actions.setSaveUpdateAcademicStatusMaster(null));
    navigate("/academic-status");
    setValue("name", "");
    setValue("isActive", false);
  };

  return (
    <>
      {loaderStatus === "loading" && <Loader />}
      <div>
        <MastersHeader
          title={id ? "Edit Academic Status" : "Add Academic Status"}
          BreadcrumbTitle={"Academic Status"}
          BreadcrumSubTitle={
            id ? "Edit Academic Status" : "Add Academic Status"
          }
        />
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
                      label="Academic Status"
                      id="inputName"
                      value={getValues("name")}
                      onChange={(e) => setValue("name", e.target.value)}
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
                  onClick={navigateToAcademicStatusList}
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

export default AcademicStatusForm;
