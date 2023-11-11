import { makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getbyIdCasteCategoryMaster } from '../../../store/GlobalMaster/casteCategoryMaster';
import { useNavigate, useParams } from 'react-router';
import { actions } from '../../../store/GlobalMaster/casteCategoryMaster';
import MastersHeader from '../../../layouts/MastersHeader';
import { Box, Button, Grid, Paper } from '@mui/material';
import moment from 'moment';
import { DATE_TIME_FORMAT } from '../../../utils/utils';
const useStyles = makeStyles((theme: any) => ({
  labelTitle: {
    fontSize: ".81568rem",
  },
}));
const ViewCasteCategory = () => {
  const getByIDCasteCategoryData = useSelector(getbyIdCasteCategoryMaster);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const { id } = useParams();
  useEffect(() => {
    if (id && parseInt(id) !== 0) {
      dispatch(actions.loadGetByIdCasteCategoryMaster(parseInt(id)));
    }
  }, []);
  const navigateToRCastCategoryList = () => {
    navigate("/caste-category");
  };
  return (
    <>
    <div>
      {/* <!-- breadcrumb --> */}
      <MastersHeader
        title={"Caste Category Details"}
        BreadcrumbTitle={"Caste Category"}
        BreadcrumSubTitle={"Caste Category Details"}
      />
      {/* <!-- /breadcrumb --> */}
    </div>
    <Paper elevation={3}>
      <Box p={2} pt={0}>
        <Grid container mt={0} spacing={2}>
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
              {getByIDCasteCategoryData ? getByIDCasteCategoryData.name : ""}
            </span>
          </Grid>
          <Grid
            item
            container
            alignItems={"center"}
            justifyContent={"left"}
            my={0}
            xs={9}
          ></Grid>

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
              {getByIDCasteCategoryData && getByIDCasteCategoryData.isActive
                ? "Active"
                : "InActive"}
            </span>
          </Grid>
          <Grid
            item
            container
            alignItems={"center"}
            justifyContent={"left"}
            my={0}
            xs={9}
          ></Grid>

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
              {getByIDCasteCategoryData && getByIDCasteCategoryData.createdBy}
            </span>
          </Grid>
          <Grid
            item
            container
            alignItems={"center"}
            justifyContent={"left"}
            my={0}
            xs={9}
          ></Grid>

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
              {getByIDCasteCategoryData &&
                getByIDCasteCategoryData.createdDate !== undefined &&
                getByIDCasteCategoryData.createdDate !== null
                ? moment(new Date(getByIDCasteCategoryData.createdDate))
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
            xs={9}
          ></Grid>

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
              {getByIDCasteCategoryData && getByIDCasteCategoryData.updatedBy}
            </span>
          </Grid>
          <Grid
            item
            container
            alignItems={"center"}
            justifyContent={"left"}
            my={0}
            xs={9}
          ></Grid>

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
              {getByIDCasteCategoryData &&
                getByIDCasteCategoryData.updatedDate
                ? moment(new Date(getByIDCasteCategoryData.updatedDate))
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
              onClick={navigateToRCastCategoryList}
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
  )
}

export default ViewCasteCategory