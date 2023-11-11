import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import moment from "moment-timezone";
import { DATE_TIME_FORMAT } from "../../../utils/utils";
import { makeStyles } from "@material-ui/core/styles";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";
import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import { FC, useEffect } from "react";
import MastersHeader from "../../../layouts/MastersHeader";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import {
  getbyIdDocumentMaster,
  actions,
} from "../../../store/Master/documentMaster";
const useStyles = makeStyles((theme: any) => ({
  labelTitle: {
    fontSize: ".81568rem",
  },
}));
const ViewDocumentMaster = () => {
  const loaderStatus = useSelector(selectStatus);
  const getByIDDocumentData = useSelector(getbyIdDocumentMaster);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const { id } = useParams();
  useEffect(() => {
    if (id && parseInt(id) !== 0) {
      dispatch(actions.loadGetByIdDocumentMaster(parseInt(id)));
    }
  }, []);
  const navigateToDocumentList = () => {
    navigate("/document");
  };
  return (
    <>
      {loaderStatus === "loading" && <Loader />}
      <div>
        {/* <!-- breadcrumb --> */}
        <MastersHeader
          title={"Document Details"}
          BreadcrumbTitle={"Document"}
          BreadcrumSubTitle={"Document Details"}
        />
        {/* <!-- /breadcrumb --> */}
      </div>
      <Paper elevation={3}>
        <Box p={2} pt={0}>
          <Grid container mt={0} spacing={2}>
            <Grid item container spacing={2}>
              <Grid
                item
                container
                spacing={0.5}
                alignItems={"center"}
                justifyContent={"left"}
                my={0}
                xs={1}
              >
                <b className={classes.labelTitle}>Name:</b>
              </Grid>
              <Grid
                item
                container
                alignItems={"center"}
                justifyContent={"left"}
                my={0}
                xs={2}
              >
                <span className={classes.labelTitle}>
                  {getByIDDocumentData ? getByIDDocumentData.name : ""}
                </span>
              </Grid>
            </Grid>

            <Grid item container spacing={2}>
              <Grid
                item
                container
                spacing={0.5}
                alignItems={"center"}
                justifyContent={"left"}
                my={0}
                xs={1}
              >
                <b className={classes.labelTitle}>Active:</b>
              </Grid>
              <Grid
                item
                container
                alignItems={"center"}
                justifyContent={"left"}
                my={0}
                xs={2}
              >
                {" "}
                <span className={classes.labelTitle}>
                  {getByIDDocumentData && getByIDDocumentData.isActive
                    ? "Active"
                    : "InActive"}
                </span>
              </Grid>
            </Grid>

            <Grid item container spacing={2}>
              <Grid
                item
                container
                spacing={0.5}
                alignItems={"center"}
                justifyContent={"left"}
                my={0}
                xs={1}
              >
                <b className={classes.labelTitle}>Created By:</b>
              </Grid>
              <Grid
                item
                container
                alignItems={"center"}
                justifyContent={"left"}
                my={0}
                xs={2}
              >
                {" "}
                <span className={classes.labelTitle}>
                  {getByIDDocumentData && getByIDDocumentData.createdBy}
                </span>
              </Grid>
            </Grid>

            <Grid item container spacing={2}>
              <Grid
                item
                container
                spacing={0.5}
                alignItems={"center"}
                justifyContent={"left"}
                my={0}
                xs={1}
              >
                <b className={classes.labelTitle}>Created Date:</b>
              </Grid>
              <Grid
                item
                container
                alignItems={"center"}
                justifyContent={"left"}
                my={0}
                xs={2}
              >
                <span className={classes.labelTitle}>
                  {getByIDDocumentData &&
                  getByIDDocumentData.createdDate !== undefined &&
                  getByIDDocumentData.createdDate !== null
                    ? moment(new Date(getByIDDocumentData.createdDate))
                        .utc(true)
                        .local()
                        .format(DATE_TIME_FORMAT)
                    : ""}
                </span>
              </Grid>
            </Grid>

            <Grid item container spacing={2}>
              <Grid
                item
                container
                spacing={0.5}
                alignItems={"center"}
                justifyContent={"left"}
                my={0}
                xs={1}
              >
                <b className={classes.labelTitle}>Updated By:</b>
              </Grid>
              <Grid
                item
                container
                alignItems={"center"}
                justifyContent={"left"}
                my={0}
                xs={2}
              >
                <span className={classes.labelTitle}>
                  {getByIDDocumentData && getByIDDocumentData.updatedBy}
                </span>
              </Grid>
            </Grid>

            <Grid
              item
              container
              spacing={0.5}
              alignItems={"center"}
              justifyContent={"left"}
              my={0}
              xs={1}
            >
              <b className={classes.labelTitle}>Updated Date:</b>
            </Grid>
            <Grid
              item
              container
              alignItems={"center"}
              justifyContent={"left"}
              my={0}
              xs={2}
            >
              <span className={classes.labelTitle}>
                {getByIDDocumentData &&
                getByIDDocumentData &&
                getByIDDocumentData.updatedDate
                  ? moment(new Date(getByIDDocumentData.updatedDate))
                      .utc(true)
                      .local()
                      .format(DATE_TIME_FORMAT)
                  : ""}
              </span>
            </Grid>
            <Grid
              item
              container
              alignItems={"center"}
              justifyContent={"left"}
              my={0}
              xs={8}
            ></Grid>

            <Grid
              item
              container
              alignItems={"center"}
              justifyContent={"left"}
              my={0}
              xs={2}
            >
              {" "}
              <Button
                variant="contained"
                color="primary"
                onClick={navigateToDocumentList}
              >
                Back
              </Button>
            </Grid>
            <Grid
              item
              container
              alignItems={"center"}
              justifyContent={"left"}
              my={0}
              xs={10}
            ></Grid>
          </Grid>
        </Box>
      </Paper>
    </>
  );
};

export default ViewDocumentMaster;
