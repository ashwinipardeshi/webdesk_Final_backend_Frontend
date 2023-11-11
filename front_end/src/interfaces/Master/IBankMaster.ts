export interface IBankMaster {
    id: number,
    name: string
    collegeId: number,
    collegeName: string,
    actype: string,
    acnumber: string,
    acholderName: string,
    description: string,
    branchName: string,
    branchAddress: string,
    ifsc: string,
    micr: string,
    isActive: boolean,
    createdBy?: string,
    createdDate?: Date,
    updatedBy?: string,
    updatedDate?: Date
}