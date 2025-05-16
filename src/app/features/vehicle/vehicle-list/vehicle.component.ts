import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyTableComponent } from '../../../shared/components/my-table/my-table.component';
import {
  MyTableActionEnum,
  MyTableConfig,
} from '../../../shared/components/my-table/config/my-table-config';
import { VehicleService } from '../vehicle.service';
import { Veicolo } from '../../../model/veicolo';
import { ActivatedRoute, Router } from '@angular/router';
import { MyDialogComponent } from '../../../shared/components/my-dialog/my-dialog.component';
import { MyButtonConfig } from '../../../shared/components/my-button/config/my-button-config';
import { MyButtonComponent } from '../../../shared/components/my-button/my-button.component';
import { VehicleTypeService } from '../vehicle-type.service';
import { Tipologia } from '../../../model/tipologia';

@Component({
  selector: 'app-vehicle',
  imports: [
    CommonModule,
    MyTableComponent,
    MyDialogComponent,
    MyButtonComponent,
  ],
  standalone: true,
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.css',
})
export class VehicleComponent {
  vehicleService = inject(VehicleService);
  vehicleTypeService = inject(VehicleTypeService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  showDialog = false;
  idItemOperation = 0;

  buttonConfig = signal<MyButtonConfig>({
    customCssClass: 'btn btn-warning',
    text: this.router.url.includes('types')
      ? 'Gestione Parco Auto'
      : 'Gestione Tipologie',
    icon: 'fa fa-tasks',
  });

  tableConfig = this.router.url.includes('types')
    ? signal<MyTableConfig>({
        headers: [
          { key: 'id', label: 'ID' },
          { key: 'descrizione', label: 'DESCRIZIONE' },
        ],
        order: {
          defaultColumn: 'id',
          orderType: 'asc',
        },
        search: {
          columns: ['descrizione'],
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
        ],
      })
    : signal<MyTableConfig>({
        headers: [
          { key: 'id', label: 'ID' },
          { key: 'casaCostruttrice', label: 'CASA COSTRUTTRICE' },
          { key: 'modello', label: 'MODELLO' },
          { key: 'annoImmatricolazione', label: 'ANNO DI IMMATRICOLAZIONE' },
          { key: 'targa', label: 'TARGA' },
          { key: 'cilindrata', label: 'CILINDRATA' },
          { key: 'emissioni', label: 'EMISSIONI' },
          { key: 'potenza', label: 'POTENZA (CV)' },
          { key: 'numeroTelaio', label: 'NUMERO DI TELAIO' },
          { key: 'kilometraggio', label: 'KILOMETRAGGIO' },
          {
            key: 'consumoMedioCarburanteUrbano',
            label: 'CONSUMO URBANO (l/km)',
          },
          {
            key: 'consumoMedioCarburanteExtraurbano',
            label: 'CONSUMO EXTRAURBANO (l/km)',
          },
          { key: 'alimentazione', label: 'ALIMENTAZIONE' },
          {
            key: 'tipologia',
            label: 'TIPOLOGIA',
            valueGetter: (item: any) => item.tipologia?.descrizione || '',
          },
        ],
        order: {
          defaultColumn: 'id',
          orderType: 'asc',
        },
        search: {
          columns: [
            'casaCostruttrice',
            'modello',
            'annoImmatricolazione',
            'targa',
            'cilindrata',
            'emissioni',
            'potenza',
            'numeroTelaio',
            'kilometraggio',
            'consumoMedioCarburanteUrbano',
            'consumoMedioCarburanteExtraurbano',
            'alimentazione',
            'tipologia',
          ],
        },
        pagination: {
          itemPerPage: 10,
          itemPerPageOptions: [5, 10, 20, 50],
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
        ],
      });

  data = this.router.url.includes('types')
    ? computed<Tipologia[]>(() => {
        return this.vehicleTypeService.types();
      })
    : computed<Veicolo[]>(() => {
        return this.vehicleService.vehicles();
      });

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
    }
  }

  area = signal<string>(
    this.router.url.includes('types') ? 'vehicle/types' : 'vehicle'
  );

  closeDialog() {
    this.showDialog = false;
  }

  confirmDelete() {
    if(this.router.url.includes('types')) {
      this.vehicleTypeService.deleteType(this.idItemOperation);
    } else {
    this.vehicleService.deleteVehicle(this.idItemOperation);
    }
    this.showDialog = false;
  }

  goToOwnCRUDPage() {
    if (this.router.url.includes('types')) {
      this.router.navigate(['/vehicle']);
    } else {
      this.router.navigate(['/vehicle/types']);
    }
  }
}
