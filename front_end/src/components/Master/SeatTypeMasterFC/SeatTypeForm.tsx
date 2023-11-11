import React, { FC, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { Box, Paper, Button } from "@mui/material";
import { ADD, UPDATE } from "../../../constant/statusCodes";
import { useNavigate } from "react-router-dom";
import {
  actions,
  getSaveUpdateSeatTypeMaster,
  getbyIdSeatTypeMaster,
} from "../../../store/Master/seatTypeMaster";
import { useDispatch, useSelector } from "react-redux";
import MastersHeader from "../../../layouts/MastersHeader";
import { useParams } from "react-router-dom";
import { useMasterTableStyles } from "../../../assets/style/mastersTableStyle";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputController, CheckboxController } from "../../../control";

const seatTypeSchema = yup
  .object({
    seatTypeName: yup
      .string()
      .matches(/^[a-zA-Z ]*$/, "Enter characters only")
      .required("Please enter seat type"),
    isActive: yup.boolean().default(false),
  })
  .required();

const SeatTypeForm: FC = () => {
  const { control, setValue, getValues, resetField, handleSubmit } = useForm({
    resolver: yupResolver(seatTypeSchema),
    defaultValues: {
      seatTypeName: "",
      isActive: false,
    },
    mode: "onChange",
  });

  const getSaveDetails = useSelector(getSaveUpdateSeatTypeMaster);
  const getByIDSeatTypeData = useSelector(getbyIdSeatTypeMaster);
  const loaderStatus = useSelector(selectStatus);
  const navigate = useNavigate();
  const classes = useMasterTableStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const fetchGetbyIDSeatTypeData = async () => {
        try {
          dispatch(actions.loadGetByIdSeatTypeMaster(parseInt(id)));
        } catch (error: any) { }
      };
      fetchGetbyIDSeatTypeData();
    }
  }, [id, setValue]);

  useEffect(() => {
    if (id) {
      const setGetbyIDSeatTypeData = async () => {
        try {
          if (getByIDSeatTypeData) {
            setValue("seatTypeName", getByIDSeatTypeData.name);
            setValue("isActive", getByIDSeatTypeData.isActive);
          }
        } catch (error: any) { }
      };
      setGetbyIDSeatTypeData();
    }
  }, [getByIDSeatTypeData]);

  const onSubmit = (data: any) => {
    id ? updateSeatType() : addSeatType();
  };

  const addSeatType = () => {
    try {
      const request = {
        id: 0,
        isActive: getValues("isActive"),
        name: getValues("seatTypeName").toUpperCase(),
      };
      dispatch(actions.loadSaveUpdateSeatTypeMaster({ request, type: "ADD" }));
    } catch (error) { }
  };
  const updateSeatType = () => {
    try {
      const request = {
        id: id,
        isActive: getValues("isActive"),
        name: getValues("seatTypeName").toUpperCase(),
      };
      dispatch(actions.loadSaveUpdateSeatTypeMaster({ request, type: "EDIT" }));
    } catch (error) { }
  };

  useEffect(() => {
    if (getSaveDetails) {
      const redirectToList = async () => {
        if (
          (getSaveDetails && getSaveDetails.statusCode === ADD) ||
          getSaveDetails.statusCode === UPDATE
        ) {
          navigate("/seat-Type");
        }
      };
      redirectToList();
    }
  }, [getSaveDetails]);

  const navigateToSeatTypeList = () => {
    dispatch(actions.setSaveUpdateSeatTypeMaster(null));
    navigate("/seat-type");
    setValue("seatTypeName", "");
    setValue("isActive", false);
  };

  return (
    <>
      {loaderStatus === "loading" && <Loader />}
      <div>
        <MastersHeader
          title={id ? "Edit Seat Type" : "Add Seat Type"}
          BreadcrumbTitle={"Seat Type"}
          BreadcrumSubTitle={id ? "Edit SeatType" : "Add Seat Type"}
        />
      </div>

      <Paper elevation={3} className={classes.PaperLayout}>
        <Box p={3} pt={0}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3} alignItems={"center"} my={3}>
              <Grid item sm={4}>
                <InputController
                  control={control}
                  name="seatTypeName"
                  label="Seat Type"
                  resetClick={() => resetField("seatTypeName")}
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
                  <Button variant="outlined" onClick={navigateToSeatTypeList}>
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

export default SeatTypeForm;
