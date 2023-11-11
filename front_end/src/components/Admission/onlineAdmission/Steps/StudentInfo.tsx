import {
  Box,
  Button,
  Grid,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import { useForm } from "react-hook-form";
import {
  DateController,
  SelectController,
  InputController,
  CheckboxController,
} from "../../../../control";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { ProgramOptionHook } from "../../../../hooks/masters/programHooks";
import { AcademicYearOptionHook } from "../../../../hooks/masters/academicYearHooks";
import { ModeOfAdmissionOptionHook } from "../../../../hooks/masters/modeOfAdmissionHooks";
import { SeatTypeOptionHook } from "../../../../hooks/masters/seatTypeHooks";
import { CandidatureTypeOptionHook } from "../../../../hooks/globalMasters/candidatureTypeHooks";
import { ReligionOptionHook } from "../../../../hooks/globalMasters/religionHook";
import { BloodGroupOptionHook } from "../../../../hooks/globalMasters/bloodGroupHooks";
import { CountryOptionHook } from "../../../../hooks/globalMasters/countryHooks";
import { DomicileOptionHook } from "../../../../hooks/globalMasters/domicileHooks";
import { CasteOptionHook } from "../../../../hooks/globalMasters/casteHooks";
import { CasteCategoryOptionHook } from "../../../../hooks/globalMasters/casteCategoryHook";
import { AnnualIncomeOptionHook } from "../../../../hooks/globalMasters/annualIncomeHooks";
import { HandicapTypeOptionHook } from "../../../../hooks/globalMasters/handicapType";
import { MinorityDetailsOptionHook } from "../../../../hooks/globalMasters/minorityDetailsHooks";
import { MinorityOptionHook } from "../../../../hooks/globalMasters/minorityHooks";
import { SelectCommonController } from "../../../../control/SelectCommonController";
import {
  CommonOptionApplicationForHook,
  CommonOptionHook,
} from "../../../../hooks/globalMasters/commonMasterHook";
import {
  CommonMasterByCollegeId,
  commonMastersIds,
} from "../../../../utils/commonMasterIds";
import { ProgramYearOptionHook } from "../../../../hooks/masters/programYearHooks";
import { BranchOptionHook } from "../../../../hooks/masters/branchMasterHook";
import {
  actions,
  getAllOnlineStudentData,
} from "../../../../store/Admission/onlineAdmission/onlineAdmission";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../../../shade/Loaders/Loaders";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
  actions as actionsOnlineAdmission,
  getStatusOnlineStudentData,
} from "../../../../store/Admission/onlineAdmission/onlineAdmission";
import { getUserEmailId, getuserMobileNumber } from "../../../../store/Authentication/authentication";
import { AdmissionTypeOptionHook } from "../../../../hooks/masters/admissionTypeHooks";

const studentInfoSchema = yup
  .object({
    dteapplicationNo: yup.string().notRequired(),
    applicationFor: yup.string().required("Please select application for"),
    programYearId: yup.string().required("Please select admission to"),
    branchId: yup.string().required("Please select branch"),
    academicYearId: yup.string().required("Please select admission year"),
    modeOfAdmission: yup.string().notRequired(),
    seatTypeId: yup.string().notRequired(),
    candidatureTypeId: yup.string().required("Please select candidature type"),
    region: yup.string().required("Please select region"),
    stateMeritListNo: yup.string().notRequired(),
    stateMeritMarks: yup.string().notRequired(),
    nationalMeritListNo: yup.string().notRequired(),
    nationalMeritMarks: yup.string().notRequired(),
    title: yup.string().notRequired(),
    firstName: yup.string().required("Please enter first name"),
    middleName: yup.string().notRequired(),
    lastName: yup.string().required("Please enter last name"),
    nameAsMarkSheet: yup.string().notRequired(),
    gender: yup.string().required("Please select gender"),
    dateOfBirth: yup.string().required("Please select date of birth"),
    placeOfBirth: yup.string().required("Please select place of birth"),
    bloodGroup: yup.string().required("Please select blood group"),
    nationality: yup.string().required("Please select nationality"),
    domicileId: yup.string().required("Please select domicile"),
    religionId: yup.string().required("Please select religion"),
    casteId: yup.string().required("Please select caste"),
    studentCategoryId: yup.string().required("Please select student category"),
    aadharNo: yup.string().matches(/^\d{12}$/, 'Please enter valid aadhar number').required("Please enter aadhar no."),
    panNo: yup.string().notRequired(),
    voterId: yup.string().notRequired(),
    annualIncomeId: yup.string().required("Please enter annual income"),
    isDefenceParent: yup.boolean().default(false),
    defenceType: yup.string().when('isDefenceParent', {
      is: true,
      then: (schema) => schema.required('Please enter defence type')
    }),
    physicallyChallaged: yup.boolean().default(false),
    disabilityType: yup.string().when('physicallyChallaged', {
      is: true,
      then: (schema) => schema.required('Please select disability type')
    }),
    isMinority: yup.boolean().default(false),
    minorityId: yup.string().when('isMinority', {
      is: true,
      then: (s) => s.required('Please select minority type')
    }),
    minorityDetailsId: yup.string().when('isMinority', {
      is: true,
      then: (s) => s.required('Please select minority type religion')
    }),
    mobileNo: yup.string().matches(/^\d{10}$/, 'Please enter mobile number').required("Please enter mobile number"),
    studentMailId: yup
      .string()
      .email("Invalid email address")
      .required("Please enter email address"),
    mobileOtp: yup.string().required("Please enter otp"),
    emailOtp: yup.string().required("Please enter otp"),
    programMasterId: yup.string().notRequired(),
    admittedThrough: yup.string().required("Please enter admission type"),
  })
  .required();


