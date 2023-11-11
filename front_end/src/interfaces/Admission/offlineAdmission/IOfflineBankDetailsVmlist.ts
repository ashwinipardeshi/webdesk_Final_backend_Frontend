export interface OfflineBankDetailsVmlist {
    studentAdmissionId: number
    userId: number
    offlineBankDetailsVMList: IOfflineBankDetail[]
  }
  
  export interface IOfflineBankDetail {
    isActive: boolean
    createdBy: number
    createdDate: string
    updatedBy: number
    updatedDate: string
    id: number
    userId: number
    studentAdmissionId: number
    personType: string
    accountType: string
    ifsccode: string
    bankName: string
    branchName: string
    branchCode: string
    bankAddress: string
    accountNo: string
    confirmAccountNo: string
    accountHolderName: string
    micrcode: string
    canceledChequePath: string
    isAccLinkedWithAadhar: boolean
  }
  