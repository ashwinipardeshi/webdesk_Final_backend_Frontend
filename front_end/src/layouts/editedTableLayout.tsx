import React, { FC } from "react";
import Box from "@mui/material/Box";
import { GridRowsProp, DataGrid, GridColDef } from "@mui/x-data-grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: any) => ({
  pagination: {
    "& p": {
      marginBottom: 0,
    },
    "& .MuiDataGrid-columnHeader": {
      backgroundColor: "#f0f8ff",
    },
    "& .MuiDataGrid-columnHeaderTitleContainer": {
      fontWeight: 600,
    },
  },
}));

const EditedTableLayout: FC<{
  columns: GridColDef[];
  rows: GridRowsProp;
  rowModesModel: any;
  onRowModesModelChange: any;
  onRowEditStop: any;
  processRowUpdate: any;
  slots: any;
  slotProps: any;
  classname?: any;
  getRowId?: any;
  hideFooter?:boolean;
}> = ({
  getRowId,
  columns,
  rows,
  rowModesModel,
  onRowModesModelChange,
  onRowEditStop,
  processRowUpdate,
  slots,
  slotProps,
  classname,
  hideFooter
}) => {

  const classes = useStyles();
  return (
    <Box>
      <DataGrid
        className={classes.pagination}
        getRowId={getRowId}
        sx={classname}
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={onRowModesModelChange}
        onRowEditStop={onRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={slots}
        slotProps={slotProps}
        hideFooter={hideFooter}
      />
    </Box>
  );
};

export default EditedTableLayout;
