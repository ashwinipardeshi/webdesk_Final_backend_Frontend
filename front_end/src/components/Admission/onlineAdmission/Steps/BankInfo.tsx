import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  SelectController,
  InputController,
  CheckboxController,
} from "../../../../control";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  actions,
  getSaveUpdateBankInfoOnlineAdmission,
} from "../../../../store/Admission/onlineAdmission/onlineAdmission";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ADD } from "../../../../constant/statusCodes";
import { SelectCommonController } from "../../../../control/SelectCommonController";
import { CommonOptionHook } from "../../../../hooks/globalMasters/commonMasterHook";
import { commonMastersIds } from "../../../../utils/commonMasterIds";
import {
  getAllOnlineStudentData,
  getStatusOnlineStudentData,
} from "../../../../store/Admission/onlineAdmission/onlineAdmission";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const bankInfoSchema = yup
  .object({
    personType: yup.string().required("please select person type"),
    accountType: yup.string().required("please select account type"),
    accountNo: yup
      .string()
      .required()
      .matches(/^[0-9  ]*$/, "Please enter valid account number ")
      .max(12)
      .min(8),
    confirmAccountNo: yup
      .string()
      .required()
      .test(
        "account-no-match",
        "Account numbers do not match",
        function (value) {
          return value === this.parent.accountNo;
        }
      ),
    accountHolderName: yup
      .string()
      .matches(/^[a-zA-Z ]*$/)
      .required("please enter account holders name"),
    bankName: yup
      .string()
      .required("Please enter valid bankName"),
    branchName: yup
      .string()
      .required("Please enter valid branchName"),
    branchCode: yup
      .string()
      .required()
      .matches(/^[a-zA-Z0-9 ]*$/, "Branch code is not valid"),
    bankAddress: yup.string().required("Please enter valid bankAddress"),
    ifsccode: yup
      .string()
      .required("Please enter IFSC code")
      .matches(/^[A-Z]{4}[0-9]{7}$/, "IFSC code is not valid"),
    micrcode: yup
      .string()
      .required("Please enter MICR code")
      .matches(/^[0-9]*$/, "MICR code is not valid"),
    isAccLinkedWithAadhar: yup.boolean().notRequired().default(false),
  })
  .required();

