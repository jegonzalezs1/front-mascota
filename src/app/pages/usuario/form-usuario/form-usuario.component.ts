import { Component,EventEmitter,Input,OnChanges,OnInit,Output } from '@angular/core';
import { IUsuario } from '../../../shared/models/Usuario';
import { FormGroup,FormBuilder,FormControl,Validators,ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { ICargo } from '../../../shared/models/Cargo';
import { CargoService } from '../../../services/cargo/cargo.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IDepartamento } from '../../../shared/models/Departamento';
import { DepartamentoService } from '../../../services/departamento/departamento.service';
@Component({
  selector: 'app-form-usuario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './form-usuario.component.html',
  styleUrl: './form-usuario.component.sass',
})
export class FormUsuarioComponent implements OnInit, OnChanges {
  @Input() data: IUsuario | null = null;
  @Output() onCloseModel = new EventEmitter();

  formUsuario!: FormGroup;
  listCargos: ICargo[] = [];
  listDepartamentos: IDepartamento[] = [];

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private departamentoService: DepartamentoService,
    private cargoService: CargoService,
    private toastr: ToastrService
  ) {
    this.formUsuario = this.fb.group({
      idUsuario: new FormControl(0),
      nombreUsuario: new FormControl('', [Validators.required]),
      primerNombre: new FormControl('', [Validators.required]),
      segundoNombre: new FormControl('', [Validators.required]),
      primerApellido: new FormControl('', [Validators.required]),
      segundoApellido: new FormControl('', [Validators.required]),
      idDepartamento: new FormControl(0),
      idCargo: new FormControl(0)
    });
  }
  ngOnInit(): void {
    this.getAllCargo();
    this.getAllDepartamento();
  }

  onClose() {
    this.onCloseModel.emit(false);
  }

  ngOnChanges(): void {
    if (this.data) {
      this.formUsuario.patchValue({
        idUsuario: this.data.idUsuario,
        nombreUsuario: this.data.nombreUsuario,
        primerNombre: this.data.primerNombre,
        segundoNombre: this.data.segundoNombre,
        primerApellido: this.data.primerApellido,
        segundoApellido: this.data.segundoApellido,
        idDepartamento: this.data.idDepartamento,
        idCargo: this.data.idCargo
      });
    }
  }

  onSubmit() {
    if (this.formUsuario.valid) {
      if (this.data) {
        this.usuarioService.updateUsuario(this.data.idUsuario as number, this.formUsuario.value).subscribe({
          complete: () => {
            this.resetformUsuario();
            this.toastr.success("Se ha actualizado el usuario");
          },
          error: () => {
            this.toastr.warning("Hubo un problema al actualizar los registros", "Información del usuario");
          }
        });
      } else {
        this.usuarioService.createUsuario(this.formUsuario.value).subscribe({
          complete: () => {
            this.resetformUsuario();
            this.toastr.success("Se ha creado el usuario");
          },
          error: () => {
            this.toastr.warning("Hubo un problema al guardar los registros", "Información del usuario");
          }
        });
      }
    } else {
      this.formUsuario.markAllAsTouched();
    }
  }

  resetformUsuario() {
    this.formUsuario.reset();
    this.onClose();
  }

  getAllCargo() {
    this.cargoService.getAllCargo().subscribe({
      next: (response) => {
        this.listCargos = response;
        console.log(response)
      },
    });
  }

  getAllDepartamento() {
    this.departamentoService.getAllDepartamento().subscribe({
      next: (response) => {
        this.listDepartamentos = response;
        console.log(response)
      },
    });
  }
}
