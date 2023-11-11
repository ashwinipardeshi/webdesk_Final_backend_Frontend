import React, { useEffect } from "react";
import {  useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  getByIdHandicapTypeMaster,
  getSaveUpdateHandicapTypeMaster,
} from "../../../store/GlobalMaster/handicapType";
import { useNavigate, useParams } from "react-router-dom";
import { actions } from "../../../store/GlobalMaster/handicapType";
import { ADD, UPDATE } from "../../../constant/statusCodes";
import MastersHeader from "../../../layouts/MastersHeader";
import { Box, Button, Grid,  Paper } from "@mui/material";
import {  CheckboxController, InputController } from "../../../control";
import { useMasterTableStyles } from "../../../assets/style/mastersTableStyle";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const HandicapTypeForm = () => {

  const handicapSchema= yup.object({
    handicapType:yup.string().matches(/^[a-zA-Z ]*$/, "Enter only characters").required('Please enter Handicap Type'),
    isActive:yup.boolean().notRequired()
  })

  const { control, setValue, getValues, resetField,handleSubmit } = useForm({
    defaultValues: {
      handicapType: "",
      isActive: false,
    },
    mode:'onChange',
    resolver:yupResolver(handicapSchema)
  });
  const getSaveDetails = useSelector(getSaveUpdateHandicapTypeMaster);
  const getByIDhandicapTypeData = useSelector(getByIdHandicapTypeMaster);
  const navigate = useNavigate();
  const classes = useMasterTableStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const fetchGetbyIDhandicapTypeData = async () => {
        try {
          dispatch(actions.loadGetByIdHandicapType(parseInt(id)));
        } catch (error: any) {}
      };
      fetchGetbyIDhandicapTypeData();
    }
  }, [id, setValue]);

  useEffect(() => {
    if (id) {
      const setGetbyIDhandicapTypeData = async () => {
        try {
          if (getByIDhandicapTypeData) {
            setValue("handicapType", getByIDhandicapTypeData.name);
            setValue("isActive", getByIDhandicapTypeData.isActive);
          }
        } catch (error: any) {}
      };
      setGetbyIDhandicapTypeData();
    }
  }, [getByIDhandicapTypeData]);

  const onSubmit = (data:any) => {
    id ? updatehandicapType() : addhandicapType();
  };
  const addhandicapType = () => {
    try {
      const request = {
        id: 0,
        isActive: getValues("isActive"),
        name: getValues("handicapType").toUpperCase(),
      };
      dispatch(actions.loadSaveUpdateHandicapType({ request, type: "ADD" }));
    } catch (error) {}
  };
  const updatehandicapType = () => {
    try {
      const request = {
        id: id,
        isActive: getValues("isActive"),
        name: getValues("handicapType").toUpperCase(),
      };
      dispatch(actions.loadSaveUpdateHandicapType({ request, type: "EDIT" }));
    } catch (error) {}
  };

  useEffect(() => {
    if (getSaveDetails) {
      const redirectToList = async () => {
        if (
          (getSaveDetails && getSaveDetails.statusCode === ADD) ||
          getSaveDetails.statusCode === UPDATE
        ) {
          navigate("/handicap-type");
        }
      };
      redirectToList();
    }
  }, [getSaveDetails]);

  const navigateTohandicapTypeList = () => {
    dispatch(actions.setSaveUpdateHandicapType(null));
    navigate("/handicap-type");
    setValue("handicapType", "");
    setValue("isActive", false);
  };

  return (
    <>
      <div>
        {/* <!-- breadcrumb --> */}
        <MastersHeader
          title={id ? "Edit Handicap Type" : "Add Handicap Type"}
          BreadcrumbTitle={"Handicap Type"}
          BreadcrumSubTitle={id ? "Edit Handicap Type" : "Add Handicap Type"}
        />
        {/* <!-- /breadcrumb --> */}
      </div>
      <Paper elevation={3} className={classes.PaperLayout}>
        <Box p={2} pt={0}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container mt={0} spacing={2}>
              <Grid
                item
                container
                alignItems={"center"}
                justifyContent={"left"}
                my={0}
                xs={4}
              >
                <InputController control={control} name="handicapType" label="Handicap Type"  resetClick={()=>resetField('handicapType')} />
              </Grid>
              <Grid
                item
                container
                alignItems={"center"}
                justifyContent={"left"}
                my={0}
                xs={2}
              >
                <CheckboxController control={control} name='isActive' label="Active" />
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
                  onClick={navigateTohandicapTypeList}
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

export default HandicapTypeForm;
