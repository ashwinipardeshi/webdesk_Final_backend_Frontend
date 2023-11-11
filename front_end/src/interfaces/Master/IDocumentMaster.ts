export interface IDocumentMaster {
    id: number,
    name: string,
    collegeId: number,
    collegeName: string,
    isActive: boolean,
    createdBy?: string,
    createdDate?: Date,
    updatedBy?: string,
    updatedDate?: Date
}