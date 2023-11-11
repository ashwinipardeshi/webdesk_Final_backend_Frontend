import React, { FC, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { Box, Paper, Button } from "@mui/material";
import { ADD, UPDATE } from "../../../constant/statusCodes";
import { useNavigate } from "react-router-dom";
import {
  actions,
  getSaveUpdateStreamMaster,
  getbyIdStreamMaster,
} from "../../../store/Master/streamMaster";
import { useDispatch, useSelector } from "react-redux";
import MastersHeader from "../../../layouts/MastersHeader";
import { useParams } from "react-router-dom";
import { useMasterTableStyles } from "../../../assets/style/mastersTableStyle";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputController, CheckboxController } from "../../../control";

const streamSchema = yup
  .object({
    streamName: yup
      .string()
      .matches(/^[a-zA-Z ]*$/, "Enter characters only")
      .required("Please enter stream"),
    isActive: yup.boolean().default(false),
    description: yup
      .string()
      .required("Please enter description"),
  })
  .required();

const StreamForm: FC = () => {
  const { control, setValue, getValues, resetField, handleSubmit } = useForm({
    resolver: yupResolver(streamSchema),
    defaultValues: {
      streamName: "",
      description: "",
      isActive: false,
    },
    mode: "onChange",
  });

  const getSaveDetails = useSelector(getSaveUpdateStreamMaster);
  const getByIDStreamData = useSelector(getbyIdStreamMaster);
  const loaderStatus = useSelector(selectStatus);
  const navigate = useNavigate();
  const classes = useMasterTableStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const fetchGetbyIDStreamData = async () => {
        try {
          dispatch(actions.loadGetByIdStreamMaster(parseInt(id)));
        } catch (error: any) { }
      };
      fetchGetbyIDStreamData();
    }
  }, [id, setValue]);

  useEffect(() => {
    if (id) {
      const setGetbyIDStreamData = async () => {
        try {
          if (getByIDStreamData) {
            setValue("streamName", getByIDStreamData.name);
            setValue("description", getByIDStreamData.description);
            setValue("isActive", getByIDStreamData.isActive);
          }
        } catch (error: any) { }
      };
      setGetbyIDStreamData();
    }
  }, [getByIDStreamData]);

  const onSubmit = (data: any) => {
    id ? updateStream() : addStream();
  };

  const addStream = () => {
    try {
      const request = {
        id: 0,
        isActive: getValues("isActive"),
        name: getValues("streamName").toUpperCase(),
        description: getValues("description"),
      };
      dispatch(actions.loadSaveUpdateStreamMaster({ request, type: "ADD" }));
    } catch (error) { }
  };
  const updateStream = () => {
    try {
      const request = {
        id: id,
        isActive: getValues("isActive"),
        name: getValues("streamName").toUpperCase(),
        description: getValues("description"),
      };
      dispatch(actions.loadSaveUpdateStreamMaster({ request, type: "EDIT" }));
    } catch (error) { }
  };

  useEffect(() => {
    if (getSaveDetails) {
      const redirectToList = async () => {
        if (
          (getSaveDetails && getSaveDetails.statusCode === ADD) ||
          getSaveDetails.statusCode === UPDATE
        ) {
          navigate("/stream");
        }
      };
      redirectToList();
    }
  }, [getSaveDetails]);

  const navigateToStreamList = () => {
    dispatch(actions.setSaveUpdateStreamMaster(null));
    navigate("/stream");
    setValue("streamName", "");
    setValue("description", "");
    setValue("isActive", false);
  };

  return (
    <>
      {loaderStatus === "loading" && <Loader />}
      <div>
        <MastersHeader
          title={id ? "Edit Stream" : "Add Stream"}
          BreadcrumbTitle={"Stream"}
          BreadcrumSubTitle={id ? "Edit Stream" : "Add Stream"}
        />
      </div>
      <Paper elevation={3} className={classes.PaperLayout}>
        <Box p={3} pt={0}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3} alignItems={"center"} my={3}>
              <Grid item sm={4}>
                <InputController
                  control={control}
                  name="streamName"
                  label="Stream"
                  resetClick={() => resetField("streamName")}
                />
              </Grid>
              <Grid item sm={4}>
                <InputController
                  control={control}
                  name="description"
                  label="Description"
                  resetClick={() => resetField("description")}
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
                  <Button variant="outlined" onClick={navigateToStreamList}>
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

export default StreamForm;
