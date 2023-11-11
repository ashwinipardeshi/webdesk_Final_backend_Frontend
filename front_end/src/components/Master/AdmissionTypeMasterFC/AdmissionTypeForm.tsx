import React, { FC, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { Box, Paper, Button } from "@mui/material";
import { ADD, UPDATE } from "../../../constant/statusCodes";
import { useNavigate } from "react-router-dom";
import {
  actions,
  getSaveUpdateAdmissionTypeMaster,
  getbyIdAdmissionTypeMaster,
} from "../../../store/Master/admissionTypeMaster";
import { useDispatch, useSelector } from "react-redux";
import MastersHeader from "../../../layouts/MastersHeader";
import { useParams } from "react-router-dom";
import { useMasterTableStyles } from "../../../assets/style/mastersTableStyle";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputController, CheckboxController } from "../../../control";

const admissionTypeSchema = yup
  .object({
    admissionTypeName: yup
      .string()
      .matches(/^[a-zA-Z ]*$/, "Enter characters only")
      .required("Please enter admission type"),
    isActive: yup.boolean().default(false),
  })
  .required();

const AdmissionTypeForm: FC = () => {
  const { control, setValue, getValues, resetField, handleSubmit } = useForm({
    resolver: yupResolver(admissionTypeSchema),
    defaultValues: {
      admissionTypeName: "",
      isActive: false,
    },
    mode: "onChange",
  });

  const getSaveDetails = useSelector(getSaveUpdateAdmissionTypeMaster);
  const getByIDAdmissionTypeData = useSelector(getbyIdAdmissionTypeMaster);
  const loaderStatus = useSelector(selectStatus);
  const navigate = useNavigate();
  const classes = useMasterTableStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const fetchGetbyIDAdmissionTypeData = async () => {
        try {
          dispatch(actions.loadGetByIdAdmissionTypeMaster(parseInt(id)));
        } catch (error: any) { }
      };
      fetchGetbyIDAdmissionTypeData();
    }
  }, [id, setValue]);

  useEffect(() => {
    if (id) {
      const setGetbyIDAdmissionTypeData = async () => {
        try {
          if (getByIDAdmissionTypeData) {
            setValue("admissionTypeName", getByIDAdmissionTypeData.name);
            setValue("isActive", getByIDAdmissionTypeData.isActive);
          }
        } catch (error: any) { }
      };
      setGetbyIDAdmissionTypeData();
    }
  }, [getByIDAdmissionTypeData]);

  const onSubmit = (data: any) => {
    id ? updateAdmissionType() : addAdmissionType();
  };

  const addAdmissionType = () => {
    try {
      const request = {
        id: 0,
        isActive: getValues("isActive"),
        name: getValues("admissionTypeName").toUpperCase(),
      };
      dispatch(
        actions.loadSaveUpdateAdmissionTypeMaster({ request, type: "ADD" })
      );
    } catch (error) { }
  };
  const updateAdmissionType = () => {
    try {
      const request = {
        id: id,
        isActive: getValues("isActive"),
        name: getValues("admissionTypeName").toUpperCase(),
      };
      dispatch(
        actions.loadSaveUpdateAdmissionTypeMaster({ request, type: "EDIT" })
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
          navigate("/admission-type");
        }
      };
      redirectToList();
    }
  }, [getSaveDetails]);

  const navigateToAdmissionTypeList = () => {
    dispatch(actions.setSaveUpdateAdmissionTypeMaster(null));
    navigate("/admission-type");
    setValue("admissionTypeName", "");
    setValue("isActive", false);
  };

  return (
    <>
      {loaderStatus === "loading" && <Loader />}
      <div>
        {/* <!-- breadcrumb --> */}
        <MastersHeader
          title={id ? "Edit Admission Type" : "Add Admission Type"}
          BreadcrumbTitle={"Admission Type"}
          BreadcrumSubTitle={id ? "Edit Admission Type" : "Add Admission Type"}
        />
      </div>
      <Paper elevation={3} className={classes.PaperLayout}>
        <Box p={3} pt={0}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3} alignItems={"center"} my={3}>
              <Grid item sm={4}>
                <InputController
                  control={control}
                  name="admissionTypeName"
                  label="Admission Type"
                  resetClick={() => resetField("admissionTypeName")}
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
                  <Button variant="outlined" onClick={navigateToAdmissionTypeList}>
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

export default AdmissionTypeForm;