const StudentInfo = (props: any) => {
  const dispatch = useDispatch();
  const [programMasterId, setprogramMasterId] = useState(0);
  const { optionApplicationForData } = CommonOptionApplicationForHook(
    true,
    CommonMasterByCollegeId.APPLICATION_FOR
  );
  const { programyearoptiondata } = ProgramYearOptionHook(true);
  const { optionProgramData } = ProgramOptionHook(true);
  const { optionBranchData } = BranchOptionHook(true, programMasterId);
  const { optionAcademicYearData } = AcademicYearOptionHook(true);
  const { optionModeOfAdmissionData } = ModeOfAdmissionOptionHook(true);
  const { optionSeatTypeData } = SeatTypeOptionHook(true);
  const { candidaturetypeoptiondata } = CandidatureTypeOptionHook(true);
  const { religionoptiondata } = ReligionOptionHook(true);
  let { value: titleOptions } = CommonOptionHook(true, commonMastersIds.TITLE);
  let { value: genderOptions } = CommonOptionHook(
    true,
    commonMastersIds.GENDER
  );
  const { optionbloodGroupdata } = BloodGroupOptionHook(true);
  const { optiondata } = CountryOptionHook(true);
  const { optionAdmissionTypeData: admissionTypeOptions } = AdmissionTypeOptionHook(true);
  const { optionCasteData } = CasteOptionHook(true);
  const { castecategoryoptiondata } = CasteCategoryOptionHook(true);
  const { optionannualIncomedata } = AnnualIncomeOptionHook(true);
  let { value: defenceOptions } = CommonOptionHook(
    true,
    commonMastersIds.DEFENCE_TYPE
  );
  let { value: regionOptions } = CommonOptionHook(
    true,
    commonMastersIds.REGION
  );
  let { value: placeOfBirthOptions } = CommonOptionHook(
    true,
    commonMastersIds.PLACE_OF_BIRTH
  );
  const { handicaptypeoptiondata } = HandicapTypeOptionHook(true);
  const { optionminorityDetailsdata } = MinorityDetailsOptionHook(true);
  const { minorityoptiondata } = MinorityOptionHook(true);
  const { optiondomiciledata } = DomicileOptionHook(true);
  const {
    control,
    resetField,
    handleSubmit,
    formState,
    watch,
    setValue,
    getValues,

  } = useForm({
    mode: "all",
    resolver: yupResolver(studentInfoSchema),
    defaultValues: {
      programMasterId: "",
      dteapplicationNo: "",
      applicationFor: "",
      programYearId: "",
      branchId: "",
      academicYearId: "",
      modeOfAdmission: "",
      seatTypeId: "",
      candidatureTypeId: "",
      region: "",
      stateMeritListNo: "",
      stateMeritMarks: "",
      nationalMeritListNo: "",
      nationalMeritMarks: "",
      title: "",
      firstName: "",
      middleName: "",
      lastName: "",
      nameAsMarkSheet: "",
      gender: "",
      dateOfBirth: "",
      placeOfBirth: "",
      bloodGroup: "",
      nationality: "",
      domicileId: "",
      religionId: "",
      casteId: "",
      studentCategoryId: "",
      aadharNo: "",
      panNo: "",
      voterId: "",
      annualIncomeId: "",
      isDefenceParent: false,
      defenceType: "",
      physicallyChallaged: false,
      disabilityType: "",
      isMinority: false,
      minorityId: "",
      minorityDetailsId: "",
      mobileNo: "",
      studentMailId: "",
      emailOtp: "",
      mobileOtp: "",
      admittedThrough: "",
    },
  });
  const { isValid } = formState;
  const isDefenceParentChecked = watch("isDefenceParent");
  const isphysicallyChallangedChecked = watch("physicallyChallaged");
  const isMinorityChecked = watch("isMinority");
  const firstNameValue = watch("firstName");
  const middleNameValue = watch("middleName");
  const lastNameValue = watch("lastName");
  const [mobileOtpSent, setMobileOtpSent] = useState(false);
  const [mobileTimer, setMobileTimer] = useState<number | null>(null);
  const [canResendMobileOtp, setCanResendMobileOtp] = useState(false);
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailTimer, setEmailTimer] = useState<number | null>(null);
  const [canResendEmailOtp, setCanResendEmailOtp] = useState(false);
  const [mobileError, setMobileError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [displayMobileOtpInput, setDisplayMobileOtpInput] = useState(false);
  const [displayEmailOtpInput, setDisplayEmailOtpInput] = useState(false);
  const userEmail = useSelector(getUserEmailId)
  const program = watch("programMasterId");
  const userMobileNumber = useSelector(getuserMobileNumber)
  const getStudentInfoStatus = useSelector(getStatusOnlineStudentData);
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

  useEffect(() => {
    setprogramMasterId(Number(program));
  }, [program]);

  useEffect(() => {
    dispatch(actions.loadSaveOnlineStudentData());
  }, []);
  const onlineStudentData = useSelector(getAllOnlineStudentData);
  const [loaderStatus, setLoaderStatus] = useState("idle");


  useEffect(() => {
    const setGetOnlineStudentInfo = async () => {
      try {
        if (onlineStudentData !== null || onlineStudentData !== undefined) {
          setValue("aadharNo", onlineStudentData.aadharNo);
          setValue("academicYearId", onlineStudentData.academicYearId);
          setValue("annualIncomeId", onlineStudentData.annualIncomeId);
          setValue("applicationFor", onlineStudentData.applicationFor);
          setValue("bloodGroup", onlineStudentData.bloodGroup);
          setValue("branchId", onlineStudentData.branchId);
          setValue("candidatureTypeId", onlineStudentData.candidatureTypeId);
          setValue("casteId", onlineStudentData.casteId);
          setValue("dateOfBirth", onlineStudentData.dateOfBirth);
          setValue("defenceType", onlineStudentData.defenceType);
          setValue("disabilityType", onlineStudentData.disabilityType);
          setValue("domicileId", onlineStudentData.domicileId);
          setValue("dteapplicationNo", onlineStudentData.dteapplicationNo);
          setValue("firstName", onlineStudentData.firstName);
          setValue("gender", onlineStudentData.gender);
          setValue("isDefenceParent", onlineStudentData.isDefenceParent);
          setValue("isMinority", onlineStudentData.isMinority);
          setValue("lastName", onlineStudentData.lastName);
          setValue("middleName", onlineStudentData.middleName);
          setValue("minorityDetailsId", onlineStudentData.minorityDetailsId);
          setValue("minorityId", onlineStudentData.minorityId);
          setValue("mobileNo", userMobileNumber);
          setValue("mobileOtp", onlineStudentData.mobileOtp);
          setValue("modeOfAdmission", onlineStudentData.modeOfAdmission);
          setValue(
            "nationalMeritListNo",
            onlineStudentData.nationalMeritListNo
          );
          setValue("nationalMeritMarks", onlineStudentData.nationalMeritMarks);
          setValue("nationality", onlineStudentData.nationality);
          setValue("panNo", onlineStudentData.panNo);
          setValue(
            "physicallyChallaged",
            onlineStudentData.physicallyChallaged,
          );
          setValue("placeOfBirth", onlineStudentData.placeOfBirth);
          setValue("programYearId", onlineStudentData.programYearId);
          setValue("region", onlineStudentData.region);
          setValue("religionId", onlineStudentData.religionId);
          setValue("seatTypeId", onlineStudentData.seatTypeId);
          setValue("stateMeritListNo", onlineStudentData.stateMeritListNo);
          setValue("stateMeritMarks", onlineStudentData.stateMeritMarks);
          setValue("studentCategoryId", onlineStudentData.studentCategoryId);
          setValue("studentMailId", userEmail);
          setValue("title", onlineStudentData.title);
          setValue("voterId", onlineStudentData.voterId);
          setValue("programMasterId", onlineStudentData.programMasterId);
          setValue("admittedThrough", onlineStudentData.admittedThrough);
          setNextButtonStatus(false);
        }
      } catch (error: any) { }
    };
    setGetOnlineStudentInfo();
  }, [onlineStudentData, userEmail]);

  useEffect(() => {
    if (userMobileNumber && userEmail) {
      setValue("studentMailId", userEmail);
      setValue("mobileNo", `${userMobileNumber}`);
    }
  }, [userMobileNumber, userEmail])


  const handleGetOTP = (type: "mobile" | "email") => {
    let currentTimer: any;

    if (type === "mobile") {
      const phone = userMobileNumber;
      if (!phone || phone.length !== 10) {
        setMobileError("Please enter a valid mobile number");
        return;
      } else {
        setMobileError(null);
      }
      setMobileOtpSent(true);
      setDisplayMobileOtpInput(true);
      setMobileTimer(60);
      setDisplayMobileOtpInput(true);
      currentTimer = setInterval(() => {
        setMobileTimer((prevTime) => {
          if (prevTime !== null && prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(currentTimer);
            setCanResendMobileOtp(true);
            setDisplayMobileOtpInput(false);
            return 0;
          }
        });
      }, 1000);
    } else if (type === "email") {
      const email = getValues("studentMailId");
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

      if (!email || !emailRegex.test(email)) {
        setEmailError("Please enter a valid email address");
        return;
      } else {
        setEmailError(null);
      }

      setEmailOtpSent(true);
      setDisplayEmailOtpInput(true);
      setEmailTimer(60);
      setDisplayEmailOtpInput(true);

      currentTimer = setInterval(() => {
        setEmailTimer((prevTime) => {
          if (prevTime !== null && prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(currentTimer);
            setCanResendEmailOtp(true);
            setDisplayEmailOtpInput(false);
            return 0;
          }
        });
      }, 1000);
    }
  };

  const handleResendOTP = (type: "mobile" | "email") => {
    if (type === "mobile") {
      setCanResendMobileOtp(false);
      handleGetOTP("mobile");
    } else {
      setCanResendEmailOtp(false);
      handleGetOTP("email");
    }
  };

  useEffect(() => {
    setValue(
      "nameAsMarkSheet",
      `${firstNameValue || ""} ${middleNameValue || ""} ${lastNameValue || ""
        }`.trim()
    );
  }, [firstNameValue, middleNameValue, lastNameValue, setValue]);

  const onSubmit = (data: any) => {
    const { emailOtp, mobileOtp, ...result } = data;
    try {
      dispatch(
        actions.loadSaveUpdateStudentInfoOnlineAdissionAdmission({
          ...result,
          isActive: true,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (getStudentInfoStatus) {
      dispatch(actions.setStatusOnlineStudentData(false));
      props.onChildClick(1);
    }
  }, [getStudentInfoStatus])

  useEffect(() => {
    !isDefenceParentChecked && setValue('defenceType', '')
    !isphysicallyChallangedChecked && setValue('disabilityType', '')
    !isMinorityChecked && setValue('minorityId', '')
    !isMinorityChecked && setValue('minorityDetailsId', '')
  }, [isDefenceParentChecked, isphysicallyChallangedChecked, isMinorityChecked])
  return (
    <Box>
      {loaderStatus === "loading" && <Loader />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography component="p" marginBottom={2}>
          Application No:
        </Typography>

        <Grid container spacing={2}>
          <Grid item container sm={4}>
            <InputController
              control={control}
              name="dteapplicationNo"
              label="DTE Application No."
              resetClick={() => resetField("dteapplicationNo")}
            />
          </Grid>

          <Grid item container sm={4}>
            <SelectController
              control={control}
              name="admittedThrough"
              label="Admission Type *"
              options={admissionTypeOptions}
            />
          </Grid>

          <Grid item container sm={4}>
            <SelectCommonController
              control={control}
              name="applicationFor"
              label="Application For *"
              options={optionApplicationForData}
            />
          </Grid>

          <Grid item container sm={4}>
            <SelectController
              control={control}
              name="programYearId"
              label="Admission To *"
              options={programyearoptiondata}
            />
          </Grid>

          <Grid item container sm={4}>
            <SelectController
              control={control}
              name="programMasterId"
              label="Program Name"
              options={optionProgramData}
            />
          </Grid>

          <Grid item container sm={4}>
            <SelectController
              control={control}
              name="branchId"
              label="Branch *"
              options={optionBranchData}
              disabled={optionBranchData.length === 0 ? true : false}
            />
          </Grid>

          <Grid item container sm={4}>
            <SelectController
              control={control}
              name="academicYearId"
              label="Admission Year *"
              options={optionAcademicYearData}
            />
          </Grid>

          <Grid item container sm={4}>
            <SelectController
              control={control}
              name="modeOfAdmission"
              label="Mode of Admission"
              options={optionModeOfAdmissionData}
            />
          </Grid>

          <Grid item container sm={4}>
            <SelectController
              control={control}
              name="seatTypeId"
              label="Seat Type"
              options={optionSeatTypeData}
            />
          </Grid>

          <Grid item container sm={4}>
            <SelectController
              control={control}
              name="candidatureTypeId"
              label="Candidature Type *"
              options={candidaturetypeoptiondata}
            />
          </Grid>

          <Grid item container sm={4}>
            <SelectController
              control={control}
              name="region"
              label="Region*"
              options={regionOptions}
            />
          </Grid>

          <Grid item container sm={4}>
            <InputController
              control={control}
              name="stateMeritListNo"
              label="State Merit No"
              resetClick={() => resetField("stateMeritListNo")}
            />
          </Grid>

          <Grid item container sm={4}>
            <InputController
              control={control}
              name="stateMeritMarks"
              label="State Merit Marks"
              resetClick={() => resetField("stateMeritMarks")}
            />
          </Grid>

          <Grid item container sm={4}>
            <InputController
              control={control}
              name="nationalMeritListNo"
              label="National Merit No"
              resetClick={() => resetField("nationalMeritListNo")}
            />
          </Grid>

          <Grid item container sm={4}>
            <InputController
              control={control}
              name="nationalMeritMarks"
              label="National Merit Marks"
              resetClick={() => resetField("nationalMeritMarks")}
            />
          </Grid>
        </Grid>

        <Divider sx={{ marginBottom: "1rem", marginTop: "1rem" }} />

        <Typography component="p">Student Details</Typography>

        <Grid container spacing={2}>
          <Grid item my={2} container sm={4}>
            <SelectController
              control={control}
              name="title"
              label="Title"
              options={titleOptions}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
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

          <Grid item container my={0}>
            <InputController
              control={control}
              name="nameAsMarkSheet"
              label="Name As Per 10th Mark Sheet"
              resetClick={() => resetField("nameAsMarkSheet")}
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
            <SelectController
              control={control}
              name="placeOfBirth"
              label="Place of Birth *"
              options={placeOfBirthOptions}
            />
          </Grid>

          <Grid item container sm={4}>
            <SelectController
              control={control}
              name="bloodGroup"
              label="Blood Group *"
              options={optionbloodGroupdata}
            />
          </Grid>

          <Grid item container sm={4}>
            <SelectController
              control={control}
              name="nationality"
              label="Nationality *"
              options={optiondata}
            />
          </Grid>

          <Grid item container sm={4}>
            <SelectController
              control={control}
              name="domicileId"
              label="Domicile *"
              options={optiondomiciledata}
            />
          </Grid>

          <Grid item container sm={4}>
            <SelectController
              control={control}
              name="religionId"
              label="Religion *"
              options={religionoptiondata}
            />
          </Grid>

          <Grid item container sm={4}>
            <SelectController
              control={control}
              name="casteId"
              label="Caste *"
              options={optionCasteData}
            />
          </Grid>

          <Grid item container sm={4}>
            <SelectController
              control={control}
              name="studentCategoryId"
              label="Student Category *"
              options={castecategoryoptiondata}
            />
          </Grid>

          <Grid item container sm={4}>
            <InputController
              control={control}
              name="aadharNo"
              label="Aadhar No. *"
              resetClick={() => resetField("aadharNo")}
            />
          </Grid>

          <Grid item container sm={4}>
            <InputController
              control={control}
              name="panNo"
              label="PAN No."
              resetClick={() => resetField("panNo")}
            />
          </Grid>

          <Grid item container sm={4}>
            <InputController
              control={control}
              name="voterId"
              label="Voter Id"
              resetClick={() => resetField("voterId")}
            />
          </Grid>

          <Grid item container sm={4}>
            <SelectController
              control={control}
              name="annualIncomeId"
              label="Annual Income *"
              options={optionannualIncomedata}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} my={1}>
          <Grid item container sm={4}>
            <CheckboxController
              control={control}
              name="isDefenceParent"
              label="Defence"
            />
          </Grid>

          {isDefenceParentChecked && (
            <Grid item container sm={4}>
              <SelectController
                control={control}
                name="defenceType"
                label="Defence Type"
                options={defenceOptions}
              />
            </Grid>
          )}
        </Grid>

        <Grid container spacing={2} mb={1}>
          <Grid item container sm={4}>
            <CheckboxController
              control={control}
              name="physicallyChallaged"
              label="Physically Challenged"
            />
          </Grid>

          {isphysicallyChallangedChecked && (
            <Grid item container sm={4}>
              <SelectController
                control={control}
                name="disabilityType"
                label="Disability Type"
                options={handicaptypeoptiondata}
              />
            </Grid>
          )}
        </Grid>

        <Grid container spacing={2}>
          <Grid item container sm={4}>
            <CheckboxController
              control={control}
              name="isMinority"
              label="Whether Belong to Minority"
            />
          </Grid>

          {isMinorityChecked && (
            <>
              <Grid item container sm={4}>
                <SelectController
                  control={control}
                  name="minorityId"
                  label="Minority Type"
                  options={minorityoptiondata}
                />
              </Grid>
              <Grid item container sm={4}>
                <SelectController
                  control={control}
                  name="minorityDetailsId"
                  label="Minority Type Religion"
                  options={optionminorityDetailsdata}
                />
              </Grid>
            </>
          )}
        </Grid>

        {/* {nextButtonStatus && !isValid && */}
        {
          <>
            <Divider sx={{ marginBottom: "1rem", marginTop: "1rem" }} />
            <Typography component="p">Verify Mode of Communication</Typography>

            <Grid container spacing={2} my={2}>
              <Grid item container sm={4}>
                <InputController
                  control={control}
                  name="mobileNo"
                  label="Student Mobile No"
                  resetClick={() => resetField("mobileNo")}
                />
              </Grid>

              {displayMobileOtpInput && (
                <Grid item container sm={4}>
                  <InputController
                    control={control}
                    name="mobileOtp"
                    label="Enter OTP for Mobile *"
                  />
                </Grid>
              )}

              <Grid item container sm={4}>
                <Box>
                  {!mobileOtpSent ? (
                    <Button
                      variant="contained"
                      onClick={() => handleGetOTP("mobile")}
                    >
                      Get OTP
                    </Button>
                  ) : (
                    <>
                      {mobileTimer !== null && mobileTimer > 0 && (
                        <Typography>{mobileTimer} seconds remaining</Typography>
                      )}

                      {canResendMobileOtp && (
                        <Button
                          variant="contained"
                          onClick={() => handleResendOTP("mobile")}
                        >
                          Resend OTP
                        </Button>
                      )}
                    </>
                  )}
                </Box>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item container sm={4}>
                <InputController
                  control={control}
                  name="studentMailId"
                  label="Student Email Id"
                  resetClick={() => resetField("studentMailId")}
                />
                {emailError && <Typography color="error">{emailError}</Typography>}
              </Grid>
              {displayEmailOtpInput && (
                <Grid item container sm={4}>
                  <InputController
                    control={control}
                    name="emailOtp"
                    label="Enter OTP for Email *"
                  />
                </Grid>
              )}

              <Grid item container sm={4}>
                <Box>
                  {!emailOtpSent ? (
                    <Button
                      variant="contained"
                      onClick={() => handleGetOTP("email")}
                    >
                      Get OTP
                    </Button>
                  ) : (
                    <>
                      {emailTimer !== null && emailTimer > 0 && (
                        <Typography>{emailTimer} seconds remaining</Typography>
                      )}
                      {canResendEmailOtp && (
                        <Button
                          variant="contained"
                          onClick={() => handleResendOTP("email")}
                        >
                          Resend OTP
                        </Button>
                      )}
                    </>
                  )}
                </Box>
              </Grid>
            </Grid>
          </>
        }
        <Grid
          display={"flex"}
          gap={1}
          justifyContent={"flex-end"}
          paddingTop={"5vh"}
        >
          <Button variant="contained" type="submit" disabled={!isValid} >
            Save & Next
          </Button>
        </Grid>
      </form>
    </Box>
  );
};

export default StudentInfo;
