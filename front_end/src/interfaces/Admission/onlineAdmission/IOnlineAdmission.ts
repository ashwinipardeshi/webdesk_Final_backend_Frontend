export interface IOnlineAdmissionBankInfo {
  isActive: boolean;
  createdBy: number;
  createdDate: string;
  updatedBy: number;
  updatedDate: string;
  id: number;
  onlineStudentAdmissionId: number;
  personType: string;
  accountType: string;
  ifsccode: string;
  bankName: string;
  branchName: string;
  branchCode: string;
  bankAddress: string;
  accountNo: string;
  accountHolderName: string;
  micrcode: string;
  canceledChequePath: string;
  isAccLinkedWithAadhar: boolean;
}

export interface IOnlineParentInfo {
  isActive: boolean;
  createdBy: number;
  createdDate: string;
  updatedBy: number;
  updatedDate: string;
  id: number;
  // onlineStudentAdmissionId: number;
  relation: string;
  livingStatus: string;
  firstName: string;
  middleName: string;
  dateOfBirth: Date;
  qualification: string;
  profession: string;
  employedIn: string;
  organizationName: string;
  designation: string;
  income: string;
  lastName: string;
  mobileNo: string;
  mailId: string;
  image: string;
  signature: string;
  guaradianRelation: string;
  guaradianAddress: string;
  isDefaultCommunication: boolean;
}