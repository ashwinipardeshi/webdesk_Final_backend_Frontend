import React, { FC, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useForm, Controller } from "react-hook-form";
import { Box, Paper, TextField, Button, IconButton } from "@mui/material";
import { ADD, UPDATE } from "../../../constant/statusCodes";
import { useNavigate } from "react-router-dom";
import {
  actions,
  getSaveUpdateCandidatureTypeMaster,
  getbyIdCandidatureTypeMaster,
} from "../../../store/GlobalMaster/candidatureTypeMaster";
import { useDispatch, useSelector } from "react-redux";
import MastersHeader from "../../../layouts/MastersHeader";
import { CheckBox } from "../../../control";
import { useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useMasterTableStyles } from "../../../assets/style/mastersTableStyle";

const CandidatureForm: FC = () => {
  const { control, setValue, getValues, reset } = useForm({
    defaultValues: {
      CandidatureTypeName: "",
      isActive: false,
      submit: null,
    },
  });
  const getSaveDetails = useSelector(getSaveUpdateCandidatureTypeMaster);
  const getByIDCandidatureTypeData = useSelector(getbyIdCandidatureTypeMaster);
  const navigate = useNavigate();
  const classes = useMasterTableStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const fetchGetbyIDCandidatureTypeData = async () => {
        try {
          dispatch(actions.loadGetByIdCandidatureTypeMaster(parseInt(id)));
        } catch (error: any) { }
      };
      fetchGetbyIDCandidatureTypeData();
    }
  }, [id, setValue]);

  useEffect(() => {
    if (id) {
      const setGetbyIDCandidatureTypeData = async () => {
        try {
          if (getByIDCandidatureTypeData) {
            setValue("CandidatureTypeName", getByIDCandidatureTypeData.name);
            setValue("isActive", getByIDCandidatureTypeData.isActive);
          }
        } catch (error: any) { }
      };
      setGetbyIDCandidatureTypeData();
    }
  }, [getByIDCandidatureTypeData]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    id ? updateCandidatureType() : addCandidatureType();
  };
  const addCandidatureType = () => {
    try {
      const request = {
        id: 0,
        isActive: getValues("isActive"),
        name: getValues("CandidatureTypeName").toUpperCase(),
      };
      dispatch(
        actions.loadSaveUpdateCandidatureTypeMaster({ request, type: "ADD" })
      );
    } catch (error) { }
  };
  const updateCandidatureType = () => {
    try {
      const request = {
        id: id,
        isActive: getValues("isActive"),
        name: getValues("CandidatureTypeName").toUpperCase(),
      };
      dispatch(
        actions.loadSaveUpdateCandidatureTypeMaster({ request, type: "EDIT" })
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
          navigate("/candidature-type");
        }
      };
      redirectToList();
    }
  }, [getSaveDetails]);

  const navigateToRCandidatureTypeList = () => {
    dispatch(actions.setSaveUpdateCandidatureTypeMaster(null));
    navigate("/candidature-type");
    setValue("CandidatureTypeName", "");
    setValue("isActive", false);
  };

  const onSearchData = (data: any) => {
    setValue("CandidatureTypeName", data);
  };

  return (
    <>
      <div>
        {/* <!-- breadcrumb --> */}
        <MastersHeader
          title={id ? "Edit CandidatureType" : "Add CandidatureType"}
          BreadcrumbTitle={"CandidatureType"}
          BreadcrumSubTitle={
            id ? "Edit CandidatureType" : "Add CandidatureType"
          }
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
                      label="Candidature Type"
                      id="inputName"
                      value={getValues("CandidatureTypeName")}
                      onChange={(e) => onSearchData(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            size="small"
                            onClick={() =>
                              reset({
                                CandidatureTypeName: "",
                                isActive: false,
                              })
                            }
                            disabled={id ? true : false}
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        ),
                      }}
                    />
                  )}
                  name="CandidatureTypeName"
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
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={navigateToRCandidatureTypeList}
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

export default CandidatureForm;
