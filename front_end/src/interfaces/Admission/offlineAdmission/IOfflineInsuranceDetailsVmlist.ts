export interface IOfflineInsuranceDetailsVmlist {
    studentAdmissionId: number
    userId: number
    offlineInsuranceDetailsVMList: IOfflineInsuranceDetail[]
  }
  
  export interface IOfflineInsuranceDetail {
    isActive: boolean
    createdBy: number
    createdDate: string
    updatedBy: number
    updatedDate: string
    id: number
    userId: number
    studentAdmissionId: number
    lastName: string
    firstName: string
    middleName: string
    relation: string
    studentParentBeneficiary: string
    studentParentBenefit: string
    sumInsured: string
    insurancePremium: number
    dateOfBirth: string
    age: number
    aadharNo: string
  }
  