import React, { FC, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useForm, Controller } from "react-hook-form";
import { Box, Paper, TextField, Button, IconButton } from "@mui/material";
import { ADD, UPDATE } from "../../../constant/statusCodes";
import { useNavigate } from "react-router-dom";
import {
  actions,
  getSaveUpdateCasteMaster,
  getbyIdCasteMaster,
} from "../../../store/GlobalMaster/casteMaster";
import { useDispatch, useSelector } from "react-redux";
import MastersHeader from "../../../layouts/MastersHeader";
import { CheckBox } from "../../../control";
import { useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useMasterTableStyles } from "../../../assets/style/mastersTableStyle";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";

const CasteForm: FC = () => {
  const { control, setValue, getValues, reset } = useForm({
    defaultValues: {
      casteName: "",
      isActive: false,
      submit: null,
    },
  });
  const getSaveDetails = useSelector(getSaveUpdateCasteMaster);
  const getByIDCasteData = useSelector(getbyIdCasteMaster);
  const loaderStatus = useSelector(selectStatus);
  const navigate = useNavigate();
  const classes = useMasterTableStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const fetchGetbyIDCasteData = async () => {
        try {
          dispatch(actions.loadGetByIdCasteMaster(parseInt(id)));
        } catch (error: any) { }
      };
      fetchGetbyIDCasteData();
    }
  }, [id, setValue]);

  useEffect(() => {
    if (id) {
      const setGetbyIDCasteData = async () => {
        try {
          if (getByIDCasteData) {
            setValue("casteName", getByIDCasteData.name);
            setValue("isActive", getByIDCasteData.isActive);
          }
        } catch (error: any) { }
      };
      setGetbyIDCasteData();
    }
  }, [getByIDCasteData]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    id ? updateCaste() : addCaste();
  };
  const addCaste = () => {
    try {
      const request = {
        id: 0,
        isActive: getValues("isActive"),
        name: getValues("casteName").toUpperCase(),
      };
      dispatch(actions.loadSaveUpdateCasteMaster({ request, type: "ADD" }));
    } catch (error) { }
  };
  const updateCaste = () => {
    try {
      const request = {
        id: id,
        isActive: getValues("isActive"),
        name: getValues("casteName").toUpperCase(),
      };
      dispatch(actions.loadSaveUpdateCasteMaster({ request, type: "EDIT" }));
    } catch (error) { }
  };

  useEffect(() => {
    if (getSaveDetails) {
      const redirectToList = async () => {
        if (
          (getSaveDetails && getSaveDetails.statusCode === ADD) ||
          getSaveDetails.statusCode === UPDATE
        ) {
          navigate("/caste");
        }
      };
      redirectToList();
    }
  }, [getSaveDetails]);

  const navigateToRCasteList = () => {
    dispatch(actions.setSaveUpdateCasteMaster(null));
    navigate("/caste");
    setValue("casteName", "");
    setValue("isActive", false);
  };

  const onSearchData = (data: any) => {
    setValue("casteName", data);
  };

  return (
    <>
      {loaderStatus === "loading" && <Loader />}
      <div>
        {/* <!-- breadcrumb --> */}
        <MastersHeader
          title={id ? "Edit Caste" : "Add Caste"}
          BreadcrumbTitle={"Caste"}
          BreadcrumSubTitle={id ? "Edit Caste" : "Add Caste"}
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
                      label="Caste"
                      id="inputName"
                      value={getValues("casteName")}
                      onChange={(e) => onSearchData(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            size="small"
                            onClick={() =>
                              reset({ casteName: "", isActive: false })
                            }
                            disabled={id ? true : false}
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        ),
                      }}
                    />
                  )}
                  name="casteName"
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
                  onClick={navigateToRCasteList}
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

export default CasteForm;
