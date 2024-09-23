import { Component,EventEmitter,Input,OnChanges,OnInit,Output } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators,ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ICargo } from '../../../shared/models/Cargo';
import { CargoService } from '../../../services/cargo/cargo.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-form-cargo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './form-cargo.component.html',
  styleUrl: './form-cargo.component.sass',
})
export class FormCargoComponent implements OnChanges {
  @Input() data: ICargo | null = null;
  @Output() onCloseModel = new EventEmitter();

  formCargo!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cargoService: CargoService,
    private toastr: ToastrService
  ) {
    this.formCargo = this.fb.group({
      idCargo: new FormControl(''),
      codigoCargo: new FormControl('', [Validators.required]),
      nombreCargo: new FormControl('', [Validators.required]),
      activo: new FormControl(false, [Validators.required]),
      idUsuarioCreacion: new FormControl('')
    });
  }

  onClose() {
    this.onCloseModel.emit(false);
  }

  ngOnChanges(): void {
    if (this.data) {
      this.formCargo.patchValue({
        idCargo: this.data.idCargo,
        codigoCargo: this.data.codigoCargo,
        nombreCargo: this.data.nombreCargo,
        activo: this.data.activo,
        idUsuarioCreacion: this.data.idUsuarioCreacion
      });
    }
  }

  onSubmit() {
    if (this.formCargo.valid) {
      if (this.data) {
        this.cargoService.updateCargo(this.data.idCargo as number, this.formCargo.value).subscribe({
          complete: () => {
            this.resetformCargo();
            this.toastr.success("Se ha actualizado el cargo");
          },
          error: () => {
            this.toastr.warning("Hubo un problema al actualizar los registros", "Información del usuario");
          }
        });
      } else {
        this.cargoService.createCargo(this.formCargo.value).subscribe({
          complete: () => {
            this.resetformCargo();
            this.toastr.success("Se ha creado el cargo");
          },
          error: () => {
            this.toastr.warning("Hubo un problema al guardar los registros", "Información del usuario");
          }
        });
      }
    } else {
      this.formCargo.markAllAsTouched();
    }
  }

  resetformCargo() {
    this.formCargo.reset();
    this.onClose();
  }
}
