export interface IResponse<T> {
  success: boolean;
  singleData?: T;
  dataList?: T[];
  identity: number;
  messages?: string[];
  warnings?: string[];
  errors?: string[];
}
