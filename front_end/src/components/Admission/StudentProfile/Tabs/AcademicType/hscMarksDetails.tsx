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
  offlineStudentData: any;
}

const customNoRowsOverlay = () => (
  <GridOverlay>{"No data available"}</GridOverlay>
);

const HscMarksDetails: FC = () => {
  const dispatch = useDispatch();
  const offlineStudentData: any = useSelector(getAllOfflineStudentData);
  const [rows, setRows] = React.useState(offlineStudentData.offlineHscmarkDetailVMList);
  const [entranceExamMarks, setEntranceExamDetails] = React.useState(offlineStudentData.offlineEntranceExamDetailsVMList);
  const [previousAcademicDetails, setPreviousAcademicDetails] = React.useState(offlineStudentData.offlinePreviousAcademicDetailsVMList);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const [actionType, setActionType] = React.useState("");

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
          physicsMarks: "",
          chemistryMarks: "",
          mathsMarks: "",
          vocationSubject: "",
          vocationSubjectMarks: "",
          // qualifyingTotal: "",
          isNew: true,
        },
      ]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: "physicsMarks" },
      }));
    };

    return (
      rows.length <= 0 &&
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Add record
        </Button>
      </GridToolbarContainer>
    );
  }

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
          setRows(offlineStudentData.offlineHscmarkDetailVMList);
          setEntranceExamDetails(offlineStudentData.offlineEntranceExamDetailsVMList);
          setPreviousAcademicDetails(offlineStudentData.offlinePreviousAcademicDetailsVMList);
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
        finaldata = offlineStudentData.offlineHscmarkDetailVMList.map(
          (obj: any) => {
            if (obj.id === newRow.id) {
              return {
                ...obj,
                isActive: true,
                createdBy: 0,
                createdDate: "2023-10-31T17:49:38.204Z",
                updatedBy: 0,
                updatedDate: "2023-10-31T17:49:38.204Z",
                physicsMarks: newRow.physicsMarks,
                chemistryMarks: newRow.chemistryMarks,
                mathsMarks: newRow.mathsMarks,
                biologyMarks: newRow.biologyMarks,
                englishMarks: newRow.englishMarks,
                vocationSubject: newRow.vocationSubject,
                vocationSubjectMarks: newRow.vocationSubjectMarks,
                qualifyingTotal: (newRow.physicsMarks + newRow.chemistryMarks + newRow.mathsMarks + newRow.vocationSubjectMarks),
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
            createdDate: "2023-10-31T17:49:38.204Z",
            updatedBy: 0,
            updatedDate: "2023-10-31T17:49:38.204Z",
            physicsMarks: newRow.physicsMarks,
            chemistryMarks: newRow.chemistryMarks,
            mathsMarks: newRow.mathsMarks,
            biologyMarks: newRow.biologyMarks,
            englishMarks: newRow.englishMarks,
            vocationSubject: newRow.vocationSubject,
            vocationSubjectMarks: newRow.vocationSubjectMarks,
            qualifyingTotal: (newRow.physicsMarks + newRow.chemistryMarks + newRow.mathsMarks + newRow.vocationSubjectMarks),
          },
          ...offlineStudentData.offlineHscmarkDetailVMList,
        ];
      }
      const request = {
        userId: offlineStudentData.userId,
        studentAdmissionId: offlineStudentData.id,
        offlinePreviousAcademicDetailsVMList: previousAcademicDetails,
        offlineHscmarkDetailsVMList: finaldata,
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
        offlinePreviousAcademicDetailsVMList: previousAcademicDetails,
        offlineHscmarkDetailsVMList: finaldata,
        offlineEntranceExamDetailsVMList: entranceExamMarks,
      };
      dispatch(actions.loadSaveUpdateAcademicInfoOfflineAdmission(request));
    } catch (error) {
      console.log(error)
    }
  }

  const columns: GridColDef[] = [
    {
      field: "physicsMarks",
      headerName: "Physics Marks",
      flex: 1,
      type: "number",
      editable: true,
      align: "left"
    },
    {
      field: "chemistryMarks",
      headerName: "Chemistry Marks",
      flex: 1,
      type: "number",
      editable: true,
      align: "left"
    },

    {
      field: "mathsMarks",
      headerName: "Mathematics Marks",
      flex: 1,
      type: "number",
      editable: true,
      align: "left"
    },
    {
      field: "vocationSubject",
      headerName: "Vocational Subject",
      flex: 1,
      editable: true,
      align: "left"
    },
    {
      field: "vocationSubjectMarks",
      headerName: "Vocational Subject Marks",
      flex: 1,
      type: "number",
      editable: true,
      align: "left"
    },
    {
      field: "qualifyingTotal",
      headerName: "Qualifying Total",
      flex: 1,
      align: "left",
      valueSetter: (params) => {
        return `${(params.row.physicsMarks + params.row.chemistryMarks + params.row.mathsMarks + params.row.vocationSubjectMarks)}`
      },
      valueFormatter: (params: GridValueFormatterParams<number>) => {
        if (params.value == null || isNaN(params.value)) {
          return '';
        }
        return `${Number(params.value)}`;
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
    <Box my={3}>
      <Typography component="p" marginBottom={2}>HSC Mark Details</Typography>
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
            offlineStudentData,
          },
        }}
        classname={{
          "& .MuiDataGrid-virtualScroller": {
            minHeight: "50px",
          },
        }}
      />
    </Box>
  );
};

export default HscMarksDetails;