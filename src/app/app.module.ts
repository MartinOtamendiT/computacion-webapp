import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { RegistroScreenComponent } from './screens/registro-screen/registro-screen.component';
import { NavbarComponent } from './partials/navbar/navbar.component';
//Este import es para los servicios HTTP
import { HttpClientModule } from '@angular/common/http';
import { RegistroAdminComponent } from './partials/registro-admin/registro-admin.component';
import { RegistroAlumnosComponent } from './partials/registro-alumnos/registro-alumnos.component';
import { RegistroMaestrosComponent } from './partials/registro-maestros/registro-maestros.component';

//Angular material
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HomeScreenComponent } from './screens/home-screen/home-screen.component';
import { AdminScreenComponent } from './screens/admin-screen/admin-screen.component';
import { AlumnosScreenComponent } from './screens/alumnos-screen/alumnos-screen.component';
import { MaestrosScreenComponent } from './screens/maestros-screen/maestros-screen.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginScreenComponent,
    RegistroScreenComponent,
    NavbarComponent,
    RegistroAdminComponent,
    RegistroAlumnosComponent,
    RegistroMaestrosComponent,
    HomeScreenComponent,
    AdminScreenComponent,
    AlumnosScreenComponent,
    MaestrosScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatListModule,
    MatRadioModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
