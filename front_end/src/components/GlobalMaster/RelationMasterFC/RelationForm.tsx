import React, { FC, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useForm, Controller } from "react-hook-form";
import { Box, Paper, TextField, Button, IconButton } from "@mui/material";
import { ADD, UPDATE } from "../../../constant/statusCodes";
import { useNavigate } from "react-router-dom";
import {
  actions,
  getSaveUpdateRelationMaster,
  getbyIdRelationMaster,
} from "../../../store/GlobalMaster/relationMaster";
import { useDispatch, useSelector } from "react-redux";
import MastersHeader from "../../../layouts/MastersHeader";
import { CheckBox } from "../../../control";
import { useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useMasterTableStyles } from "../../../assets/style/mastersTableStyle";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";

const RelationForm: FC = () => {
  const { control, setValue, getValues, reset } = useForm({
    defaultValues: {
      name: "",
      isActive: false,
      submit: null,
    },
  });
  const getSaveDetails = useSelector(getSaveUpdateRelationMaster);
  const getByIDRelationData = useSelector(getbyIdRelationMaster);
  const loaderStatus = useSelector(selectStatus);

  const navigate = useNavigate();
  const classes = useMasterTableStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const fetchGetbyIDRelationData = async () => {
        try {
          dispatch(actions.loadGetByIdRelationMaster(parseInt(id)));
        } catch (error: any) { }
      };
      fetchGetbyIDRelationData();
    }
  }, [id, setValue]);

  useEffect(() => {
    if (id) {
      const setGetbyIDRelationData = async () => {
        try {
          if (getByIDRelationData) {
            setValue("name", getByIDRelationData.name);
            setValue("isActive", getByIDRelationData.isActive);
          }
        } catch (error: any) { }
      };
      setGetbyIDRelationData();
    }
  }, [getByIDRelationData]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    id ? updateRelation() : addRelation();
  };
  const addRelation = () => {
    try {
      const request = {
        id: 0,
        isActive: getValues("isActive"),
        name: getValues("name").toUpperCase(),
      };
      dispatch(actions.loadSaveUpdateRelationMaster({ request, type: "ADD" }));
    } catch (error) { }
  };
  const updateRelation = () => {
    try {
      const request = {
        id: id,
        isActive: getValues("isActive"),
        name: getValues("name").toUpperCase(),
      };
      dispatch(actions.loadSaveUpdateRelationMaster({ request, type: "EDIT" }));
    } catch (error) { }
  };

  useEffect(() => {
    if (getSaveDetails) {
      const redirectToList = async () => {
        if (
          (getSaveDetails && getSaveDetails.statusCode === ADD) ||
          getSaveDetails.statusCode === UPDATE
        ) {
          navigate("/relation");
        }
      };
      redirectToList();
    }
  }, [getSaveDetails]);

  const navigateToRRelationList = () => {
    dispatch(actions.setSaveUpdateRelationMaster(null));
    navigate("/relation");
    setValue("name", "");
    setValue("isActive", false);
  };

  const onSearchData = (data: any) => {
    setValue("name", data);
  };

  return (
    <>
      {loaderStatus === "loading" && <Loader />}
      <div>
        <MastersHeader
          title={id ? "Edit Relation" : "Add Relation"}
          BreadcrumbTitle={"Relation"}
          BreadcrumSubTitle={id ? "Edit Relation" : "Add Relation"}
        />
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
                      label="Relation"
                      id="inputName"
                      value={getValues("name")}
                      onChange={(e) => onSearchData(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            size="small"
                            onClick={() => reset({ name: "", isActive: false })}
                            disabled={id ? true : false}
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        ),
                      }}
                    />
                  )}
                  name="name"
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
                  onClick={navigateToRRelationList}
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

export default RelationForm;
