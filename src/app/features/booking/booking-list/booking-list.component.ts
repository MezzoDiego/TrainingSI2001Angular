import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../user.service';
import { AuthService } from '../../../core/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MyTableActionEnum,
  MyTableConfig,
} from '../../../shared/components/my-table/config/my-table-config';
import { Prenotazione } from '../../../model/prenotazione';
import { BookingService } from '../booking.service';
import { MyDialogComponent } from '../../../shared/components/my-dialog/my-dialog.component';
import { MyTableComponent } from '../../../shared/components/my-table/my-table.component';
import { MyButtonComponent } from '../../../shared/components/my-button/my-button.component';
import { MyButtonConfig } from '../../../shared/components/my-button/config/my-button-config';

@Component({
  selector: 'app-booking-list',
  imports: [
    CommonModule,
    MyDialogComponent,
    MyTableComponent,
    MyButtonComponent,
  ],
  standalone: true,
  templateUrl: './booking-list.component.html',
  styleUrl: './booking-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingListComponent implements OnInit {
  authService = inject(AuthService);
  bookingService = inject(BookingService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  showDialog = false;
  idItemOperation = 0;
  flagOperation = false;

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const idUser = Number(idParam);
      this.bookingService.getAllBookingsByUser(idUser);
    } else {
      this.bookingService.getAllBookings();
    }
  }

  buttonConfig = signal<MyButtonConfig>({
    customCssClass: 'btn btn-warning',
    text: 'Back',
    icon: 'fa fa-arrow-left',
  });

  tableConfig = signal<MyTableConfig>({
    headers: [
      { key: 'id', label: 'ID' },
      {
        key: 'dataInizio',
        label: 'DATA INIZIO',
        valueGetter: (item: Prenotazione) =>
          this.formatDateTime(item.dataInizio!),
      },
      {
        key: 'dataFine',
        label: 'DATA FINE',
        valueGetter: (item: Prenotazione) =>
          this.formatDateTime(item.dataInizio!),
      },
      {
        key: 'veicolo',
        label: 'VEICOLO',
        valueGetter: (item: any) =>
          item.veicolo?.casaCostruttrice + ' ' + item.veicolo?.modello + ' - ID: ' + item.veicolo?.id || '',
      },
      {
        key: 'utente',
        label: 'UTENTE',
        valueGetter: (item: any) => item.utente?.username + ' - ID: ' + item.utente?.id || '',
      },
    ],
    order: {
      defaultColumn: 'id',
      orderType: 'asc',
    },
    search: {
      columns: ['dataInizio', 'dataFine', 'veicolo', 'utente'],
    },
    pagination: {
      itemPerPage: 5,
      itemPerPageOptions: [3, 5, 10, 20],
    },
    actions: [],
    rowActionsGetter: (row: Prenotazione) => {
      if (row.flagApprovazione === null || row.flagApprovazione === undefined) {
        return [
          {
            type: MyTableActionEnum.OPERATION,
            buttonConfig: {
              customCssClass: 'btn btn-success',
              text: 'Approva',
              icon: 'fa fa-check',
            },
          },
          {
            type: MyTableActionEnum.OPERATION,
            buttonConfig: {
              customCssClass: 'btn btn-danger',
              text: 'Rifiuta',
              icon: 'fa fa-times',
            },
          },
        ];
      } else {
        return [
          {
            type: MyTableActionEnum.INFO,
            buttonConfig: {
              customCssClass: row.flagApprovazione
                ? 'btn btn-success disabled'
                : 'btn btn-danger disabled',
              text: row.flagApprovazione ? 'Approvata' : 'Rifiutata',
              icon: row.flagApprovazione ? 'fa fa-check' : 'fa fa-times',
            },
          },
        ];
      }
    },
  });

  data = computed<Prenotazione[]>(() => {
    if (this.route.snapshot.paramMap.get('id')) {
      return this.bookingService.userBookings();
    } else {
      return this.bookingService.bookings();
    }
  });

  area = this.route.snapshot.paramMap.get('id')
    ? signal<string>('booking/' + this.route.snapshot.paramMap.get('id'))
    : signal<string>('booking');

  handleOperation(event: {
    operation: { text: string; area: string };
    id: number;
  }) {
    switch (event.operation.text) {
      // case MyTableActionEnum.NEW_ROW.toString(): //ROBA DA CUSTOMER
      //   this.router.navigate([event.operation.area, 'create']);
      //   break;
      // case MyTableActionEnum.EDIT.toString():
      //   this.router.navigate([event.operation.area, 'update', event.id]);
      //   break;
      // case MyTableActionEnum.DELETE.toString():
      // this.showDialog = true;
      // this.idItemOperation = event.id;
      //   break;
      case 'Approva':
      case 'Rifiuta':
        this.showDialog = true;
        this.idItemOperation = event.id;
        this.flagOperation = event.operation.text === 'Approva';
        break;
    }
  }

  closeDialog() {
    this.showDialog = false;
  }

  handleBooking() {
    this.bookingService.handleBooking(this.idItemOperation, this.flagOperation);
    this.showDialog = false;
  }

  backToCustomersPage() {
    this.router.navigate(['customer']);
  }

  formatDateTime(dateString: string | Date): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }
}
