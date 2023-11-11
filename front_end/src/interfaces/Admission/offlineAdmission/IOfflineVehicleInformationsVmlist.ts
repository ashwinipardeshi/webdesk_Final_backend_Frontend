export interface IOfflineVehicleInformationsVmlist {
    studentAdmissionId: number
    userId: number
    offlineVehicleInformationsVMList: IOfflineVehicleInformation[]
  }
  
  export interface IOfflineVehicleInformation {
    isActive: boolean
    createdBy: number
    createdDate: string
    updatedBy: number
    updatedDate: string
    id: number
    userId: number
    studentAdmissionId: number
    vehicleType: string
    noOfVehicle: number
    vehicleNo: string
    vehicleInsurancePolicyNo: string
    puc: boolean
    rc: string
    rcvalidity: string
    vehicleOwnerName: string
    validityOfLicence: string
    engineNo: string
    drivingLicence: string
    chassisNo: string
    vehicleRegistrationNo: string
  }
  