import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyTableComponent } from '../../../shared/components/my-table/my-table.component';
import { MyDialogComponent } from '../../../shared/components/my-dialog/my-dialog.component';
import { Router } from '@angular/router';
import {
  MyTableActionEnum,
  MyTableConfig,
} from '../../../shared/components/my-table/config/my-table-config';
import { Utente } from '../../../model/utente';
import { UserService } from '../../user.service';
import { MySnackbarComponent } from '../../../shared/components/my-snackbar/my-snackbar.component';

@Component({
  selector: 'app-customer-list',
  imports: [CommonModule, MyTableComponent, MyDialogComponent, MySnackbarComponent],
  standalone: true,
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css',
})
export class CustomerListComponent {
  userService = inject(UserService);
  router = inject(Router);

  showDialog = false;
  idItemOperation = 0;

  tableConfig = signal<MyTableConfig>({
    headers: [
      { key: 'id', label: 'ID' },
      { key: 'nome', label: 'NOME' },
      { key: 'cognome', label: 'COGNOME' },
      { key: 'username', label: 'USERNAME' },
      {
        key: 'dataDiNascita',
        label: 'DATA DI NASCITA',
        valueGetter: (item: Utente) => this.formatDate(item.dataDiNascita!),
      },
    ],
    order: {
      defaultColumn: 'id',
      orderType: 'asc',
    },
    search: {
      columns: ['nome', 'cognome', 'username', 'dataDiNascita'],
    },
    pagination: {
      itemPerPage: 5,
      itemPerPageOptions: [3, 5, 10, 20],
    },
    actions: [
      {
        type: MyTableActionEnum.NEW_ROW,
        buttonConfig: {
          customCssClass: 'btn btn-primary',
          text: 'Add',
          icon: 'fa fa-plus',
        },
      },
      {
        type: MyTableActionEnum.EDIT,
        buttonConfig: {
          customCssClass: 'btn btn-warning',
          text: 'Edit',
          icon: 'fa fa-edit',
        },
      },
      {
        type: MyTableActionEnum.DELETE,
        buttonConfig: {
          customCssClass: 'btn btn-danger',
          text: 'Delete',
          icon: 'fa fa-trash',
        },
      },
      {
        type: MyTableActionEnum.VIEW,
        buttonConfig: {
          customCssClass: 'btn btn-secondary',
          text: 'Prenotazioni',
          icon: 'fa fa-search',
        },
      },
    ],
    showActionsCol: true,
  });

  data = computed<Utente[]>(() => {
    return this.userService.users();
  });

  area = signal<string>('customer');

  handleOperation(event: {
    operation: { text: string; area: string };
    id: number;
  }) {
    switch (event.operation.text) {
      case MyTableActionEnum.NEW_ROW.toString():
        this.router.navigate([event.operation.area, 'create']);
        break;
      case MyTableActionEnum.EDIT.toString():
        this.router.navigate([event.operation.area, 'update', event.id]);
        break;
      case MyTableActionEnum.DELETE.toString():
        this.showDialog = true;
        this.idItemOperation = event.id;
        break;
      case 'Prenotazioni':
        this.router.navigate(['booking/', event.id]);
        break;
    }
  }

  closeDialog() {
    this.showDialog = false;
  }

  confirmDelete() {
    this.userService.deleteUser(this.idItemOperation);
    this.showDialog = false;
  }

  formatDate(dateString: string | Date): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
