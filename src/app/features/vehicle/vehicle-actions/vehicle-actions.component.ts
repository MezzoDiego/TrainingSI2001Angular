import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
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
  type = computed(() => this.vehicleTypeService.selectedType());
  types = computed(() => this.vehicleTypeService.types());

  vehicleEffect = effect(() => {
    const computedVehicle = this.vehicle();
    if (computedVehicle && !this.router.url.includes('create') && !this.router.url.includes('types')) {
      this.vehicleReactive.patchValue({
        ...computedVehicle,
        tipologia: computedVehicle.tipologia,
      });
    }
  });

    typeEffect = effect(() => {
    const computedType = this.type();
    if (computedType && !this.router.url.includes('create') && this.router.url.includes('types')) {
      this.typeReactive.patchValue(computedType);
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

  typeReactive: FormGroup = this.fb.group({
    id: this.fb.control(null),
    descrizione: this.fb.nonNullable.control('', [Validators.required]),
  });


  urlKeyword = '';
  errorMessage = '';

  ngOnInit(): void {
    this.urlKeyword = this.router.url.includes('create')
      ? 'create'
      : this.router.url.includes('update')
      ? 'update'
      : '';
    let id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (id && !this.router.url.includes('types')) {
      this.vehicleService.findVehicleById(id);
    } else if (id && this.router.url.includes('types')) {
      this.vehicleTypeService.findTypeById(id);
    }
  }

  handleFormRequest() {
    if(this.router.url.includes('types')) {
 if (this.urlKeyword === 'create') {
      this.vehicleTypeService.addType(this.typeReactive.value);
      this.router.navigate(['/vehicle/types']);
    } else if (this.urlKeyword === 'update') {
      this.vehicleTypeService.updateType(this.typeReactive.value);
      this.router.navigate(['/vehicle/types']);
    }
    } else {
    if (this.urlKeyword === 'create') {
      this.vehicleService.addVehicle(this.vehicleReactive.value);
      this.router.navigate(['/vehicle']);
    } else if (this.urlKeyword === 'update') {
      this.vehicleService.updateVehicle(this.vehicleReactive.value);
      this.router.navigate(['/vehicle']);
    }
  }
  }

  compareTipologia = (a: Tipologia, b: Tipologia): boolean => {
    return a && b ? a.id === b.id : a === b;
  };

    isUnchanged(): boolean {
    const current = this.vehicleReactive.value;
    return (
      +current.annoImmatricolazione === +this.vehicle()?.annoImmatricolazione! &&
      current.casaCostruttrice === this.vehicle()?.casaCostruttrice &&
      +current.cilindrata === +this.vehicle()?.cilindrata! &&
      current.consumoMedioCarburanteExtraurbano === this.vehicle()?.consumoMedioCarburanteExtraurbano &&
      current.consumoMedioCarburanteUrbano === this.vehicle()?.consumoMedioCarburanteUrbano &&
      current.emissioni === this.vehicle()?.emissioni &&
      current.kilometraggio === this.vehicle()?.kilometraggio &&
      current.modello === this.vehicle()?.modello &&
      current.numeroTelaio === this.vehicle()?.numeroTelaio &&
      +current.potenza === +this.vehicle()?.potenza! &&
      current.targa === this.vehicle()?.targa &&
      current.tipologia.id === this.vehicle()?.tipologia!.id &&
      current.alimentazione === this.vehicle()?.alimentazione
    );
  }
      isUnchangedType(): boolean {
    const current = this.typeReactive.value;
    return (
      current.descrizione === this.type()?.descrizione
    );
  }
}
