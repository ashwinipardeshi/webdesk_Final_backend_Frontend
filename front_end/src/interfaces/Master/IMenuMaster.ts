export interface IMenuMaster{
    id: number,
    parentId: number,
    name: string,
    icon: string,
    url: string,
    isMenu: boolean,
    moduleMasterId:number,
    precedence: number,
    isActive: boolean,
    createdBy?: string,
    createdDate?: Date,
    updatedBy?: string,
    updatedDate?: Date    
}
