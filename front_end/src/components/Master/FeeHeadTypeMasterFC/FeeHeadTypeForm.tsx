import React, { FC, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { Box, Paper, Button } from "@mui/material";
import { ADD, UPDATE } from "../../../constant/statusCodes";
import { useNavigate } from "react-router-dom";
import {
  actions,
  getSaveUpdateFeeHeadTypeMaster,
  getbyIdFeeHeadTypeMaster,
} from "../../../store/Master/feeheadTypeMaster";
import { useDispatch, useSelector } from "react-redux";
import MastersHeader from "../../../layouts/MastersHeader";
import {
  CheckboxController,
  InputController,
} from "../../../control";
import { useParams } from "react-router-dom";
import { useMasterTableStyles } from "../../../assets/style/mastersTableStyle";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const feeHeadTypeSchema = yup
  .object({
    name: yup
      .string()
      .matches(/^[a-zA-Z ]*$/, "Enter only characters")
      .required("Please enter fee head type"),
    isActive: yup.boolean().default(false),
  })
  .required();

const FeeHeadTypeForm: FC = () => {
  const { control, setValue, getValues, resetField, handleSubmit } = useForm({
    resolver: yupResolver(feeHeadTypeSchema),
    defaultValues: {
      name: "",
      isActive: false,
    },
    mode: "onChange",
  });
  const getSaveDetails = useSelector(getSaveUpdateFeeHeadTypeMaster);
  const getByIDFeeHeadTypeData = useSelector(getbyIdFeeHeadTypeMaster);
  const loaderStatus = useSelector(selectStatus);
  const navigate = useNavigate();
  const classes = useMasterTableStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const fetchGetbyIDFeeHeadTypeData = async () => {
        try {
          dispatch(actions.loadGetByIdFeeHeadTypeMaster(parseInt(id)));
        } catch (error: any) { }
      };
      fetchGetbyIDFeeHeadTypeData();
    }
  }, [id, setValue]);

  useEffect(() => {
    if (id) {
      const setGetbyIDFeeHeadTypeData = async () => {
        try {
          if (getByIDFeeHeadTypeData) {
            setValue("name", getByIDFeeHeadTypeData.name);
            setValue("isActive", getByIDFeeHeadTypeData.isActive);
          }
        } catch (error: any) { }
      };
      setGetbyIDFeeHeadTypeData();
    }
  }, [getByIDFeeHeadTypeData]);

  const onSubmit = (data: any) => {
    id ? updateFeeHeadType() : addFeeHeadType();
  };
  const addFeeHeadType = () => {
    try {
      const request = {
        id: 0,
        isActive: getValues("isActive"),
        name: getValues("name").toUpperCase(),
      };
      dispatch(
        actions.loadSaveUpdateFeeHeadTypeMaster({ request, type: "ADD" })
      );
    } catch (error) { }
  };
  const updateFeeHeadType = () => {
    try {
      const request = {
        id: id,
        isActive: getValues("isActive"),
        name: getValues("name").toUpperCase(),
      };
      dispatch(
        actions.loadSaveUpdateFeeHeadTypeMaster({ request, type: "EDIT" })
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
          navigate("/feehead-type");
        }
      };
      redirectToList();
    }
  }, [getSaveDetails]);

  const navigateToFeeHeadTypeList = () => {
    dispatch(actions.setSaveUpdateFeeHeadTypeMaster(null));
    navigate("/feehead-type");
    setValue("name", "");
    setValue("isActive", false);
  };

  return (
    <>
      {loaderStatus === "loading" && <Loader />}
      <div>
        {/* <!-- breadcrumb --> */}
        <MastersHeader
          title={id ? "Edit Fee Head Type" : "Add Fee Head Type"}
          BreadcrumbTitle={"Fee Head Type"}
          BreadcrumSubTitle={id ? "Edit Fee Head Type" : "Add Fee Head Type"}
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
                  label="Fee Head Type"
                  resetClick={() => resetField("name")}
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
                  onClick={navigateToFeeHeadTypeList}
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

export default FeeHeadTypeForm;
