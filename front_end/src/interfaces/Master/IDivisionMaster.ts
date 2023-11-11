export interface IDivisionMaster {
    id: number,
    name: string,
    collegeId: number,
    collegeName: string,
    isActive: boolean,
    createdBy?: string,
    createdDate?: string,
    updatedBy?: string,
    updatedDate?: string
}