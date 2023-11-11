export interface IOfflineAdmissionStudentDetailsInsertVM {
    isActive: boolean;
    createdBy: number;
    createdDate: Date;
    updatedBy: number;
    updatedDate: Date;
    id: number;
    userId: number;
    collegeId: number;
    academicYearId: number;
    title: string;
    lastName: string;
    firstName: string;
    middleName: string;
    nameAsMarkSheet: string,
    gender: string;
    dateOfBirth: Date | null;
    seatTypeId: number;
    domicileId: number;
    religionId: number;
    studentCodeId: number;
    studentCode: string;
    allotmentCategory: number;
    studentCategoryId: number;
    admisssionDate: Date | null;
    admittedThrough: number;
    studentMailId: string;
    mobileNo: string;
    region: string;
    drivingLicenceNo: string;
    isPermanantCommunication: boolean;
    isCorrespondenceCommunication: boolean;
    isLocalCommunication: boolean,
    parentMobileNo: string;
    parentMailId: string;
}

export interface IOfflineStudAdmissionAYDetailsInsertVM {
    isActive: boolean;
    createdBy: number;
    createdDate: Date;
    updatedBy: number;
    updatedDate: Date;
    id: number;
    academicYearId: number;
    programYearId: number;
    branchId: number;
    academicStatusId: number;
    admissionCategoryId: number;
    annualIncomeId: number;
    reasonOfAcademicStatus: string;
    programId: number;
    examStatus: number;
    passoutStatus: number
}
export interface IOffilneAdmission extends IOfflineAdmissionStudentDetailsInsertVM, IOfflineStudAdmissionAYDetailsInsertVM {

}
