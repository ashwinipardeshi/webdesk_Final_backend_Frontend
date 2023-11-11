import React, { FC, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { Box, Paper, Button, } from "@mui/material";
import { ADD, UPDATE } from "../../../constant/statusCodes";
import { useNavigate } from "react-router-dom";
import {
  actions,
  getSaveUpdateFeeHeadMaster,
  getbyIdFeeHeadMaster,
} from "../../../store/Master/feeheadMaster";
import { FeeHeadTypeOptionHook } from "../../../hooks/masters/feeheadTypeHooks";
import { useDispatch, useSelector } from "react-redux";
import MastersHeader from "../../../layouts/MastersHeader";
import {
  SelectController,
  CheckboxController,
  InputController,
} from "../../../control";
import { useParams } from "react-router-dom";
import { useMasterTableStyles } from "../../../assets/style/mastersTableStyle";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const feeheadSchema = yup
  .object({
    feeHeadTypeMasterId: yup.string().required("Please select fee head type"),
    name: yup
      .string()
      .matches(/^[a-zA-Z ]*$/, "Enter only characters")
      .required("Please enter name"),
    fees: yup.string().required("Please enter fees")
      .when('$fees', (fees, schema) => {
        return (fees && fees.length)
          ? schema.matches(/^[0-9]+$/, 'Enter numbers only')
          : schema;
      }),
    description: yup.string().default(""),
    isActive: yup.boolean().default(false),
  })
  .required();

const FeeHeadForm: FC = () => {
  const { feeheadtypeoptiondata: feeheadtypeoption } =
    FeeHeadTypeOptionHook(true);

  const { control, setValue, getValues, resetField, handleSubmit } = useForm({
    resolver: yupResolver(feeheadSchema),
    defaultValues: {
      name: "",
      feeHeadTypeMasterId: "",
      fees: "",
      description: "",
      isActive: false,
    },
    mode: "onChange",
  });
  const getSaveDetails = useSelector(getSaveUpdateFeeHeadMaster);
  const getByIDFeeHeadData = useSelector(getbyIdFeeHeadMaster);
  const loaderStatus = useSelector(selectStatus);
  const navigate = useNavigate();
  const classes = useMasterTableStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const fetchGetbyIDFeeHeadData = async () => {
        try {
          dispatch(actions.loadGetByIdFeeHeadMaster(parseInt(id)));
        } catch (error: any) { }
      };
      fetchGetbyIDFeeHeadData();
    }
  }, [id, setValue]);

  useEffect(() => {
    if (id) {
      const setGetbyIDFeeHeadData = async () => {
        try {
          if (getByIDFeeHeadData) {
            setValue("name", getByIDFeeHeadData.name);
            setValue(
              "feeHeadTypeMasterId",
              getByIDFeeHeadData.feeHeadTypeMasterId
            );
            setValue("fees", getByIDFeeHeadData.fees);
            setValue("description", getByIDFeeHeadData.description);
            setValue("isActive", getByIDFeeHeadData.isActive);
          }
        } catch (error: any) { }
      };
      setGetbyIDFeeHeadData();
    }
  }, [getByIDFeeHeadData]);

  const onSubmit = (data: any) => {
    id ? updateFeeHead() : addFeeHead();
  };
  const addFeeHead = () => {
    try {
      const request = {
        id: 0,
        isActive: getValues("isActive"),
        name: getValues("name").toUpperCase(),
        feeHeadTypeMasterId: getValues("feeHeadTypeMasterId"),
        fees: getValues("fees"),
        description: getValues("description"),
      };
      dispatch(actions.loadSaveUpdateFeeHeadMaster({ request, type: "ADD" }));
    } catch (error) { }
  };
  const updateFeeHead = () => {
    try {
      const request = {
        id: id,
        isActive: getValues("isActive"),
        name: getValues("name").toUpperCase(),
        feeHeadTypeMasterId: getValues("feeHeadTypeMasterId"),
        fees: getValues("fees"),
        description: getValues("description"),
      };
      dispatch(actions.loadSaveUpdateFeeHeadMaster({ request, type: "EDIT" }));
    } catch (error) { }
  };

  useEffect(() => {
    if (getSaveDetails) {
      const redirectToList = async () => {
        if (
          (getSaveDetails && getSaveDetails.statusCode === ADD) ||
          getSaveDetails.statusCode === UPDATE
        ) {
          navigate("/fee-head");
        }
      };
      redirectToList();
    }
  }, [getSaveDetails]);

  const navigateToFeeHeadList = () => {
    dispatch(actions.setSaveUpdateFeeHeadMaster(null));
    navigate("/fee-head");
    setValue("name", "");
    setValue("feeHeadTypeMasterId", "");
    setValue("fees", "");
    setValue("description", "");
    setValue("isActive", false);
  };

  return (
    <>
      {loaderStatus === "loading" && <Loader />}
      <div>
        {/* <!-- breadcrumb --> */}
        <MastersHeader
          title={id ? "Edit Fee Head" : "Add Fee Head"}
          BreadcrumbTitle={"Fee Head"}
          BreadcrumSubTitle={id ? "Edit Fee Head" : "Add Fee Head"}
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
                <SelectController
                  control={control}
                  label="Fee Head Type"
                  options={feeheadtypeoption}
                  name="feeHeadTypeMasterId"
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
                  name="name"
                  label="Fee Head"
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
                  name="fees"
                  label="Fee"
                  resetClick={() => resetField("fees")}
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
                  onClick={navigateToFeeHeadList}
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

export default FeeHeadForm;
