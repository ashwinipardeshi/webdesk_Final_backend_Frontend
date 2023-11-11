import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Grid, IconButton, Typography, Tooltip } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  SelectController,
  InputController,
  CheckboxController,
} from "../../../../control";
import TableLayout from "../../../../layouts/tableLayout";
import { IOnlineParentInfo } from "../../../../interfaces/Admission/onlineAdmission/IOnlineAdmission";
import {
  actions,
  getAllOnlineStudentData,
  getStatusOnlineStudentData,
} from "../../../../store/Admission/onlineAdmission/onlineAdmission";
import { RelationOptionHook } from "../../../../hooks/globalMasters/relationHooks";
import { getOnlineUserId } from "../../../../store/Authentication/authentication";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import AddIcon from "@mui/icons-material/Add";

const parentInfoSchema = yup
  .object({
    relation: yup.string().required("Please select relation"),
    firstName: yup
      .string()
      .matches(/^[a-zA-Z ]*$/, "Enter characters only")
      .required("Please enter first name"),
    middleName: yup.string().default(""),
    lastName: yup
      .string()
      .matches(/^[a-zA-Z ]*$/, "Enter characters only")
      .required("Please enter last name"),
    profession: yup.string().default(""),
    mobileNo: yup.string().matches(/^\d{10}$/, "Mobile number should be 10 digits").required('Please enter mobile number'),
    mailId: yup.string().email().default(""),
    guaradianRelation: yup.string().default(""),
    guaradianAddress: yup.string().default(""),
    livingStatus: yup.string().notRequired(),
    isDefaultCommunication: yup.boolean().default(false),
    dateOfBirth: yup.string().notRequired(),
    qualification: yup.string().notRequired(),
    employedIn: yup.string().notRequired(),
    organizationName: yup.string().notRequired(),
    designation: yup.string().notRequired(),
    income: yup.string().notRequired(),
    image: yup.string().notRequired(),
    signature: yup.string().notRequired(),
  })
  .required();

