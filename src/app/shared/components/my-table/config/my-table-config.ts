import { MyButtonConfig } from "../../my-button/config/my-button-config";

export class MyTableConfig {
  headers?: MyHeaders[];
  order?: MyOrder;
  search?: MySearch;
  pagination?: MyPagination;
  actions?: MyAction[];
  rowActionsGetter?: (row: any) => MyAction[];
}

export class MyHeaders {
  key?: string;
  label?: string;
  valueGetter?: any;
}

export class MyOrder {
  defaultColumn?: string;
  orderType?: string;
}

export class MySearch {
  columns?: string[];
}

export class MyPagination {
  itemPerPage?: number;
  itemPerPageOptions?: number[];
}

export class MyAction {
  type?: MyTableActionEnum;
  buttonConfig?: MyButtonConfig;
}

export enum MyTableActionEnum {
  NEW_ROW = 'Add', EDIT= 'Edit', DELETE = 'Delete', VIEW = 'View', OPERATION= 'Operation', INFO = 'Info'
}