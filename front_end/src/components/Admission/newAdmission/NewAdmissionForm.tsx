import { Box, Button, Divider, Grid, Paper } from "@mui/material";
import MastersHeader from "../../../layouts/MastersHeader";
import { useMasterTableStyles } from "../../../assets/style/mastersTableStyle";
import { DateController, InputController, SelectController } from "../../../control";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { AcademicYearOptionHook } from "../../../hooks/masters/academicYearHooks";
import { ReservationCategoryOptionHook } from "../../../hooks/masters/reservationCategoryHooks";
import { SeatTypeOptionHook } from "../../../hooks/masters/seatTypeHooks";
import { ProgramOptionHook } from '../../../hooks/masters/programHooks';
import { ProgramYearOptionHook } from '../../../hooks/masters/programYearHooks';
import { BranchOptionHook } from '../../../hooks/masters/branchMasterHook';
import { DomicileOptionHook } from '../../../hooks/globalMasters/domicileHooks';
import { AdmissionTypeOptionHook } from '../../../hooks/masters/admissionTypeHooks';
import { useEffect, useState } from "react";
import { getCollegeId, getOnlineUserId } from "../../../store/Authentication/authentication";
import { useSelector } from "react-redux";
import { actions } from "../../../store/Admission/offlineAdmission/offlineAdmission";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { CommonOptionHook } from "../../../hooks/globalMasters/commonMasterHook";
import { commonMastersIds } from "../../../utils/commonMasterIds";

const newAdmissionFormSchema = yup.object({
    academicYearId: yup.string().required("Please select admission year"),
    admissionDate: yup.string().required("Please select admission date"),
    studentCategoryId: yup.string().required("Please select student category"),
    admittedThrough: yup.string().required("Please select admission type"),
    seatTypeId: yup.string().required("Please select seat type"),
    admissionCategoryId: yup.string().required("Please select admission category"),
    programId: yup.string().required("Please select program"),
    programYearId: yup.string().required("Please select program year"),
    branchId: yup.string().required("Please select branch"),
    domicileId: yup.string().required("Please select domicile"),
    firstName: yup.string().matches(/^[a-zA-Z ]*$/, 'Enter characters only').required("Please enter first name"),
    middleName: yup.string().matches(/^[a-zA-Z ]*$/, 'Enter characters only').required("Please enter middle name"),
    lastName: yup.string().matches(/^[a-zA-Z ]*$/, 'Enter characters only').required("Please enter last name"),
    gender: yup.string().required("Please select gender"),
    dateOfBirth: yup.string().required("Please select date of birth"),
    mobileNo: yup.string().required("Please enter mobile number").matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits'),
    parentMobileNo: yup.string().required("Please enter parent's mobile number").matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits'),
    studentMailId: yup.string().email('Invalid email format').required("Please enter student's email"),
    parentMailId: yup.string().email('Invalid email format').required("Please enter parent's email"),
    studentCodeId: yup.string().notRequired(),
    studentCode: yup.string().notRequired(),
    allotmentCategory: yup.string().notRequired(),
    reasonOfAcademicStatus: yup.string().notRequired(),
    examStatus: yup.string().notRequired(),
    passoutStatus: yup.string().notRequired(),
    drivingLicenceNo: yup.string().notRequired(),
    region: yup.string().notRequired(),
    academicStatusId: yup.string().notRequired(),
    nameAsMarkSheet: yup.string().notRequired(),
    annualIncomeId: yup.string().notRequired(),
    title: yup.string().notRequired(),
}).required()

