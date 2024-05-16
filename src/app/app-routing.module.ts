import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { RegistroScreenComponent } from './screens/registro-screen/registro-screen.component';
import { HomeScreenComponent } from './screens/home-screen/home-screen.component';
import { AdminScreenComponent } from './screens/admin-screen/admin-screen.component';
import { AlumnosScreenComponent } from './screens/alumnos-screen/alumnos-screen.component';
import { MaestrosScreenComponent } from './screens/maestros-screen/maestros-screen.component';
import { GraficasScreenComponent } from './screens/graficas-screen/graficas-screen.component';
import { MateriasScreenComponent } from './screens/materias-screen/materias-screen.component';
import { RegistroMateriasComponent } from './partials/registro-materias/registro-materias.component';
import { AdminGuard } from './guards/admin-guard.guard';


const routes: Routes = [
  {path: '', component: LoginScreenComponent, pathMatch: 'full'},
  {path: 'registro-usuarios', component: RegistroScreenComponent, pathMatch: 'full'},
  {path: 'registro-usuarios/:rol/:id', component: RegistroScreenComponent, pathMatch: 'full'},
  {path: 'home', component: HomeScreenComponent, pathMatch: 'full'},
  {path: 'administrador', component: AdminScreenComponent, pathMatch: 'full'},
  {path: 'alumnos', component: AlumnosScreenComponent, pathMatch: 'full'},
  {path: 'maestros', component: MaestrosScreenComponent, pathMatch: 'full'},
  {path: 'graficas', component: GraficasScreenComponent, pathMatch: 'full'},
  {path: 'materias', component: MateriasScreenComponent, pathMatch: 'full'},
  {path: 'registro-materias', component: RegistroMateriasComponent, pathMatch: 'full', canActivate: [AdminGuard]},
  {path: 'registro-materias/:id', component: RegistroMateriasComponent, pathMatch: 'full', canActivate: [AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
