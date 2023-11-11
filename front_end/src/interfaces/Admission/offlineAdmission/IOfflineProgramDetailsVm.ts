export interface OfflineAdmissionStudentProgramDetailsVm {
    offlineAdmissionStudentProgramDetailsVM: IOfflineAdmissionStudentProgramDetail
    offlineStudAdmissionAYDetailVM: IOfflineStudAdmissionAydetailVm
  }
  
  export interface IOfflineAdmissionStudentProgramDetail {
    isActive: boolean
    createdBy: number
    createdDate: string
    updatedBy: number
    updatedDate: string
    studentAdmissionId: number
    userId: number
    collegeId: number
    academicYearId: number
    seatTypeId: number
    candidatureTypeId: number
    studentCode: string
    prnno: string
    stateMeritListNo: string
    nationalMeritListNo: string
    admittedThrough: number
    admisssionDate: string
    stateMeritMarks: string
    nationalMeritMarks: string
    domicileId: number
    mahaDbtApplicationNo: string
    modeOfAdmission: number
    eligiblityNo: string
    religionId: number
    studentCategoryId: number
    casteId: number
    subCasteId: number
    minorityId: number
    minorityDetailsId: number
    region: string
  }
  
  export interface IOfflineStudAdmissionAydetailVm {
    isActive: boolean
    createdBy: number
    createdDate: string
    updatedBy: number
    updatedDate: string
    userId: number
    studentAdmissionId: number
    academicYearId: number
    programYearId: number
    programId: number
    branchId: number
    academicStatusId: number
    reasonOfAcademicStatus: string
    admissionCategoryId: number
    examStatus: number
    passoutStatus: number
  }
  