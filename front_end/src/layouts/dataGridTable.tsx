/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactNode, useMemo, useState } from "react";
import { Box, IconButton, Grid } from "@mui/material";
import { getGridStringOperators, GridColDef } from "@mui/x-data-grid";
import DeleteConfirmation from "./deleteConfirmation";
import {
  conditionalSelection,
  conditionalValue,
  isFunctionExist,
} from "../utils/utils";

interface Actions {
  type: string;
  onClick: Function;
  icon: ReactNode;
  hideAction?: Function;
  hideActionWithSpace?: Function;
  disabled?: boolean;
}
interface Table {
  rowsPerPageOptions?: number[];
  pageSize?: number;
  heightAuto?: boolean;
  columns: GridColDef[];
  rows?: any[];
  actions?: Array<Actions>;
  hidePagination?: boolean;
  hasCheckbox?: boolean;
  primaryKey?: any;
  filterChange?: Function;
  handleSortChange?: Function;
  totalRows?: number;
  pageChangeEvent?: Function;
  rowsPageOption?: Array<any>;
  pageRecords?: number;
  pageSizeChangeEvent?: Function;
  intialSortField?: string;
  sortType?: any;
  onSelectionChange?: any;
  selectionModel?: any;
  pageType?: string;
  onRowClick?: any;
  getRowClassName?: any;
  isRowSelectable?: any;
  customNoRowsOverlayMsg?: any;
}

interface ActionsButtonProps {
  actions?: Array<Actions>;
  toggleDeleteDialog: Function;
  params: any;
}

const ActionsButton = ({
  actions,
  toggleDeleteDialog,
  params,
}: ActionsButtonProps) =>
  actions && actions.length > 0 ? (
    <Grid
      container
      alignContent="center"
      justifyContent="center"
      display="flex"
      flexWrap="nowrap"
      width="100%"
    >
      {actions.map(
        ({
          type,
          icon,
          onClick,
          hideAction,
          hideActionWithSpace,
          disabled = false,
        }) => {
          if (isFunctionExist(hideAction, params.row)) {
            return null;
          }
          if (isFunctionExist(hideActionWithSpace, params.row)) {
            return (
              <Grid
                item
                width="100%"
                display="flex"
                justifyContent="center"
                flexWrap="nowrap"
                key={type}
              >
                <Box width="43.4px" />
              </Grid>
            );
          }
          if (type === "delete") {
            return (
              <Grid
                item
                width="100%"
                display="flex"
                justifyContent="center"
                flexWrap="nowrap"
                key={type}
              >
                <IconButton
                  disabled={disabled}
                  key={type}
                  onClick={(event: any) => {
                    event.ignore = true;
                    toggleDeleteDialog(params.row);
                  }}
                >
                  {icon}
                </IconButton>
              </Grid>
            );
          }
          return (
            <Grid
              item
              width="100%"
              display="flex"
              justifyContent="center"
              flexWrap="nowrap"
              key={type}
            >
              <IconButton
                disabled={disabled}
                key={type}
                onClick={(event: any) => {
                  event.ignore = true;
                  onClick(params.row, event);
                }}
              >
                {icon}
              </IconButton>
            </Grid>
          );
        }
      )}
    </Grid>
  ) : null;

const withDataGridTable = <T extends Table>(
  Component: React.ComponentType<T>
) => {
  const TableHoc = (props: Table) => {
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [rowParam, setRowParam] = useState({});
    const { columns, actions = [] } = props;
    const toggleDeleteDialog = (rowData?: any) => {
      if (rowData) {
        setRowParam(rowData);
      } else {
        setRowParam({});
      }
      setOpenDialog(!openDialog);
    };
    const columnsWithActions: GridColDef[] = [
      ...columns,
      {
        disableColumnMenu: true,
        field: "action",
        headerName: "Action",
        headerAlign: "center",
        sortable: false,
        align: conditionalSelection(actions?.length > 1, "right", "center"),
        filterable: false,
        width: conditionalSelection(actions?.length > 2, 150, 100),
        renderCell: (params: any) => (
          <ActionsButton
            actions={actions}
            toggleDeleteDialog={toggleDeleteDialog}
            params={params}
          />
        ),
      },
    ];
    if (conditionalValue(actions === undefined, actions?.length === 0)) {
      columnsWithActions.pop();
    }
    const updatedColumns = useMemo(
      () =>
        columnsWithActions.map((col) => ({
          ...col,
          ...(col?.filterOperators
            ? {}
            : {
                filterOperators: getGridStringOperators().filter(
                  (operator) => operator.value === "contains"
                ),
              }),
        })),
      [columnsWithActions]
    );
    return (
      <>
        <Component {...(props as T)} updatedColumns={updatedColumns} />
        <DeleteConfirmation
          openDialog={openDialog}
          closeToggleDeleteDialog={toggleDeleteDialog}
          actionToggleDeleteDialog={toggleDeleteDialog}
          rowParam={rowParam}
          actions={actions}
        />
      </>
    );
  };
  return TableHoc;
};
export default withDataGridTable;
