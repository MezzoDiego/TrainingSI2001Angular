import { Component, Input } from '@angular/core';
import { MyTableConfig } from './my-table-config';
import { CommonModule } from '@angular/common';
import { MyButtonConfig } from '../my-button/my-button-config';
import { MyButtonComponent } from '../my-button/my-button.component';
import { FormsModule } from '@angular/forms';
import { TableFilterPipe } from './table-filter.pipe';

@Component({
  selector: 'app-my-table',
  standalone: true,
  imports: [CommonModule, MyButtonComponent, FormsModule, TableFilterPipe],
  templateUrl: './my-table.component.html',
  styleUrl: './my-table.component.css',
})
export class MyTableComponent {
  @Input() tableConfig!: MyTableConfig;
  @Input() data!: any[];

  sortedColumn?: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  selectedFilterColumn: string = '';
  filterText: string = '';

  ngOnInit() {
    if (this.tableConfig.order) {
      this.sortedColumn = this.tableConfig.order.defaultColumn;
      this.sortDirection =
        this.tableConfig.order.orderType === 'desc' ? 'desc' : 'asc';
      this.sortData(this.sortedColumn, false);
    }
  }

  sortData(column?: string, toggle: boolean = true) {
    if (!column) return;

    if (this.sortedColumn === column && toggle) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortedColumn = column;
      this.sortDirection = 'asc';
    }

    this.data.sort((a, b) => {
      const aVal = a[column];
      const bVal = b[column];

      if (aVal == null) return 1;
      if (bVal == null) return -1;

      const comparison = aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
  }

  isSortedColumn(column: string): boolean {
    return this.sortedColumn === column;
  }
  buttonConfig: MyButtonConfig = {
    customCssClass: 'btn btn-primary',
    text: 'Click me',
    icon: 'fa fa-hand-pointer-o',
  };
}
