import { Grid, Box, Typography, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  DateController,
  InputController,
  SelectController,
} from "../../../../control";
import { ProgramOptionHook } from "../../../../hooks/masters/programHooks";
import { ProgramYearOptionHook } from "../../../../hooks/masters/programYearHooks";
import { CandidatureTypeOptionHook } from "../../../../hooks/globalMasters/candidatureTypeHooks";
import { BranchOptionHook } from "../../../../hooks/masters/branchMasterHook";
import { useEffect, useState } from "react";
import { AdmissionTypeOptionHook } from "../../../../hooks/masters/admissionTypeHooks";
import { AcademicYearOptionHook } from "../../../../hooks/masters/academicYearHooks";
import { AcademicStatusOptionHook } from "../../../../hooks/masters/academicStatusHooks";
import { ModeOfAdmissionOptionHook } from "../../../../hooks/masters/modeOfAdmissionHooks";
import { ReservationCategoryOptionHook } from "../../../../hooks/masters/reservationCategoryHooks";
import { SeatTypeOptionHook } from "../../../../hooks/masters/seatTypeHooks";
import { useDispatch, useSelector } from "react-redux";
import { getAllOfflineStudentData } from "../../../../store/Admission/offlineAdmission/offlineAdmission";
import { actions } from "../../../../store/Admission/offlineAdmission/offlineAdmission";
import {
  actions as loaderActions,
  selectStatus,
} from "../../../../store/loader";
import Loader from "../../../../shade/Loaders/Loaders";
import { useNavigate } from "react-router-dom";

const programInformationSchema = yup
  .object({
    programId: yup.string().required("Please select program"),
    programYearId: yup.string().required("Please select program year"),
    branchId: yup.string().required("please select branch"),
    modeOfAdmission: yup.string().required("Please select mode of admission"),
    seatTypeId: yup.string().required("Please select seat type"),
    admittedThrough: yup.string().required("Please select admitted through"),
    candidatureTypeId: yup.string().required("Please select cadidature type"),
    academicYearId: yup.string().required("Please select academic year"),
    studentCategoryId: yup.string().required("Please select student category"),
    admisssionDate: yup.string().required("Please select admission date"),
    academicStatusId: yup.string().required("Please select academic status"),
    reasonOfAcademicStatus: yup
      .string()
      .required("Please enter reason of status"),
    studentCode: yup.string().notRequired(),
    prnno: yup.string().notRequired(),
    eligiblityNo: yup.string().notRequired(),
    mahaDbtApplicationNo: yup.string().notRequired(),
    stateMeritListNo: yup.string().notRequired(),
    stateMeritMarks: yup.string().notRequired(),
    nationalMeritListNo: yup.string().notRequired(),
    nationalMeritMarks: yup.string().notRequired(),
    isActive: yup.boolean().notRequired().default(false),
    admissionCategoryId: yup.string().required("Please select admission category"),
  })
  .required();

