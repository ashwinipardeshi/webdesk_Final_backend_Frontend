import { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Box,
  Step,
  Stepper,
  StepLabel,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { FormProvider, useForm } from "react-hook-form";
import StudentInfo from "./Steps/StudentInfo";
import BankInfo from "./Steps/BankInfo";
import ParentInfo from "./Steps/ParentInfo";
import CommunicationInfo from "./Steps/CommunicationInfo";
import AcademicInfo from "./Steps/AcademicInfo";
import DocumentsInfo from "./Steps/DocumentsInfo";
import { useDispatch } from "react-redux";
import { actions } from "../../../store/Admission/onlineAdmission/onlineAdmission";
import Loader from "../../../shade/Loaders/Loaders";
const useStyles = makeStyles((theme: any) => ({
  paperBox: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    padding: ".5rem",
    marginBottom: "1rem",
    marginTop: "1rem",
  },
  stepperBox: {
    display: "flex",
    gap: 2,
    marginBottom: "1rem",
  },
}));

const steps = [
  "Student Info",
  "Bank Info",
  "Parent Info",
  "Communication Info",
  "Academic Info",
  // "Documents Upload",
];

function OnlineForm() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const handleChildClick = (step: number) => {
    setActiveStep(activeStep + step);
  };
  const [loaderStatus, setLoaderStatus] = useState("loading");

  const methods = useForm({
    shouldUnregister: false,
    mode: "onChange",
  });

  useEffect(() => {
    const fetchOnlineStudentData = async () => {
      try {
        dispatch(actions.loadSaveOnlineStudentData());
        setLoaderStatus("idle");
      } catch (error: any) {}
    };
    fetchOnlineStudentData();
  }, [dispatch]);

  const { reset } = methods;

  const handleReset = () => {
    setActiveStep(0);
    reset();
  };

  const getStepContent = () => {
    switch (activeStep) {
      case 0:
        return <StudentInfo onChildClick={handleChildClick} />;
      case 1:
        return <BankInfo onChildClick={handleChildClick} />;
      case 2:
        return <ParentInfo onChildClick={handleChildClick} />;
      case 3:
        return <CommunicationInfo onChildClick={handleChildClick} />;
      case 4:
        return <AcademicInfo onChildClick={handleChildClick} />;
      // case 5:
      //   return <DocumentsInfo onChildClick={handleChildClick} />;
      default:
        return null;
    }
  };

  return (
    <>
      {loaderStatus === "loading" && <Loader />}
      <Paper elevation={1} className={classes.paperBox}>
        <>
          <Grid p={1}>
            <Box>
              <Stepper activeStep={activeStep} className={classes.stepperBox}>
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
            </Box>

            <Box sx={{ minHeight: "50%" }}>
              {activeStep === steps.length ? (
                <>
                  <p>Form Submitted...</p>
                  <Button onClick={handleReset} variant="outlined">
                    Reset
                  </Button>
                </>
              ) : (
                <>
                  <FormProvider {...methods}>{getStepContent()}</FormProvider>
                </>
              )}
            </Box>
          </Grid>
        </>
      </Paper>
    </>
  );
}

export default OnlineForm;
