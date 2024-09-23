import { Component,EventEmitter,Input,OnChanges,OnInit,Output } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators,ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IDepartamento } from '../../../shared/models/Departamento';
import { DepartamentoService } from '../../../services/departamento/departamento.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-form-departamento',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './form-departamento.component.html',
  styleUrl: './form-departamento.component.sass',
})
export class FormDepartamentoComponent implements OnChanges {
  @Input() data: IDepartamento | null = null;
  @Output() onCloseModel = new EventEmitter();

  formDepartamento!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private departamentoService: DepartamentoService,
    private toastr: ToastrService
  ) {
    this.formDepartamento = this.fb.group({
      idDepartamento: new FormControl(0),
      codigoDepartamento: new FormControl('', [Validators.required]),
      nombreDepartamento: new FormControl('', [Validators.required]),
      activo: new FormControl(false, [Validators.required]),
      idUsuarioCreacion: new FormControl(0)
    });
  }

  onClose() {
    this.onCloseModel.emit(false);
  }

  ngOnChanges(): void {
    if (this.data) {
      this.formDepartamento.patchValue({
        idDepartamento: this.data.idDepartamento,
        codigoDepartamento: this.data.codigoDepartamento,
        nombreDepartamento: this.data.nombreDepartamento,
        activo: this.data.activo,
        idUsuarioCreacion: this.data.idUsuarioCreacion,
      });
    }
  }

  onSubmit() {
    if (this.formDepartamento.valid) {
      if (this.data) {
        this.departamentoService.updateDepartamento(this.data.idDepartamento as number, this.formDepartamento.value).subscribe({
          complete: () => {
            this.resetformDepartamento();
            this.toastr.success("Se ha actualizado el departamento");
          },
          error: () => {
            this.toastr.warning("Hubo un problema al actualizar los registros", "Información del usuario");
          }
        });
      } else {
        this.departamentoService.createDepartamento(this.formDepartamento.value).subscribe({
          complete: () => {
            this.resetformDepartamento();
            this.toastr.success("Se ha creado el departamento");
          },
          error: () => {
            this.toastr.warning("Hubo un problema al guardar los registros", "Información del usuario");
          }
        });
      }
    } else {
      this.formDepartamento.markAllAsTouched();
    }
  }

  resetformDepartamento() {
    this.formDepartamento.reset();
    this.onClose();
  }
}
