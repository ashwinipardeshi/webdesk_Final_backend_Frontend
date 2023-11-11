export interface IApplicationStatusMaster {
    id: number,
    name: string,
    isActive: boolean,
    createdBy: number,
    createdDate: Date,
    updatedBy: number,
    updatedDate: Date,
    collegeId: number,
    collegeName: string
}