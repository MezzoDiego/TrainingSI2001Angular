import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyTableComponent } from '../../../shared/components/my-table/my-table.component';
import {
  MyTableActionEnum,
  MyTableConfig,
} from '../../../shared/components/my-table/config/my-table-config';
import { VehicleService } from '../vehicle.service';
import { Veicolo } from '../../../model/veicolo';
import { Router } from '@angular/router';
import { MyDialogComponent } from '../../../shared/components/my-dialog/my-dialog.component';

@Component({
  selector: 'app-vehicle',
  imports: [CommonModule, MyTableComponent, MyDialogComponent],
  standalone: true,
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.css',
})
export class VehicleComponent {
  vehicleService = inject(VehicleService);
  router = inject(Router);

  showDialog = false;
  idItemOperation = 0;
  

  tableConfig = signal<MyTableConfig>({
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
      { key: 'consumoMedioCarburanteUrbano', label: 'CONSUMO URBANO (l/km)' },
      {
        key: 'consumoMedioCarburanteExtraurbano',
        label: 'CONSUMO EXTRAURBANO (l/km)',
      },
      { key: 'alimentazione', label: 'ALIMENTAZIONE' },
      { key: 'tipologia', label: 'TIPOLOGIA', valueGetter: (item: any) => item.tipologia?.descrizione || '' },
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

  data = computed<Veicolo[]>(() => {
    return this.vehicleService.vehicles();
  });

  handleOperation(event: { operation: string; id: number }) {
    
    switch (event.operation) {
      case MyTableActionEnum.NEW_ROW.toString():
        this.router.navigate(['/vehicle/create']);
        break;
      case MyTableActionEnum.EDIT.toString():
        this.router.navigate(['/vehicle/update/', event.id]);
        break;
      case MyTableActionEnum.DELETE.toString():
        this.showDialog = true;
        this.idItemOperation = event.id;
        break;
    }
  }

  closeDialog() {
    this.showDialog = false;
  }

  confirmDelete() {
    this.vehicleService.deleteVehicle(this.idItemOperation);
    this.showDialog = false;
  }

}
