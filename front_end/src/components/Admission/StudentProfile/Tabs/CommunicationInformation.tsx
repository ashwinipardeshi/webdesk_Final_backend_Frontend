import { Grid, Box, Typography, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { CheckboxController, InputController, SelectController } from "../../../../control";
import { RadioController } from "../../../../control/RadioButtonController";
import { CountryOptionHook } from "../../../../hooks/globalMasters/countryHooks";
import { StateOptionHook } from "../../../../hooks/globalMasters/stateHooks";
import { DistrictOptionHook } from "../../../../hooks/globalMasters/districtHook";
import { TalukaOptionHook } from "../../../../hooks/globalMasters/talukaHooks";
import { useDispatch, useSelector } from "react-redux";
import { actions, getAllOfflineStudentData } from "../../../../store/Admission/offlineAdmission/offlineAdmission";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const radioOptions = [
  {
    label: "Permanent Address",
    value: "Permanent Address",
  },
  {
    label: "Corresponding Address",
    value: "Corresponding Address",
  },
  {
    label: "Local Address",
    value: "Local Address",
  },
];

const communicationInformationSchema = yup.object({
  permanentFlatNo: yup.string().required("Please enter flat number"),
  permanentBuildingName: yup.string().required("Please enter building name"),
  permanentPinCode: yup.string().required("Please enter pin code").matches(/^[0-9]{6}$/, 'Pin code must be 6 digits'),
  permanentLandMark: yup.string().required("Please enter landmark"),
  copyPermanentAddress: yup.boolean(),
  permanentCountryId: yup.string().required("Please select country"),
  permanentCity: yup.string().required("Please enter city"),
  permanentStateId: yup.string().required("Please select state"),
  permanentDistrictId: yup.string().required("Please select district"),
  permanentTalukaId: yup.string().required("Please select taluka"),
  correspondenceFlatNo: yup.string().required().required("Please enter flat number"),
  correspondenceBuildingName: yup.string().required().required("Please enter building name"),
  correspondencePinCode: yup.string().required("Please enter pin code").matches(/^[0-9]{6}$/, 'Pin code must be 6 digits'),
  correspondenceLandMark: yup.string().required("Please enter landmark"),
  correspondenceCountryId: yup.string().required("Please select country"),
  correspondenceCity: yup.string().required("Please enter city"),
  correspondenceStateId: yup.string().required("Please select state"),
  correspondenceTalukaId: yup.string().required("Please select taluka"),
  correspondenceDistrictId: yup.string().required("Please select district"),
  localFlatNo: yup.string().required("Please enter flat number"),
  localBuildingName: yup.string().required("Please enter building name"),
  localCountryId: yup.string().required("Please select country"),
  localCity: yup.string().required("Please enter city"),
  localDistrictId: yup.string().required("Please select district"),
  localTalukaId: yup.string().required("Please select taluka"),
  localStateId: yup.string().required("Please select state"),
  localPinCode: yup.string().required("Please enter pin code").matches(/^[0-9]{6}$/, 'Pin code must be 6 digits'),
  localLandMark: yup.string().required("Please enter landmark"),
  isPermanantCommunication: yup.string().notRequired(),
  isCorrespondenceCommunication: yup.string().notRequired(),
  isLocalCommunication: yup.string().notRequired(),
}).required();

const CommunicationInformation = (props: any) => {
  const navigate = useNavigate();
  const { optiondata } = CountryOptionHook(true)
  const { optionstatedata } = StateOptionHook(true)
  const { optionDistrictdata } = DistrictOptionHook(true)
  const { optionTalukaData } = TalukaOptionHook(true)
  const [permanantCommunication, setPermanantcommuniction] = useState(false);
  const [correspondenceCommunication, setCorrespondenceCommunication] = useState(false);
  const [LocalCommunication, setLocalCommunication] = useState(false);
  const dispatch = useDispatch();
  const offlineStudentData = useSelector(getAllOfflineStudentData);


  const changedefaultvalue = (e: any) => {
    let DefaultCommunication = e.target.value;
    if (DefaultCommunication === "Permanent Address") {

      setPermanantcommuniction(true);
      setCorrespondenceCommunication(false);
      setLocalCommunication(false);

    } else if (DefaultCommunication === "Corresponding Address") {
      setPermanantcommuniction(false);
      setCorrespondenceCommunication(true);
      setLocalCommunication(false);
    } else if (DefaultCommunication === "Local Address") {
      setCorrespondenceCommunication(false);
      setPermanantcommuniction(false);
      setLocalCommunication(true);
    } else {
      setCorrespondenceCommunication(false);
      setPermanantcommuniction(false);
      setLocalCommunication(false);
    }

  };

  const { control, resetField, handleSubmit, setValue, watch, reset, formState } = useForm({
    resolver: yupResolver(communicationInformationSchema),
    defaultValues: {
      permanentFlatNo: '',
      permanentBuildingName: '',
      permanentPinCode: '',
      permanentLandMark: '',
      permanentCountryId: '',
      permanentCity: '',
      permanentStateId: '',
      permanentDistrictId: '',
      permanentTalukaId: '',
      copyPermanentAddress: false,

      correspondenceFlatNo: '',
      correspondenceBuildingName: '',
      correspondencePinCode: '',
      correspondenceLandMark: '',
      correspondenceCountryId: '',
      correspondenceCity: '',
      correspondenceStateId: '',
      correspondenceTalukaId: '',
      correspondenceDistrictId: '',

      localFlatNo: '',
      localBuildingName: '',
      localCountryId: '',
      localCity: '',
      localDistrictId: '',
      localStateId: '',
      localTalukaId: '',
      localPinCode: '',
      localLandMark: '',

      isPermanantCommunication: '',
      isCorrespondenceCommunication: '',
      isLocalCommunication: '',
    },
    mode: 'onChange'
  })

  const checkboxValue = watch('copyPermanentAddress')
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
  }

  useEffect(() => {
    const setGetOfflineStudentInfo = async () => {
      try {
        if (offlineStudentData !== null) {
          setValue("permanentFlatNo", offlineStudentData.permanentFlatNo);
          setValue("permanentBuildingName", offlineStudentData.permanentBuildingName);
          setValue("permanentPinCode", offlineStudentData.permanentPinCode);
          setValue("permanentLandMark", offlineStudentData.permanentLandMark);
          setValue("permanentCountryId", offlineStudentData.permanentCountryId ? offlineStudentData.permanentCountryId.toString() : "");
          setValue("permanentCity", offlineStudentData.permanentCity ? offlineStudentData.permanentCity.toString() : "");
          setValue("permanentStateId", offlineStudentData.permanentStateId ? offlineStudentData.permanentStateId.toString() : "");
          setValue("permanentDistrictId", offlineStudentData.permanentDistrictId ? offlineStudentData.permanentDistrictId.toString() : "");
          setValue("permanentTalukaId", offlineStudentData.permanentTalukaId ? offlineStudentData.permanentTalukaId.toString() : "");
          setValue("correspondenceFlatNo", offlineStudentData.correspondenceFlatNo);
          setValue("correspondenceBuildingName", offlineStudentData.correspondenceBuildingName);
          setValue("correspondencePinCode", offlineStudentData.correspondencePinCode);
          setValue("correspondenceLandMark", offlineStudentData.correspondenceLandMark);
          setValue("correspondenceCountryId", offlineStudentData.correspondenceCountryId ? offlineStudentData.correspondenceCountryId.toString() : "");
          setValue("correspondenceCity", offlineStudentData.correspondenceCity);
          setValue("correspondenceStateId", offlineStudentData.correspondenceStateId ? offlineStudentData.correspondenceStateId.toString() : "");
          setValue("correspondenceDistrictId", offlineStudentData.correspondenceDistrictId ? offlineStudentData.correspondenceDistrictId.toString() : "");
          setValue("correspondenceTalukaId", offlineStudentData.correspondenceTalukaId ? offlineStudentData.correspondenceTalukaId.toString() : "");
          setValue("localFlatNo", offlineStudentData.localFlatNo);
          setValue("localBuildingName", offlineStudentData.localBuildingName);
          setValue("localCountryId", offlineStudentData.localCountryId ? offlineStudentData.localCountryId.toString() : "");
          setValue("localStateId", offlineStudentData.localStateId ? offlineStudentData.localStateId.toString() : "");
          setValue("localCity", offlineStudentData.localCity);
          setValue("localDistrictId", offlineStudentData.localDistrictId ? offlineStudentData.localDistrictId.toString() : "");
          setValue("localTalukaId", offlineStudentData.localTalukaId ? offlineStudentData.localTalukaId.toString() : "");
          setValue("localPinCode", offlineStudentData.localPinCode ? offlineStudentData.localPinCode.toString() : "");
          setValue("localLandMark", offlineStudentData.localLandMark);
          if (offlineStudentData.isPermanantCommunication !== null && offlineStudentData.isPermanantCommunication === true) {
            setValue("isPermanantCommunication", "Permanent Address");
          } else if (offlineStudentData.isCorrespondenceCommunication && offlineStudentData.isCorrespondenceCommunication === true) {
            setValue("isPermanantCommunication", "Corresponding Address");
          } else if (offlineStudentData.isLocalCommunication != null && offlineStudentData.isLocalCommunication === true) {
            setValue("isPermanantCommunication", "Local Address");
          }
        }
      } catch (error: any) { }
    };
    setGetOfflineStudentInfo();
  }, [offlineStudentData, setValue]);

  const onSubmit = (data: any) => {
    try {
      const request =
      {
        permanentFlatNo: data.permanentFlatNo,
        permanentBuildingName: data.permanentBuildingName,
        permanentPinCode: Number(data.permanentPinCode),
        permanentLandMark: data.permanentLandMark,
        permanentCountryId: data.permanentCountryId,
        permanentCity: data.permanentCity,
        permanentStateId: data.permanentStateId,
        permanentDistrictId: data.permanentDistrictId,
        permanentTalukaId: data.permanentTalukaId,
        correspondenceFlatNo: data.correspondenceFlatNo,
        correspondenceBuildingName: data.correspondenceBuildingName,
        correspondencePinCode: Number(data.correspondencePinCode),
        correspondenceLandMark: data.correspondenceLandMark,
        correspondenceCountryId: data.correspondenceCountryId,
        correspondenceCity: data.correspondenceCity,
        correspondenceStateId: data.correspondenceStateId,
        correspondenceDistrictId: data.correspondenceDistrictId,
        correspondenceTalukaId: data.correspondenceTalukaId,
        localFlatNo: data.localFlatNo,
        localBuildingName: data.localBuildingName,
        localCountryId: data.localCountryId,
        localCity: data.localCity,
        localDistrictId: data.localDistrictId,
        localStateId: data.localStateId,
        localTalukaId: data.localTalukaId,
        localPinCode: Number(data.localPinCode),
        localLandMark: data.localLandMark,
        isPermanantCommunication: permanantCommunication,
        isCorrespondenceCommunication: correspondenceCommunication,
        isLocalCommunication: LocalCommunication,
        isActive: true
      }
      dispatch(actions.loadSaveUpdateCommunicationInfoOfflineAdmission(request))
      props.nextTab(1)
    } catch (error: any) { }
  }

  return (
    <Box p={2}>
      <Typography component="p" marginBottom={2}>Permanent Address</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item container sm={4}>
            <SelectController control={control} name="permanentCountryId" label="Country *" options={optiondata} />
          </Grid>

          <Grid item container sm={4}>
            <SelectController control={control} name="permanentStateId" label="State *" options={optionstatedata} />
          </Grid>

          <Grid item container sm={4}>
            <SelectController control={control} name="permanentDistrictId" label="District *" options={optionDistrictdata} />
          </Grid>

          <Grid item container sm={4}>
            <SelectController control={control} name="permanentTalukaId" label="Taluka *" options={optionTalukaData} />
          </Grid>

          <Grid item container sm={4}>
            <InputController control={control} name="permanentCity" label="City *" resetClick={() => resetField("permanentCity")} />
          </Grid>

          <Grid item container sm={4}>
            <InputController control={control} name="permanentPinCode" label="PIN Code *" resetClick={() => resetField("permanentPinCode")} />
          </Grid>

          <Grid item container sm={4}>
            <InputController control={control} name="permanentFlatNo" label="Flat No *" resetClick={() => resetField("permanentFlatNo")} />
          </Grid>

          <Grid item container sm={4}>
            <InputController control={control} name="permanentBuildingName" label="Building Name *" resetClick={() => resetField("permanentBuildingName")} />
          </Grid>

          <Grid item container sm={4}>
            <InputController control={control} name="permanentLandMark" label="Landmark *" resetClick={() => resetField("permanentLandMark")} />
          </Grid>

        </Grid>

        <Grid container spacing={2} alignItems={"center"}>
          <Grid item container my={2} display={"flex"} alignItems={"center"} gap={2}>
            <Typography component="p">Correspondence / Present Address Info</Typography>
            <Grid>
              <CheckboxController control={control} name="copyPermanentAddress" label="Copy Permanent Address" />
            </Grid>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item container sm={4}>
            <SelectController control={control} name="correspondenceCountryId" label="Country *" options={optiondata} />
          </Grid>

          <Grid item container sm={4}>
            <SelectController control={control} name="correspondenceStateId" label="State *" options={optionstatedata} />
          </Grid>

          <Grid item container sm={4}>
            <SelectController control={control} name="correspondenceDistrictId" label="District *" options={optionDistrictdata} />
          </Grid>

          <Grid item container sm={4}>
            <SelectController control={control} name="correspondenceTalukaId" label="Taluka *" options={optionTalukaData} />
          </Grid>

          <Grid item container sm={4}>
            <InputController control={control} name="correspondenceCity" label="City *" resetClick={() => resetField("correspondenceCity")} />
          </Grid>

          <Grid item container sm={4}>
            <InputController control={control} name="correspondencePinCode" label="PIN Code *" resetClick={() => resetField("correspondencePinCode")} />
          </Grid>

          <Grid item container sm={4}>
            <InputController control={control} name="correspondenceFlatNo" label="Flat No *" resetClick={() => resetField("correspondenceFlatNo")} />
          </Grid>

          <Grid item container sm={4}>
            <InputController control={control} name="correspondenceBuildingName" label="Building Name *" resetClick={() => resetField("correspondenceBuildingName")} />
          </Grid>

          <Grid item container sm={4}>
            <InputController control={control} name="correspondenceLandMark" label="Landmark *" resetClick={() => resetField("correspondenceLandMark")} />
          </Grid>
        </Grid>

        <Grid container spacing={2} alignItems={"center"}>
          <Grid item container my={2} display={"flex"} alignItems={"center"} gap={2}>
            <Typography component="p">Local Address Details</Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item container sm={4}>
            <SelectController control={control} name="localCountryId" label="Country *" options={optiondata} />
          </Grid>

          <Grid item container sm={4}>
            <SelectController control={control} name="localStateId" label="State *" options={optionstatedata} />
          </Grid>

          <Grid item container sm={4}>
            <SelectController control={control} name="localDistrictId" label="District *" options={optionDistrictdata} />
          </Grid>

          <Grid item container sm={4}>
            <SelectController control={control} name="localTalukaId" label="Taluka *" options={optionTalukaData} />
          </Grid>

          <Grid item container sm={4}>
            <InputController control={control} name="localCity" label="City *" resetClick={() => resetField("localCity")} />
          </Grid>

          <Grid item container sm={4}>
            <InputController control={control} name="localPinCode" label="PIN Code *" resetClick={() => resetField("localPinCode")} />
          </Grid>

          <Grid item container sm={4}>
            <InputController control={control} name="localFlatNo" label="Flat No *" resetClick={() => resetField("localFlatNo")} />
          </Grid>

          <Grid item container sm={4}>
            <InputController control={control} name="localBuildingName" label="Building Name *" resetClick={() => resetField("localBuildingName")} />
          </Grid>

          <Grid item container sm={4}>
            <InputController control={control} name="localLandMark" label="Landmark *" resetClick={() => resetField("localLandMark")} />
          </Grid>
        </Grid>

        <Grid container spacing={2} mt={3} pl={3}>
          <RadioController control={control} name="isPermanantCommunication" label="Choose default Communication" options={radioOptions} onChange={changedefaultvalue} />
        </Grid>


        <Grid display={"flex"} justifyContent={"flex-end"} paddingTop={"5vh"} gap={1}>
          <Button variant="outlined" onClick={() => navigate("/dashboard")}> Cancel </Button>
          <Button type="submit" variant="contained">Save</Button>
        </Grid>
      </form>

    </Box>
  )
}

export default CommunicationInformation;