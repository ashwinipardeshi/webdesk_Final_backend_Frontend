export interface OfflinePreviousAcademicDetailsVmlist {
    studentAdmissionId: number
    userId: number
    offlinePreviousAcademicDetailsVMList: IOfflinePreviousAcademicDetail[]
    offlineHscmarkDetailVM: IOfflineHscmarkDetailVm
    offlineEntranceExamDetailsVMList: IOfflineEntranceExamDetail[]
  }
  
  export interface IOfflinePreviousAcademicDetail {
    isActive: boolean
    createdBy: number
    createdDate: string
    updatedBy: number
    updatedDate: string
    id: number
    userId: number
    studentAdmissionId: number
    academicClass: string
    schoolCollege: string
    boardUniversity: string
    month: string
    year: number
    seatNo: string
    marksObtained: number
    outOf: number
    percentage: number
  }
  
  export interface IOfflineHscmarkDetailVm {
    isActive: boolean
    createdBy: number
    createdDate: string
    updatedBy: number
    updatedDate: string
    id: number
    userId: number
    studentAdmissionId: number
    physicsMarks: number
    chemistryMarks: number
    mathsMarks: number
    biologyMarks: number
    englishMarks: number
    vocationSubject: string
    vocationSubjectMarks: number
    qualifyingTotal: number
  }
  
  export interface IOfflineEntranceExamDetail {
    isActive: boolean
    createdBy: number
    createdDate: string
    updatedBy: number
    updatedDate: string
    id: number
    userId: number
    studentAdmissionId: number
    entranceType: string
    rollNumber: string
    physicsMarks: number
    chemistryMarks: number
    mathsMarks: number
    totalMarks: number
  }
  