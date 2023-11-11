import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import { FC, useEffect } from "react";
import MastersHeader from "../../../layouts/MastersHeader";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import { 
    actions,
    getbyIdAcademicStatusMaster,
 } from "../../../store/Master/academicStatusMaster";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import moment from "moment-timezone";
import { DATE_TIME_FORMAT } from "../../../utils/utils";
import { DATE_FORMAT } from "../../../utils/utils";
import { makeStyles } from "@material-ui/core/styles";
import { selectStatus } from "../../../store/loader";
import Loader from "../../../shade/Loaders/Loaders";
const useStyles = makeStyles((theme: any) => ({
    labelTitle: {
        fontSize: ".81568rem",
    },
}));
const ViewAcademicStatus: FC = () => {
    const loaderStatus = useSelector(selectStatus);
    const getByIDAcademicStatusData = useSelector(getbyIdAcademicStatusMaster);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();
    const { id } = useParams();
    useEffect(() => {
        if (id && parseInt(id) !== 0) {
            dispatch(actions.loadGetByIdAcademicStatusMaster(parseInt(id)));
        }
    }, []);
    const navigateToAcademicStatusList = () => {
        navigate("/academic-status");
    };
    return (
        <>
            {loaderStatus === "loading" && <Loader />}
            <div>
                {/* <!-- breadcrumb --> */}
                <MastersHeader
                    title={"Academic Status Details"}
                    BreadcrumbTitle={"Academic Status"}
                    BreadcrumSubTitle={"Academic Status Details"}
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
                                {getByIDAcademicStatusData ? getByIDAcademicStatusData.name : ""}
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
                                {getByIDAcademicStatusData && getByIDAcademicStatusData.isActive
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
                                {getByIDAcademicStatusData && getByIDAcademicStatusData.createdBy}
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
                                {getByIDAcademicStatusData &&
                                    getByIDAcademicStatusData.createdDate !== undefined &&
                                    getByIDAcademicStatusData.createdDate !== null
                                    ? moment(new Date(getByIDAcademicStatusData.createdDate))
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
                                {getByIDAcademicStatusData && getByIDAcademicStatusData.updatedBy}
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
                                {getByIDAcademicStatusData &&
                                    getByIDAcademicStatusData &&
                                    getByIDAcademicStatusData.updatedDate
                                    ? moment(new Date(getByIDAcademicStatusData.updatedDate))
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
                                onClick={navigateToAcademicStatusList}
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

export default ViewAcademicStatus;