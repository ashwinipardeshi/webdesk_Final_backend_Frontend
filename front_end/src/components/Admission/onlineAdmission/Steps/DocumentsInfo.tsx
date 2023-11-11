import { Box, Button, Grid, IconButton } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const DocumentsInfo = (props: any) => {
  return (
    <>
      <p>Documents Info</p>
      <form>
        <div
          style={{
            margin: "auto",
            width: "24%",
            padding: "10px",
            fontSize: "larger",
            fontWeight: "bolder",
          }}
        >
          Coming Soon!!!!
        </div>
        <Grid
          display={"flex"}
          gap={1}
          justifyContent={"flex-end"}
          paddingTop={"5vh"}
        >
          <IconButton
            aria-label="Left Arrow"
            onClick={() => props.onChildClick(-1)}
          >
            <KeyboardArrowLeftIcon />
          </IconButton>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Grid>
      </form>
    </>
  );
};

export default DocumentsInfo;
