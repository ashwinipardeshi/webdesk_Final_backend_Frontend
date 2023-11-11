import { Grid, Box, Button } from "@mui/material";
import PreviousAcademicDetails from "./AcademicType/previousAcademicDetails";
import EntranceExamDetails from "./AcademicType/entranceExamDetails";
import HscMarksDetails from "./AcademicType/hscMarksDetails";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actions } from "../../../../store/Admission/offlineAdmission/offlineAdmission";


const AcademicInformation = (props:any) =>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
  const Onclick =()=> {
    dispatch(actions.loadFakeSnackBar())
  }
    return(
        <Box p={2}>
            <PreviousAcademicDetails/>
            <HscMarksDetails/>
            <EntranceExamDetails/>
            <Grid display={"flex"} justifyContent={"flex-end"} paddingTop={"5vh"} gap={1}>
                <Button variant="outlined" onClick={() => navigate("/dashboard")}>Cancel</Button>
                <Button variant="contained" onClick={()=>Onclick()}>Save</Button>
            </Grid>
        </Box>
    )
}

export default AcademicInformation;