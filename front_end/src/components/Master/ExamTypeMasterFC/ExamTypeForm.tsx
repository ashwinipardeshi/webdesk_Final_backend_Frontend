import React, { FC, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useForm, Controller } from "react-hook-form";
import { Box, Paper, TextField, Button, IconButton } from "@mui/material";
import { ADD, UPDATE } from "../../../constant/statusCodes";
import { useNavigate } from "react-router-dom";
import {
  actions,
  getSaveUpdateExamTypeMaster,
  getbyIdExamTypeMaster,
} from "../../../store/Master/examTypeMaster";
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

const examTypeSchema = yup
  .object({
    name: yup
      .string()
      .matches(/^[a-zA-Z ]*$/, "Enter only characters")
      .required("Please enter exam type"),
    description: yup.string().default(""),
    isActive: yup.boolean().default(false),
  })
  .required();

const ExamTypeForm: FC = () => {
  const { control, setValue, getValues, resetField, handleSubmit } = useForm({
    resolver: yupResolver(examTypeSchema),
    defaultValues: {
      name: "",
      description: "",
      isActive: false,
    },
    mode: "onChange",
  });
  const getSaveDetails = useSelector(getSaveUpdateExamTypeMaster);
  const getByIDExamTypeData = useSelector(getbyIdExamTypeMaster);
  const loaderStatus = useSelector(selectStatus);
  const navigate = useNavigate();
  const classes = useMasterTableStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const fetchGetbyIDExamTypeData = async () => {
        try {
          dispatch(actions.loadGetByIdExamTypeMaster(parseInt(id)));
        } catch (error: any) { }
      };
      fetchGetbyIDExamTypeData();
    }
  }, [id, setValue]);

  useEffect(() => {
    if (id) {
      const setGetbyIDExamTypeData = async () => {
        try {
          if (getByIDExamTypeData) {
            setValue("name", getByIDExamTypeData.name);
            setValue("description", getByIDExamTypeData.description);
            setValue("isActive", getByIDExamTypeData.isActive);
          }
        } catch (error: any) { }
      };
      setGetbyIDExamTypeData();
    }
  }, [getByIDExamTypeData]);

  const onSubmit = (data: any) => {
    id ? updateExamType() : addExamType();
  };
  const addExamType = () => {
    try {
      const request = {
        id: 0,
        isActive: getValues("isActive"),
        name: getValues("name").toUpperCase(),
        description: getValues("description"),
      };
      dispatch(actions.loadSaveUpdateExamTypeMaster({ request, type: "ADD" }));
    } catch (error) { }
  };
  const updateExamType = () => {
    try {
      const request = {
        id: id,
        isActive: getValues("isActive"),
        name: getValues("name").toUpperCase(),
        description: getValues("description"),
      };
      dispatch(actions.loadSaveUpdateExamTypeMaster({ request, type: "EDIT" }));
    } catch (error) { }
  };

  useEffect(() => {
    if (getSaveDetails) {
      const redirectToList = async () => {
        if (
          (getSaveDetails && getSaveDetails.statusCode === ADD) ||
          getSaveDetails.statusCode === UPDATE
        ) {
          navigate("/exam-type");
        }
      };
      redirectToList();
    }
  }, [getSaveDetails]);

  const navigateToExamTypeList = () => {
    dispatch(actions.setSaveUpdateExamTypeMaster(null));
    navigate("/exam-type");
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
          title={id ? "Edit Exam Type" : "Add Exam Type"}
          BreadcrumbTitle={"Exam Type"}
          BreadcrumSubTitle={id ? "Edit Exam Type" : "Add Exam Type"}
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
                  label="Exam Type"
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
                  variant="outlined"
                  color="primary"
                  onClick={navigateToExamTypeList}
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

export default ExamTypeForm;
