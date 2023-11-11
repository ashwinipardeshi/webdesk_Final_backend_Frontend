import React, { FC, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useForm, Controller } from "react-hook-form";
import { Box, Paper, TextField, Button, IconButton } from "@mui/material";
import { ADD, UPDATE } from "../../../constant/statusCodes";
import { useNavigate } from "react-router-dom";
import {
  actions,
  getSaveUpdateTalukaMaster,
  getbyIdTalukaMaster,
} from "../../../store/GlobalMaster/talukaMaster";
import { DistrictOptionHook } from "../../../hooks/globalMasters/districtHook";
import { useDispatch, useSelector } from "react-redux";
import MastersHeader from "../../../layouts/MastersHeader";
import { CheckBox } from "../../../control";
import { useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { Dropdown } from "../../../control/Dropdown";
import { useMasterTableStyles } from "../../../assets/style/mastersTableStyle";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";

const TalukaForm: FC = () => {
  const { optionDistrictdata: districtOption } = DistrictOptionHook(true);

  const { control, setValue, getValues, reset } = useForm({
    defaultValues: {
      talukaName: "",
      districtId: "",
      isActive: false,
      submit: null,
    },
  });
  const getSaveDetails = useSelector(getSaveUpdateTalukaMaster);
  const getByIDTalukaData = useSelector(getbyIdTalukaMaster);
  const loaderStatus = useSelector(selectStatus);
  const navigate = useNavigate();
  const classes = useMasterTableStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const fetchGetbyIDTalukaData = async () => {
        try {
          dispatch(actions.loadGetByIdTalukaMaster(parseInt(id)));
        } catch (error: any) { }
      };
      fetchGetbyIDTalukaData();
    }
  }, [id, setValue]);

  useEffect(() => {
    if (id) {
      const setGetbyIDTalukaData = async () => {
        try {
          if (getByIDTalukaData) {
            setValue("talukaName", getByIDTalukaData.name);
            setValue("districtId", getByIDTalukaData.districtId);
            setValue("isActive", getByIDTalukaData.isActive);
          }
        } catch (error: any) { }
      };
      setGetbyIDTalukaData();
    }
  }, [getByIDTalukaData]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    id ? updateTaluka() : addTaluka();
  };
  const addTaluka = () => {
    try {
      const request = {
        id: 0,
        isActive: getValues("isActive"),
        name: getValues("talukaName").toUpperCase(),
        districtId: getValues("districtId"),
      };
      dispatch(actions.loadSaveUpdateTalukaMaster({ request, type: "ADD" }));
    } catch (error) { }
  };
  const updateTaluka = () => {
    try {
      const request = {
        id: id,
        isActive: getValues("isActive"),
        name: getValues("talukaName").toUpperCase(),
        districtId: getValues("districtId"),
      };
      dispatch(actions.loadSaveUpdateTalukaMaster({ request, type: "EDIT" }));
    } catch (error) { }
  };

  useEffect(() => {
    if (getSaveDetails) {
      const redirectToList = async () => {
        if (
          (getSaveDetails && getSaveDetails.statusCode === ADD) ||
          getSaveDetails.statusCode === UPDATE
        ) {
          navigate("/taluka");
        }
      };
      redirectToList();
    }
  }, [getSaveDetails]);

  const navigateToRTalukaList = () => {
    dispatch(actions.setSaveUpdateTalukaMaster(null));
    navigate("/taluka");
    setValue("talukaName", "");
    setValue("isActive", false);
  };

  const onSearchData = (data: any) => {
    setValue("talukaName", data);
  };

  const onSearchOptionData = (data: any) => {
    setValue("districtId", data);
  };

  return (
    <>
      {loaderStatus === "loading" && <Loader />}
      <div>
        {/* <!-- breadcrumb --> */}
        <MastersHeader
          title={id ? "Edit Taluka" : "Add Taluka"}
          BreadcrumbTitle={"Taluka"}
          BreadcrumSubTitle={id ? "Edit Taluka" : "Add Taluka"}
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
                  render={({ field: { onChange } }) => (
                    <Dropdown
                      label="District"
                      value={getValues("districtId")}
                      options={districtOption}
                      name="districtId"
                      id="districtId"
                      onChange={onChange}
                      error={""}
                      className={""}
                      fullWidth={true}
                    />
                  )}
                  name="districtId"
                  control={control}
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
                <Controller
                  render={({ field: any }) => (
                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      label="Taluka"
                      id="inputName"
                      value={getValues("talukaName")}
                      onChange={(e) => onSearchData(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            size="small"
                            onClick={() =>
                              reset({ talukaName: "", isActive: false })
                            }
                            disabled={id ? true : false}
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        ),
                      }}
                    />
                  )}
                  name="talukaName"
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
                  variant="contained"
                  color="primary"
                  onClick={navigateToRTalukaList}
                  className={classes.buttonLayout}
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

export default TalukaForm;
