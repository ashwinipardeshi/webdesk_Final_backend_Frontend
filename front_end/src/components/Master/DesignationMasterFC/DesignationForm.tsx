import React, { FC, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useForm, Controller } from "react-hook-form";
import { Box, Paper, TextField, Button, IconButton } from "@mui/material";
import { ADD, UPDATE } from "../../../constant/statusCodes";
import { useNavigate } from "react-router-dom";
import {
  actions,
  getSaveUpdateDesignationMaster,
  getbyIdDesignationMaster,
} from "../../../store/Master/designationMaster";
import { useDispatch, useSelector } from "react-redux";
import MastersHeader from "../../../layouts/MastersHeader";
import { CheckBox } from "../../../control";
import { useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useMasterTableStyles } from "../../../assets/style/mastersTableStyle";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";
const DesignationForm: FC = () => {
  const { control, setValue, getValues, reset } = useForm({
    defaultValues: {
      designationName: "",
      isActive: false,
      submit: null,
    },
  });
  const getSaveDetails = useSelector(getSaveUpdateDesignationMaster);
  const getByIDDesignationData = useSelector(getbyIdDesignationMaster);
  const loaderStatus = useSelector(selectStatus);
  const navigate = useNavigate();
  const classes = useMasterTableStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const fetchGetbyIDDesignationData = async () => {
        try {
          dispatch(actions.loadGetByIdDesignationMaster(parseInt(id)));
        } catch (error: any) { }
      };
      fetchGetbyIDDesignationData();
    }
  }, [id, setValue]);

  useEffect(() => {
    if (id) {
      const setGetbyIDDesignationData = async () => {
        try {
          if (getByIDDesignationData) {
            setValue("designationName", getByIDDesignationData.name);
            setValue("isActive", getByIDDesignationData.isActive);
          }
        } catch (error: any) { }
      };
      setGetbyIDDesignationData();
    }
  }, [getByIDDesignationData]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    id ? updateDesignation() : addDesignation();
  };
  const addDesignation = () => {
    try {
      const request = {
        id: 0,
        isActive: getValues("isActive"),
        name: getValues("designationName").toUpperCase(),
      };
      dispatch(
        actions.loadSaveUpdateDesignationMaster({ request, type: "ADD" })
      );
    } catch (error) { }
  };
  const updateDesignation = () => {
    try {
      const request = {
        id: id,
        isActive: getValues("isActive"),
        name: getValues("designationName").toUpperCase(),
      };
      dispatch(
        actions.loadSaveUpdateDesignationMaster({ request, type: "EDIT" })
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
          navigate("/designation");
        }
      };
      redirectToList();
    }
  }, [getSaveDetails]);

  const navigateToDesignationList = () => {
    dispatch(actions.setSaveUpdateDesignationMaster(null));
    navigate("/designation");
    setValue("designationName", "");
    setValue("isActive", false);
  };

  const onSearchData = (data: any) => {
    setValue("designationName", data);
  };

  return (
    <>
      {loaderStatus === "loading" && <Loader />}
      <div>
        <MastersHeader
          title={id ? "Edit Designation" : "Add Designation"}
          BreadcrumbTitle={"Designation"}
          BreadcrumSubTitle={id ? "Edit Designation" : "Add Designation"}
        />
        {/* <!-- /breadcrumb --> */}
      </div>
      <Paper elevation={3} className={classes.PaperLayout}>
        <Box p={2} pt={0}>
          <form onSubmit={onSubmit}>
            <Grid container mt={0} spacing={2}>
              <Grid
                item
                container
                alignItems={"center"}
                justifyContent={"left"}
                my={0}
                xs={4}
              >
                <Controller
                  render={({ field: any }) => (
                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      label="Designation"
                      id="inputName"
                      value={getValues("designationName")}
                      onChange={(e) => onSearchData(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            size="small"
                            onClick={() =>
                              reset({ designationName: "", isActive: false })
                            }
                            disabled={id ? true : false}
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        ),
                      }}
                    />
                  )}
                  name="designationName"
                  control={control}
                  defaultValue=""
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
                <Controller
                  name="isActive"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CheckBox
                      name="isActive"
                      id="isActive"
                      label="Active"
                      value={getValues("isActive")}
                      onChange={(e: any) =>
                        setValue("isActive", e.target.value)
                      }
                      className=""
                    />
                  )}
                />
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
                <Button variant="outlined" onClick={navigateToDesignationList}>
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

export default DesignationForm;
