export interface IFeeheadMaster {
    id: number,
    name: string,
    collegeId: number,
    collegeName: string,
    description: string,
    feeHeadTypeMasterId: number,
    fees: number,
    isActive: boolean,
    createdBy?: string,
    createdDate?: Date,
    updatedBy?: string,
    updatedDate?: Date
}