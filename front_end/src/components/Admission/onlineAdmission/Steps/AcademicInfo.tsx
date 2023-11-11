import * as React from "react";
import Button from "@mui/material/Button";
import {
  Box,
  Grid,
  IconButton,
} from "@mui/material";
import PreviousAcademicInfo from "./AcademicType/previousAcademicInfo";
import HscMarks from "./AcademicType/hscMarks";
import EntranceExamMarks from "./AcademicType/entranceExamMarks";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { getAllOnlineStudentData } from "../../../../store/Admission/onlineAdmission/onlineAdmission";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../../../store/Admission/onlineAdmission/onlineAdmission"
import { useNavigate } from "react-router-dom";

const AcademicInfo = (props: any) => {
  const onlineStudentData = useSelector(getAllOnlineStudentData);
  const [valid, setValid] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const OnClickSnackBar = () => {
    dispatch(actions.loadFakeSnackBar());
    setTimeout(()=>{
      navigate("/Dashboard")
    },3500)
  };

  React.useEffect(() => {
    onlineStudentData &&
    onlineStudentData.onlineEntranceExamDetailsVMList.length > 0 &&
    onlineStudentData.onlineHscmarkDetailsVMList.length > 0 &&
    onlineStudentData.onlinePreviousAcademicDetailsVMList.length > 0
      ? setValid(true)
      : setValid(false);
  }, [onlineStudentData]);
  return (
    <Box>
      <PreviousAcademicInfo />
      <HscMarks />
      <EntranceExamMarks />
      <Grid
        display={"flex"}
        gap={1}
        justifyContent={"flex-end"}
        paddingTop={"5vh"}
      >
        <Button
          variant="outlined"
          onClick={() => props.onChildClick(-1)}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          type="submit"
          disabled={!valid}
          onClick={() => OnClickSnackBar()}
        >
          Submit
        </Button>
      </Grid>
    </Box>
  );
};
export default AcademicInfo;
