import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDepartamento } from '../../shared/models/Departamento';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DepartamentoService {
  urlApp = environment.urlAddress;
  urlApi = 'api/Departamento/';
  constructor(private http: HttpClient) {}

  getAllDepartamento(): Observable<IDepartamento[]> {
    return this.http.get<IDepartamento[]>(`${this.urlApp}${this.urlApi}`);
  }

  getDepartamento(idDepartamento: number): Observable<IDepartamento> {
    return this.http.get<IDepartamento>(`${this.urlApp}${this.urlApi}` + idDepartamento);
  }

  createDepartamento(departamento: IDepartamento): Observable<IDepartamento> {
    return this.http.post<IDepartamento>(`${this.urlApp}${this.urlApi}`, departamento);
  }

  updateDepartamento(idDepartamento: number, departamento: IDepartamento): Observable<IDepartamento> {
    return this.http.put<IDepartamento>(`${this.urlApp}${this.urlApi}` + idDepartamento, departamento);
  }

  deleteDepartamento(idDepartamento: number): Observable<IDepartamento> {
    return this.http.delete<IDepartamento>(`${this.urlApp}${this.urlApi}` + idDepartamento);
  }
}
