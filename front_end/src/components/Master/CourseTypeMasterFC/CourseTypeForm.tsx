import React, { FC, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useForm, Controller } from "react-hook-form";
import { Box, Paper, TextField, Button, IconButton } from "@mui/material";
import { ADD, UPDATE } from "../../../constant/statusCodes";
import { useNavigate } from "react-router-dom";
import {
  actions,
  getSaveUpdateCourseTypeMaster,
  getbyIdCourseTypeMaster,
} from "../../../store/Master/courseTypeMaster";
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

const courseTypeSchema = yup
  .object({
    name: yup
      .string()
      .matches(/^[a-zA-Z ]*$/, "Enter only characters")
      .required("Please enter course type"),
    description: yup.string().default(""),
    isActive: yup.boolean().default(false),
  })
  .required();

const CourseTypeForm: FC = () => {
  const { control, setValue, getValues, resetField, handleSubmit } = useForm({
    resolver: yupResolver(courseTypeSchema),
    defaultValues: {
      name: "",
      description: "",
      isActive: false,
    },
    mode: "onChange",
  });
  const getSaveDetails = useSelector(getSaveUpdateCourseTypeMaster);
  const getByIDCourseTypeData = useSelector(getbyIdCourseTypeMaster);
  const loaderStatus = useSelector(selectStatus);
  const navigate = useNavigate();
  const classes = useMasterTableStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const fetchGetbyIDCourseTypeData = async () => {
        try {
          dispatch(actions.loadGetByIdCourseTypeMaster(parseInt(id)));
        } catch (error: any) { }
      };
      fetchGetbyIDCourseTypeData();
    }
  }, [id, setValue]);

  useEffect(() => {
    if (id) {
      const setGetbyIDCourseTypeData = async () => {
        try {
          if (getByIDCourseTypeData) {
            setValue("name", getByIDCourseTypeData.name);
            setValue("description", getByIDCourseTypeData.description);
            setValue("isActive", getByIDCourseTypeData.isActive);
          }
        } catch (error: any) { }
      };
      setGetbyIDCourseTypeData();
    }
  }, [getByIDCourseTypeData]);

  const onSubmit = (data: any) => {
    id ? updateCourseType() : addCourseType();
  };
  const addCourseType = () => {
    try {
      const request = {
        id: 0,
        isActive: getValues("isActive"),
        name: getValues("name").toUpperCase(),
        description: getValues("description"),
      };
      dispatch(
        actions.loadSaveUpdateCourseTypeMaster({ request, type: "ADD" })
      );
    } catch (error) { }
  };
  const updateCourseType = () => {
    try {
      const request = {
        id: id,
        isActive: getValues("isActive"),
        name: getValues("name").toUpperCase(),
        description: getValues("description"),
      };
      dispatch(
        actions.loadSaveUpdateCourseTypeMaster({ request, type: "EDIT" })
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
          navigate("/course-type");
        }
      };
      redirectToList();
    }
  }, [getSaveDetails]);

  const navigateToCourseTypeList = () => {
    dispatch(actions.setSaveUpdateCourseTypeMaster(null));
    navigate("/course-type");
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
          title={id ? "Edit Course Type" : "Add Course Type"}
          BreadcrumbTitle={"Course Type"}
          BreadcrumSubTitle={id ? "Edit Course Type" : "Add Course Type"}
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
                  label="Course Type"
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
                  onClick={navigateToCourseTypeList}
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

export default CourseTypeForm;
