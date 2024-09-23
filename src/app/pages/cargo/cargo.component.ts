import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ICargo } from '../../shared/models/Cargo';
import { CargoService } from '../../services/cargo/cargo.service';
import { FormCargoComponent } from './form-cargo/form-cargo.component';
import { ModelComponent } from '../../shared/ui/model/model.component';
@Component({
  selector: 'app-cargo',
  standalone: true,
  imports: [ModelComponent, FormCargoComponent],
  templateUrl: './cargo.component.html',
  styleUrl: './cargo.component.sass',
})
export class CargoComponent implements OnInit {
  isModelOpen = false;
  cargos: ICargo[] = [];
  cargo!: ICargo;
 
  constructor(
    private cargoService: CargoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllCargo();
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

  loadCargo(cargo: ICargo) {
    this.cargo = cargo;
    this.openModel();
  }

  deleteCargo(idCargo: number) {
    this.cargoService.deleteCargo(idCargo).subscribe({
      complete: () => {
        this.toastr.success("Se ha eliminado el usuario");
        this.getAllCargo();
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
    this.getAllCargo();
  }
}
