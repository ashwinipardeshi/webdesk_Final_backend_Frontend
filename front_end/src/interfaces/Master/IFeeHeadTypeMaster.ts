export interface IFeeHeadTypeMaster {
    id: number | any;
    name: string;
    collegeId: number;
    collegeName: string;
    isActive: boolean;
    createdBy?: string,
    createdDate?: Date,
    updatedBy?: string,
    updatedDate?: Date
}