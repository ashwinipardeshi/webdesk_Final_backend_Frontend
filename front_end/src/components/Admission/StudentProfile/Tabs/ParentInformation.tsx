import { Grid, Box, Typography, Button, Tooltip } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CheckboxController, DateController, InputController, SelectController } from "../../../../control";
import TableLayout from "../../../../layouts/tableLayout";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { RelationOptionHook } from "../../../../hooks/globalMasters/relationHooks";
import { CommonOptionHook } from "../../../../hooks/globalMasters/commonMasterHook";
import { commonMastersIds } from "../../../../utils/commonMasterIds";
import { AnnualIncomeOptionHook } from "../../../../hooks/globalMasters/annualIncomeHooks";
import { useDispatch, useSelector } from "react-redux";
import { actions, getAllOfflineStudentData } from "../../../../store/Admission/offlineAdmission/offlineAdmission";
import { useEffect, useState } from "react";
import { IOfflineParentDetailsVmlist } from "../../../../interfaces/Admission/offlineAdmission/IOfflineParentDetailsVmlist";
import { selectStatus } from "../../../../store/loader";
import Loader from "../../../../shade/Loaders/Loaders";
import { useNavigate } from "react-router-dom";
import { randomId } from "@mui/x-data-grid-generator";
import AddIcon from "@mui/icons-material/Add";

const parentSchema = yup.object({
  relation: yup.string().required("Please select Relation"),
  livingStatus: yup.string().notRequired(),
  title: yup.string().required('Please select title'),
  gender: yup.string().required('Please select gender'),
  lastName: yup.string().required('Please enter last name'),
  firstName: yup.string().required('Please enter first name'),
  middleName: yup.string().notRequired(),
  dateOfBirth: yup.string().required('Please select date of birth'),
  qualification: yup.string().notRequired(),
  profession: yup.string().required('Please Enter Profession'),
  organizationName: yup.string().notRequired(),
  income: yup.string().notRequired(),
  whatsAppMobileNo: yup.string().notRequired(),
  mobileNo: yup.string().required('Please enter mobile number').matches(/^[0-9]+$/, 'Must be only digits').min(10, 'Must be exactly 10 digits').max(10, 'Must be exactly 10 digits'),
  mailId: yup.string().email().notRequired(),
  isDefaultCommunication: yup.boolean().notRequired().default(false),
  guardianRelation: yup.string().notRequired(),
  guardianAddress: yup.string().notRequired(),
  employedIn: yup.string().notRequired(),
  designation: yup.string().notRequired(),
});

