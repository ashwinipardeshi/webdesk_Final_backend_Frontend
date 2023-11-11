import React, { FC, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridOverlay,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import { monthOptions, previousDocumentsOptions, yearOptions } from "../../../../../utils/utils";
import { Typography, Tooltip } from "@mui/material";
import EditedTableLayout from "../../../../../layouts/editedTableLayout";
import { useDispatch, useSelector } from "react-redux";
import { actions, getAllOfflineStudentData } from "../../../../../store/Admission/offlineAdmission/offlineAdmission";

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
  setActionType: any;
  setAddedDoc: any;
  onlineStudentData: any;
}

const customNoRowsOverlay = () => (
  <GridOverlay>{"No data available"}</GridOverlay>
);

function EditToolbar(props: EditToolbarProps) {
  const {
    setRows,
    setRowModesModel,
    setActionType,
    // offlineStudentData,
  } = props;

  const handleClick = () => {
    setActionType("ADD");
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      {
        id,
        academicClass: "",
        boardUniversity: "",
        schoolCollege: "",
        month: "",
        year: "",
        seatNo: "",
        marksObtained: "",
        outOf: "",
        // percentage: "",
        isNew: true,
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "academicClass" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

const PreviousAcademicDetails: FC = () => {
  const dispatch = useDispatch();
  const offlineStudentData: any = useSelector(getAllOfflineStudentData);
  const [rows, setRows] = React.useState(offlineStudentData.offlinePreviousAcademicDetailsVMList);
  const [entranceExamMarks, setEntranceExamDetails] = React.useState(offlineStudentData.offlineEntranceExamDetailsVMList);
  const [hscMarkDetails, setHscMarkDetails] = React.useState(offlineStudentData.offlineHscmarkDetailVMList);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const [actionType, setActionType] = React.useState("");

  const [addedDoc, setAddedDoc] = React.useState(previousDocumentsOptions);

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  useEffect(() => {
    if (offlineStudentData) {
      const fetchStudentData = async () => {
        try {
          setRows(offlineStudentData.offlinePreviousAcademicDetailsVMList);
          setEntranceExamDetails(offlineStudentData.offlineEntranceExamDetailsVMList);
          setHscMarkDetails(offlineStudentData.offlineHscmarkDetailVMList);
        } catch (error: any) { }
      };
      fetchStudentData();
    }
  }, [offlineStudentData]);

  const handleEditClick = (id: GridRowId) => () => {
    setActionType("EDIT");
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row: any) => row.id !== id));
    updateAfterDelete(id);
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row: any) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row: any) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    let finaldata = [];
    try {
      if (actionType === "EDIT") {
        finaldata = offlineStudentData.offlinePreviousAcademicDetailsVMList.map(
          (obj: any) => {
            if (obj.id === newRow.id) {
              return {
                ...obj,
                isActive: true,
                createdBy: 0,
                createdDate: new Date(),
                updatedBy: 0,
                updatedDate: new Date(),
                academicClass: newRow.academicClass,
                schoolCollege: newRow.schoolCollege,
                boardUniversity: newRow.boardUniversity,
                month: newRow.month,
                year: newRow.year,
                seatNo: newRow.seatNo,
                marksObtained: newRow.marksObtained,
                outOf: newRow.outOf,
                percentage: ((newRow.marksObtained / newRow.outOf) * 100).toFixed(2),
              };
            }
            return obj;
          }
        );
      } else {
        finaldata = [
          {
            id: 0,
            userId: offlineStudentData.userId,
            studentAdmissionId: offlineStudentData.id,
            isActive: true,
            createdBy: 0,
            createdDate: new Date(),
            updatedBy: 0,
            updatedDate: new Date(),
            academicClass: newRow.academicClass,
            schoolCollege: newRow.schoolCollege,
            boardUniversity: newRow.boardUniversity,
            month: newRow.month,
            year: newRow.year,
            seatNo: newRow.seatNo,
            marksObtained: newRow.marksObtained,
            outOf: newRow.outOf,
            percentage: ((newRow.marksObtained / newRow.outOf) * 100).toFixed(2),
          },
          ...offlineStudentData.offlinePreviousAcademicDetailsVMList,
        ];
      }
      const request = {
        userId: offlineStudentData.userId,
        studentAdmissionId: offlineStudentData.id,
        offlinePreviousAcademicDetailsVMList: finaldata,
        offlineHscmarkDetailsVMList: hscMarkDetails,
        offlineEntranceExamDetailsVMList: entranceExamMarks,
      };
      dispatch(actions.loadSaveUpdateAcademicInfoOfflineAdmission(request));
      setRows(rows.map((row: any) => (row.id === newRow.id ? updatedRow : row)));
      return updatedRow;
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const updateAfterDelete = (id: any) => {
    let finaldata = rows;
    try {
      finaldata = rows.filter((row: any) => row.id !== id).map(
        (rows: any) => { return rows }
      )
      const request = {
        userId: offlineStudentData.userId,
        studentAdmissionId: offlineStudentData.id,
        offlinePreviousAcademicDetailsVMList: finaldata,
        offlineHscmarkDetailsVMList: hscMarkDetails,
        offlineEntranceExamDetailsVMList: entranceExamMarks,
      };
      dispatch(actions.loadSaveUpdateAcademicInfoOfflineAdmission(request));
    } catch (error) {
      console.log(error);
    }
  }

  const columns: GridColDef[] = [
    {
      field: "academicClass",
      headerName: "Class",
      editable: true,
      flex: 1,
      type: "singleSelect",
      valueOptions: addedDoc,
    },
    {
      field: "boardUniversity",
      headerName: "Board / University",
      flex: 1,
      editable: true,
    },
    {
      field: "schoolCollege",
      headerName: "School / College",
      flex: 1,
      editable: true,
    },
    {
      field: "month",
      headerName: "Month",
      flex: 1,
      editable: true,
      type: "singleSelect",
      valueOptions: monthOptions,
    },
    {
      field: "year",
      headerName: "Year",
      flex: 1,
      editable: true,
      type: "singleSelect",
      valueOptions: yearOptions,
    },
    {
      field: "seatNo",
      headerName: "Seat No",
      flex: 1,
      editable: true,
    },
    {
      field: "marksObtained",
      headerName: "Marks obtained",
      flex: 1,
      type: "number",
      editable: true,
      align: "left"
    },
    {
      field: "outOf",
      headerName: "Out of",
      flex: 1,
      type: "number",
      editable: true,
      align: "left",
    },
    {
      field: "percentage",
      headerName: "Percentage",
      flex: 1,
      align: "left",
      disableColumnMenu: true,
      type: "number",
      valueSetter: (params) => {
        return `${(params.row.marksObtained / params.row.outOf) * 100}`
      },
      valueFormatter: (params: GridValueFormatterParams<number>) => {
        if (params.value == null || isNaN(params.value)) {
          return '';
        }
        return `${Number(params.value).toFixed(2)} %`;
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      flex: 1,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <Tooltip title="Save">
              <GridActionsCellItem
                icon={<SaveIcon />}
                label="Save"
                sx={{
                  color: "primary.main",
                }}
                onClick={handleSaveClick(id)}
              />
            </Tooltip>,
            <Tooltip title="Cancel">
              <GridActionsCellItem
                icon={<CancelIcon />}
                label="Cancel"
                className="textPrimary"
                onClick={handleCancelClick(id)}
                color="inherit"
              />
            </Tooltip>,
          ];
        }

        return [
          <Tooltip title="Edit">
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={handleEditClick(id)}
              color="inherit"
            />
          </Tooltip>,
          <Tooltip title="Delete">
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={handleDeleteClick(id)}
              color="inherit"
              style={{ color: "#ff0000" }}
            />
          </Tooltip>,
        ];
      },
    },
  ];

  return (
    <Box>
      <Typography component="p" marginBottom={2}>Previous Academic Info</Typography>
      <EditedTableLayout
        rows={rows}
        columns={columns}
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
          noRowsOverlay: customNoRowsOverlay,
        }}
        slotProps={{
          toolbar: {
            setRows,
            setRowModesModel,
            setActionType,
            setAddedDoc,
            offlineStudentData,
          },
        }}
        classname={{
          "& .MuiDataGrid-virtualScroller": {
            minHeight: "100px",
          },
        }}
      />
    </Box>
  );
};

export default PreviousAcademicDetails;