import React, { FC, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { Box, Paper, Button } from "@mui/material";
import { ADD, UPDATE } from "../../../constant/statusCodes";
import { useNavigate } from "react-router-dom";
import {
  actions,
  getSaveUpdateAnnualIncomeMaster,
  getbyIdAnnualIncomeMaster,
} from "../../../store/GlobalMaster/annualIncomeMaster";
import { useDispatch, useSelector } from "react-redux";
import MastersHeader from "../../../layouts/MastersHeader";
import { useParams } from "react-router-dom";
import { useMasterTableStyles } from "../../../assets/style/mastersTableStyle";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputController, CheckboxController } from "../../../control";

const annualIncomeSchema = yup
  .object({
    annualIncomeName: yup
      .string()
      .required("Please enter annual income"),
    isActive: yup.boolean().default(false),
  })
  .required();

const AnnualIncomeForm: FC = () => {
  const { control, setValue, getValues, resetField, handleSubmit } = useForm({
    resolver: yupResolver(annualIncomeSchema),
    defaultValues: {
      annualIncomeName: "",
      isActive: false,
    },
    mode: "onChange",
  });
  const getSaveDetails = useSelector(getSaveUpdateAnnualIncomeMaster);
  const getByIDAnnualIncomeData = useSelector(getbyIdAnnualIncomeMaster);
  const loaderStatus = useSelector(selectStatus);
  const navigate = useNavigate();
  const classes = useMasterTableStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const fetchGetbyIDAnnualIncomeData = async () => {
        try {
          dispatch(actions.loadGetByIdAnnualIncomeMaster(parseInt(id)));
        } catch (error: any) { }
      };
      fetchGetbyIDAnnualIncomeData();
    }
  }, [id, setValue]);

  useEffect(() => {
    if (id) {
      const setGetbyIDAnnualIncomeData = async () => {
        try {
          if (getByIDAnnualIncomeData) {
            setValue("annualIncomeName", getByIDAnnualIncomeData.name);
            setValue("isActive", getByIDAnnualIncomeData.isActive);
          }
        } catch (error: any) { }
      };
      setGetbyIDAnnualIncomeData();
    }
  }, [getByIDAnnualIncomeData]);

  const onSubmit = (data: any) => {
    id ? updateAnnualIncome() : addAnnualIncome();
  };
  const addAnnualIncome = () => {
    try {
      const request = {
        id: 0,
        isActive: getValues("isActive"),
        name: getValues("annualIncomeName").toUpperCase(),
      };
      dispatch(
        actions.loadSaveUpdateAnnualIncomeMaster({ request, type: "ADD" })
      );
    } catch (error) { }
  };
  const updateAnnualIncome = () => {
    try {
      const request = {
        id: id,
        isActive: getValues("isActive"),
        name: getValues("annualIncomeName").toUpperCase(),
      };
      dispatch(
        actions.loadSaveUpdateAnnualIncomeMaster({ request, type: "EDIT" })
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
          navigate("/annual-income");
        }
      };
      redirectToList();
    }
  }, [getSaveDetails]);

  const navigateToAnnualIncomeList = () => {
    dispatch(actions.setSaveUpdateAnnualIncomeMaster(null));
    navigate("/annual-income");
    setValue("annualIncomeName", "");
    setValue("isActive", false);
  };

  return (
    <>
      {loaderStatus === "loading" && <Loader />}
      <div>
        <MastersHeader
          title={id ? "Edit Annual Income" : "Add Annual income"}
          BreadcrumbTitle={"Annual Income"}
          BreadcrumSubTitle={id ? "Edit Annual Income" : "Add Annual Income"}
        />
      </div>

      <Paper elevation={3} className={classes.PaperLayout}>
        <Box p={3} pt={0}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3} alignItems={"center"} my={3}>
              <Grid item sm={4}>
                <InputController
                  control={control}
                  name="annualIncomeName"
                  label="Annual Income"
                  resetClick={() => resetField("annualIncomeName")}
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
                  <Button variant="outlined" onClick={navigateToAnnualIncomeList}>
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
export default AnnualIncomeForm;
