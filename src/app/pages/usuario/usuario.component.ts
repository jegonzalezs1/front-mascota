import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { IUsuario } from '../../shared/models/Usuario';
import { ICargo } from '../../shared/models/Cargo';
import { CargoService } from '../../services/cargo/cargo.service';
import { FormUsuarioComponent } from './form-usuario/form-usuario.component';
import { ModelComponent } from '../../shared/ui/model/model.component';
import { IDepartamento } from '../../shared/models/Departamento';
import { DepartamentoService } from '../../services/departamento/departamento.service';
@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [ModelComponent, FormUsuarioComponent],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.sass',
})
export class UsuarioComponent implements OnInit {
  isModelOpen = false;
  cargos: ICargo[] = [];
  departamentos: IDepartamento[] = [];
  usuarios: IUsuario[] = [];
  usuario!: IUsuario;
 
  constructor(
    private usuarioService: UsuarioService,
    private departamentoService: DepartamentoService,
    private cargoService: CargoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllUsuario();
    this.getAllCargo();
    this.getAllDepartamento();
  }

  getAllUsuario() {
    this.usuarioService.getAllUsuario().subscribe({
      next: (response) => {
        if (response) {
          this.usuarios = response;
        }
      },
    });
  }

  getAllCargo() {
    this.cargoService.getAllCargo().subscribe({
      next: (response) => {
        if (response) {
          this.cargos = response;
        }
      },
    });
  }

  getAllDepartamento() {
    this.departamentoService.getAllDepartamento().subscribe({
      next: (response) => {
        if (response) {
          this.departamentos = response;
        }
      },
    });
  }

  loadUsuario(usuario: IUsuario) {
    this.usuario = usuario;
    this.openModel();
  }

  deleteUsuario(id: number) {
    this.usuarioService.deleteUsuario(id).subscribe({
      complete: () => {
        this.toastr.success("Se ha eliminado el usuario");
        this.getAllUsuario();
      },
      error: () => {
        this.toastr.warning("Hubo un problema al eliminar los registros", "Información del usuario");
      }
    });
  }

  openModel() {
    this.isModelOpen = true;
  }

  closeModel() {
    this.isModelOpen = false;
    this.getAllUsuario();
  }
}
