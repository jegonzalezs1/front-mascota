import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUsuario } from '../../shared/models/Usuario';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  urlApp = environment.urlAddress;
  urlApi = 'api/Usuario/';
  constructor(private http: HttpClient) {}

  getAllUsuario(): Observable<IUsuario[]> {
    return this.http.get<IUsuario[]>(`${this.urlApp}${this.urlApi}`);
  }

  getUsuario(idUsuario: number): Observable<IUsuario> {
    return this.http.get<IUsuario>(`${this.urlApp}${this.urlApi}` + idUsuario);
  }

  createUsuario(usuario: IUsuario): Observable<IUsuario> {
    return this.http.post<IUsuario>(`${this.urlApp}${this.urlApi}`, usuario);
  }

  updateUsuario(idUsuario: number, usuario: IUsuario): Observable<IUsuario> {
    return this.http.put<IUsuario>(`${this.urlApp}${this.urlApi}` + idUsuario, usuario);
  }

  deleteUsuario(idUsuario: number): Observable<IUsuario> {
    return this.http.delete<IUsuario>(`${this.urlApp}${this.urlApi}` + idUsuario);
  }
}
