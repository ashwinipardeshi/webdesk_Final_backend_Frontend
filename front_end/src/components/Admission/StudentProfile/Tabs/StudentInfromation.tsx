import { Grid, Box, Typography, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { CheckboxController, DateController, InputController, SelectController } from "../../../../control";
import { CommonOptionHook } from "../../../../hooks/globalMasters/commonMasterHook";
import { commonMastersIds } from "../../../../utils/commonMasterIds";
import { BloodGroupOptionHook } from "../../../../hooks/globalMasters/bloodGroupHooks";
import { DomicileOptionHook } from "../../../../hooks/globalMasters/domicileHooks";
import { MotherTongueOptionHook } from "../../../../hooks/globalMasters/motherTongueHooks";
import { CountryOptionHook } from "../../../../hooks/globalMasters/countryHooks";
import { AnnualIncomeOptionHook } from "../../../../hooks/globalMasters/annualIncomeHooks";
import { ReligionOptionHook } from "../../../../hooks/globalMasters/religionHook";
import { CasteCategoryOptionHook } from "../../../../hooks/globalMasters/casteCategoryHook";
import { CasteOptionHook } from "../../../../hooks/globalMasters/casteHooks";
import { SubCasteOptionHook } from "../../../../hooks/globalMasters/subCasteHooks";
import { HandicapTypeOptionHook } from "../../../../hooks/globalMasters/handicapType";
import { MinorityDetailsOptionHook } from "../../../../hooks/globalMasters/minorityDetailsHooks";
import { MinorityOptionHook } from "../../../../hooks/globalMasters/minorityHooks";
import { actions, getAllOfflineStudentData } from "../../../../store/Admission/offlineAdmission/offlineAdmission";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const studentInformationSchema = yup.object({
    title: yup.string().required('please select title'),
    firstName: yup.string().required('please enter first name'),
    middleName: yup.string().required('please enter middle name'),
    lastName: yup.string().required('please enter last name'),
    nameAsMarkSheet: yup.string().notRequired(),
    gender: yup.string().required("Please select gender"),
    dateOfBirth: yup.string().required("Please select date of birth"),
    placeOfBirth: yup.string().required("Please select place of birth"),
    bloodGroup: yup.string().required("Please select blood group"),
    nationality: yup.string().required("Please select nationality"),
    domicileId: yup.string().required("Please select domicile"),
    motherTounge: yup.string().required("Please select mother tounge"),
    languageKnown: yup.string().required("Please select language Known"),
    aadharNo: yup.string().required("Please enter aadhar no.").matches(/^[0-9]{12}$/, 'Aadhar number must be 12 digits'),
    panNo: yup.string().notRequired(),
    voterId: yup.string().notRequired(),
    drivingLicenceNo: yup.string().notRequired(),
    passportNo: yup.string().notRequired(),
    passportExpiryDate: yup.string().notRequired(),
    maritalStatus: yup.string().required("Please select marital status"),
    annualIncomeId: yup.string().required("Please select annual income"),
    region: yup.string().required("Please select region"),
    noOfSiblings: yup.string().notRequired(),
    childNoInFamily: yup.string().required("Please select child no. in family"),
    religionId: yup.string().required("Please select religion"),
    studentCategoryId: yup.string().required("Please select student category"),
    casteId: yup.string().required("Please select caste"),
    subCasteId: yup.string().required("Please select subcaste"),
    physicallyChallaged: yup.boolean().notRequired().default(false),
    disabilityType: yup.string().when('physicallyChallaged', {
        is: true,
        then: (schema) => schema.required('Please select disability type')
    }),
    isDefenceParent: yup.boolean().notRequired().default(false),
    defenceType: yup.string().when('isDefenceParent', {
        is: true,
        then: (schema) => schema.required('Please select defence type')
    }),
    isMinority: yup.boolean().notRequired().default(false),
    minorityId: yup.string().when('isMinority', {
        is: true,
        then: (schema) => schema.required('Please select minority type')
    }),
    minorityDetailsId: yup.string().when('isMinority', {
        is: true,
        then: (schema) => schema.required('Please select minority type religion')
    }),
}).required()

const StudentInformation = (props: any) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let { value: titleOptions } = CommonOptionHook(true, commonMastersIds.TITLE);
    let { value: genderOptions } = CommonOptionHook(true, commonMastersIds.GENDER);
    let { value: placeOfBirthOptions } = CommonOptionHook(true, commonMastersIds.PLACE_OF_BIRTH);
    const { optionmotherTonguedata } = MotherTongueOptionHook(true);
    const { optionbloodGroupdata } = BloodGroupOptionHook(true);
    const { optiondata } = CountryOptionHook(true);
    const { optiondomiciledata } = DomicileOptionHook(true);
    let { value: languagesKnownOptions } = CommonOptionHook(true, commonMastersIds.LANGUAGES_KNOWN);
    let { value: maritalStatusOptions } = CommonOptionHook(true, commonMastersIds.MARITAL_STATUS);
    const { optionannualIncomedata } = AnnualIncomeOptionHook(true);
    let { value: regionOptions } = CommonOptionHook(true, commonMastersIds.REGION);
    let { value: noOfSiblingsOptions } = CommonOptionHook(true, commonMastersIds.NUMBER_OF_SIBLING);
    let { value: childNoOptions } = CommonOptionHook(true, commonMastersIds.CHILD_NUMBER);
    const { religionoptiondata } = ReligionOptionHook(true);
    const { castecategoryoptiondata } = CasteCategoryOptionHook(true);
    const { optionCasteData } = CasteOptionHook(true);
    const { optionSubCasteData } = SubCasteOptionHook(true);
    let { value: defenceOptions } = CommonOptionHook(true, commonMastersIds.DEFENCE_TYPE);
    const { handicaptypeoptiondata } = HandicapTypeOptionHook(true);
    const { optionminorityDetailsdata } = MinorityDetailsOptionHook(true);
    const { minorityoptiondata } = MinorityOptionHook(true);

    const { control, resetField, handleSubmit, watch, setValue, } = useForm({
        resolver: yupResolver(studentInformationSchema),
        defaultValues: {
            title: '',
            firstName: '',
            middleName: '',
            lastName: '',
            nameAsMarkSheet: '',
            gender: '',
            dateOfBirth: '',
            placeOfBirth: '',
            bloodGroup: '',
            nationality: '',
            domicileId: '',
            motherTounge: '',
            languageKnown: '',
            aadharNo: '',
            panNo: '',
            voterId: '',
            drivingLicenceNo: '',
            passportNo: '',
            passportExpiryDate: '',
            maritalStatus: '',
            annualIncomeId: '',
            region: '',
            noOfSiblings: '',
            childNoInFamily: '',
            religionId: '',
            studentCategoryId: '',
            casteId: '',
            subCasteId: '',
            physicallyChallaged: false,
            disabilityType: '',
            isDefenceParent: false,
            defenceType: '',
            isMinority: false,
            minorityId: '',
            minorityDetailsId: '',
        },
        mode: "onChange",
    })

    const isDefenceParentChecked = watch("isDefenceParent");
    const isPhysicallyChallangedChecked = watch("physicallyChallaged");
    const isMinorityChecked = watch("isMinority");
    const firstNameValue = watch("firstName");
    const middleNameValue = watch("middleName");
    const lastNameValue = watch("lastName");

    const offlineStudentData = useSelector(getAllOfflineStudentData);
    useEffect(() => {
        const setGetOfflineStudentInfo = async () => {
            try {
                if (offlineStudentData !== null && offlineStudentData) {
                    setValue("title", offlineStudentData.title);
                    setValue("firstName", offlineStudentData.firstName);
                    setValue("middleName", offlineStudentData.middleName);
                    setValue("lastName", offlineStudentData.lastName);
                    setValue("gender", offlineStudentData.gender);
                    setValue("dateOfBirth", offlineStudentData.dateOfBirth);
                    setValue("placeOfBirth", offlineStudentData.placeOfBirth);
                    setValue("bloodGroup", offlineStudentData.bloodGroup);
                    setValue("domicileId", offlineStudentData.domicileId.toString());
                    setValue("nationality", offlineStudentData.nationality);
                    setValue("motherTounge", offlineStudentData.motherTounge);
                    setValue("languageKnown", offlineStudentData.languageKnown);
                    setValue("aadharNo", offlineStudentData.aadharNo);
                    setValue("panNo", offlineStudentData.panNo);
                    setValue("voterId", offlineStudentData.voterId);
                    setValue("drivingLicenceNo", offlineStudentData.drivingLicenceNo)
                    setValue("passportNo", offlineStudentData.passportNo)
                    setValue("passportExpiryDate", offlineStudentData.passportExpiryDate)
                    setValue("maritalStatus", offlineStudentData.maritalStatus)
                    setValue("annualIncomeId", offlineStudentData.offlineStudAdmissionAYDetailInsertVM.annualIncomeId.toString());
                    setValue("region", offlineStudentData.region);
                    setValue("noOfSiblings", offlineStudentData.noOfSiblings);
                    setValue("childNoInFamily", offlineStudentData.childNoInFamily);
                    setValue("religionId", offlineStudentData.religionId.toString());
                    setValue("casteId", offlineStudentData.casteId.toString());
                    setValue("studentCategoryId", offlineStudentData.studentCategoryId.toString());
                    setValue("subCasteId", offlineStudentData.subCasteId.toString());
                    setValue("physicallyChallaged", offlineStudentData.physicallyChallaged);
                    setValue("defenceType", offlineStudentData.defenceType);
                    setValue("disabilityType", offlineStudentData.disabilityType);
                    setValue("isDefenceParent", offlineStudentData.isDefenceParent);
                    setValue("isMinority", offlineStudentData.isMinority);
                    setValue("minorityDetailsId", offlineStudentData.minorityDetailsId.toString());
                    setValue("minorityId", offlineStudentData.minorityId.toString());
                }
            } catch (error: any) { }
        };
        setGetOfflineStudentInfo();
    }, [offlineStudentData, setValue]);

    useEffect(() => {
        setValue(
            "nameAsMarkSheet",
            `${firstNameValue || ""} ${middleNameValue || ""} ${lastNameValue || ""
                }`.trim()
        );
    }, [firstNameValue, middleNameValue, lastNameValue, setValue]);


    useEffect(() => {
        if (offlineStudentData?.passportExpiryDate === (null || undefined))
            setValue(
                "passportExpiryDate", ""
            );
    })
    useEffect(() => {
        if (offlineStudentData?.panNo === (null || undefined))
            setValue(
                "panNo", ""
            );
    })

    useEffect(() => {
        if ((offlineStudentData?.passportNo && offlineStudentData?.drivingLicenceNo) === null || undefined) {
            setValue(
                "passportNo", ""
            );
            setValue(
                "drivingLicenceNo", ""
            )
        }
    })
    useEffect(() => {
        if (offlineStudentData?.voterId == null || undefined) {
            setValue(
                "voterId", ""
            );
        }
    })

    const onSubmit = (data: any) => {
        let dd = {
            studentAdmissionId: offlineStudentData?.id,
            academicYearId: offlineStudentData?.offlineStudAdmissionAYDetailInsertVM.academicYearId,
            mobileNo: offlineStudentData?.mobileNo,
            whatsAppMobileNo: "",
            emergencyContactNo: "",
            studentMailId: "",
            admisssionDate: offlineStudentData?.admisssionDate,
            ...data,
            isActive: true,
            createdBy: 0,
            createdDate: new Date(),
            updatedBy: 0,
            updatedDate: new Date(),
            disabilityType: Number(data.disabilityType),
            minorityId: Number(data.minorityId),
            minorityDetailsId: Number(data.minorityDetailsId)
        }
        try {
            dispatch(actions.loadSaveUpdateStudentInfoOfflineAdmission(dd))
        } catch (error: any) {
            console.log(error)
        }
    }
    useEffect(() => {
        !isPhysicallyChallangedChecked ? setValue('disabilityType', '') : setValue("disabilityType", offlineStudentData?.disabilityType)
    }, [isPhysicallyChallangedChecked])
    useEffect(() => {
        !isMinorityChecked ? setValue('minorityId', '') : setValue("minorityId", offlineStudentData?.minorityId.toString())
        !isMinorityChecked ? setValue('minorityDetailsId', '') : setValue("minorityDetailsId", offlineStudentData?.minorityDetailsId.toString())
    }, [isMinorityChecked])
    useEffect(() => {
        !isDefenceParentChecked ? setValue('defenceType', '') : setValue("defenceType", offlineStudentData?.defenceType)
    }, [isDefenceParentChecked])
    return (
        <Box p={2}>
            <Typography component="p" marginBottom={2}>Student Information</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2} mb={2}>
                    <Grid item container sm={4}>
                        <SelectController control={control} name="title" label="Title *" options={titleOptions} />
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item container sm={4}>
                        <InputController control={control} name="firstName" label="First Name *" resetClick={() => resetField("firstName")} />
                    </Grid>
                    <Grid item container sm={4}>
                        <InputController control={control} name="middleName" label="Middle Name *" resetClick={() => resetField("middleName")} />
                    </Grid>
                    <Grid item container sm={4}>
                        <InputController control={control} name="lastName" label="Last Name *" resetClick={() => resetField("lastName")} />
                    </Grid>
                    <Grid item container sm={12}>
                        <InputController control={control} name="nameAsMarkSheet" label="Name as per 10th Marksheet" resetClick={() => resetField("nameAsMarkSheet")} />
                    </Grid>
                    <Grid item container sm={4}>
                        <SelectController control={control} name="gender" label="Gender *" options={genderOptions} />
                    </Grid>
                    <Grid item container sm={4}>
                        <DateController control={control} name="dateOfBirth" label="Date of Birth *" />
                    </Grid>
                    <Grid item container sm={4}>
                        <SelectController control={control} name="placeOfBirth" label="Place of Birth *" options={placeOfBirthOptions} />
                    </Grid>
                    <Grid item container sm={4}>
                        <SelectController control={control} name="bloodGroup" label="Blood Group *" options={optionbloodGroupdata} />
                    </Grid>
                    <Grid item container sm={4}>
                        <SelectController control={control} name="nationality" label="Nationality *" options={optiondata} />
                    </Grid>
                    <Grid item container sm={4}>
                        <SelectController control={control} name="domicileId" label="Domicile" options={optiondomiciledata} />
                    </Grid>
                    <Grid item container sm={4}>
                        <SelectController control={control} name="motherTounge" label="Mother Tounge *" options={optionmotherTonguedata} />
                    </Grid>
                    <Grid item container sm={4}>
                        <SelectController control={control} name="languageKnown" label="Language Known *" options={languagesKnownOptions} />
                    </Grid>
                    <Grid item container sm={4}>
                        <InputController control={control} name="aadharNo" label="Aadhar No. *" resetClick={() => resetField("aadharNo")} />
                    </Grid>
                    <Grid item container sm={4}>
                        <InputController control={control} name="panNo" label="PAN No." resetClick={() => resetField("panNo")} />
                    </Grid>
                    <Grid item container sm={4}>
                        <InputController control={control} name="voterId" label="Voter Id" resetClick={() => resetField("voterId")} />
                    </Grid>
                    <Grid item container sm={4}>
                        <InputController control={control} name="drivingLicenceNo" label="Driving Licence No." resetClick={() => resetField("drivingLicenceNo")} />
                    </Grid>
                    <Grid item container sm={4}>
                        <InputController control={control} name="passportNo" label="Passport No." resetClick={() => resetField("passportNo")} />
                    </Grid>
                    <Grid item container sm={4}>
                        <DateController control={control} name="passportExpiryDate" label="Passport Expiry Date" />
                    </Grid>
                    <Grid item container sm={4}>
                        <SelectController control={control} name="maritalStatus" label="Marital Status *" options={maritalStatusOptions} />
                    </Grid>
                    <Grid item container sm={4}>
                        <SelectController control={control} name="annualIncomeId" label="Annual Income" options={optionannualIncomedata} />
                    </Grid>
                    <Grid item container sm={4}>
                        <SelectController control={control} name="region" label="Region *" options={regionOptions} />
                    </Grid>
                    <Grid item container sm={4}>
                        <SelectController control={control} name="noOfSiblings" label="No. of Siblings" options={noOfSiblingsOptions} />
                    </Grid>
                    <Grid item container sm={4}>
                        <SelectController control={control} name="childNoInFamily" label="Child No. in Family * " options={childNoOptions} />
                    </Grid>
                    <Grid item container sm={4}>
                        <SelectController control={control} name="religionId" label="Religion *" options={religionoptiondata} />
                    </Grid>
                    <Grid item container sm={4}>
                        <SelectController control={control} name="studentCategoryId" label="Category" options={castecategoryoptiondata} />
                    </Grid>
                    <Grid item container sm={4}>
                        <SelectController control={control} name="casteId" label="Caste *" options={optionCasteData} />
                    </Grid>
                    <Grid item container sm={4}>
                        <SelectController control={control} name="subCasteId" label="Sub Caste *" options={optionSubCasteData} />
                    </Grid>
                </Grid>

                <Grid container spacing={2} mt={0}>
                    <Grid item container sm={4}>
                        <CheckboxController control={control} name="physicallyChallaged" label="Physically Challanged?" />
                    </Grid>
                    {isPhysicallyChallangedChecked && (
                        <Grid item container sm={4}>
                            <SelectController control={control} name="disabilityType" label="Disability Type" options={handicaptypeoptiondata} />
                        </Grid>
                    )}

                </Grid>

                <Grid container spacing={2} mt={0}>
                    <Grid item container sm={4}>
                        <CheckboxController control={control} name="isDefenceParent" label="Defence" />
                    </Grid>
                    {isDefenceParentChecked && (
                        <Grid item container sm={4}>
                            <SelectController control={control} name="defenceType" label="Defence Type" options={defenceOptions} />
                        </Grid>
                    )}

                </Grid>

                <Grid container spacing={2} mt={0}>
                    <Grid item container sm={4}>
                        <CheckboxController control={control} name="isMinority" label="Whether belong to Minority?" />
                    </Grid>
                    {isMinorityChecked && (
                        <>
                            <Grid item container sm={4}>
                                <SelectController control={control} name="minorityId" label="Minority Type" options={minorityoptiondata} />
                            </Grid>
                            <Grid item container sm={4}>
                                <SelectController control={control} name="minorityDetailsId" label="Minority Type Religion" options={optionminorityDetailsdata} />
                            </Grid>
                        </>
                    )}

                </Grid>

                <Grid display={"flex"} justifyContent={"flex-end"} paddingTop={"5vh"} gap={1}>
                    <Button variant="outlined" onClick={() => navigate("/dashboard")}> Cancel </Button>
                    <Button type="submit" variant="contained" >Save</Button>
                </Grid>
            </form>
        </Box>
    )

}

export default StudentInformation;