export interface IOfflineParentDetailsVmlist {
    studentAdmissionId: number
    userId: number
    offlineParentDetailsVMList: IOfflineParentDetail[]
  }
  
  export interface IOfflineParentDetail {
    isActive: boolean
    createdBy: number
    createdDate: string
    updatedBy: number
    updatedDate: string
    id: number
    userId: number
    studentAdmissionId: number
    relation: number
    livingStatus: string
    title: string
    lastName: string
    firstName: string
    middleName: string
    gender: string
    dateOfBirth: string
    qualification: string
    profession: string
    employedIn: string
    organizationName: string
    designation: string
    income: string
    whatsAppMobileNo: string
    mobileNo: string
    mailId: string
    isDefaultCommunication: boolean
    guaradianRelation: string
    guaradianAddress: string
  }
  