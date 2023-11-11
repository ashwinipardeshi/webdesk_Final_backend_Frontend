import React, { FC, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useForm, Controller } from "react-hook-form";
import { Box, Paper, TextField, Button, IconButton } from "@mui/material";
import { ADD, UPDATE } from "../../../constant/statusCodes";
import { useNavigate } from "react-router-dom";
import {
  actions,
  getSaveUpdateDomicileMaster,
  getbyIdDomicileMaster,
} from "../../../store/GlobalMaster/domicileMaster";
import { useDispatch, useSelector } from "react-redux";
import MastersHeader from "../../../layouts/MastersHeader";
import { CheckBox } from "../../../control";
import { useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useMasterTableStyles } from "../../../assets/style/mastersTableStyle";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";

const DomicileForm: FC = () => {
  const { control, setValue, getValues, reset } = useForm({
    defaultValues: {
      domicileName: "",
      isActive: false,
      submit: null,
    },
  });
  const getSaveDetails = useSelector(getSaveUpdateDomicileMaster);
  const getByIDDomicileData = useSelector(getbyIdDomicileMaster);
  const loaderStatus = useSelector(selectStatus);
  const navigate = useNavigate();
  const classes = useMasterTableStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const fetchGetbyIDDomicileData = async () => {
        try {
          dispatch(actions.loadGetByIdDomicileMaster(parseInt(id)));
        } catch (error: any) { }
      };
      fetchGetbyIDDomicileData();
    }
  }, [id, setValue]);

  useEffect(() => {
    if (id) {
      const setGetbyIDDomicileData = async () => {
        try {
          if (getByIDDomicileData) {
            setValue("domicileName", getByIDDomicileData.name);
            setValue("isActive", getByIDDomicileData.isActive);
          }
        } catch (error: any) { }
      };
      setGetbyIDDomicileData();
    }
  }, [getByIDDomicileData]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    id ? updateDomicile() : addDomicile();
  };
  const addDomicile = () => {
    try {
      const request = {
        id: 0,
        isActive: getValues("isActive"),
        name: getValues("domicileName").toUpperCase(),
      };
      dispatch(actions.loadSaveUpdateDomicileMaster({ request, type: "ADD" }));
    } catch (error) { }
  };
  const updateDomicile = () => {
    try {
      const request = {
        id: id,
        isActive: getValues("isActive"),
        name: getValues("domicileName").toUpperCase(),
      };
      dispatch(actions.loadSaveUpdateDomicileMaster({ request, type: "EDIT" }));
    } catch (error) { }
  };

  useEffect(() => {
    if (getSaveDetails) {
      const redirectToList = async () => {
        if (
          (getSaveDetails && getSaveDetails.statusCode === ADD) ||
          getSaveDetails.statusCode === UPDATE
        ) {
          navigate("/domicile");
        }
      };
      redirectToList();
    }
  }, [getSaveDetails]);

  const navigateToRDomicileList = () => {
    dispatch(actions.setSaveUpdateDomicileMaster(null));
    navigate("/domicile");
    setValue("domicileName", "");
    setValue("isActive", false);
  };

  const onSearchData = (data: any) => {
    setValue("domicileName", data);
  };

  return (
    <>
      {loaderStatus === "loading" && <Loader />}
      <div>
        {/* <!-- breadcrumb --> */}
        <MastersHeader
          title={id ? "Edit Domicile" : "Add Domicile"}
          BreadcrumbTitle={"Domicile"}
          BreadcrumSubTitle={id ? "Edit Domicile" : "Add Domicile"}
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
                      label="Domicile"
                      id="inputName"
                      value={getValues("domicileName")}
                      onChange={(e) => onSearchData(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            size="small"
                            onClick={() =>
                              reset({ domicileName: "", isActive: false })
                            }
                            disabled={id ? true : false}
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        ),
                      }}
                    />
                  )}
                  name="domicileName"
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
                  onClick={navigateToRDomicileList}
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

export default DomicileForm;
