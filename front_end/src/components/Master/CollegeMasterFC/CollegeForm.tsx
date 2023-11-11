import React, { FC, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { Box, Paper, Button } from "@mui/material";
import { ADD, UPDATE } from "../../../constant/statusCodes";
import { useNavigate } from "react-router-dom";
import {
  actions,
  getSaveUpdateCollegeMaster,
  getbyIdCollegeMaster,
} from "../../../store/Master/collegeMaster";
import { useDispatch, useSelector } from "react-redux";
import MastersHeader from "../../../layouts/MastersHeader";
import { useParams } from "react-router-dom";
import { useMasterTableStyles } from "../../../assets/style/mastersTableStyle";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputController, CheckboxController } from "../../../control";

const collegeSchema = yup
  .object({
    name: yup
      .string()
      .matches(/^[a-zA-Z ]*$/, "Enter characters only")
      .required("Please enter college name"),
    isActive: yup.boolean().default(false),
    university: yup
      .string()
      .matches(/^[a-zA-Z ]*$/, "Enter characters only")
      .required("Please enter university name"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Please enter email address"),
    phoneNo: yup.string().required("Please enter mobile number").matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits'),

    cpemail: yup
      .string()
      .email("Invalid email address")
      .required("Please enter email address"),

    cpmob: yup.string().required("Please enter mobile number").matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits'),

    shortName: yup.string().default(""),
    type: yup.string().default(""),
    description: yup.string().default(""),
    category: yup.string().default(""),
    address: yup.string().default(""),
    cpname: yup.string().default(""),
    website: yup.string().default(""),
    talukaid: yup.number().default(1),
  })
  .required();

const CollegeForm: FC = () => {
  const { control, setValue, getValues, resetField, handleSubmit } = useForm({
    resolver: yupResolver(collegeSchema),
    defaultValues: {
      type: "",
      name: "",
      shortName: "",
      university: "",
      description: "",
      category: "",
      address: "",
      phoneNo: "",
      website: "",
      email: "",
      cpname: "",
      cpemail: "",
      cpmob: "",
      isActive: false,
    },
    mode: "onChange",
  });

  const getSaveDetails = useSelector(getSaveUpdateCollegeMaster);
  const getByIDCollegeData = useSelector(getbyIdCollegeMaster);
  const loaderStatus = useSelector(selectStatus);
  const navigate = useNavigate();
  const classes = useMasterTableStyles();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchGetbyIDCollegeData = async () => {
        try {
          dispatch(actions.loadGetByIdCollegeMaster(parseInt(id)));
        } catch (error: any) { }
      };

      fetchGetbyIDCollegeData();
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (id) {
      const setGetbyIDCollegeData = async () => {
        try {
          if (getByIDCollegeData) {
            setValue("name", getByIDCollegeData.name);
            setValue("isActive", getByIDCollegeData.isActive);
            setValue("shortName", getByIDCollegeData.shortName);
            setValue("university", getByIDCollegeData.university);
            setValue("type", getByIDCollegeData.type);
            setValue("description", getByIDCollegeData.description);
            setValue("category", getByIDCollegeData.category);
            setValue("address", getByIDCollegeData.address);
            setValue("phoneNo", getByIDCollegeData.phoneNo);
            setValue("cpname", getByIDCollegeData.cpname);
            setValue("website", getByIDCollegeData.website);
            setValue("email", getByIDCollegeData.email);
            setValue("cpemail", getByIDCollegeData.cpemail);
            setValue("cpmob", getByIDCollegeData.cpmob);
          }
        } catch (error: any) { }
      };
      setGetbyIDCollegeData();
    }
  }, [getByIDCollegeData]);

  const onSubmit = (data: any) => {
    id ? updateCollege() : addCollege();
  };

  const addCollege = () => {
    try {
      let phone = getValues("phoneNo");
      let contactPersonPhone = getValues("cpmob");

      if (phone.length === 10) {
        phone = "91" + phone;
      }

      if (contactPersonPhone.length === 10) {
        contactPersonPhone = "91" + contactPersonPhone;
      }
      const request = {
        id: 0,
        isActive: getValues("isActive"),
        name: getValues("name").toUpperCase(),
        talukaid: 1,
        type: getValues("type"),
        shortName: getValues("shortName"),
        university: getValues("university"),
        description: getValues("description"),
        category: getValues("category"),
        address: getValues("address"),
        phoneNo: phone,
        website: getValues("website"),
        email: getValues("email"),
        cpname: getValues("cpname"),
        cpemail: getValues("cpemail"),
        cpmob: contactPersonPhone,
      };
      dispatch(actions.loadSaveUpdateCollegeMaster({ request, type: "ADD" }));
    } catch (error) { }
  };

  const updateCollege = () => {
    try {
      let phone = getValues("phoneNo");
      let contactPersonPhone = getValues("cpmob");

      if (phone.length === 10) {
        phone = "91" + phone;
      }

      if (contactPersonPhone.length === 10) {
        contactPersonPhone = "91" + contactPersonPhone;
      }
      const request = {
        id: parseInt(id || "0"),
        isActive: getValues("isActive"),
        name: getValues("name").toUpperCase(),
        talukaid: 1,
        type: getValues("type"),
        shortName: getValues("shortName"),
        university: getValues("university"),
        description: getValues("description"),
        category: getValues("category"),
        address: getValues("address"),
        phoneNo: phone,
        website: getValues("website"),
        email: getValues("email"),
        cpname: getValues("cpname"),
        cpemail: getValues("cpemail"),
        cpmob: contactPersonPhone,
      };
      dispatch(actions.loadSaveUpdateCollegeMaster({ request, type: "EDIT" }));
    } catch (error) { }
  };

  useEffect(() => {
    if (getSaveDetails) {
      const redirectToList = async () => {
        if (
          (getSaveDetails && getSaveDetails.statusCode === ADD) ||
          getSaveDetails.statusCode === UPDATE
        ) {
          navigate("/college");
        }
      };
      redirectToList();
    }
  }, [getSaveDetails]);

  const navigateToCollegeList = () => {
    dispatch(actions.setSaveUpdateCollegeMaster(null));
    navigate("/college");
    setValue("name", "");
    setValue("type", "");
    setValue("shortName", "");
    setValue("university", "");
    setValue("description", "");
    setValue("category", "");
    setValue("address", "");
    setValue("phoneNo", "");
    setValue("website", "");
    setValue("email", "");
    setValue("cpname", "");
    setValue("cpemail", "");
    setValue("cpmob", "");
    setValue("isActive", false);
  };

  return (
    <>
      {loaderStatus === "loading" && <Loader />}
      <div>
        {/* <!-- breadcrumb --> */}
        <MastersHeader
          title={id ? "Edit College" : "Add College"}
          BreadcrumbTitle={"College"}
          BreadcrumSubTitle={id ? "Edit College" : "Add College"}
        />
      </div>
      <Paper elevation={3} className={classes.PaperLayout}>
        <Box p={3} pt={0}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3} alignItems={"center"} my={3}>
              <Grid item sm={4}>
                <InputController
                  control={control}
                  name="type"
                  label="College Type"
                  resetClick={() => resetField("type")}
                />
              </Grid>
              <Grid item sm={4}>
                <InputController
                  control={control}
                  name="name"
                  label="College"
                  resetClick={() => resetField("name")}
                />
              </Grid>
              <Grid item sm={4}>
                <InputController
                  control={control}
                  name="shortName"
                  label="Short Name"
                  resetClick={() => resetField("shortName")}
                />
              </Grid>
              <Grid item sm={4}>
                <InputController
                  control={control}
                  name="university"
                  label="University"
                  resetClick={() => resetField("university")}
                />
              </Grid>
              <Grid item sm={4}>
                <InputController
                  control={control}
                  name="description"
                  label="College Description"
                  resetClick={() => resetField("description")}
                />
              </Grid>
              <Grid item sm={4}>
                <InputController
                  control={control}
                  name="category"
                  label="College Category"
                  resetClick={() => resetField("category")}
                />
              </Grid>
              <Grid item sm={4}>
                <InputController
                  control={control}
                  name="address"
                  label="College Address"
                  resetClick={() => resetField("address")}
                />
              </Grid>
              <Grid item sm={4}>
                <InputController
                  control={control}
                  name="phoneNo"
                  label="College Contact No"
                  resetClick={() => resetField("phoneNo")}
                />
              </Grid>
              <Grid item sm={4}>
                <InputController
                  control={control}
                  name="website"
                  label="Website"
                  resetClick={() => resetField("website")}
                />
              </Grid>
              <Grid item sm={4}>
                <InputController
                  control={control}
                  name="email"
                  label="College Email Id"
                  resetClick={() => resetField("email")}
                />
              </Grid>
              <Grid item sm={4}>
                <InputController
                  control={control}
                  name="cpname"
                  label="Contact Person Name"
                  resetClick={() => resetField("cpname")}
                />
              </Grid>
              <Grid item sm={4}>
                <InputController
                  control={control}
                  name="cpemail"
                  label="Contact Person Email"
                  resetClick={() => resetField("cpemail")}
                />
              </Grid>
              <Grid item sm={4}>
                <InputController
                  control={control}
                  name="cpmob"
                  label="Contact Person Mobile No"
                  resetClick={() => resetField("cpmob")}
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
                  <Button variant="outlined" onClick={navigateToCollegeList}>
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

export default CollegeForm;
