import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IDepartamento } from '../../shared/models/Departamento';
import { DepartamentoService } from '../../services/departamento/departamento.service';
import { FormDepartamentoComponent } from './form-departamento/form-departamento.component';
import { ModelComponent } from '../../shared/ui/model/model.component';
@Component({
  selector: 'app-departamento',
  standalone: true,
  imports: [ModelComponent, FormDepartamentoComponent],
  templateUrl: './departamento.component.html',
  styleUrl: './departamento.component.sass',
})
export class DepartamentoComponent implements OnInit {
  isModelOpen = false;
  departamentos: IDepartamento[] = [];
  departamento!: IDepartamento;
 
  constructor(
    private departamentoService: DepartamentoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllDepartamento();
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

  loadDepartamento(departamento: IDepartamento) {
    this.departamento = departamento;
    this.openModel();
  }

  deleteDepartamento(idDepartamento: number) {
    this.departamentoService.deleteDepartamento(idDepartamento).subscribe({
      complete: () => {
        this.toastr.success("Se ha eliminado el departamento");
        this.getAllDepartamento();
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
    this.getAllDepartamento();
  }
}
