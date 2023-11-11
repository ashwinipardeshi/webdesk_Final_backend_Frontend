import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  getSaveUpdateDocumentMaster,
  getbyIdDocumentMaster,
} from "../../../store/Master/documentMaster";
import MastersHeader from "../../../layouts/MastersHeader";
import { CheckboxController, InputController } from "../../../control";
import { useNavigate, useParams } from "react-router-dom";
import { useMasterTableStyles } from "../../../assets/style/mastersTableStyle";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";
import { actions } from "../../../store/Master/documentMaster";
import { ADD, UPDATE } from "../../../constant/statusCodes";
import { Box, Button, Grid, Paper } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const DocumentMasterForm = () => {

  const documentSchema = yup.object({
    document: yup.string().matches(/^[a-zA-Z ]*$/, "Enter only characters").required('Please enter document name'),
    isActive: yup.boolean().notRequired()
  }).required()

  const { control, setValue, getValues, resetField, handleSubmit } = useForm({
    defaultValues: {
      document: "",
      isActive: false,
    },
    resolver: yupResolver(documentSchema),
    mode: "onChange"
  });
  const getSaveDetails = useSelector(getSaveUpdateDocumentMaster);
  const getByIDDocumentData = useSelector(getbyIdDocumentMaster);
  const loaderStatus = useSelector(selectStatus);
  const navigate = useNavigate();
  const classes = useMasterTableStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const fetchGetbyIDDocumentData = async () => {
        try {
          dispatch(actions.loadGetByIdDocumentMaster(parseInt(id)));
        } catch (error: any) { }
      };
      fetchGetbyIDDocumentData();
    }
  }, [id, setValue]);

  useEffect(() => {
    if (id) {
      const setGetbyIDDocumentData = async () => {
        try {
          if (getByIDDocumentData) {
            setValue("document", getByIDDocumentData.name);
            setValue("isActive", getByIDDocumentData.isActive);
          }
        } catch (error: any) { }
      };
      setGetbyIDDocumentData();
    }
  }, [getByIDDocumentData]);

  const onSubmit = (data: any) => {
    id ? updateDocument() : addDocument();
  };
  const addDocument = () => {
    try {
      const request = {
        id: 0,
        isActive: getValues("isActive"),
        name: getValues("document").toUpperCase(),
      };
      dispatch(actions.loadSaveUpdateDocumentMaster({ request, type: "ADD" }));
    } catch (error) { }
  };
  const updateDocument = () => {
    try {
      const request = {
        id: id,
        isActive: getValues("isActive"),
        name: getValues("document").toUpperCase(),
      };
      dispatch(actions.loadSaveUpdateDocumentMaster({ request, type: "EDIT" }));
    } catch (error) { }
  };

  useEffect(() => {
    if (getSaveDetails) {
      const redirectToList = async () => {
        if (
          (getSaveDetails && getSaveDetails.statusCode === ADD) ||
          getSaveDetails.statusCode === UPDATE
        ) {
          navigate("/document");
        }
      };
      redirectToList();
    }
  }, [getSaveDetails]);

  const navigateToDocumentList = () => {
    dispatch(actions.setSaveUpdateDocumentMaster(null));
    navigate("/document");
    setValue("document", "");
    setValue("isActive", false);
  };

  return (
    <>
      {loaderStatus === "loading" && <Loader />}
      <div>
        <MastersHeader
          title={id ? "Edit Document" : "Add Document"}
          BreadcrumbTitle={"Document"}
          BreadcrumSubTitle={id ? "Edit Document" : "Add Document"}
        />
        {/* <!-- /breadcrumb --> */}
      </div>
      <Paper elevation={3} className={classes.PaperLayout}>
        <Box p={2} pt={0}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container mt={0} spacing={2}>
              <Grid item container spacing={2}>
                <Grid
                  item
                  container
                  alignItems={"center"}
                  justifyContent={"left"}
                  my={0}
                  xs={4}
                >
                  <InputController control={control} name="document" label="Document" resetClick={() => resetField('document')} />
                </Grid>
                <Grid
                  item
                  container
                  alignItems={"center"}
                  justifyContent={"left"}
                  my={0}
                  xs={2}
                >
                  <CheckboxController control={control} name="isActive" label='Active' />
                </Grid>
              </Grid>

              <Grid item container spacing={1}>
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
                    onClick={navigateToDocumentList}
                  >
                    Back
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Paper>
    </>
  );
};

export default DocumentMasterForm;