const ParentInfromation = (props: any) => {
  const navigate = useNavigate();
  const loaderStatus = useSelector(selectStatus);
  const offlineUserData = useSelector(getAllOfflineStudentData);
  const [addedRelations, setAddedRelations] = useState<number[]>([]);
  const [hasRecord, setHasRecord] = useState(false);
  const dispatch = useDispatch();
  const [parentData, setParentData] = useState<any[]>([]);
  const [guardianId, setGuardianId] = useState(0);
  const { relationoptiondata } = RelationOptionHook(true);
  const { value: titleOptions } = CommonOptionHook(
    true,
    commonMastersIds.TITLE
  );
  const { value: genderOptions } = CommonOptionHook(
    true,
    commonMastersIds.GENDER
  );
  const { value: employedInOptions } = CommonOptionHook(
    true,
    commonMastersIds.EMPLOYED_IN
  );
  const { value: livingStatusOption } = CommonOptionHook(
    true,
    commonMastersIds.LIVING_STATUS
  );
  const { optionannualIncomedata } = AnnualIncomeOptionHook(true);

  const {
    control,
    resetField,
    handleSubmit,
    reset,
    watch,
    getValues,
    setValue,
  } = useForm({
    defaultValues: {
      relation: "",
      livingStatus: "",
      title: "",
      gender: "",
      lastName: "",
      firstName: "",
      middleName: "",
      dateOfBirth: "",
      qualification: "",
      profession: "",
      employedIn: "",
      organizationName: "",
      designation: "",
      income: "",
      mobileNo: "",
      whatsAppMobileNo: "",
      mailId: "",
      isDefaultCommunication: false,
      guardianRelation: "",
      guardianAddress: "",
    },
    resolver: yupResolver(parentSchema),
    mode: 'onChange'
  });
  const existingRelations = parentData.map((row) => row.relation.toString());
  const filteredRelationOptions = relationoptiondata.filter(
    (option) => !existingRelations.includes(option.id.toString())
  );

  useEffect(() => {
    if (
      offlineUserData !== null &&
      offlineUserData.offlineParentDetailsVMList &&
      offlineUserData.offlineParentDetailsVMList.length > 0
    ) {
      const data = offlineUserData.offlineParentDetailsVMList;
      setParentData([...data]);
      setHasRecord(data.length > 0);
    }
  }, [offlineUserData]);

  const onAdd = (data: any) => {
    if (offlineUserData) {
      const studentAdmissionId = offlineUserData.id;
      const userId = offlineUserData.userId;
      const res = {
        ...data,
        gender: data.gender.toString(),
        title: data.title.toString(),
        studentAdmissionId,
        userId,
        income: data.income.toString(),
        employedIn: data.employedIn.toString(),
        // id: Number(parentData.length + 1),
        id: randomId(),
      };

      setParentData((prev) => [...prev, res]);
      setHasRecord(true);
      reset();
    }
  };
  const selectedRelation = Number(watch("relation"));


  const handleDelete = (id: number) => {
    const deletedRow = parentData.find((row) => row.id === id);
    if (deletedRow) {
      setAddedRelations((prev) =>
        prev.filter((relationId) => relationId !== Number(deletedRow.relation))
      );
    }
    setParentData((prevData) => {
      const newData = prevData.filter((item) => item.id !== id);
      if (newData.length === 0) {
        setHasRecord(false);
      }
      return newData;
    });
  };

  useEffect(() => {
    if (relationoptiondata) {
      const relation = relationoptiondata.filter((x) =>
        x.name.includes("guardian".toUpperCase())
      )[0];
      relation && setGuardianId(relation.id);
    }
  }, [relationoptiondata]);

  const columns = [
    {
      field: "relation",
      headerName: "Relation",
      flex: 1,
      renderCell: ({ row }: any) => {
        const foundItem = relationoptiondata.find((item) => item.id === Number(row.relation));
        return foundItem ? foundItem.name : '';
      },
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      renderCell: ({ row }: any) => {
        return `${row.firstName} ${row.middleName} ${row.lastName}`;
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
          <>
            <Grid item>
              <Tooltip title="Delete">
                <DeleteOutlineIcon
                  fontSize="medium"
                  style={{ color: "#ff0000" }}
                  onClick={(e) => handleDelete(params.row.id)}
                />
              </Tooltip>
            </Grid>
          </>
        );
      },
    },
  ];

  const onSubmit = () => {
    if (offlineUserData) {
      const studentAdmissionId = offlineUserData.id;
      const userId = offlineUserData.userId;
      const modifiedData = parentData.map((item) => {
        const { id, studentCode, ...rest } = item;
        return rest;
      });
      const data: IOfflineParentDetailsVmlist = {
        studentAdmissionId,
        userId,
        offlineParentDetailsVMList: modifiedData,
      };
      try {
        dispatch(actions.loadSaveUpdateParentInfoOfflineAdmission(data));
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Box p={2}>
      {loaderStatus === "loading" && <Loader />}
      <Typography component="p" marginBottom={2}>
        Parent Information
      </Typography>
      <form onSubmit={handleSubmit(onAdd)}>
        <Grid container spacing={2}>
          <Grid item container sm={4}>
            <SelectController
              control={control}
              name="relation"
              label="Relation *"
              options={filteredRelationOptions}
            />
          </Grid>
          <Grid item container sm={4}>
            <SelectController
              control={control}
              name="livingStatus"
              label="Living Status"
              options={livingStatusOption}
            />
          </Grid>
          <Grid item container sm={4}>
            <SelectController
              control={control}
              name="title"
              label="Title *"
              options={titleOptions}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} mt={0}>
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
            <SelectController
              control={control}
              name="gender"
              label="Gender *"
              options={genderOptions}
            />
          </Grid>
          <Grid item container sm={4}>
            <DateController
              control={control}
              name="dateOfBirth"
              label="Date of Birth *"
            />
          </Grid>
          <Grid item container sm={4}>
            <InputController
              control={control}
              name="qualification"
              label="Qualification"
              resetClick={() => resetField("qualification")}
            />
          </Grid>
          <Grid item container sm={4}>
            <InputController
              control={control}
              name="profession"
              label="Profession *"
              resetClick={() => resetField("profession")}
            />
          </Grid>
          <Grid item container sm={4}>
            <SelectController
              control={control}
              name="employedIn"
              label="Employed In"
              options={employedInOptions}
            />
          </Grid>
          <Grid item container sm={4}>
            <InputController
              control={control}
              name="organizationName"
              label="Organization Name"
              resetClick={() => resetField("organizationName")}
            />
          </Grid>
          <Grid item container sm={4}>
            <InputController
              control={control}
              name="designation"
              label="Designation"
              resetClick={() => resetField("designation")}
            />
          </Grid>
          <Grid item container sm={4}>
            <SelectController
              control={control}
              name="income"
              label="Income"
              options={optionannualIncomedata}
            />
          </Grid>
          <Grid item container sm={4}>
            <InputController
              control={control}
              name="whatsAppMobileNo"
              label="WhatsApp No."
              resetClick={() => resetField("whatsAppMobileNo")}
            />
          </Grid>
          <Grid item container sm={4}>
            <InputController
              control={control}
              name="mobileNo"
              label="Mobile No. *"
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
          <Grid item container sm={4}>
            <CheckboxController
              control={control}
              name="isDefaultCommunication"
              label="Default Communication"
            />
          </Grid>
          <Grid item container sm={4}>
           { guardianId === selectedRelation && 
           <InputController
              control={control}
              name="guardianAddress"
              label="Address"
              resetClick={() => resetField("guardianAddress")}
            />}
          </Grid>
          <Grid item container sm={4}>
            {guardianId === selectedRelation && (
              <InputController
                control={control}
                name="guardianRelation"
                label="Relationship With Guardian"
                resetClick={() => resetField("guardianRelation")}
              />
            )}
          </Grid>
        </Grid>

        <Grid item container justifyContent={"end"} mb={2}>
          <Box>
            <Button type="submit" variant="contained"
              startIcon={<AddIcon />}
            >
              Add
            </Button>
          </Box>
        </Grid>

        <TableLayout columns={columns} rows={parentData} />

        <Grid
          display={"flex"}
          justifyContent={"flex-end"}
          paddingTop={"5vh"}
          gap={1}
        >
          <Button variant="outlined" onClick={() => navigate("/dashboard")}> Cancel </Button>
          <Button variant="contained" disabled={!hasRecord} onClick={onSubmit}>
            Save
          </Button>
        </Grid>
      </form>
    </Box>
  );
};

export default ParentInfromation;
