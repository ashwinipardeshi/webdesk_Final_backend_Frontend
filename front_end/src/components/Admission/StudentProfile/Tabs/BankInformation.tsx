import { Grid, Box, Typography, Button, Tooltip } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { CheckboxController, InputController, } from "../../../../control";
import { SelectCommonController } from "../../../../control/SelectCommonController";
import TableLayout from "../../../../layouts/tableLayout";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOnlineUserId } from "../../../../store/Authentication/authentication";
import { getAllOfflineStudentData } from "../../../../store/Admission/offlineAdmission/offlineAdmission";
import { actions } from "../../../../store/Admission/offlineAdmission/offlineAdmission";
import { CommonOptionHook } from "../../../../hooks/globalMasters/commonMasterHook";
import { commonMastersIds } from "../../../../utils/commonMasterIds";
import { useNavigate } from "react-router-dom";
import { randomId } from "@mui/x-data-grid-generator";
import AddIcon from "@mui/icons-material/Add";

const bankInformationSchema = yup.object({
  personType: yup.string().required('Please select person type'),
  accountType: yup.string().required('Please select account type'),
  ifsccode: yup.string().required('Please enter IFSC code').matches(/^[A-Z]{4}[0-9]{7}$/, "IFSC code is not valid Ex: ABCD1234567"),
  bankName: yup.string().required('Please enter bank name').matches(/^[a-zA-Z ]*$/, "Please enter valid bank name"),
  branchName: yup.string().required('Please enter branch name'),
  branchCode: yup.string().required('Please enter branch code'),
  bankAddress: yup.string().required('Please enter bank address'),
  accountNo: yup.string().required('Please enter account no.').matches(/^[0-9  ]*$/, "Please enter valid account number ").max(12).min(8),
  confirmAccountNo: yup.string().required('Please enter confirm account no.').test("account-no-match", "Account numbers do not match",
    function (value) { return value === this.parent.accountNo; }),
  accountHolderName: yup.string().matches(/^[a-zA-Z ]*$/, 'Please enter valid account holder name').required('Please enter account holder name'),
  micrcode: yup.string().matches(/^[0-9]*$/, "MICR code is not valid").required('Please enter MICR code'),
  canceledChequePath: yup.string().notRequired(),
  isAccLinkedWithAadhar: yup.boolean().notRequired(),
}).required();

const BankInformation = (props: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const offlineUserData = useSelector(getAllOfflineStudentData);
  const userId = useSelector(getOnlineUserId);
  let { value: personType } = CommonOptionHook(true, commonMastersIds.PERSON_TYPE);
  let { value: accountType } = CommonOptionHook(true, commonMastersIds.ACCOUNT_TYPE);

  const [rowsData, setRowsData] = useState<any>([]);
  const { control, resetField, handleSubmit, reset, getValues } = useForm({
    resolver: yupResolver(bankInformationSchema),
    defaultValues: {
      personType: "",
      accountType: "",
      ifsccode: "",
      bankName: "",
      branchName: "",
      branchCode: "",
      bankAddress: "",
      accountNo: "",
      confirmAccountNo: "",
      accountHolderName: "",
      micrcode: "",
      canceledChequePath: "",
      isAccLinkedWithAadhar: false,
    },
    mode: 'onChange'
  })

  useEffect(() => {
    if (offlineUserData) {
      let offlineBankDetails = offlineUserData.offlineBankDetailsVMList;
      if (offlineBankDetails.length > 0) {
        setRowsData(offlineUserData.offlineBankDetailsVMList);
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
      field: "personType",
      headerName: "Person Type",
      flex: 1,
    },
    {
      field: "accountType",
      headerName: "Account Type",
      flex: 1,
    },
    {
      field: "accountNo",
      headerName: "Account No",
      flex: 1,
    },
    {
      field: "accountHolderName",
      headerName: "Account Holder Name",
      flex: 1,
    },
    {
      field: "bankName",
      headerName: "Bank Name",
      flex: 1,
    },
    {
      field: "branchName",
      headerName: "Branch Name",
      flex: 1,
    },
    {
      field: "ifsccode",
      headerName: "IFSC Code",
      flex: 1,
    },
    {
      field: "micrcode",
      headerName: "MICR Code",
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
        offlineBankDetailsVMList: rowsData.map((row: any) => ({
          ...row,
          id: 0,
          userId: userId,
          studentAdmissionId: offlineUserData && offlineUserData?.id,
          isActive: true,
          createdBy: 0,
          createdDate: new Date(),
          updatedBy: 0,
          updatedDate: new Date(),
        }))
      }
      dispatch(actions.loadSaveUpdateBankInfoOfflineAdmission(finalData));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box p={2}>
      <Typography component="p" marginBottom={2}>Bank Information</Typography>
      <form onSubmit={handleSubmit(addRow)}>
        <Grid container spacing={2} mb={2}>
          <Grid item container sm={4}>
            <SelectCommonController control={control} name="personType" label="Person Type *" options={personType} />
          </Grid>

          <Grid item container sm={4}>
            <SelectCommonController control={control} name="accountType" label="Account Type *" options={accountType} />
          </Grid>

          <Grid item container sm={4}>
            <InputController control={control} name="accountNo" label="Account No. *" resetClick={() => resetField("accountNo")} />
          </Grid>

          <Grid item container sm={4}>
            <InputController control={control} name="confirmAccountNo" label="Confirm Account No. *" resetClick={() => resetField("confirmAccountNo")} />
          </Grid>

          <Grid item container sm={4}>
            <InputController control={control} name="accountHolderName" label="Account Holder Name *" resetClick={() => resetField("accountHolderName")} />
          </Grid>

          <Grid item container sm={4}>
            <InputController control={control} name="bankName" label="Bank Name *" resetClick={() => resetField("bankName")} />
          </Grid>

          <Grid item container sm={4}>
            <InputController control={control} name="branchName" label="Branch Name *" resetClick={() => resetField("branchName")} />
          </Grid>

          <Grid item container sm={4}>
            <InputController control={control} name="branchCode" label="Branch Code *" resetClick={() => resetField("branchCode")} />
          </Grid>

          <Grid item container sm={4}>
            <InputController control={control} name="bankAddress" label="Branch Address *" resetClick={() => resetField("bankAddress")} />
          </Grid>

          <Grid item container sm={4}>
            <InputController control={control} name="ifsccode" label="IFSC Code *" resetClick={() => resetField("ifsccode")} />
          </Grid>

          <Grid item container sm={4}>
            <InputController control={control} name="micrcode" label="MICR Code *" resetClick={() => resetField("micrcode")} />
          </Grid>

          <Grid item container sm={4}>
            <CheckboxController control={control} name="isAccLinkedWithAadhar" label="Is Account linked With Aadhar?" />
          </Grid>

          <Grid item container sm={12}>
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
        <Button type="submit" variant="contained" onClick={(e) => { e.preventDefault(); onSubmit() }}>Save</Button>
      </Grid>

    </Box>
  )
}

export default BankInformation;