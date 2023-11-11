import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";
import { useDispatch, useSelector } from "react-redux";
import { actions, getbyIdMenuMaster } from "../../../store/Master/menuMaster";
import { useNavigate, useParams } from "react-router-dom";
import MastersHeader from "../../../layouts/MastersHeader";
import { Box, Button, Grid, Paper } from "@mui/material";
import moment from "moment";
import { DATE_TIME_FORMAT } from "../../../utils/utils";
const useStyles = makeStyles((theme: any) => ({
  labelTitle: {
    fontSize: ".81568rem",
  },
}));
const ViewMenu = () => {
  const loaderStatus = useSelector(selectStatus);
  const getByIdMenuMaster = useSelector(getbyIdMenuMaster);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const { id } = useParams();
  useEffect(() => {
    if (id && parseInt(id) !== 0) {
      dispatch(actions.loadGetByIdMenuMaster(parseInt(id)));
    }
  }, [dispatch, id]);
  const navigateToMenuList = () => {
    navigate("/menu");
  };
  return (
    <>
      {loaderStatus === "loading" && <Loader />}
      <div>
        {/* <!-- breadcrumb --> */}
        <MastersHeader
          title={"Menu Details"}
          BreadcrumbTitle={"Menu"}
          BreadcrumSubTitle={"Menu Details"}
        />
        {/* <!-- /breadcrumb --> */}
      </div>
      <Paper elevation={3}>
        <Box p={2} pt={0}>
          <Grid container spacing={1} direction={"column"}>
            <Grid item container spacing={1}>
              <Grid
                item
                alignItems={"center"}
                justifyContent={"left"}
                xs={4}
                sm={2}
                md={2}
              >
                <b className={classes.labelTitle}>Name:</b>
              </Grid>
              <Grid
                item
                alignItems={"center"}
                justifyContent={"left"}
                xs={4}
                sm={4}
                md={2}
              >
                <span className={classes.labelTitle}>
                  {getByIdMenuMaster ? getByIdMenuMaster.name : ""}
                </span>
              </Grid>
            </Grid>

            <Grid item container spacing={1}>
              <Grid
                item
                alignItems={"center"}
                justifyContent={"left"}
                xs={4}
                sm={2}
                md={2}
              >
                <b className={classes.labelTitle}>ICON:</b>
              </Grid>
              <Grid
                item
                alignItems={"center"}
                justifyContent={"left"}
                xs={4}
                sm={4}
                md={2}
              >
                <span className={classes.labelTitle}>
                  {getByIdMenuMaster ? getByIdMenuMaster.icon : ""}
                </span>
              </Grid>
            </Grid>

            <Grid item container spacing={1}>
              <Grid
                item
                alignItems={"center"}
                justifyContent={"left"}
                xs={4}
                sm={2}
                md={2}
              >
                <b className={classes.labelTitle}>Module Master:</b>
              </Grid>
              <Grid
                item
                alignItems={"center"}
                justifyContent={"left"}
                xs={4}
                sm={4}
                md={2}
              >
                <span className={classes.labelTitle}>
                  {getByIdMenuMaster ? getByIdMenuMaster.moduleMasterId : ""}
                </span>
              </Grid>
            </Grid>

            <Grid item container spacing={1}>
              <Grid
                item
                alignItems={"center"}
                justifyContent={"left"}
                xs={4}
                sm={2}
                md={2}
              >
                <b className={classes.labelTitle}>Precedence:</b>
              </Grid>
              <Grid
                item
                alignItems={"center"}
                justifyContent={"left"}
                xs={4}
                sm={4}
                md={2}
              >
                <span className={classes.labelTitle}>
                  {getByIdMenuMaster ? getByIdMenuMaster.precedence : ""}
                </span>
              </Grid>
            </Grid>

            <Grid item container spacing={1}>
              <Grid
                item
                alignItems={"center"}
                justifyContent={"left"}
                xs={4}
                sm={2}
                md={2}
              >
                <b className={classes.labelTitle}>URL:</b>
              </Grid>
              <Grid
                item
                alignItems={"center"}
                justifyContent={"left"}
                xs={4}
                sm={4}
                md={2}
              >
                <span className={classes.labelTitle}>
                  {getByIdMenuMaster ? getByIdMenuMaster.url : ""}
                </span>
              </Grid>
            </Grid>

            <Grid item container spacing={1}>
              <Grid
                item
                alignItems={"center"}
                justifyContent={"left"}
                xs={4}
                sm={2}
                md={2}
              >
                <b className={classes.labelTitle}>Parent Id:</b>
              </Grid>
              <Grid
                item
                alignItems={"center"}
                justifyContent={"left"}
                xs={4}
                sm={4}
                md={2}
              >
                <span className={classes.labelTitle}>
                  {getByIdMenuMaster ? getByIdMenuMaster.parentId : ""}
                </span>
              </Grid>
            </Grid>

            <Grid item container spacing={1}>
              <Grid
                item
                alignItems={"center"}
                justifyContent={"left"}
                xs={4}
                sm={2}
                md={2}
              >
                <b className={classes.labelTitle}>Is Menu:</b>
              </Grid>
              <Grid
                item
                alignItems={"center"}
                justifyContent={"left"}
                xs={4}
                sm={4}
                md={2}
              >
                <span className={classes.labelTitle}>
                  {getByIdMenuMaster &&  getByIdMenuMaster.isMenu ? 'True' :"False"}
                </span>
              </Grid>
            </Grid>

            <Grid item container spacing={1}>
              <Grid
                item
                alignItems={"center"}
                justifyContent={"left"}
                xs={4}
                sm={2}
                md={2}
              >
                <b className={classes.labelTitle}>Active:</b>
              </Grid>
              <Grid
                item
                alignItems={"center"}
                justifyContent={"left"}
                xs={4}
                sm={4}
                md={2}
              >
                <span className={classes.labelTitle}>
                  {getByIdMenuMaster && getByIdMenuMaster.isActive
                    ? "Active"
                    : "InActive"}
                </span>
              </Grid>
            </Grid>

            <Grid item container spacing={1}>
              <Grid
                item
                alignItems={"center"}
                justifyContent={"left"}
                xs={4}
                sm={2}
                md={2}
              >
                <b className={classes.labelTitle}>Created By:</b>
              </Grid>
              <Grid
                item
                alignItems={"center"}
                justifyContent={"left"}
                xs={4}
                sm={4}
                md={1}
              >
                <span className={classes.labelTitle}>
                  {getByIdMenuMaster && getByIdMenuMaster.createdBy}
                </span>
              </Grid>
            </Grid>

            <Grid item container spacing={1}>
              <Grid
                item
                alignItems={"center"}
                justifyContent={"left"}
                xs={4}
                sm={2}
                md={2}
              >
                <b className={classes.labelTitle}>Created Date:</b>
              </Grid>
              <Grid
                item
                alignItems={"center"}
                justifyContent={"left"}
                xs={8}
                sm={4}
                md={4}
              >
                <span className={classes.labelTitle}>
                  {getByIdMenuMaster && getByIdMenuMaster.createdDate !== null
                    ? moment(new Date(getByIdMenuMaster.createdDate))
                        .utc(true)
                        .local()
                        .format(DATE_TIME_FORMAT)
                    : ""}
                </span>
              </Grid>
            </Grid>

            <Grid item container spacing={1}>
              <Grid
                item
                alignItems={"center"}
                justifyContent={"left"}
                xs={4}
                sm={2}
                md={2}
              >
                <b className={classes.labelTitle}>Update By:</b>
              </Grid>
              <Grid
                item
                alignItems={"center"}
                justifyContent={"left"}
                xs={4}
                sm={4}
                md={1}
              >
                <span className={classes.labelTitle}>
                  {getByIdMenuMaster && getByIdMenuMaster.updatedBy}
                </span>
              </Grid>
            </Grid>

            <Grid item container spacing={1}>
              <Grid
                item
                alignItems={"center"}
                justifyContent={"left"}
                xs={4}
                sm={2}
                md={2}
              >
                <b className={classes.labelTitle}>Updated Date:</b>
              </Grid>
              <Grid
                item
                alignItems={"center"}
                justifyContent={"left"}
                xs={8}
                sm={4}
                md={4}
              >
                <span className={classes.labelTitle}>
                  {getByIdMenuMaster && getByIdMenuMaster.updatedDate !== null
                    ? moment(new Date(getByIdMenuMaster.updatedDate))
                        .utc(true)
                        .local()
                        .format(DATE_TIME_FORMAT)
                    : ""}
                </span>
              </Grid>
            </Grid>
            <Grid item container spacing={1}>
            <Grid
              item
              container
              alignItems={"center"}
              justifyContent={"left"}
              my={0}
              xs={2}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={navigateToMenuList}
              >
                Back
              </Button>
            </Grid>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </>
  );
};

export default ViewMenu;
