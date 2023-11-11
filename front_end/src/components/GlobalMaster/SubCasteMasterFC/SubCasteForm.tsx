import React, { FC, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useForm, Controller } from "react-hook-form";
import { Box, Paper, TextField, Button, IconButton } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { ADD, UPDATE } from "../../../constant/statusCodes";
import { useNavigate } from "react-router-dom";
import {
  actions,
  getSaveUpdateSubCasteMaster,
  getbyIdSubCasteMaster,
} from "../../../store/GlobalMaster/subCasteMaster";
import { CasteOptionHook } from "../../../hooks/globalMasters/casteHooks";
import { Dropdown } from "../../../control";
import { useDispatch, useSelector } from "react-redux";
import MastersHeader from "../../../layouts/MastersHeader";
import { CheckBox } from "../../../control";
import { useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useMasterTableStyles } from "../../../assets/style/mastersTableStyle";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";

const SubCasteForm: FC = () => {
  const { optionCasteData: castesOption } = CasteOptionHook(true);

  const { control, setValue, getValues, reset } = useForm({
    defaultValues: {
      subCasteName: "",
      casteMasterId: "",
      isActive: false,
      submit: null,
    },
  });
  const getSaveDetails = useSelector(getSaveUpdateSubCasteMaster);
  const getByIDSubCasteData = useSelector(getbyIdSubCasteMaster);
  const loaderStatus = useSelector(selectStatus);
  const navigate = useNavigate();
  const classes = useMasterTableStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const fetchGetbyIDSubCasteData = async () => {
        try {
          dispatch(actions.loadGetByIdSubCasteMaster(parseInt(id)));
        } catch (error: any) { }
      };
      fetchGetbyIDSubCasteData();
    }
  }, [id, setValue]);

  useEffect(() => {
    if (id) {
      const setGetbyIDSubCasteData = async () => {
        try {
          if (getByIDSubCasteData) {
            setValue("subCasteName", getByIDSubCasteData.name);
            setValue("casteMasterId", getByIDSubCasteData.casteMasterId);
            setValue("isActive", getByIDSubCasteData.isActive);
          }
        } catch (error: any) { }
      };
      setGetbyIDSubCasteData();
    }
  }, [getByIDSubCasteData]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    id ? updateSubCaste() : addSubCaste();
  };
  const addSubCaste = () => {
    try {
      const request = {
        id: 0,
        isActive: getValues("isActive"),
        name: getValues("subCasteName").toUpperCase(),
        casteMasterId: getValues("casteMasterId"),
      };
      dispatch(actions.loadSaveUpdateSubCasteMaster({ request, type: "ADD" }));
    } catch (error) { }
  };
  const updateSubCaste = () => {
    try {
      const request = {
        id: id,
        isActive: getValues("isActive"),
        name: getValues("subCasteName").toUpperCase(),
        casteMasterId: getValues("casteMasterId"),
      };
      dispatch(actions.loadSaveUpdateSubCasteMaster({ request, type: "EDIT" }));
    } catch (error) { }
  };

  useEffect(() => {
    if (getSaveDetails) {
      const redirectToList = async () => {
        if (
          (getSaveDetails && getSaveDetails.statusCode === ADD) ||
          getSaveDetails.statusCode === UPDATE
        ) {
          navigate("/sub-caste");
        }
      };
      redirectToList();
    }
  }, [getSaveDetails]);

  const navigateToRSubCasteList = () => {
    dispatch(actions.setSaveUpdateSubCasteMaster(null));
    navigate("/sub-caste");
    setValue("subCasteName", "");
    setValue("isActive", false);
  };

  const onSearchData = (data: any) => {
    setValue("subCasteName", data);
  };

  const onSearchOptionData = (data: any) => {
    setValue("casteMasterId", data);
  };

  return (
    <>
      {loaderStatus === "loading" && <Loader />}
      <div>
        {/* <!-- breadcrumb --> */}
        <MastersHeader
          title={id ? "Edit Sub-caste" : "Add Sub-caste"}
          BreadcrumbTitle={"Sub-caste"}
          BreadcrumSubTitle={id ? "Edit Sub-caste" : "Add Sub-caste"}
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
                      label="Caste"
                      value={getValues("casteMasterId")}
                      options={castesOption}
                      name="casteMasterId"
                      id="id"
                      onChange={onChange}
                      error={""}
                      className={""}
                      fullWidth={true}
                    />
                  )}
                  name="casteMasterId"
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
                      label="Sub-caste"
                      id="inputName"
                      value={getValues("subCasteName")}
                      onChange={(e) => onSearchData(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            size="small"
                            onClick={() =>
                              reset({ subCasteName: "", isActive: false })
                            }
                            disabled={id ? true : false}
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        ),
                      }}
                    />
                  )}
                  name="subCasteName"
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
                  onClick={navigateToRSubCasteList}
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

export default SubCasteForm;
