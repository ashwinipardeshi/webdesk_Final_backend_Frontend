export interface IDistrictMaster {
    id: number;
    name: string;
    stateId: number;
    stateName: string;
    isActive: boolean;
    createdBy?: number;
    createdDate?: Date;
    updatedBy?: number;
    updatedDate?: Date;
}