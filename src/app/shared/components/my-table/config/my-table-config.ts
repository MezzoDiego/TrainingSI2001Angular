import { MyButtonConfig } from "../../my-button/config/my-button-config";

export class MyTableConfig {
  headers?: MyHeaders[];
  order?: MyOrder;
  search?: MySearch;
  pagination?: MyPagination;
  actions?: MyAction[];
}

export class MyHeaders {
  key?: string;
  label?: string;
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
  NEW_ROW, EDIT, DELETE
}