const ProgramInformation = (props: any) => {
  const navigate = useNavigate();
  const loaderStatus = useSelector(selectStatus)
  const dispatch = useDispatch();
  const [program, setProgram] = useState(0);
  const { optionProgramData } = ProgramOptionHook(true);
  const { programyearoptiondata } = ProgramYearOptionHook(true);
  const { candidaturetypeoptiondata } = CandidatureTypeOptionHook(true);
  const { optionBranchData } = BranchOptionHook(true, program);
  const { optionAdmissionTypeData } = AdmissionTypeOptionHook(true);
  const { optionAcademicYearData } = AcademicYearOptionHook(true);
  const { optionAcademicStatusData } = AcademicStatusOptionHook(true);
  const { optionModeOfAdmissionData } = ModeOfAdmissionOptionHook(true);
  const { optionReservationCategoryData } = ReservationCategoryOptionHook(true);
  const { optionSeatTypeData } = SeatTypeOptionHook(true);
  const offlineUserData = useSelector(getAllOfflineStudentData);

  const { control, resetField, handleSubmit, reset, watch, setValue } = useForm(
    {
      resolver: yupResolver(programInformationSchema),
      defaultValues: {
        programId: "",
        programYearId: "",
        branchId: "",
        modeOfAdmission: "",
        seatTypeId: "",
        admittedThrough: "",
        candidatureTypeId: "",
        academicYearId: "",
        studentCategoryId: "",
        admisssionDate: "",
        academicStatusId: "",
        reasonOfAcademicStatus: "",
        studentCode: "",
        prnno: "",
        eligiblityNo: "",
        mahaDbtApplicationNo: "",
        stateMeritListNo: "",
        stateMeritMarks: "",
        nationalMeritListNo: "",
        nationalMeritMarks: "",
        admissionCategoryId: "",
        isActive: true,
      },
      mode: 'onChange'
    }
  );

  useEffect(() => {
    if (offlineUserData && optionProgramData && optionProgramData.length > 0 && !isNaN(offlineUserData.offlineStudAdmissionAYDetailInsertVM.branchId)) {
      const offlineStudAdmissionAYDetailInsertVM = offlineUserData.offlineStudAdmissionAYDetailInsertVM
      offlineStudAdmissionAYDetailInsertVM.branchId && setValue('branchId', offlineStudAdmissionAYDetailInsertVM.branchId.toString())
    }
  }, [offlineUserData, optionProgramData, setValue])

  useEffect(() => {
    if (
      offlineUserData !== null &&
      offlineUserData.offlineStudAdmissionAYDetailInsertVM
    ) {
      dispatch(loaderActions.setStatus("loading"));
      const offlineStudAdmissionAYDetailInsertVM =
        offlineUserData.offlineStudAdmissionAYDetailInsertVM;
      setValue(
        "academicStatusId",
        offlineStudAdmissionAYDetailInsertVM.academicStatusId
          ? offlineStudAdmissionAYDetailInsertVM.academicStatusId.toString()
          : ""
      );
      setValue(
        "academicYearId",
        offlineStudAdmissionAYDetailInsertVM.academicYearId
          ? offlineStudAdmissionAYDetailInsertVM.academicYearId.toString()
          : ""
      );

      setValue(
        "admisssionDate",
        offlineUserData.admisssionDate
          ? offlineUserData.admisssionDate.toString()
          : ""
      );
      setValue(
        "admittedThrough",
        offlineUserData.admittedThrough
          ? offlineUserData.admittedThrough.toString()
          : ""
      );
      setValue(
        "candidatureTypeId",
        offlineUserData.candidatureTypeId
          ? offlineUserData.candidatureTypeId.toString()
          : ""
      );
      setValue(
        "eligiblityNo",
        offlineUserData.eligiblityNo
          ? offlineUserData.eligiblityNo.toString()
          : ""
      );
      setValue(
        "mahaDbtApplicationNo",
        offlineUserData.mahaDbtApplicationNo
          ? offlineUserData.mahaDbtApplicationNo.toString()
          : ""
      );
      setValue(
        "modeOfAdmission",
        offlineUserData.modeOfAdmission
          ? offlineUserData.modeOfAdmission.toString()
          : ""
      );
      setValue(
        "nationalMeritListNo",
        offlineUserData.nationalMeritListNo
          ? offlineUserData.nationalMeritListNo.toString()
          : ""
      );
      setValue(
        "nationalMeritMarks",
        offlineUserData.nationalMeritMarks
          ? offlineUserData.nationalMeritMarks.toString()
          : ""
      );
      setValue(
        "prnno",
        offlineUserData.prnno ? offlineUserData.prnno.toString() : ""
      );
      setValue(
        "programId",
        offlineStudAdmissionAYDetailInsertVM.programId
          ? offlineStudAdmissionAYDetailInsertVM.programId.toString()
          : ""
      );
      setValue(
        "programYearId",
        offlineStudAdmissionAYDetailInsertVM.programYearId
          ? offlineStudAdmissionAYDetailInsertVM.programYearId.toString()
          : ""
      );
      setValue(
        "reasonOfAcademicStatus",
        offlineStudAdmissionAYDetailInsertVM.reasonOfAcademicStatus
          ? offlineStudAdmissionAYDetailInsertVM.reasonOfAcademicStatus
          : ""
      );
      setValue(
        "seatTypeId",
        offlineUserData.seatTypeId ? offlineUserData.seatTypeId.toString() : ""
      );
      setValue(
        "stateMeritListNo",
        offlineUserData.stateMeritListNo
          ? offlineUserData.stateMeritListNo.toString()
          : ""
      );
      setValue(
        "stateMeritMarks",
        offlineUserData.stateMeritMarks
          ? offlineUserData.stateMeritMarks.toString()
          : ""
      );
      setValue(
        "studentCategoryId",
        offlineUserData.studentCategoryId
          ? offlineUserData.studentCategoryId.toString()
          : ""
      );
      setValue(
        "studentCode",
        offlineUserData.studentCode
          ? offlineUserData.studentCode.toString()
          : ""
      );
      setValue(
        "admissionCategoryId",
        offlineUserData.offlineStudAdmissionAYDetailInsertVM
          ? offlineStudAdmissionAYDetailInsertVM.admissionCategoryId.toString()
          : ""
      );
      dispatch(loaderActions.setStatus("idle"));
    }
  }, [dispatch, offlineUserData, setValue]);

  useEffect(() => {
    if (
      offlineUserData !== null &&
      offlineUserData.offlineStudAdmissionAYDetailInsertVM
    ) {
      setProgram(
        offlineUserData.offlineStudAdmissionAYDetailInsertVM.programId
      );
    }
  }, [offlineUserData]);

  const progtamid = watch("programId");
  useEffect(() => {
    setProgram(Number(progtamid));
  }, [progtamid]);

  const onSubmit = (data: any) => {
    const res = {
      offlineAdmissionStudentProgramDetailsVM: {
        isActive: true,
        admisssionDate: data.admisssionDate,
        admittedThrough: Number(data.admittedThrough),
        candidatureTypeId: Number(data.candidatureTypeId),
        eligiblityNo: data.eligiblityNo,
        mahaDbtApplicationNo: data.mahaDbtApplicationNo,
        nationalMeritListNo: data.nationalMeritListNo,
        nationalMeritMarks: data.nationalMeritMarks,
        seatTypeId: Number(data.seatTypeId),
        stateMeritListNo: data.stateMeritListNo,
        stateMeritMarks: data.stateMeritMarks,
        studentCategoryId: Number(data.studentCategoryId),
        academicYearId: Number(data.academicYearId),
        modeOfAdmission: Number(data.modeOfAdmission),
        prnno: data.prnno,
      },
      offlineStudAdmissionAYDetailVM: {
        isActive: true,
        academicStatusId: Number(data.academicStatusId),
        academicYearId: Number(data.academicYearId),
        branchId: Number(data.branchId),
        programId: Number(data.programId),
        programYearId: Number(data.programYearId),
        reasonOfAcademicStatus: data.reasonOfAcademicStatus,
      },
    };
    dispatch(actions.loadSaveUpdateProgramInfoOfflineAdmission(res));
  };

  return (
    <Box p={2}>
      {loaderStatus === "loading" && <Loader />}
      <Typography component="p" marginBottom={2}>
        Program Information
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item container sm={4}>
            <SelectController
              control={control}
              name="programId"
              label="Program *"
              disabled={true}
              options={optionProgramData}
            />
          </Grid>
          <Grid item container sm={4}>
            <SelectController
              control={control}
              name="programYearId"
              label="Program Year *"
              disabled={true}
              options={programyearoptiondata}
            />
          </Grid>
          <Grid item container sm={4}>
            <SelectController
              control={control}
              name="branchId"
              disabled={true}
              label="Branch *"
              options={optionBranchData}
            />
          </Grid>
          <Grid item container sm={4}>
            <SelectController
              control={control}
              name="modeOfAdmission"
              label="Mode of Admission *"
              options={optionModeOfAdmissionData}
            />
          </Grid>
          <Grid item container sm={4}>
            <SelectController
              control={control}
              name="seatTypeId"
              label="Seat Type *"
              options={optionSeatTypeData}
              disabled={true}
            />
          </Grid>
          <Grid item container sm={4}>
            <SelectController
              control={control}
              name="admittedThrough"
              label="Admitted To *"
              options={optionAdmissionTypeData}
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
              name="academicYearId"
              label="Academic Year *"
              options={optionAcademicYearData}
              disabled={true}
            />
          </Grid>
          <Grid item container sm={4}>
            <SelectController
              control={control}
              name="admissionCategoryId"
              label="Admission Category *"
              options={optionReservationCategoryData}
            />
          </Grid>
          <Grid item container sm={4}>
            <DateController
              control={control}
              name="admisssionDate"
              label="Admission Date"
            />
          </Grid>
          <Grid item container sm={4}>
            <SelectController
              control={control}
              name="academicStatusId"
              label="Academic Status *"
              options={optionAcademicStatusData}
            />
          </Grid>
          <Grid item container sm={4}>
            <InputController
              control={control}
              name="reasonOfAcademicStatus"
              label="Reason of Status *"
              resetClick={() => resetField("reasonOfAcademicStatus")}
            />
          </Grid>
          <Grid item container sm={4}>
            <InputController
              control={control}
              name="studentCode"
              label="Student Code(IRN)"
              disabled={true}
            />
          </Grid>
          <Grid item container sm={4}>
            <InputController
              control={control}
              name="prnno"
              label="PRN No."
              resetClick={() => resetField("prnno")}
            />
          </Grid>
          <Grid item container sm={4}>
            <InputController
              control={control}
              name="eligiblityNo"
              label="Eligibility No."
              resetClick={() => resetField("eligiblityNo")}
            />
          </Grid>
          <Grid item container sm={4}>
            <InputController
              control={control}
              name="mahaDbtApplicationNo"
              label="Maha DBT Application No."
              resetClick={() => resetField("mahaDbtApplicationNo")}
            />
          </Grid>
          <Grid item container sm={4}>
            <InputController
              control={control}
              name="stateMeritListNo"
              label="State Merit No."
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
              label="National Merit No."
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

        <Grid
          display={"flex"}
          justifyContent={"flex-end"}
          paddingTop={"5vh"}
          gap={1}
        >
          <Button variant="outlined" onClick={() => navigate("/dashboard")}> Cancel </Button>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </Grid>
      </form>
    </Box>
  );
};

export default ProgramInformation;