const NewAdmissionForm = () => {
    const navigate = useNavigate();
    const collegeID = useSelector(getCollegeId);
    const offlineUserId = useSelector(getOnlineUserId);
    const dispatch = useDispatch();
    const [selectedProgramId, setSelectedProgramId] = useState<number | null>(null);
    const { optionAcademicYearData: academicYearOptions } = AcademicYearOptionHook(true);
    const { optionReservationCategoryData: reservationCategoryOptions } = ReservationCategoryOptionHook(true);
    const { optionAdmissionTypeData: admissionTypeOptions } = AdmissionTypeOptionHook(true);
    const { optionSeatTypeData: seatTypeOptions } = SeatTypeOptionHook(true);
    const { optionProgramData: programOptions } = ProgramOptionHook(true);
    const { programyearoptiondata: programYearOptions } = ProgramYearOptionHook(true);
    const { optionBranchData: branchOptions } = BranchOptionHook(true, Number(selectedProgramId));
    const { optiondomiciledata: domicileOptions } = DomicileOptionHook(true);
    let { value: titleOptions } = CommonOptionHook(true, commonMastersIds.TITLE);
    let { value: genderOptions } = CommonOptionHook(true, commonMastersIds.GENDER);

    const classes = useMasterTableStyles();
    const { control, resetField, handleSubmit, reset, watch } = useForm({
        resolver: yupResolver(newAdmissionFormSchema),
        defaultValues: {
            academicYearId: '', admissionDate: '', studentCategoryId: '', admittedThrough: '', seatTypeId: '', admissionCategoryId: '', programId: '', programYearId: '', branchId: '', domicileId: '', firstName: '', middleName: '', lastName: '', gender: '', dateOfBirth: '', mobileNo: '', parentMobileNo: '', studentMailId: '', parentMailId: ''
        },
        mode: "onChange",
    });

    const programIdValue = watch("programId");

    useEffect(() => {
        setSelectedProgramId(Number(programIdValue));
    }, [programIdValue]);

    const onSubmit = async (data: any) => {
        const dataToSubmit = {
            offlineAdmissionStudentDetailsInsertVM: {
                isActive: true, createdBy: 0, createdDate: new Date(), updatedBy: 0, updatedDate: new Date(), id: 0, userId: offlineUserId, collegeId: collegeID,
                academicYearId: data.academicYearId, title: "", lastName: data.lastName, firstName: data.firstName, middleName: data.middleName, nameAsMarkSheet: "", gender: data.gender.toString(), dateOfBirth: data.dateOfBirth, seatTypeId: data.seatTypeId, domicileId: data.domicileId, religionId: 0, studentCodeId: 0, studentCode: "", allotmentCategory: 0, studentCategoryId: data.studentCategoryId, admisssionDate: data.admissionDate, admittedThrough: data.admittedThrough, studentMailId: data.studentMailId, mobileNo: data.mobileNo, region: "", drivingLicenceNo: "", isPermanantCommunication: false, isCorrespondenceCommunication: false, isLocalCommunication: false, parentMailId: data.parentMailId, parentMobileNo: data.parentMobileNo,
            },
            offlineStudAdmissionAYDetailsInsertVM: {
                isActive: true, createdBy: 0, createdDate: new Date(), updatedBy: 0, updatedDate: new Date(), id: 0, academicYearId: data.academicYearId, programYearId: data.programYearId, branchId: data.branchId, academicStatusId: 0, admissionCategoryId: data.admissionCategoryId, annualIncomeId: 0, reasonOfAcademicStatus: "", programId: data.programId, examStatus: 0, passoutStatus: 0
            }
        };
        try {
            dispatch(actions.loadSaveMainFormOfflineAdmission(dataToSubmit));
            reset();
        } catch (error: any) {
            console.log(error)
        }
    };

    return (
        <>
            <MastersHeader title="New Admission Form" />
            <Paper elevation={1} className={classes.PaperLayout}>
                <Box p={2}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2} mt={1}>
                            <Grid item container sm={4}><SelectController control={control} name="academicYearId" label="Admission Year *" options={academicYearOptions} /></Grid>
                            <Grid item container sm={4}><DateController control={control} name="admissionDate" label="Admission Date *" /></Grid>
                            <Grid item container sm={4}><SelectController control={control} name="studentCategoryId" label="Student Category *" options={reservationCategoryOptions} /></Grid>
                            <Grid item container sm={4}><SelectController control={control} name="admittedThrough" label="Admission Type *" options={admissionTypeOptions} /></Grid>
                            <Grid item container sm={4}><SelectController control={control} name="seatTypeId" label="Seat Type *" options={seatTypeOptions} /></Grid>
                            <Grid item container sm={4}><SelectController control={control} name="admissionCategoryId" label="Admission Category *" options={reservationCategoryOptions} /></Grid>
                            <Grid item container sm={4}><SelectController control={control} name="programId" label="Program *" options={programOptions} /></Grid>
                            <Grid item container sm={4}><SelectController control={control} name="branchId" label="Branch *" options={branchOptions} /></Grid>
                            <Grid item container sm={4}><SelectController control={control} name="programYearId" label="Program Year *" options={programYearOptions} /></Grid>
                            <Grid item container sm={4}><SelectController control={control} name="domicileId" label="Domicile *" options={domicileOptions} /></Grid>
                        </Grid>
                        <Divider sx={{ marginBottom: "1rem", marginTop: "1rem" }} />
                        <Grid container spacing={2}>
                            <Grid item container sm={4}><InputController control={control} name="firstName" label="First Name *" resetClick={() => resetField("firstName")} /></Grid>
                            <Grid item container sm={4}><InputController control={control} name="middleName" label="Middle Name *" resetClick={() => resetField("middleName")} /></Grid>
                            <Grid item container sm={4}><InputController control={control} name="lastName" label="Last Name *" resetClick={() => resetField("lastName")} /></Grid>
                            {/* <Grid item container sm={4}><SelectController control={control} name="gender" label="Gender *" options={genderOption.map(option => ({ id: option.name, name: option.name }))} /></Grid> */}
                            <Grid item container sm={4}><SelectController control={control} name="gender" label="Gender *" options={genderOptions} /></Grid>
                            <Grid item container sm={4}><DateController control={control} name="dateOfBirth" label="Date of Birth *" /></Grid>
                            <Grid item container sm={4}><InputController control={control} name="mobileNo" label="Mobile No. *" resetClick={() => resetField("mobileNo")} /></Grid>
                            <Grid item container sm={4}><InputController control={control} name="parentMobileNo" label="Parent Mobile No. *" resetClick={() => resetField("parentMobileNo")} /></Grid>
                            <Grid item container sm={4}><InputController control={control} name="studentMailId" label="Student Mail Id *" resetClick={() => resetField("studentMailId")} /></Grid>
                            <Grid item container sm={4}><InputController control={control} name="parentMailId" label="Parent Mail Id *" resetClick={() => resetField("parentMailId")} /></Grid>
                        </Grid>
                        <Grid display={"flex"} justifyContent={"flex-end"} paddingTop={"5vh"} gap={1}>
                            <Button variant="outlined" onClick={() => navigate("/dashboard")}> Cancel </Button>
                            <Button type="submit" variant="contained">Submit</Button>
                        </Grid>
                    </form>
                </Box>
            </Paper>
        </>
    );
};

export default NewAdmissionForm;