const BankInfo = (props: any) => {
  const onlineStudentData = useSelector(getAllOnlineStudentData);
  const getStudentInfoStatus = useSelector(getStatusOnlineStudentData);
  const [next, setNext] = useState(false);
  let { value: personType } = CommonOptionHook(
    true,
    commonMastersIds.PERSON_TYPE
  );
  let { value: accountType } = CommonOptionHook(
    true,
    commonMastersIds.ACCOUNT_TYPE
  );
  const dispatch = useDispatch();
  const { control, resetField, handleSubmit, formState, setValue } = useForm({
    resolver: yupResolver(bankInfoSchema),
    defaultValues: {
      personType: "",
      accountType: "",
      accountNo: "",
      confirmAccountNo: "",
      accountHolderName: "",
      bankName: "",
      branchName: "",
      branchCode: "",
      bankAddress: "",
      ifsccode: "",
      micrcode: "",
      isAccLinkedWithAadhar: false,
    },
    mode: "onChange",
  });

  let { isValid } = formState;

  // useEffect(() => {
  //   setValid(isValid);
  // }, [isValid]);

  useEffect(() => {
    if (onlineStudentData) {
      if (
        onlineStudentData.onlineBankDetailsVMList.length > 0 &&
        onlineStudentData.onlineBankDetailsVMList[0].id &&
        onlineStudentData.onlineBankDetailsVMList[0].id > 0
      ) {
        const onlineBankInfo = onlineStudentData.onlineBankDetailsVMList[0];
        setValue("personType", onlineBankInfo.personType);
        setValue("accountType", onlineBankInfo.accountType);
        setValue("accountNo", onlineBankInfo.accountNo);
        setValue("confirmAccountNo", onlineBankInfo.accountNo);
        setValue("accountHolderName", onlineBankInfo.accountHolderName);
        setValue("bankName", onlineBankInfo.bankName);
        setValue("branchName", onlineBankInfo.branchName);
        setValue("branchCode", onlineBankInfo.branchCode);
        setValue("bankAddress", onlineBankInfo.bankAddress);
        setValue("ifsccode", onlineBankInfo.ifsccode);
        setValue("micrcode", onlineBankInfo.micrcode);
        setValue("isAccLinkedWithAadhar", onlineBankInfo.isAccLinkedWithAadhar);
        setNext(true);
      }
    }
  }, []);

  const [nextButtonStatus, setNextButtonStatus] = useState(true);
  useEffect(() => {
    const fetchNextButton = async () => {
      try {
        setNextButtonStatus(
          (getStudentInfoStatus && isValid) || next ? false : true
        );
      } catch (error: any) {
        console.log("error", error);
      }
    };
    fetchNextButton();
  }, [getStudentInfoStatus, isValid, next]);

  const onSubmit = (data: any) => {
    try {
      const request = {
        onlineUserId: onlineStudentData && onlineStudentData.onlineUserId,
        onlineStudentAdmissionId: onlineStudentData && onlineStudentData.id,
        onlineBankDetailsVMList: [
          {
            id:
              onlineStudentData.onlineBankDetailsVMList.length > 0 &&
              onlineStudentData.onlineBankDetailsVMList[0].id &&
              onlineStudentData.onlineBankDetailsVMList[0].id > 0
                ? onlineStudentData.onlineBankDetailsVMList[0].id
                : 0,
            onlineStudentAdmissionId: onlineStudentData.id,
            isActive: true,
            createdBy: 0,
            createdDate: new Date(),
            updatedBy: 0,
            updatedDate: new Date(),
            personType: data.personType,
            accountType: data.accountType,
            ifsccode: data.ifsccode,
            bankName: data.bankName,
            branchName: data.branchName,
            branchCode: data.branchCode,
            bankAddress: data.bankAddress,
            accountNo: data.accountNo,
            accountHolderName: data.accountHolderName,
            micrcode: data.micrcode,
            canceledChequePath: "",
            isAccLinkedWithAadhar: data.isAccLinkedWithAadhar,
          },
        ],
      };
      dispatch(actions.loadSaveUpdateBankInfoOnlineAdmission(request));
    } catch (error) {
      console.log(error, "error");
    }
  };


  useEffect(()=>{
    if(getStudentInfoStatus){
      dispatch(actions.setStatusOnlineStudentData(false));
      props.onChildClick(1);
    }
  },[getStudentInfoStatus])
  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography component="p" marginBottom={2}>
          Bank Info
        </Typography>

        <Grid container spacing={2}>
          <Grid item container sm={4}>
            <SelectCommonController
              control={control}
              name="personType"
              label="Person Type*"
              options={personType}
            />
          </Grid>

          <Grid item container sm={4}>
            <SelectCommonController
              control={control}
              name="accountType"
              label="Account Type*"
              options={accountType}
            />
          </Grid>

          <Grid item container sm={4}>
            <InputController
              control={control}
              name="accountNo"
              label="Account No.*"
              resetClick={() => resetField("accountNo")}
            />
          </Grid>

          <Grid item container sm={4}>
            <InputController
              control={control}
              name="confirmAccountNo"
              label="Confirm Account No.*"
              resetClick={() => resetField("confirmAccountNo")}
            />
          </Grid>

          <Grid item container sm={4}>
            <InputController
              control={control}
              name="accountHolderName"
              label="Account Holder Name*"
              resetClick={() => resetField("accountHolderName")}
            />
          </Grid>

          <Grid item container sm={4}>
            <InputController
              control={control}
              name="bankName"
              label="Bank Name*"
              resetClick={() => resetField("bankName")}
            />
          </Grid>

          <Grid item container sm={4}>
            <InputController
              control={control}
              name="branchName"
              label="Branch Name*"
              resetClick={() => resetField("branchName")}
            />
          </Grid>

          <Grid item container sm={4}>
            <InputController
              control={control}
              name="branchCode"
              label="Branch Code*"
              resetClick={() => resetField("branchCode")}
            />
          </Grid>

          <Grid item container sm={4}>
            <InputController
              control={control}
              name="bankAddress"
              label="Branch Address*"
              resetClick={() => resetField("bankAddress")}
            />
          </Grid>

          <Grid item container sm={4}>
            <InputController
              control={control}
              name="ifsccode"
              label="IFSC Code*"
              resetClick={() => resetField("ifsccode")}
            />
          </Grid>

          <Grid item container sm={4}>
            <InputController
              control={control}
              name="micrcode"
              label="MICR Code*"
              resetClick={() => resetField("micrcode")}
            />
          </Grid>

          <Grid item container sm={4}>
            <CheckboxController
              control={control}
              name="isAccLinkedWithAadhar"
              label="Is Account linked With Aadhar?*"
            />
          </Grid>
        </Grid>

        <Grid
          display={"flex"}
          gap={1}
          justifyContent={"flex-end"}
          paddingTop={"5vh"}
        >
          <Button variant="outlined" onClick={()=>props.onChildClick(-1)}>
            Previous
          </Button>
          <Button variant="contained" type="submit" disabled={!isValid && getStudentInfoStatus }>
            Save & Next
          </Button>
          
        </Grid>
      </form>
    </Box>
  );
};

export default BankInfo;
