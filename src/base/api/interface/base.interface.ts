
export interface IUpdatedBy {
    userId: number,
}
export interface IDeletedBy extends IUpdatedBy { }
export interface ICreatedBy extends IUpdatedBy { }