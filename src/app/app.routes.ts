import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { CargoComponent } from './pages/cargo/cargo.component';
import { DepartamentoComponent } from './pages/departamento/departamento.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'usuario', component: UsuarioComponent },
    { path: 'cargo', component: CargoComponent },
    { path: 'departamento', component: DepartamentoComponent }
  ];

  