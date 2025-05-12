export class MyTableConfig {
  headers?: MyHeaders[];
  order?: MyOrder;
}

export class MyHeaders {
  key?: string;
  label?: string;
}

export class MyOrder {
  defaultColumn?: string;
  orderType?: string;
}
