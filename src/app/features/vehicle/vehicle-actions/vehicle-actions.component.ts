import {
  Component,
  computed,
  effect,
  inject,
  model,
  OnInit,
  Signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { VehicleService } from '../vehicle.service';
import { Tipologia } from '../../../model/tipologia';
import { VehicleTypeService } from '../vehicle-type.service';

@Component({
  selector: 'app-vehicle-actions',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  standalone: true,
  templateUrl: './vehicle-actions.component.html',
  styleUrl: './vehicle-actions.component.css',
})
export class VehicleActionsComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  fb = inject(FormBuilder);
  vehicleService = inject(VehicleService);
  vehicleTypeService = inject(VehicleTypeService);
  vehicle = computed(() => this.vehicleService.selectedVehicle());
  tipologie = computed(() => this.vehicleTypeService.types());

  vehicleEffect = effect(() => {
    const v = this.vehicle();
    if (v && !this.router.url.includes('create')) {
      this.vehicleReactive.patchValue({
        ...v,
        tipologia: v.tipologia,
      });
    }
  });

  vehicleReactive: FormGroup = this.fb.group({
    id: this.fb.control(null),
    casaCostruttrice: this.fb.nonNullable.control('', [Validators.required]),
    modello: this.fb.nonNullable.control('', [Validators.required]),
    targa: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(7),
    ]),
    cilindrata: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.min(0),
      Validators.max(15000),
    ]),
    emissioni: this.fb.nonNullable.control('', [Validators.required]),
    potenza: this.fb.nonNullable.control('', [Validators.required]),
    numeroTelaio: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.minLength(17),
      Validators.maxLength(17),
    ]),
    kilometraggio: this.fb.nonNullable.control('', [Validators.required]),
    consumoMedioCarburanteUrbano: this.fb.nonNullable.control('', [
      Validators.required,
    ]),
    consumoMedioCarburanteExtraurbano: this.fb.nonNullable.control('', [
      Validators.required,
    ]),
    alimentazione: this.fb.nonNullable.control('', [Validators.required]),
    annoImmatricolazione: this.fb.nonNullable.control('', [
      Validators.required,
    ]),
    tipologia: this.fb.nonNullable.control(null, [Validators.required]),
  });

  urlKeyword = '';
  errorMessage = '';
  date: any;

  ngOnInit(): void {
    this.urlKeyword = this.router.url.includes('create')
      ? 'create'
      : this.router.url.includes('update')
      ? 'update'
      : 'view';
    let id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (id) {
      this.vehicleService.findVehicleById(id);
    }
  }

  handleFormRequest() {
    if (this.urlKeyword === 'create') {
      this.vehicleService.addVehicle(this.vehicleReactive.value);
      this.router.navigate(['/vehicle']);
    } else if (this.urlKeyword === 'update') {
      this.vehicleService.updateVehicle(this.vehicleReactive.value);
      this.router.navigate(['/vehicle']);
    }
  }

  compareTipologia = (a: Tipologia, b: Tipologia): boolean => {
    return a && b ? a.id === b.id : a === b;
  };
}