const ParentInfo = (props: any) => {
  const getStudentInfoStatus = useSelector(getStatusOnlineStudentData);
  const { relationoptiondata: RelationTypeOption } = RelationOptionHook(true);
  const [rowsData, setRowsData] = useState<IOnlineParentInfo[]>([]);
  const [hasRecord, setHasRecord] = useState(false);
  const [addedRelations, setAddedRelations] = useState<number[]>([]);
  const dispatch = useDispatch();
  const getData = useSelector(getAllOnlineStudentData);
  const onlineUserId = useSelector(getOnlineUserId);
  const [isAPICalled, setIsAPICalled] = useState(false);
  useEffect(() => {
    if (getData && getData.onlineParentDetailsVMList) {
      setRowsData(getData.onlineParentDetailsVMList);
      setHasRecord(getData.onlineParentDetailsVMList.length > 0);
      setIsAPICalled(true);
    }
  }, [getData]);

  useEffect(() => { }, [rowsData]);

  const { control, resetField, handleSubmit, reset, getValues, watch } =
    useForm({
      resolver: yupResolver(parentInfoSchema),
      defaultValues: {
        relation: "",
        firstName: "",
        middleName: "",
        lastName: "",
        profession: "",
        mobileNo: "",
        mailId: "",
        guaradianRelation: "",
        guaradianAddress: "",
        isDefaultCommunication: false,
        livingStatus: "",
        dateOfBirth: "",
        qualification: "",
        employedIn: "",
        organizationName: "",
        designation: "",
        income: "",
        image: "",
        signature: "",
      },
      mode: "onChange",
    });

  const getRelationName = (value: number): string => {
    switch (value) {
      case 1:
        return "MOTHER";
      case 2:
        return "FATHER";
      case 3:
        return "GUARDIAN";
      default:
        return "";
    }
  };
  const selectedRelation = Number(watch("relation"));
  const columns = [
    {
      field: "relation",
      headerName: "Relation",
      flex: 1,
      renderCell: (params: any) => {
        return getRelationName(params.row.relation);
      },
    },

    {
      field: "fullName",
      headerName: "Name",
      flex: 1,
      renderCell: (params: any) => {
        const { firstName, lastName } = params.row;
        return `${firstName} ${lastName}`;
      },
    },

    {
      field: "profession",
      headerName: "Profession",
      flex: 1,
    },
    {
      field: "mobileNo",
      headerName: "Mobile No",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params: any) => {
        return (
          <Grid item>
            <Tooltip title="Delete">
              <DeleteOutlineIcon
                fontSize="medium"
                style={{ color: "#ff0000" }}
                onClick={() => handleDelete(params.row.id)}
              />
            </Tooltip>
          </Grid>
        );
      },
    },
  ];

  const handleDelete = (id: number) => {
    const deletedRow = rowsData.find((row) => row.id === id);
    if (deletedRow) {
      setAddedRelations((prev) =>
        prev.filter((relationId) => relationId !== Number(deletedRow.relation))
      );
    }
    setRowsData((prevData) => {
      const newData = prevData.filter((item) => item.id !== id);
      if (newData.length === 0) {
        setHasRecord(false);
      }
      return newData;
    });
    setIsAPICalled(false);
  };

  const handleAdd = () => {
    const data = getValues();
    const newRow: IOnlineParentInfo = {
      ...data,
      isActive: true,
      createdBy: 0,
      createdDate: new Date().toISOString(),
      updatedBy: 0,
      updatedDate: new Date().toISOString(),
      id: Number(rowsData.length + 1),
      livingStatus: "",
      dateOfBirth: new Date(),
      qualification: "",
      employedIn: "",
      organizationName: "",
      designation: "",
      income: "",
      image: "",
      signature: "",
    };

    setRowsData((prevData) => [...prevData, newRow]);
    setAddedRelations((prev) => [...prev, Number(data.relation)]);
    setHasRecord(true);
    setIsAPICalled(false);
    reset();
  };

  const existingRelations = rowsData.map((row) => row.relation.toString());
  const filteredRelationOptions = RelationTypeOption.filter(
    (option) => !existingRelations.includes(option.id.toString())
  );

  const handleNextClick = () => {
    const parentData = {
      onlineParentDetailsVMList: rowsData.map((row) => ({
        ...row,
        id: 0,
        onlineStudentAdmissionId: getData.id,
        isActive: true,
        createdBy: 0,
        createdDate: new Date().toISOString(),
        updatedBy: 0,
        updatedDate: new Date().toISOString(),
      })),
      onlineUserId: onlineUserId,
      onlineStudentAdmissionId: getData.id,
    };
    dispatch(actions.loadSaveUpdateParentInfoOnlineAdmission(parentData));
    setIsAPICalled(true);
  };

  useEffect(() => {
    if (getStudentInfoStatus) {
      dispatch(actions.setStatusOnlineStudentData(false));
      props.onChildClick(1);
    }
  }, [getStudentInfoStatus])

  return (
    <Box>
      <form onSubmit={handleSubmit(handleAdd)}>
        <Typography component="p" marginBottom={2}>
          {" "}
          Parent Info{" "}
        </Typography>
        <Grid container spacing={2}>
          <Grid item container mb={2} sm={4}>
            <SelectController
              control={control}
              name="relation"
              label="Relation *"
              options={filteredRelationOptions}
            />
          </Grid>
          {selectedRelation === 3 && (
            <>
              <Grid item container sm={4}>
                <InputController
                  control={control}
                  name="guaradianRelation"
                  label="Relation with guardian"
                  resetClick={() => resetField("guaradianRelation")}
                />
              </Grid>
              <Grid item container sm={4}>
                <InputController
                  control={control}
                  name="guaradianAddress"
                  label="Address of guardian"
                  resetClick={() => resetField("guaradianAddress")}
                />
              </Grid>
            </>
          )}
        </Grid>

        <Grid container spacing={2} mb={2}>
          <Grid item container sm={4}>
            <InputController
              control={control}
              name="firstName"
              label="First Name *"
              resetClick={() => resetField("firstName")}
            />
          </Grid>

          <Grid item container sm={4}>
            <InputController
              control={control}
              name="middleName"
              label="Middle Name"
              resetClick={() => resetField("middleName")}
            />
          </Grid>

          <Grid item container sm={4}>
            <InputController
              control={control}
              name="lastName"
              label="Last Name *"
              resetClick={() => resetField("lastName")}
            />
          </Grid>

          <Grid item container sm={4}>
            <InputController
              control={control}
              name="profession"
              label="Profession"
              resetClick={() => resetField("profession")}
            />
          </Grid>

          <Grid item container sm={4}>
            <InputController
              control={control}
              name="mobileNo"
              label="Mobile No."
              resetClick={() => resetField("mobileNo")}
            />
          </Grid>

          <Grid item container sm={4}>
            <InputController
              control={control}
              name="mailId"
              label="Email Id"
              resetClick={() => resetField("mailId")}
            />
          </Grid>

          <Grid item container sm={4} mb={0}>
            <CheckboxController
              control={control}
              name="isDefaultCommunication"
              label="Default Communication?"
            />
          </Grid>

          <Grid item container justifyContent={"end"}>
            <Box>
              <Button variant="contained" type="submit"
                startIcon={<AddIcon />}
              >
                Add
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>

      <TableLayout columns={columns} rows={rowsData} />
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
          disabled={rowsData.length === 0}
          onClick={() => handleNextClick()}
        >
          Save & Next
        </Button>
      </Grid>
    </Box>
  );
};
export default ParentInfo;
