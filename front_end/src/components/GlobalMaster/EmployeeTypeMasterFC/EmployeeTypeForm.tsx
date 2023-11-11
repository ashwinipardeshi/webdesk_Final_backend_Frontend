import React, { FC, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useForm, Controller } from "react-hook-form";
import { Box, Paper, TextField, Button, IconButton } from "@mui/material";
import { ADD, UPDATE } from "../../../constant/statusCodes";
import { useNavigate } from "react-router-dom";
import {
  actions,
  getSaveUpdateEmployeeTypeMaster,
  getbyIdEmployeeTypeMaster,
} from "../../../store/GlobalMaster/employeeTypeMaster";
import { useDispatch, useSelector } from "react-redux";
import MastersHeader from "../../../layouts/MastersHeader";
import { CheckBox } from "../../../control";
import { useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useMasterTableStyles } from "../../../assets/style/mastersTableStyle";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";

const EmployeeTypeForm: FC = () => {
  const { control, setValue, getValues, reset } = useForm({
    defaultValues: {
      employeeTypeName: "",
      isActive: false,
      submit: null,
    },
  });
  const getSaveDetails = useSelector(getSaveUpdateEmployeeTypeMaster);
  const getByIDEmployeeTypeData = useSelector(getbyIdEmployeeTypeMaster);
  const loaderStatus = useSelector(selectStatus);
  const navigate = useNavigate();
  const classes = useMasterTableStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const fetchGetbyIDEmployeeTypeData = async () => {
        try {
          dispatch(actions.loadGetByIdEmployeeTypeMaster(parseInt(id)));
        } catch (error: any) { }
      };
      fetchGetbyIDEmployeeTypeData();
    }
  }, [id, setValue]);

  useEffect(() => {
    if (id) {
      const setGetbyIDEmployeeTypeData = async () => {
        try {
          if (getByIDEmployeeTypeData) {
            setValue("employeeTypeName", getByIDEmployeeTypeData.name);
            setValue("isActive", getByIDEmployeeTypeData.isActive);
          }
        } catch (error: any) { }
      };
      setGetbyIDEmployeeTypeData();
    }
  }, [getByIDEmployeeTypeData]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    id ? updateEmployeeType() : addEmployeeType();
  };
  const addEmployeeType = () => {
    try {
      const request = {
        id: 0,
        isActive: getValues("isActive"),
        name: getValues("employeeTypeName").toUpperCase(),
      };
      dispatch(
        actions.loadSaveUpdateEmployeeTypeMaster({ request, type: "ADD" })
      );
    } catch (error) { }
  };
  const updateEmployeeType = () => {
    try {
      const request = {
        id: id,
        isActive: getValues("isActive"),
        name: getValues("employeeTypeName").toUpperCase(),
      };
      dispatch(
        actions.loadSaveUpdateEmployeeTypeMaster({ request, type: "EDIT" })
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
          navigate("/employee-type");
        }
      };
      redirectToList();
    }
  }, [getSaveDetails]);

  const navigateToREmployeeTypeList = () => {
    dispatch(actions.setSaveUpdateEmployeeTypeMaster(null));
    navigate("/employee-type");
    setValue("employeeTypeName", "");
    setValue("isActive", false);
  };

  const onSearchData = (data: any) => {
    setValue("employeeTypeName", data);
  };

  return (
    <>
      {loaderStatus === "loading" && <Loader />}
      <div>
        <MastersHeader
          title={id ? "Edit Employee Type" : "Add Employee Type"}
          BreadcrumbTitle={"Employee Type"}
          BreadcrumSubTitle={id ? "Edit Employee Type" : "Add Employee Type"}
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
                      label="Employee Type"
                      id="inputName"
                      value={getValues("employeeTypeName")}
                      onChange={(e) => onSearchData(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            size="small"
                            onClick={() =>
                              reset({ employeeTypeName: "", isActive: false })
                            }
                            disabled={id ? true : false}
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        ),
                      }}
                    />
                  )}
                  name="employeeTypeName"
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
                  onClick={navigateToREmployeeTypeList}
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

export default EmployeeTypeForm;
