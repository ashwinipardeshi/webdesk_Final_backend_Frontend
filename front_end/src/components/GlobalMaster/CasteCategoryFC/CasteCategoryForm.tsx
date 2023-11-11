import React, { useEffect } from "react";
import {  useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { ADD, UPDATE } from "../../../constant/statusCodes";
import {
  getSaveUpdateCasteCategoryMaster,
  getbyIdCasteCategoryMaster,
} from "../../../store/GlobalMaster/casteCategoryMaster";
import { actions } from "../../../store/GlobalMaster/casteCategoryMaster";
import MastersHeader from "../../../layouts/MastersHeader";
import { Box, Button, Grid,  Paper } from "@mui/material";
import { CheckboxController, InputController } from "../../../control";
import { useMasterTableStyles } from "../../../assets/style/mastersTableStyle";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const CasteCategoryForm = () => {
  const casteCategorySchema = yup.object({
    casteCategory:yup.string().matches(/^[a-zA-Z ]*$/, "Enter only characters").required('Please enter Caste Category'),
    isActive:yup.boolean().notRequired()
  })
  const { control, setValue, getValues, resetField ,handleSubmit } = useForm({
    defaultValues: {
      casteCategory: "",
      isActive: false,
    },
    mode:"onChange",
    resolver:yupResolver(casteCategorySchema)
  });
  const getSaveDetails = useSelector(getSaveUpdateCasteCategoryMaster);
  const getByIDCasteCategoryData = useSelector(getbyIdCasteCategoryMaster);
  const navigate = useNavigate();
  const classes = useMasterTableStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const fetchGetbyIDCasteCategoryData = async () => {
        try {
          dispatch(actions.loadGetByIdCasteCategoryMaster(parseInt(id)));
        } catch (error: any) {}
      };
      fetchGetbyIDCasteCategoryData();
    }
  }, [id, setValue]);

  useEffect(() => {
    if (id) {
      const setGetbyIDCasteCategoryData = async () => {
        try {
          if (getByIDCasteCategoryData) {
            setValue("casteCategory", getByIDCasteCategoryData.name);
            setValue("isActive", getByIDCasteCategoryData.isActive);
          }
        } catch (error: any) {}
      };
      setGetbyIDCasteCategoryData();
    }
  }, [getByIDCasteCategoryData]);

  const onSubmit = (data:any) => {
    id ? updateCasteCategory() : addCasteCategory();
  };
  const addCasteCategory = () => {
    try {
      const request = {
        id: 0,
        isActive: getValues("isActive"),
        name: getValues("casteCategory").toUpperCase(),
      };
      dispatch(
        actions.loadSaveUpdateCasteCategoryMaster({ request, type: "ADD" })
      );
    } catch (error) {}
  };
  const updateCasteCategory = () => {
    try {
      const request = {
        id: id,
        isActive: getValues("isActive"),
        name: getValues("casteCategory").toUpperCase(),
      };
      dispatch(
        actions.loadSaveUpdateCasteCategoryMaster({ request, type: "EDIT" })
      );
    } catch (error) {}
  };

  useEffect(() => {
    if (getSaveDetails) {
      const redirectToList = async () => {
        if (
          (getSaveDetails && getSaveDetails.statusCode === ADD) ||
          getSaveDetails.statusCode === UPDATE
        ) {
          navigate("/caste-category");
        }
      };
      redirectToList();
    }
  }, [getSaveDetails]);

  const navigateToCasteCategoryList = () => {
    dispatch(actions.setSaveUpdateCasteCategoryMaster(null));
    navigate("/caste-category");
    setValue("casteCategory", "");
    setValue("isActive", false);
  };

  return (
    <>
      <div>
        {/* <!-- breadcrumb --> */}
        <MastersHeader
          title={id ? "Edit Caste Category" : "Add Caste Category"}
          BreadcrumbTitle={"Caste Category"}
          BreadcrumSubTitle={id ? "Edit Caste Category" : "Add Caste Category"}
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
                <InputController control={control} name='casteCategory' label="Caste Category"  resetClick={()=>resetField('casteCategory')} />
              </Grid>
              <Grid
                item
                container
                alignItems={"center"}
                justifyContent={"left"}
                my={0}
                xs={2}
              >
                <CheckboxController control={control} name="isActive" label='Active'  />
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
                  onClick={navigateToCasteCategoryList}
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

export default CasteCategoryForm;
