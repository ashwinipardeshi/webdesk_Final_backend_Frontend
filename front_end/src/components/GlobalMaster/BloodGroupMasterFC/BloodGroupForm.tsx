import React, { FC, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { Box, Paper, Button } from "@mui/material";
import { ADD, UPDATE } from "../../../constant/statusCodes";
import { useNavigate } from "react-router-dom";
import {
  actions,
  getSaveUpdateBloodGroupMaster,
  getbyIdBloodGroupMaster,
} from "../../../store/GlobalMaster/bloodGroupMaster";
import { useDispatch, useSelector } from "react-redux";
import MastersHeader from "../../../layouts/MastersHeader";
import { useParams } from "react-router-dom";
import { useMasterTableStyles } from "../../../assets/style/mastersTableStyle";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputController, CheckboxController } from "../../../control";

const bloodGroupSchema = yup.object({
  bloodGroupName: yup.string()
    .nullable()
    .required('Please enter blood group')
    .test('valid-blood-group', 'Invalid blood group', value => {
      if (!value) return true;
      return /^(A|a|b|B|ab|AB|o|O)[+-]$/.test(value);
    }),
  isActive: yup.boolean().default(false),
}).required();

const BloodGroupForm: FC = () => {
  const { control, setValue, getValues, resetField, handleSubmit } = useForm({
    resolver: yupResolver(bloodGroupSchema),
    defaultValues: {
      bloodGroupName: "",
      isActive: false,
    },
    mode: "onChange",
  });
  const getSaveDetails = useSelector(getSaveUpdateBloodGroupMaster);
  const getByIDBloodGroupData = useSelector(getbyIdBloodGroupMaster);
  const loaderStatus = useSelector(selectStatus);
  const navigate = useNavigate();
  const classes = useMasterTableStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const fetchGetbyIDBloodGroupData = async () => {
        try {
          dispatch(actions.loadGetByIdBloodGroupMaster(parseInt(id)));
        } catch (error: any) { }
      };
      fetchGetbyIDBloodGroupData();
    }
  }, [id, setValue]);

  useEffect(() => {
    if (id) {
      const setGetbyIDBloodGroupData = async () => {
        try {
          if (getByIDBloodGroupData) {
            setValue("bloodGroupName", getByIDBloodGroupData.name);
            setValue("isActive", getByIDBloodGroupData.isActive);
          }
        } catch (error: any) { }
      };
      setGetbyIDBloodGroupData();
    }
  }, [getByIDBloodGroupData]);

  const onSubmit = (data: any) => {
    id ? updateBloodGroup() : addBloodGroup();
  };

  const addBloodGroup = () => {
    try {
      const request = {
        id: 0,
        isActive: getValues("isActive"),
        name: getValues("bloodGroupName").toUpperCase(),
      };
      dispatch(
        actions.loadSaveUpdateBloodGroupMaster({ request, type: "ADD" })
      );
    } catch (error) { }
  };
  const updateBloodGroup = () => {
    try {
      const request = {
        id: id,
        isActive: getValues("isActive"),
        name: getValues("bloodGroupName").toUpperCase(),
      };
      dispatch(
        actions.loadSaveUpdateBloodGroupMaster({ request, type: "EDIT" })
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
          navigate("/blood-group");
        }
      };
      redirectToList();
    }
  }, [getSaveDetails]);

  const navigateToBloodGroupList = () => {
    dispatch(actions.setSaveUpdateBloodGroupMaster(null));
    navigate("/blood-group");
    setValue("bloodGroupName", "");
    setValue("isActive", false);
  };

  return (
    <>
      {loaderStatus === "loading" && <Loader />}
      <div>
        <MastersHeader
          title={id ? "Edit Blood Group" : "Add Blood Group"}
          BreadcrumbTitle={"Blood Group"}
          BreadcrumSubTitle={id ? "Edit Blood Group" : "Add Blood Group"}
        />
      </div>
      <Paper elevation={3} className={classes.PaperLayout}>
        <Box p={3} pt={0}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3} alignItems={"center"} my={3}>
              <Grid item sm={4}>
                <InputController
                  control={control}
                  name="bloodGroupName"
                  label="Blood Group"
                  resetClick={() => resetField("bloodGroupName")}
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
                  <Button variant="outlined" onClick={navigateToBloodGroupList}>
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

export default BloodGroupForm;
