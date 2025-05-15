import {
  Component,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyButtonComponent } from '../my-button/my-button.component';
import { FormsModule } from '@angular/forms';
import { TableFilterPipe } from './pipes/table-filter.pipe';
import { TablePaginationPipe } from './pipes/table-pagination.pipe';
import {
  MyTableActionEnum,
  MyTableConfig,
} from './config/my-table-config';

@Component({
  selector: 'app-my-table',
  standalone: true,
  imports: [
    CommonModule,
    MyButtonComponent,
    FormsModule,
    TableFilterPipe,
    TablePaginationPipe,
  ],
  templateUrl: './my-table.component.html',
  styleUrl: './my-table.component.css',
})
export class MyTableComponent {
  tableConfig = input.required<MyTableConfig>();
  data = input.required<any[]>();

  actionType = MyTableActionEnum;
  childComponentEvent = '';

  // Ordinamento
  sortedColumn? = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  // Filtraggio
  selectedFilterColumn = '';
  filterText = '';
  //Paginazione
  currentPage = 1;
  itemPerPage = 0;

  // Logica di inizializzazione componente
  ngOnInit() {
    this.itemPerPage = this.tableConfig().pagination?.itemPerPage || 10;
    if (this.tableConfig().order) {
      this.sortedColumn = this.tableConfig().order!.defaultColumn;
      this.sortDirection =
        this.tableConfig().order!.orderType === 'desc' ? 'desc' : 'asc';
      this.sortData(this.sortedColumn, false);
    }
  }
  // Ordinamento colonne
  sortData(column?: string, toggle: boolean = true) {
    if (!column) return;

    if (this.sortedColumn === column && toggle) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortedColumn = column;
      this.sortDirection = 'asc';
    }

    this.data().sort((a, b) => {
      const aVal = a[column];
      const bVal = b[column];

      if (aVal == null) return 1;
      if (bVal == null) return -1;

      const comparison = aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
  }
  // Controllo per verificare se la colonna è ordinata
  isSortedColumn(column: string): boolean {
    return this.sortedColumn === column;
  }
  // Paginazione
  goToPage(page: number) {
    this.currentPage = page;
  }

  onItemsPerPageChange(value: number) {
    this.itemPerPage = value;
    this.currentPage = 1;
    if (this.tableConfig().pagination) {
      this.tableConfig().pagination!.itemPerPage = value;
    }
  }

  handleButtonClick(event: string) {
    this.childComponentEvent = event;
  }
}
