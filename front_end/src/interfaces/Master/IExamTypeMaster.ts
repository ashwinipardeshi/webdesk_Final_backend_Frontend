export interface IExamTypeMaster {
    id: number,
    name: string,
    isActive: true,
    createdBy: number,
    createdDate: Date,
    updatedBy?: number,
    updatedDate?: Date,
    collegeId: number,
    collegeName: string,
    description: string
}