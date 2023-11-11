import React, { FC, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useForm, Controller } from "react-hook-form";
import { Box, Paper, TextField, Button, IconButton } from "@mui/material";
import { ADD, UPDATE } from "../../../constant/statusCodes";
import { useNavigate } from "react-router-dom";
import {
  actions,
  getSaveUpdateCourseCategoryMaster,
  getbyIdCourseCategoryMaster,
} from "../../../store/GlobalMaster/courseCategoryMaster";
import { useDispatch, useSelector } from "react-redux";
import MastersHeader from "../../../layouts/MastersHeader";
import { CheckBox } from "../../../control";
import { useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useMasterTableStyles } from "../../../assets/style/mastersTableStyle";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputController, CheckboxController } from "../../../control";

const courseCategorySchema = yup
  .object({
    courseCategoryName: yup
      .string()
      .matches(/^[a-zA-Z ]*$/, "Enter only characters")
      .required("Please enter course category name"),
    isActive: yup.boolean().default(false),
    description: yup
      .string()
      .matches(/^[a-zA-Z0-9 ]*$/, "Enter only characters")
      .required("Please enter description"),
  })
  .required();


const CourseCategoryForm: FC = () => {
  const { control, setValue, getValues, handleSubmit, resetField } = useForm({
    resolver: yupResolver(courseCategorySchema),
    defaultValues: {
      courseCategoryName: "",
      description: "",
      isActive: false,
    },
    mode: "onChange",
  });
  const getSaveDetails = useSelector(getSaveUpdateCourseCategoryMaster);
  const getByIDCourseCategoryData = useSelector(getbyIdCourseCategoryMaster);
  const loaderStatus = useSelector(selectStatus);
  const navigate = useNavigate();
  const classes = useMasterTableStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const fetchGetbyIDCourseCategoryData = async () => {
        try {
          dispatch(actions.loadGetByIdCourseCategoryMaster(parseInt(id)));
        } catch (error: any) { }
      };
      fetchGetbyIDCourseCategoryData();
    }
  }, [id, setValue]);

  useEffect(() => {
    if (id) {
      const setGetbyIDCourseCategoryData = async () => {
        try {
          if (getByIDCourseCategoryData) {
            setValue("courseCategoryName", getByIDCourseCategoryData.name);
            setValue("description", getByIDCourseCategoryData.description);
            setValue("isActive", getByIDCourseCategoryData.isActive);
          }
        } catch (error: any) { }
      };
      setGetbyIDCourseCategoryData();
    }
  }, [getByIDCourseCategoryData]);

  const onSubmit = (data: any) => {
    id ? updateCourseCategory() : addCourseCategory();
  };
  const addCourseCategory = () => {
    try {
      const request = {
        id: 0,
        isActive: getValues("isActive"),
        name: getValues("courseCategoryName").toUpperCase(),
        description: getValues("description").toUpperCase(),
      };
      dispatch(
        actions.loadSaveUpdateCourseCategoryMaster({ request, type: "ADD" })
      );
    } catch (error) { }
  };
  const updateCourseCategory = () => {
    try {
      const request = {
        id: id,
        isActive: getValues("isActive"),
        name: getValues("courseCategoryName").toUpperCase(),
        description: getValues("description").toUpperCase(),
      };
      dispatch(
        actions.loadSaveUpdateCourseCategoryMaster({ request, type: "EDIT" })
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
          navigate("/course-category");
        }
      };
      redirectToList();
    }
  }, [getSaveDetails]);

  const navigateToCourseCategoryList = () => {
    dispatch(actions.setSaveUpdateCourseCategoryMaster(null));
    navigate("/course-category");
    setValue("courseCategoryName", "");
    setValue("description", "");
    setValue("isActive", false);
  };

  return (
    <>
      {loaderStatus === "loading" && <Loader />}
      <div>
        <MastersHeader
          title={id ? "Edit Course Category" : "Add Course Category"}
          BreadcrumbTitle={"Course Category"}
          BreadcrumSubTitle={id ? "Edit Course Category" : "Add Course Category"}
        />
        {/* <!-- /breadcrumb --> */}
      </div>
      <Paper elevation={3} className={classes.PaperLayout}>
        <Box p={3} pt={0}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3} alignItems={"center"} my={3}>
              <Grid item sm={4}>
                <InputController
                  control={control}
                  name="courseCategoryName"
                  label="Course Category"
                  resetClick={() => resetField("courseCategoryName")}
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
                  <Button variant="outlined" onClick={navigateToCourseCategoryList}>
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

export default CourseCategoryForm;
