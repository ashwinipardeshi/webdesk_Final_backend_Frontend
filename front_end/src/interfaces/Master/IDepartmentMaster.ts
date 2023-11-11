export interface IDepartmentMaster{
    id: number,
    name: string,
    isActive: boolean,
    parentId: number,
    collegeId: number,
    description: string,
    parentName: string,
    collegeName: string,
    createdBy?: string,
    createdDate?: Date,
    updatedBy?: string,
    updatedDate?: Date
}