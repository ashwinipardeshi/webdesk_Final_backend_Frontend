import { number } from 'echarts'
import { IOfflineBankDetail } from './IOfflineBankDetailsVmlist'
import { IOfflineInsuranceDetail } from './IOfflineInsuranceDetailsVmlist'
import { IOfflineParentDetail } from './IOfflineParentDetailsVmlist'
import { IOfflineEntranceExamDetail, IOfflineHscmarkDetailVm, IOfflinePreviousAcademicDetail } from './IOfflinePreviousAcademicDetailsVmlist'
import { IOfflineVehicleInformation } from './IOfflineVehicleInformationsVmlist'

export interface IOfflineUserData {
  offlineStudAdmissionAYDetailInsertVM: OfflineStudAdmissionAydetailInsertVm
  offlineParentDetailsVMList: IOfflineParentDetail[],
  offlinePreviousAcademicDetailsVMList: IOfflinePreviousAcademicDetail[]
  offlineHscmarkDetailVMList: IOfflineHscmarkDetailVm[]
  offlineEntranceExamDetailsVMList: IOfflineEntranceExamDetail[]
  offlineBankDetailsVMList: IOfflineBankDetail[]
  offlineDocumentListVMList: any[]
  offlineInsuranceDetailsVMList: IOfflineInsuranceDetail[]
  offlineVehicleInformationsVMList: IOfflineVehicleInformation[]
  id: number
  userId: number
  collegeId: number
  academicYearId: number
  collegeName: any
  applicationFor: any
  admissionTypeId: any
  seatTypeId: number
  candidatureTypeId: any
  domicileId: number
  religionId: number
  studentCategoryId: number
  casteId: number
  subCasteId: number
  minorityId: number
  minorityDetailsId: number
  permanentCountryId: number
  permanentCity: string
  permanentStateId: number
  permanentDistrictId: number
  permanentTalukaId: number
  correspondenceCountryId: number
  correspondenceCity: string
  correspondenceStateId: number
  correspondenceDistrictId: number
  correspondenceTalukaId: number
  localFlatNo: string
  localBuildingName: string
  localCountryId: number
  localCity: string
  localStateId: number
  localDistrictId: number
  localTalukaId: number
  localPinCode: number
  localLandMark: any
  studentCode: string
  prnno: any
  stateMeritListNo: number
  nationalMeritListNo: number
  stateMeritMarks: number
  nationalMeritMarks: number
  dteapplicationNo: any
  homeUniversity: any
  mahaDbtApplicationNo: any
  modeOfAdmission: any
  eligiblityNo: any
  allotmentCategory: number
  belongCaste: any
  admittedThrough: number
  grno: any
  title: string
  lastName: string
  firstName: string
  middleName: string
  nameAsMarkSheet: any
  admisssionDate: string
  gender: string
  dateOfBirth: string
  placeOfBirth: any
  talukaOfBirth: any
  maritalStatus: any
  bloodGroup: any
  childNoInFamily: any
  noOfSiblings: any
  motherTounge: any
  nationality: any
  studentMailId: string
  alternateMailId: any
  aadharNo: any
  panNo: any
  isRegisteredWithElection: any
  voterId: any
  mobileNo: string
  whatsAppMobileNo: any
  physicallyChallaged: any
  disabilityType: any
  isMinority: any
  alternateMobileNo: any
  emergencyContactNo: any
  languageKnown: any
  passportNo: any
  passportExpiryDate: any
  isEmployeed: any
  isGapInEducation: any
  noOfYearsInGap: any
  isGraduationResultDeclare: any
  isDefenceParent: any
  defenceType: any
  studentImage: any
  studentSignature: any
  choiceCode: any
  region: any
  permanentFlatNo: any
  permanentBuildingName: any
  permanentPinCode: any
  permanentLandMark: any
  permanentAddressMigration: any
  correspondenceBuildingName: any
  correspondenceFlatNo: any
  correspondencePinCode: any
  correspondenceLandMark: any
  correspondenceAddressMigration: any
  isProfileComplete: any
  drivingLicenceNo: any
  isPermanantCommunication: any
  isCorrespondenceCommunication: any
  isLocalCommunication: any
  parentMailId: string
  parentMobileNo: string
  isActive: boolean
  createdBy: number
  createdDate: string
  updatedBy: any
  updatedDate: any
}

export interface OfflineStudAdmissionAydetailInsertVm {
  id: number
  academicYearId: number
  programYearId: number
  branchId: number
  academicStatusId: number
  admissionCategoryId: number
  annualIncomeId: number
  reasonOfAcademicStatus: string
  programId: number
  examStatus: number
  passoutStatus: number
  isActive: boolean
  createdBy: number
  createdDate: string
  updatedBy: any
  updatedDate: any
}