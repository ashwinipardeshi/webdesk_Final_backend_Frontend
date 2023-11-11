import { makeStyles } from "@material-ui/core";
export const useMasterTableStyles = makeStyles((theme) => ({
  tableBox: {
    width: "100%",
  },
  tableCol: {
    ".MuiDataGrid-columnHeaders": {
      backgroundColor: "black",
    },
  },
  PaperLayout: {
    minHeight: "17rem",
  },
  buttonLayout: {
    backgroundColor: "#197cd2",
    color: "#fff",
    display: "inline-flex",
    justifyContent: "center",
    position: "relative",
    boxSizing: "border-box",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    fontWeight: 500,
    fontSize: "0.875rem",
    lineHeight: 1.75,
    letterSpacing: "0.02857em",
    minWidth: "64px",
    padding: "6px 16px",
    borderRadius: "4px",
  },
}));
