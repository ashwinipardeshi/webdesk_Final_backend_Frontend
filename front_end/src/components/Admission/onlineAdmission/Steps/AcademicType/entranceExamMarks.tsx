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
} from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import { Typography, Tooltip } from "@mui/material";
import EditedTableLayout from "../../../../../layouts/editedTableLayout";
import { useDispatch, useSelector } from "react-redux";
import { actions, getAllOnlineStudentData } from "../../../../../store/Admission/onlineAdmission/onlineAdmission";
import { CommonOptionHook } from "../../../../../hooks/globalMasters/commonMasterHook";
import { commonMastersIds } from "../../../../../utils/commonMasterIds";

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
  } = props;

  const handleClick = () => {
    setActionType("ADD");
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      {
        id,
        entranceType: "",
        rollNumber: "",
        physicsMarks: "",
        chemistryMarks: "",
        mathsMarks: "",
        totalMarks: "",
        isNew: true,
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "entranceType" },
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
const EntranceExamMarks: FC = () => {
  const dispatch = useDispatch();
  const onlineStudentData = useSelector(getAllOnlineStudentData);
  const [rows, setRows] = React.useState(onlineStudentData.onlineEntranceExamDetailsVMList);
  const [hscMarkDetails, setHscmarkDetails] = React.useState(onlineStudentData.onlineHscmarkDetailsVMList);
  const [previousAcademicDetails, setPreviousAcademicDetails] = React.useState(onlineStudentData.onlinePreviousAcademicDetailsVMList);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const [actionType, setActionType] = React.useState("");
  let { value: entranceExamType } = CommonOptionHook(true, commonMastersIds.ENTRANCE_TYPE);
  const examName = (entranceExamType as any).map((item: any) => { return item.name })

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  useEffect(() => {
    if (onlineStudentData) {
      const fetchStudentData = async () => {
        try {
          setRows(onlineStudentData.onlineEntranceExamDetailsVMList);
          setPreviousAcademicDetails(onlineStudentData.onlinePreviousAcademicDetailsVMList);
          setHscmarkDetails(onlineStudentData.onlineHscmarkDetailsVMList);
        } catch (error: any) { }
      };
      fetchStudentData();
    }
  }, [onlineStudentData]);

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
        finaldata = onlineStudentData.onlineEntranceExamDetailsVMList.map(
          (obj: any) => {
            if (obj.id === newRow.id) {
              return {
                ...obj,
                isActive: true,
                createdBy: 0,
                createdDate: "2023-10-28T07:02:06.218Z",
                updatedBy: 0,
                updatedDate: "2023-10-28T07:02:06.218Z",
                entranceType: newRow.entranceType,
                rollNumber: newRow.rollNumber,
                physicsMarks: newRow.physicsMarks,
                chemistryMarks: newRow.chemistryMarks,
                mathsMarks: newRow.mathsMarks,
                totalMarks: newRow.totalMarks,
              };
            }
            return obj;
          }
        );
      } else {
        finaldata = [
          {
            id: 0,
            onlineStudentAdmissionId: onlineStudentData.id,
            isActive: true,
            createdBy: 0,
            createdDate: "2023-10-28T07:02:06.218Z",
            updatedBy: 0,
            updatedDate: "2023-10-28T07:02:06.218Z",
            entranceType: newRow.entranceType,
            rollNumber: newRow.rollNumber,
            physicsMarks: newRow.physicsMarks,
            chemistryMarks: newRow.chemistryMarks,
            mathsMarks: newRow.mathsMarks,
            totalMarks: newRow.totalMarks,
          },
          ...onlineStudentData.onlineEntranceExamDetailsVMList,
        ];
      }
      const request = {
        onlineUserId: onlineStudentData.onlineUserId,
        onlineStudentAdmissionId: onlineStudentData.id,
        onlinePreviousAcademicDetailsVMList: previousAcademicDetails,
        onlineEntranceExamDetailsVMList: finaldata,
        onlineHscmarkDetailsVMList: hscMarkDetails,
      };
      dispatch(actions.loadSaveUpdateAcademicInfoOnlineAdmission(request));
      setRows(
        rows.map((row: any) => (row.id === newRow.id ? updatedRow : row))
      );
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
        onlineUserId: onlineStudentData.onlineUserId,
        onlineStudentAdmissionId: onlineStudentData.id,
        onlinePreviousAcademicDetailsVMList: previousAcademicDetails,
        onlineEntranceExamDetailsVMList: finaldata,
        onlineHscmarkDetailsVMList: hscMarkDetails,
      };
      dispatch(actions.loadSaveUpdateAcademicInfoOnlineAdmission(request));
    } catch (error) {
      console.log(error)
    }
  }

  const columns: GridColDef[] = [
    {
      field: "entranceType",
      headerName: "Exam Name",
      editable: true,
      flex: 1,
      type: "singleSelect",
      valueOptions: examName,
      align: "left"
    },
    {
      field: "rollNumber",
      headerName: "Roll Number",
      flex: 1,
      editable: true,
      align: "left"
    },
    {
      field: "physicsMarks",
      headerName: "Physics Marks/Percentile",
      flex: 1,
      type: "number",
      editable: true,
      align: "left"
    },
    {
      field: "chemistryMarks",
      headerName: "Chemistry Marks/Percentile",
      flex: 1,
      type: "number",
      editable: true,
      align: "left"
    },
    {
      field: "mathsMarks",
      headerName: "Mathematics Marks/Percentile",
      flex: 1,
      type: "number",
      editable: true,
      align: "left"
    },
    {
      field: "totalMarks",
      headerName: "Total Marks/Percentile",
      flex: 1,
      type: "number",
      editable: true,
      align: "left"
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
      <Typography component="p" marginBottom={2}>
        Entrance Exam Details
      </Typography>
      <EditedTableLayout
        rows={rows}
        columns={columns}
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        hideFooter={true}
        slots={{
          toolbar: EditToolbar,
          noRowsOverlay: customNoRowsOverlay,
        }}
        slotProps={{
          toolbar: {
            setRows,
            setRowModesModel,
            setActionType,
            onlineStudentData,
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

export default EntranceExamMarks;