import { InjectionToken, Signal } from '@angular/core';
import { MyTableConfig } from './my-table-config';

export const TABLE_CONFIG_SIGNAL = new InjectionToken<Signal<MyTableConfig>>('TABLE_CONFIG_SIGNAL');
export const TABLE_DATA_SIGNAL = new InjectionToken<Signal<any[]>>('TABLE_DATA_SIGNAL');