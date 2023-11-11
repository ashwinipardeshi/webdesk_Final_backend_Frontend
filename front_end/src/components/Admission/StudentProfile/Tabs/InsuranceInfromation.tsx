import { Grid, Box, Typography, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { DateController, InputController } from "../../../../control";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../../../store/Admission/offlineAdmission/offlineAdmission";
import { getAllOfflineStudentData } from "../../../../store/Admission/offlineAdmission/offlineAdmission";
import { RelationOptionHook } from "../../../../hooks/globalMasters/relationHooks";
import { SelectCommonController } from "../../../../control/SelectCommonController";
import { getOnlineUserId } from "../../../../store/Authentication/authentication";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const insuranceInformationSchema = yup.object({
    lastName: yup.string().required('Please enter last name'),
    firstName: yup.string().required('Please enter first name'),
    middleName: yup.string().notRequired(),
    relation: yup.string().required('Please select relation'),
    studentParentBeneficiary: yup.string().required('Please enter parent beneficiary'),
    studentParentBenefit: yup.string().required('Please enter parent benefit'),
    sumInsured: yup.string().required('Please enter sum insured'),
    insurancePremium: yup.string().required('Please enter insurance premium'),
    dateOfBirth: yup.string().required('Please enter date of birth'),
    age: yup.string().required('Please enter age'),
    aadharNo: yup.string().required('Please enter aadhar no.'),
}).required()

const InsuranceInfromation = (props: any) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const offlineUserData = useSelector(getAllOfflineStudentData);
    const userId = useSelector(getOnlineUserId);
    const { relationoptiondata: RelationTypeOption } = RelationOptionHook(true);
    const { control, resetField, handleSubmit, reset, setValue } = useForm({
        resolver: yupResolver(insuranceInformationSchema),
        defaultValues: {
            lastName: "",
            firstName: "",
            middleName: "",
            relation: "",
            studentParentBeneficiary: "",
            studentParentBenefit: "",
            sumInsured: "",
            insurancePremium: "",
            dateOfBirth: "",
            age: "",
            aadharNo: "",
        },
        mode: 'onChange'
    });

    useEffect(() => {
        if (offlineUserData) {
            const offlineInsuranceDetails = offlineUserData.offlineInsuranceDetailsVMList
            if (offlineInsuranceDetails.length > 0) {
                setValue('aadharNo', offlineInsuranceDetails[0].aadharNo);
                setValue('age', String(offlineInsuranceDetails[0].age));
                setValue('dateOfBirth', offlineInsuranceDetails[0].dateOfBirth);
                setValue('firstName', offlineInsuranceDetails[0].firstName);
                setValue('insurancePremium', String(offlineInsuranceDetails[0].insurancePremium));
                setValue('lastName', offlineInsuranceDetails[0].lastName);
                setValue('middleName', offlineInsuranceDetails[0].middleName);
                setValue('relation', offlineInsuranceDetails[0].relation);
                setValue('studentParentBeneficiary', offlineInsuranceDetails[0].studentParentBeneficiary);
                setValue('studentParentBenefit', offlineInsuranceDetails[0].studentParentBenefit);
                setValue('sumInsured', offlineInsuranceDetails[0].sumInsured);
            }
        }
    }, [])

    const onSubmit = (data: any) => {
        try {
            const finalData = {
                userId: userId,
                studentAdmissionId: offlineUserData && offlineUserData?.id,
                offlineInsuranceDetailsVMList: [
                    {
                        ...data,
                        id: 0,
                        age: Number(data.age),
                        insurancePremium: Number(data.insurancePremium),
                        isActive: true,
                        createdBy: 0,
                        createdDate: new Date(),
                        updatedBy: 0,
                        updatedDate: new Date(),
                        userId: userId,
                        studentAdmissionId: offlineUserData && offlineUserData?.id,
                    }
                ]
            }
            dispatch(actions.loadSaveUpdateInsuranceInfoOfflineAdmission(finalData));
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Box p={2}>
            <Typography component="p" marginBottom={2}>Insurance Information</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item container sm={4}>
                        <SelectCommonController control={control} name="relation" label="Relation" options={RelationTypeOption} />
                    </Grid>
                    <Grid item container sm={4}>
                        <InputController control={control} name="firstName" label="First Name *" resetClick={() => resetField("firstName")} />
                    </Grid>
                    <Grid item container sm={4}>
                        <InputController control={control} name="middleName" label="Middle Name" resetClick={() => resetField("middleName")} />
                    </Grid>
                    <Grid item container sm={4}>
                        <InputController control={control} name="lastName" label="Last Name *" resetClick={() => resetField("lastName")} />
                    </Grid>
                    <Grid item container sm={4}>
                        <DateController control={control} name="dateOfBirth" label="Date of Birth *" />
                    </Grid>
                    <Grid item container sm={4}>
                        <InputController control={control} name="age" label="Age *" resetClick={() => resetField("age")} />
                    </Grid>
                    <Grid item container sm={4}>
                        <InputController control={control} name="aadharNo" label="Aadhar No. *" resetClick={() => resetField("aadharNo")} />
                    </Grid>
                    <Grid item container sm={4}>
                        <InputController control={control} name="studentParentBeneficiary" label="Student Parent Beneficiary *" resetClick={() => resetField("studentParentBeneficiary")} />
                    </Grid>
                    <Grid item container sm={4}>
                        <InputController control={control} name="studentParentBenefit" label="Student Parent Benefit *" resetClick={() => resetField("studentParentBenefit")} />
                    </Grid>
                    <Grid item container sm={4}>
                        <InputController control={control} name="sumInsured" label="Sum Insured *" resetClick={() => resetField("sumInsured")} />
                    </Grid>
                    <Grid item container sm={4}>
                        <InputController control={control} name="insurancePremium" label="Insurance Premium *" resetClick={() => resetField("insurancePremium")} />
                    </Grid>
                </Grid>
                <Grid display={"flex"} justifyContent={"flex-end"} paddingTop={"5vh"} gap={1}>
                    <Button variant="outlined" onClick={() => navigate("/dashboard")}> Cancel </Button>
                    <Button type="submit" variant="contained">Save</Button>
                </Grid>
            </form>
        </Box>

    )
}

export default InsuranceInfromation;