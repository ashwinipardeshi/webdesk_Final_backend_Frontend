import { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Box,
  Step,
  Stepper,
  StepLabel,
  Button,
  Tab,
  Tabs,
  tabsClasses,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { FormProvider, useForm } from "react-hook-form";
import ProgramInformation from "./Tabs/ProgramInformation";
import StudentInformation from "./Tabs/StudentInfromation";
import ParentInfromation from "./Tabs/ParentInformation";
import { actions } from "../../../store/Admission/offlineAdmission/offlineAdmission";
import { useDispatch } from "react-redux";
import BankInformation from "./Tabs/BankInformation";
import CommunicationInformation from "./Tabs/CommunicationInformation";
import InsuranceInfromation from "./Tabs/InsuranceInfromation";
import VehicleInfromation from "./Tabs/VehicleInformation";
import AcademicInformation from "./Tabs/AcademicInformation";

const useStyles = makeStyles((theme: any) => ({
  paperBox: {
    display: "flex",
    flexDirection: "column",
    // gap: "20px",
    padding: ".5rem",
    marginBottom: "1rem",
    marginTop: "1rem",
  },
  stepperBox: {
    display: "flex",
    flexWrap: "wrap",
    gap: 2,
    marginBottom: "1rem",
  },
}));

const tabs = [
  "Program Information",
  "Student Information",
  "Parent Information",
  "Communication Information",
  "Academic Information",
  "Bank Information",
  "Insurance Details",
  "Vehicle Information",
];

const StudentProfile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOnlineStudentData = async () => {
      try {
        dispatch(actions.loadAllOfflineStudentData());
      } catch (error: any) {}
    };
    fetchOnlineStudentData();
  }, [dispatch]);

  const classes = useStyles();
  const [activeTab, setActiveTab] = useState(0);

  const nextTab = (step: number) => {
    setActiveTab((prev) => prev + step);
  };
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const getContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <>
            <ProgramInformation />
          </>
        );
      case 1:
        return (
          <>
            <StudentInformation />
          </>
        );
      case 2:
        return (
          <>
            <ParentInfromation />
          </>
        );
      case 3:
        return (
          <>
            <CommunicationInformation />
          </>
        );
      case 4:
        return (
          <>
            <AcademicInformation />
          </>
        );
      case 5:
        return (
          <>
            <BankInformation />
          </>
        );
      case 6:
        // return <>{tabs[6]}</>;
        return (
          <>
            <InsuranceInfromation />
          </>
        );
      case 7:
        return (
          <>
            <VehicleInfromation />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Paper elevation={1} className={classes.paperBox}>
        <>
          <Grid p={1}>
            <Tabs
              className="border border-1 m-2 "
              value={activeTab}
              onChange={handleChange}
              sx={{
                [`& .${tabsClasses.scrollButtons}`]: {
                  "&.Mui-disabled": { opacity: 0.4 },
                },
              }}
              variant="scrollable"
            >
              {tabs.map((label, index) => {
                return <Tab key={index} label={label} />;
              })}
            </Tabs>
          </Grid>
          <Grid>{getContent()}</Grid>
        </>
      </Paper>
    </>
  );
};

export default StudentProfile;
