import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import {
  SelectController,
  InputController,
  CheckboxController,
} from "../../../../control";
import { useForm } from "react-hook-form";
import { CountryOptionHook } from "../../../../hooks/globalMasters/countryHooks";
import { StateOptionHook } from "../../../../hooks/globalMasters/stateHooks";
import { DistrictOptionHook } from "../../../../hooks/globalMasters/districtHook";
import { TalukaOptionHook } from "../../../../hooks/globalMasters/talukaHooks";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getAllOnlineStudentData,
  getStatusOnlineStudentData,
} from "../../../../store/Admission/onlineAdmission/onlineAdmission";
import { useEffect, useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const communicationInfoSchema = yup
  .object({
    permanentCountryId: yup.string().required("Please select country "),
    permanentStateId: yup.string().required("Please select state "),
    permanentDistrictId: yup.string().required("Please select district "),
    permanentTalukaId: yup.string().required("Please select taluka "),
    permanentCity: yup.string().required("Please enter city "),
    permanentPinCode: yup.string().required("Please enter pincode "),
    permanentFlatNo: yup.string().required("Please enter flat number "),
    permanentBuildingName: yup.string().required("Please enter building name "),
    permanentLandMark: yup.string().notRequired(),
    copyPermanentAddress: yup.boolean().default(false).notRequired(),

    correspondenceCountryId: yup.string().required("Please select country "),
    correspondenceStateId: yup.string().required("Please select state "),
    correspondenceDistrictId: yup.string().required("Please select district "),
    correspondenceTalukaId: yup.string().required("Please select taluka "),
    correspondenceCity: yup.string().required("Please enter city "),
    correspondencePinCode: yup.string().required("Please enter pincode "),
    correspondenceFlatNo: yup.string().required("Please enter flat number "),
    correspondenceBuildingName: yup
      .string()
      .required("Please enter building name "),
    correspondenceLandMark: yup.string().notRequired(),
  })
  .required();

const CommunicationInfo = (props: any) => {
  const { optiondata } = CountryOptionHook(true);
  const { optionstatedata } = StateOptionHook(true);
  const { optionDistrictdata } = DistrictOptionHook(true);
  const { optionTalukaData } = TalukaOptionHook(true);
  const dispatch = useDispatch();
  const getStudentInfoStatus = useSelector(getStatusOnlineStudentData);

  const {
    control,
    resetField,
    handleSubmit,
    setValue,
    watch,
    formState,
    trigger,
  } = useForm({
    resolver: yupResolver(communicationInfoSchema),
    defaultValues: {
      permanentCountryId: "",
      permanentStateId: "",
      permanentDistrictId: "",
      permanentTalukaId: "",
      permanentCity: "",
      permanentPinCode: "",
      permanentFlatNo: "",
      permanentBuildingName: "",
      permanentLandMark: "",
      copyPermanentAddress: false,
      correspondenceCountryId: "",
      correspondenceStateId: "",
      correspondenceDistrictId: "",
      correspondenceTalukaId: "",
      correspondenceCity: "",
      correspondencePinCode: "",
      correspondenceFlatNo: "",
      correspondenceBuildingName: "",
      correspondenceLandMark: "",
    },
    mode: "onChange",
  });
  const [valid, setValid] = useState(true);
  let { isValid } = formState;
  useEffect(() => {
    setValid(isValid);
  }, [isValid]);

  const [nextButtonStatus, setNextButtonStatus] = useState(true);
  useEffect(() => {
    const fetchNextButton = async () => {
      try {
        setNextButtonStatus(getStudentInfoStatus && isValid ? false : true);
      } catch (error: any) {
        console.log("error", error);
      }
    };
    fetchNextButton();
  }, [getStudentInfoStatus, isValid]);
  const checkboxValue = watch("copyPermanentAddress");

  useEffect(() => {
    if (checkboxValue) {
      setValue("correspondenceCountryId", watch("permanentCountryId"));
      setValue("correspondenceStateId", watch("permanentStateId"));
      setValue("correspondenceDistrictId", watch("permanentDistrictId"));
      setValue("correspondenceTalukaId", watch("permanentTalukaId"));
      setValue("correspondenceCity", watch("permanentCity"));
      setValue("correspondencePinCode", watch("permanentPinCode"));
      setValue("correspondenceFlatNo", watch("permanentFlatNo"));
      setValue("correspondenceBuildingName", watch("permanentBuildingName"));
      setValue("correspondenceLandMark", watch("permanentLandMark"));
      setValid(true);
    }
  }, [checkboxValue, setValue, watch]);

  const onlineStudentData = useSelector(getAllOnlineStudentData);

  useEffect(() => {
    const setGetOnlineStudentInfo = async () => {
      try {
        if (onlineStudentData !== null || onlineStudentData !== undefined) {
          setValue("permanentFlatNo", onlineStudentData.permanentFlatNo);
          setValue(
            "permanentBuildingName",
            onlineStudentData.permanentBuildingName
          );
          setValue("permanentPinCode", onlineStudentData.permanentPinCode);
          setValue("permanentLandMark", onlineStudentData.permanentLandMark);
          setValue("permanentCountryId", onlineStudentData.permanentCountryId);
          setValue("permanentCity", onlineStudentData.permanentCity);
          setValue("permanentStateId", onlineStudentData.permanentStateId);
          setValue(
            "permanentDistrictId",
            onlineStudentData.permanentDistrictId
          );
          setValue("permanentTalukaId", onlineStudentData.permanentTalukaId);
          setValue(
            "correspondenceFlatNo",
            onlineStudentData.correspondenceFlatNo
          );
          setValue(
            "correspondenceBuildingName",
            onlineStudentData.correspondenceBuildingName
          );
          setValue(
            "correspondencePinCode",
            onlineStudentData.correspondencePinCode
          );
          setValue(
            "correspondenceLandMark",
            onlineStudentData.correspondenceLandMark
          );
          setValue(
            "correspondenceCountryId",
            onlineStudentData.correspondenceCountryId
          );
          setValue("correspondenceCity", onlineStudentData.correspondenceCity);
          setValue(
            "correspondenceStateId",
            onlineStudentData.correspondenceStateId
          );
          setValue(
            "correspondenceDistrictId",
            onlineStudentData.correspondenceDistrictId
          );
          setValue(
            "correspondenceTalukaId",
            onlineStudentData.correspondenceTalukaId
          );
          setValue(
            "copyPermanentAddress",
            onlineStudentData.copyPermanentAddress
          );
        }
        if (onlineStudentData.permanentFlatNo.length > 0) {
          setNextButtonStatus(false);
        }
      } catch (error: any) {}
    };
    setGetOnlineStudentInfo();
  }, [onlineStudentData, setValue, setNextButtonStatus]);

  const onSubmit = (data: any) => {
    const request = {
      permanentFlatNo: data.permanentFlatNo,
      permanentBuildingName: data.permanentBuildingName,
      permanentPinCode: data.permanentPinCode,
      permanentLandMark: data.permanentLandMark,
      permanentCountryId: data.permanentCountryId,
      permanentCity: data.permanentCity,
      permanentStateId: data.permanentStateId,
      permanentDistrictId: data.permanentDistrictId,
      permanentTalukaId: data.permanentTalukaId,
      correspondenceFlatNo: data.correspondenceFlatNo,
      correspondenceBuildingName: data.correspondenceBuildingName,
      correspondencePinCode: data.correspondencePinCode,
      correspondenceLandMark: data.correspondenceLandMark,
      correspondenceCountryId: data.correspondenceCountryId,
      correspondenceCity: data.correspondenceCity,
      correspondenceStateId: data.correspondenceStateId,
      correspondenceDistrictId: data.correspondenceDistrictId,
      correspondenceTalukaId: data.correspondenceTalukaId,
      isPermanantCommunication: true,
      isCorrespondenceCommunication: true,
      isActive: true,
    };
    dispatch(actions.loadSaveUpdateCommunicationInfoOnlineAdmission(request));
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
          Permanent Address Info
        </Typography>
        <Grid container spacing={2}>
          <Grid item container sm={4}>
            <SelectController
              control={control}
              name="permanentCountryId"
              label="Country*"
              options={optiondata}
            />
          </Grid>

          <Grid item container sm={4}>
            <SelectController
              control={control}
              name="permanentStateId"
              label="State*"
              options={optionstatedata}
            />
          </Grid>

          <Grid item container sm={4}>
            <SelectController
              control={control}
              name="permanentDistrictId"
              label="District*"
              options={optionDistrictdata}
            />
          </Grid>

          <Grid item container sm={4}>
            <SelectController
              control={control}
              name="permanentTalukaId"
              label="Taluka*"
              options={optionTalukaData}
            />
          </Grid>

          <Grid item container sm={4}>
            <InputController
              control={control}
              name="permanentCity"
              label="City*"
              resetClick={() => resetField("permanentCity")}
            />
          </Grid>

          <Grid item container sm={4}>
            <InputController
              control={control}
              name="permanentPinCode"
              label="PIN Code*"
              resetClick={() => resetField("permanentPinCode")}
            />
          </Grid>

          <Grid item container sm={4}>
            <InputController
              control={control}
              name="permanentFlatNo"
              label="Flat No*"
              resetClick={() => resetField("permanentFlatNo")}
            />
          </Grid>

          <Grid item container sm={4}>
            <InputController
              control={control}
              name="permanentBuildingName"
              label="Building Name*"
              resetClick={() => resetField("permanentBuildingName")}
            />
          </Grid>

          <Grid item container sm={4}>
            <InputController
              control={control}
              name="permanentLandMark"
              label="Landmark if any"
              resetClick={() => resetField("permanentLandMark")}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} alignItems={"center"}>
          <Grid
            item
            container
            my={2}
            display={"flex"}
            alignItems={"center"}
            gap={2}
          >
            <Typography component="p">
              Correspondence / Present Address Info
            </Typography>
            <Grid mt={1}>
              <CheckboxController
                control={control}
                name="copyPermanentAddress"
                label="Copy Permanent Address"
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item container sm={4}>
            <SelectController
              control={control}
              name="correspondenceCountryId"
              label="Country*"
              options={optiondata}
            />
          </Grid>

          <Grid item container sm={4}>
            <SelectController
              control={control}
              name="correspondenceStateId"
              label="State*"
              options={optionstatedata}
            />
          </Grid>

          <Grid item container sm={4}>
            <SelectController
              control={control}
              name="correspondenceDistrictId"
              label="District*"
              options={optionDistrictdata}
            />
          </Grid>

          <Grid item container sm={4}>
            <SelectController
              control={control}
              name="correspondenceTalukaId"
              label="Taluka*"
              options={optionTalukaData}
            />
          </Grid>

          <Grid item container sm={4}>
            <InputController
              control={control}
              name="correspondenceCity"
              label="City*"
              resetClick={() => resetField("correspondenceCity")}
            />
          </Grid>

          <Grid item container sm={4}>
            <InputController
              control={control}
              name="correspondencePinCode"
              label="PIN Code*"
              resetClick={() => resetField("correspondencePinCode")}
            />
          </Grid>

          <Grid item container sm={4}>
            <InputController
              control={control}
              name="correspondenceFlatNo"
              label="Flat No*"
              resetClick={() => resetField("correspondenceFlatNo")}
            />
          </Grid>

          <Grid item container sm={4}>
            <InputController
              control={control}
              name="correspondenceBuildingName"
              label="Building Name*"
              resetClick={() => resetField("correspondenceBuildingName")}
            />
          </Grid>

          <Grid item container sm={4}>
            <InputController
              control={control}
              name="correspondenceLandMark"
              label="Landmark if any"
              resetClick={() => resetField("correspondenceLandMark")}
            />
          </Grid>
        </Grid>

        <Grid
          display={"flex"}
          gap={1}
          justifyContent={"flex-end"}
          paddingTop={"5vh"}
        >
          <Button variant="outlined" >
            Previous
          </Button>
          <Button variant="contained" type="submit" disabled={!valid && getStudentInfoStatus}>
            Save & Next
          </Button>
        </Grid>
      </form>
    </Box>
  );
};

export default CommunicationInfo;
