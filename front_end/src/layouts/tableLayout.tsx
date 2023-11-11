import React, { FC, ReactNode, useEffect, useState } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import { DataGrid, GridColDef, GridOverlay } from "@mui/x-data-grid";
//import { uuid } from "uuidv4";
import withDataGridTable from "./dataGridTable";
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

const Table: FC<{
  columns: GridColDef[];
  rows: any[];
  actions?: Array<{
    type: string;
    onClick: Function;
    icon: ReactNode;
    hideAction?: Function;
  }>;
  hidePagination?: boolean;
  hasCheckbox?: boolean;
  primaryKey?: any;
  rowsPerPageOptions?: number[];
  pageSize?: number;
  heightAuto?: boolean;
  intialSortField?: string;
  sortType?: any;
  updatedColumns: GridColDef[];
  customNoRowsOverlayMsg?: any;
}> = ({
  columns,
  rows,
  hidePagination = false,
  actions = [],
  hasCheckbox = false,
  primaryKey,
  rowsPerPageOptions = [10, 25, 50, 100],
  pageSize = 10,
  heightAuto = true,
  intialSortField = "",
  sortType = "desc",
  updatedColumns,
  customNoRowsOverlayMsg,
}) => {
  const [updatedPageSize, setUpdatedPageSize] = useState<number>(pageSize);
  const theme = useTheme();
  const classes = useStyles();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isVerySmallScreen = useMediaQuery(theme.breakpoints.down(300));
  const customNoRowsOverlay = () => (
    <GridOverlay>{customNoRowsOverlayMsg || "No data available"}</GridOverlay>
  );

  useEffect(() => {
    setUpdatedPageSize(pageSize);
  }, [pageSize]);

  return (
    <div style={{ height: !heightAuto ? 300 : "" }}>
      <DataGrid
        className={classes.pagination}
        // componentsProps={{
        //   filterPanel: {
        //     slotProps: {
        //       TrapFocus: {
        //         disableRestoreFocus: true,
        //       },
        //     },
        //     ...(isSmallScreen
        //       ? {
        //           sx: { maxWidth: "80vw" },
        //           className: isVerySmallScreen
        //             ? "DataGridFilterPanelXS"
        //             : "DataGridFilterPanel",
        //         }
        //       : {}),
        //   },
        // }}
        slotProps={{
          filterPanel: {
            // slotProps: {
            //   TrapFocus: {
            //     disableRestoreFocus: true,
            //   },
            // },
            ...(isSmallScreen
              ? {
                  sx: { maxWidth: "80vw" },
                  className: isVerySmallScreen
                    ? "DataGridFilterPanelXS"
                    : "DataGridFilterPanel",
                }
              : {}),
          },
        }}
        rows={rows || []}
        columns={updatedColumns}
        pageSizeOptions={[15, 25, 50, 100]}
        //rowsPerPageOptions={rowsPerPageOptions}
        // onPageSizeChange={(newPageSize: any) => setUpdatedPageSize(newPageSize)}
        autoHeight={heightAuto}
        rowHeight={65}
        getRowId={(row) => row.seq || row.id || row[primaryKey]}
        checkboxSelection={hasCheckbox}
        hideFooterPagination={hidePagination}
        hideFooter={hidePagination}
        hideFooterSelectedRowCount
        disableColumnSelector
        slots={{
          noRowsOverlay: customNoRowsOverlay,
        }}
        initialState={{
          sorting: {
            sortModel: [
              {
                field: intialSortField,
                sort: sortType,
              },
            ],
          },
        }}
      />
    </div>
  );
};

const TableLayout = withDataGridTable(Table);

export default TableLayout;
