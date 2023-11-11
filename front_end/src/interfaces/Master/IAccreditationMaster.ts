export interface IAccreditationMaster {
    id: number;
    name: string;
    collegeId: number,
    collegeName: string,
    streamId: number,
    streamName: string,
    year: string,
    grade: string,
    vaildTill: Date,
    isActive: boolean;
    createdBy?: string;
    createdDate?: Date;
    updatedBy?: string;
    updatedDate?: Date;
  }
  