import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import { FC, useEffect } from "react";
import MastersHeader from "../../../layouts/MastersHeader";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import { actions,
         getbyIdSemesterMaster
 } from "../../../store/GlobalMaster/semesterMaster";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import moment from "moment-timezone";
import {  DATE_TIME_FORMAT } from "../../../utils/utils";
import { makeStyles } from "@material-ui/core/styles";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";
const useStyles = makeStyles((theme: any) => ({
    labelTitle: {
      fontSize: ".81568rem",
    },
  }));

  const ViewSemester: FC = () => {
    const loaderStatus = useSelector(selectStatus);
    const getByIDSemesterData = useSelector(getbyIdSemesterMaster);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();
    const { id } = useParams();
    useEffect(() => {
        if (id !== null && id !== undefined && parseInt(id) !== 0) {
          dispatch(actions.loadGetByIdSemesterMaster(parseInt(id)));
        }
      }, []);
      const navigateToRSemesterList = () => {
        navigate("/semester");
      };
      return (
        <>
          {loaderStatus === "loading" && <Loader />}
          <div>
            {/* <!-- breadcrumb --> */}
            <MastersHeader
              title={"Semester Details"}
              BreadcrumbTitle={"Semester"}
              BreadcrumSubTitle={"Semester Details"}
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
                    {getByIDSemesterData ? getByIDSemesterData.name : ""}
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
                    {getByIDSemesterData && getByIDSemesterData.isActive
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
                    {getByIDSemesterData && getByIDSemesterData.createdBy}
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
                    {getByIDSemesterData &&
                    getByIDSemesterData.createdDate !== undefined &&
                    getByIDSemesterData.createdDate !== null
                      ? moment(new Date(getByIDSemesterData.createdDate))
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
                    {getByIDSemesterData && getByIDSemesterData.updatedBy}
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
                    {getByIDSemesterData &&
                    getByIDSemesterData &&
                    getByIDSemesterData.updatedDate
                      ? moment(new Date(getByIDSemesterData.updatedDate))
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
                    onClick={navigateToRSemesterList}
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
  export default ViewSemester;