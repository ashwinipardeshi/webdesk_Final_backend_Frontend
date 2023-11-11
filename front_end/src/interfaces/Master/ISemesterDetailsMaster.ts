export interface ISemesterDetailsMaster {
    id: number;
    semesterMasterId: number,
    semesterMasterName: string,
    programMasterId: number,
    programMasterName: string,
    programYearId: number,
    programYearName: string,
    academicYearId: number,
    academicYearName: string,
    year: string;
    startDate: Date,
    endDate: Date,
    isActive: boolean;
    createdBy?: string;
    createdDate?: Date;
    updatedBy?: string;
    updatedDate?: Date;
}
