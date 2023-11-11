export interface ISyllabusPatternMaster {
    id: number,
    name: string,
    collegeId: number,
    collegeName: string,
    academicMasterId: number,
    academicName: string,
    programMasterId: number,
    programMasterName: string,
    isActive: boolean,
    createdBy?: string,
    createdDate?: Date,
    updatedBy?: string,
    updatedDate?: Date
}