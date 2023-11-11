import { Grid, Box, Typography, Button, Tooltip } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { CheckboxController, DateController, InputController } from "../../../../control";
import TableLayout from "../../../../layouts/tableLayout";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { CommonOptionHook } from "../../../../hooks/globalMasters/commonMasterHook";
import { commonMastersIds } from "../../../../utils/commonMasterIds";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../../../store/Admission/offlineAdmission/offlineAdmission";
import { getAllOfflineStudentData } from "../../../../store/Admission/offlineAdmission/offlineAdmission";
import { getOnlineUserId } from "../../../../store/Authentication/authentication";
import { SelectCommonController } from "../../../../control/SelectCommonController";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { randomId } from "@mui/x-data-grid-generator";
import AddIcon from "@mui/icons-material/Add";

const vehicleInformationSchema = yup.object({
  vehicleType: yup.string().required('Please select vehicle type'),
  vehicleNo: yup.string().required('Please enter vehicle nubmer'),
  vehicleInsurancePolicyNo: yup.string().notRequired(),
  puc: yup.boolean().default(false).notRequired(),
  rc: yup.string().required('Please enter rc no.'),
  rcvalidity: yup.string().required('Please enter rc validity date'),
  vehicleOwnerName: yup.string().required('Please enter owner name'),
  vehicleRegistrationNo: yup.string().notRequired(),
  drivingLicence: yup.string().required('Please enter driving license no.'),
  validityOfLicence: yup.string().required('Please enter driving validity.'),
  chassisNo: yup.string().required('Please enter chassis no.'),
  engineNo: yup.string().required('Please enter engine no.'),

}).required();

const VehicleInfromation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const offlineUserData = useSelector(getAllOfflineStudentData);
  const userId = useSelector(getOnlineUserId);

  const [rowsData, setRowsData] = useState<any>([]);
  let { value: vehicleType } = CommonOptionHook(true, commonMastersIds.VEHICLE_TYPE);

  const { control, resetField, handleSubmit, reset, getValues, formState } = useForm({
    resolver: yupResolver(vehicleInformationSchema),
    defaultValues: {
      vehicleType: "",
      vehicleNo: "",
      vehicleInsurancePolicyNo: "",
      puc: false,
      rc: "",
      rcvalidity: '',
      vehicleOwnerName: "",
      vehicleRegistrationNo: "",
      drivingLicence: "",
      validityOfLicence: '',
      chassisNo: '',
      engineNo: ''
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (offlineUserData) {
      let offlineVehicleInformations = offlineUserData.offlineVehicleInformationsVMList;
      if (offlineVehicleInformations.length > 0) {
        setRowsData(offlineUserData.offlineVehicleInformationsVMList);
      }
    }
  }, [])

  const addRow = () => {
    const data = getValues();
    const newRow = {
      ...data,
      id: randomId(),
    }
    setRowsData([...rowsData, newRow]);
    reset();
  }

  const deleteRow = (id: any) => {
    setRowsData((prevData: any) => {
      const newData = prevData.filter((row: any) => row.id !== id);
      return newData;
    })
  }

  const columns = [
    {
      field: "vehicleType",
      headerName: "Vehicle Type",
      flex: 1,
    },
    {
      field: "vehicleNo",
      headerName: "Vehicle No",
      flex: 1,
    },
    {
      field: "vehicleInsurancePolicyNo",
      headerName: "Insurance Policy No",
      flex: 1,
    },
    {
      field: "puc",
      headerName: "PUC",
      flex: 1,
      renderCell: (params: any) => {
        return params.row.puc === true ? 'PUC' : 'No PUC'
      }
    },
    {
      field: "rc",
      headerName: "RC",
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
                  onClick={(e) => deleteRow(params.row.id)}
                />
              </Tooltip>
            </Grid>
          </>
        );
      },
    },
  ];

  const onSubmit = () => {
    try {
      const finalData = {
        studentAdmissionId: offlineUserData && offlineUserData?.id,
        userId: userId,
        offlineVehicleInformationsVMList: rowsData.map((row: any) => ({
          ...row,
          id: 0,
          userId: userId,
          studentAdmissionId: offlineUserData && offlineUserData?.id,
          isActive: true,
          createdBy: 0,
          createdDate: new Date(),
          updatedBy: 0,
          updatedDate: new Date(),
          noOfVehicle: 0,
        }))
      }
      dispatch(actions.loadSaveUpdateVehicleInfoOfflineAdmission(finalData));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box p={2}>
      <Typography component="p" marginBottom={2}>Vehicle Information</Typography>
      <form onSubmit={handleSubmit(addRow)}>
        <Grid container spacing={2} mb={2}>
          <Grid item container sm={4}>
            <SelectCommonController control={control} name="vehicleType" label="Vehicle Type *" options={vehicleType} />
          </Grid>
          <Grid item container sm={4}>
            <InputController control={control} name="vehicleOwnerName" label="Vehicle Owner Name *" resetClick={() => resetField("vehicleOwnerName")} />
          </Grid>
          <Grid item container sm={4}>
            <InputController control={control} name="vehicleNo" label="Vehicle No. *" resetClick={() => resetField("vehicleNo")} />
          </Grid>
          <Grid item container sm={4}>
            <InputController control={control} name="vehicleInsurancePolicyNo" label="Insurance Policy No." resetClick={() => resetField("vehicleInsurancePolicyNo")} />
          </Grid>
          <Grid item container sm={4}>
            <InputController control={control} name="drivingLicence" label="Driving Licence *" resetClick={() => resetField("drivingLicence")} />
          </Grid>
          <Grid item container sm={4}>
            <DateController control={control} name="validityOfLicence" label="Validity of Licence *" />
          </Grid>
          <Grid item container sm={4}>
            <InputController control={control} name="engineNo" label="Engine No. *" resetClick={() => resetField("engineNo")} />
          </Grid>
          <Grid item container sm={4}>
            <InputController control={control} name="chassisNo" label="Chassis No. *" resetClick={() => resetField("chassisNo")} />
          </Grid>
          <Grid item container sm={4}>
            <InputController control={control} name="rc" label="RC Number *" resetClick={() => resetField("rc")} />
          </Grid>
          <Grid item container sm={4}>
            <DateController control={control} name="rcvalidity" label="Validity of RC *" />
          </Grid>
          <Grid item container sm={4}>
            <CheckboxController control={control} name="puc" label="PUC" />
          </Grid>
          <Grid item container sm={4}>
            <Grid item container justifyContent={'end'}>
              <Box>
                <Button variant="contained" type="submit" startIcon={<AddIcon />}>Add</Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </form>
      <TableLayout columns={columns} rows={rowsData} />
      <Grid display={"flex"} justifyContent={"flex-end"} paddingTop={"5vh"} gap={1}>
        <Button variant="outlined" onClick={() => navigate("/dashboard")}> Cancel </Button>
        <Button variant="contained" onClick={(e) => { e.preventDefault(); onSubmit() }}>Save</Button>
      </Grid>
    </Box>

  )
}

export default VehicleInfromation;