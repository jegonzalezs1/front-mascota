import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICargo } from '../../shared/models/Cargo';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CargoService {
  urlApp = environment.urlAddress;
  urlApi = 'api/Cargo/';
  constructor(private http: HttpClient) {}

  getAllCargo(): Observable<ICargo[]> {
    return this.http.get<ICargo[]>(`${this.urlApp}${this.urlApi}`);
  }

  getCargo(idCargo: number): Observable<ICargo> {
    return this.http.get<ICargo>(`${this.urlApp}${this.urlApi}` + idCargo);
  }

  createCargo(cargo: ICargo): Observable<ICargo> {
    return this.http.post<ICargo>(`${this.urlApp}${this.urlApi}`, cargo);
  }

  updateCargo(idCargo: number, cargo: ICargo): Observable<ICargo> {
    return this.http.put<ICargo>(`${this.urlApp}${this.urlApi}` + idCargo, cargo);
  }

  deleteCargo(idCargo: number): Observable<ICargo> {
    return this.http.delete<ICargo>(`${this.urlApp}${this.urlApi}` + idCargo);
  }
}
