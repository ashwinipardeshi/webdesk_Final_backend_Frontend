export interface ITimeSlotMaster {
  fromTime: string;
  toTime: string;
  isActive: boolean;
  createdBy: number;
  createdDate: string;
  updatedBy?: number;
  updatedDate?: string;
  id: number;
  name: string;
}
