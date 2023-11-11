export interface ICourseTypeMaster {
    collegeId: number,
    collegeName: string,
    id: number;
    name: string;
    description: string;
    isActive: boolean;
    createdBy?: string,
    createdDate?: Date,
    updatedBy?: string,
    updatedDate?: Date
}

