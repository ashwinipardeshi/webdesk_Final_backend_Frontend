import React, { FC, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { Box, Paper, Button } from "@mui/material";
import { ADD, UPDATE } from "../../../constant/statusCodes";
import { useNavigate } from "react-router-dom";
import {
  actions,
  getSaveUpdateBankMaster,
  getbyIdBankMaster,
} from "../../../store/Master/bankMaster";
import { useDispatch, useSelector } from "react-redux";
import MastersHeader from "../../../layouts/MastersHeader";
import {
  CheckboxController,
  InputController,
  SelectController,
} from "../../../control";
import { useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useMasterTableStyles } from "../../../assets/style/mastersTableStyle";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const bankSchema = yup
  .object({
    name: yup
      .string()
      .matches(/^[a-zA-Z ]*$/, "Enter only characters")
      .required("Please enter name"),
    actype: yup
      .string()
      .matches(/^[a-zA-Z ]*$/, "Enter only characters")
      .required("Please enter account type"),
    acnumber: yup.string().required("Please enter acnumber")
      .when('$acnumber', (acnumber, schema) => {
        return (acnumber && acnumber.length)
          ? schema.matches(/^[0-9]{9,18}$/, 'Please enter valid account number')
          : schema;
      }),
    acholderName: yup
      .string()
      .matches(/^[a-zA-Z ]*$/, "Enter only characters")
      .required("Please enter account holderName"),
    branchName: yup
      .string()
      .matches(/^[a-zA-Z ]*$/, "Enter only characters")
      .required("Please enter branch name"),
    branchAddress: yup.string().required("Please enter branch address"),
    ifsc: yup
      .string()
      .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Please enter valid IFSC code")
      .required("Please enter IFSC"),
    micr: yup
      .string()
      .matches(/^[0-9]{1,9}$/, "Please enter valid MICR code")
      .required("Please enter MICR"),
    description: yup.string().default(""),
    isActive: yup.boolean().default(false),
  })
  .required();

const BankForm: FC = () => {
  const { control, setValue, getValues, resetField, handleSubmit } = useForm({
    resolver: yupResolver(bankSchema),
    defaultValues: {
      name: "",
      actype: "",
      acnumber: "",
      acholderName: "",
      description: "",
      branchName: "",
      branchAddress: "",
      ifsc: "",
      micr: "",
      isActive: false,
    },
    mode: "onChange",
  });
  const getSaveDetails = useSelector(getSaveUpdateBankMaster);
  const getByIDBankData = useSelector(getbyIdBankMaster);
  const loaderStatus = useSelector(selectStatus);
  const navigate = useNavigate();
  const classes = useMasterTableStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const fetchGetbyIDBankData = async () => {
        try {
          dispatch(actions.loadGetByIdBankMaster(parseInt(id)));
        } catch (error: any) { }
      };
      fetchGetbyIDBankData();
    }
  }, [id, setValue]);

  useEffect(() => {
    if (id) {
      const setGetbyIDBankData = async () => {
        try {
          if (getByIDBankData) {
            setValue("name", getByIDBankData.name);
            setValue("actype", getByIDBankData.actype);
            setValue("acnumber", getByIDBankData.acnumber);
            setValue("acholderName", getByIDBankData.acholderName);
            setValue("description", getByIDBankData.description);
            setValue("branchName", getByIDBankData.branchName);
            setValue("branchAddress", getByIDBankData.branchAddress);
            setValue("ifsc", getByIDBankData.ifsc);
            setValue("micr", getByIDBankData.micr);
            setValue("isActive", getByIDBankData.isActive);
          }
        } catch (error: any) { }
      };
      setGetbyIDBankData();
    }
  }, [getByIDBankData]);

  const onSubmit = (data: any) => {
    id ? updateBank() : addBank();
  };
  const addBank = () => {
    try {
      const request = {
        id: 0,
        isActive: getValues("isActive"),
        name: getValues("name").toUpperCase(),
        actype: getValues("actype"),
        acnumber: getValues("acnumber"),
        acholderName: getValues("acholderName"),
        description: getValues("description"),
        branchName: getValues("branchName"),
        branchAddress: getValues("branchAddress"),
        ifsc: getValues("ifsc"),
        micr: getValues("micr"),
      };
      dispatch(actions.loadSaveUpdateBankMaster({ request, type: "ADD" }));
    } catch (error) { }
  };
  const updateBank = () => {
    try {
      const request = {
        id: id,
        isActive: getValues("isActive"),
        name: getValues("name").toUpperCase(),
        actype: getValues("actype"),
        acnumber: getValues("acnumber"),
        acholderName: getValues("acholderName"),
        description: getValues("description"),
        branchName: getValues("branchName"),
        branchAddress: getValues("branchAddress"),
        ifsc: getValues("ifsc"),
        micr: getValues("micr"),
      };
      dispatch(actions.loadSaveUpdateBankMaster({ request, type: "EDIT" }));
    } catch (error) { }
  };

  useEffect(() => {
    if (getSaveDetails) {
      const redirectToList = async () => {
        if (
          (getSaveDetails && getSaveDetails.statusCode === ADD) ||
          getSaveDetails.statusCode === UPDATE
        ) {
          navigate("/bank");
        }
      };
      redirectToList();
    }
  }, [getSaveDetails]);

  const navigateToBankList = () => {
    dispatch(actions.setSaveUpdateBankMaster(null));
    navigate("/bank");
    setValue("name", "");
    setValue("actype", "");
    setValue("acnumber", "");
    setValue("acholderName", "");
    setValue("description", "");
    setValue("branchName", "");
    setValue("branchAddress", "");
    setValue("ifsc", "");
    setValue("micr", "");
    setValue("isActive", false);
  };

  return (
    <>
      {loaderStatus === "loading" && <Loader />}
      <div>
        {/* <!-- breadcrumb --> */}
        <MastersHeader
          title={id ? "Edit Bank" : "Add Bank"}
          BreadcrumbTitle={"Bank"}
          BreadcrumSubTitle={id ? "Edit Bank" : "Add Bank"}
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
                  label="Name"
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
                  name="actype"
                  label="AC Type"
                  resetClick={() => resetField("actype")}
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
                  name="acnumber"
                  label="AC Number"
                  resetClick={() => resetField("acnumber")}
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
                  name="acholderName"
                  label="AC Holder Name"
                  resetClick={() => resetField("acholderName")}
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
                  name="branchName"
                  label="Branch Name"
                  resetClick={() => resetField("branchName")}
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
                  name="branchAddress"
                  label="Branch Address"
                  resetClick={() => resetField("branchAddress")}
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
                  name="ifsc"
                  label="IFSC Code"
                  resetClick={() => resetField("ifsc")}
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
                  name="micr"
                  label="MICR"
                  resetClick={() => resetField("micr")}
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
                  onClick={navigateToBankList}
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

export default BankForm;
