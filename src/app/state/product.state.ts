export enum DataStateEnum {
  LOADING,
  ERROR,
  LOADED
}

export interface AppDataState<T>{
    dataState? : DataStateEnum,
    data? : T,
    errorMessage? : string
   
}