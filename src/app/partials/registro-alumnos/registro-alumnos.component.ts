import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute ,Router } from '@angular/router';
import { Location } from '@angular/common';
import { FacadeService } from 'src/app/services/facade.service';
// import { MatDatepickerControl, MatDatepickerPanel } from '@angular/material/datepicker';
import { AlumnosService } from 'src/app/services/alumnos.service';

declare var $: any;

@Component({
  selector: 'app-registro-alumnos',
  templateUrl: './registro-alumnos.component.html',
  styleUrls: ['./registro-alumnos.component.scss']
})

export class RegistroAlumnosComponent implements OnInit {
  @Input() rol: string = "";
  @Input() datos_user: any = {};

  public alumno: any = {};
  public token: string = "";
  public editar: boolean = false;
  public errors: any = {};
  //Para contraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';
  public idUser: Number = 0;
  // picker: MatDatepickerPanel<MatDatepickerControl<any>,any,any>;


  constructor(
    private location : Location,
    private alumnosService: AlumnosService,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private facadeService: FacadeService
     ) { }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.params['id'] != undefined){
      this.editar = true;
      //Asignamos a nuestra variable global el valor del ID que viene por la URL
      this.idUser = this.activatedRoute.snapshot.params['id'];
      console.log("ID User: ", this.idUser);
      //Al iniciar la vista asignamos los datos del user
      this.alumno = this.datos_user;
    }else{
      this.alumno = this.alumnosService.esquemaAlumno();
      this.alumno.rol = this.rol;
      this.token = this.facadeService.getSessionToken();
  }
  //Imprimir datos en consola
  console.log("Alumno: ", this.alumno);

}

  public regresar() {
    this.location.back();
  }

  public registrar() {
    //Validar
    this.errors = [];

    this.errors = this.alumnosService.validarAlumno(this.alumno, this.editar);
    if (!$.isEmptyObject(this.errors)) {
      return false;
    }

    //Validamos que las contraseñas coincidan
    // Validar la contraseña
    if(this.alumno.password == this.alumno.confirmar_password){
      //Aquí si todo es correcto vamos a registrar - aquí se manda a consumir el servicio
      this.alumnosService.registrarAlumno(this.alumno).subscribe(
        (response)=>{
          alert("Alumno registrado corrrectamente");
          console.log("Alumno registrado: ", response);
          this.router.navigate(["/"])
        }, (error)=>{
          alert("No se pudo registrar al Alumno");
        }
      );
    }else{
      alert("Las contraseñas no coinciden");
      this.alumno.password = "";
      this.alumno.confirmar_password="";
    }
  }

  public actualizar() {
    //Validación
    this.errors = [];

    this.errors = this.alumnosService.validarAlumno(this.alumno, this.editar);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
    console.log("Pasó la validación");

    this.alumnosService.editarAlumno(this.alumno).subscribe(
      (response)=>{
        alert("Alumno editado correctamente");
        console.log("Alumno editado: ", response);
        //Si se editó, entonces mandar al home
        this.router.navigate(["home"]);
      }, (error)=>{
        alert("No se pudo editar el alumno");
      }
    );
  }

  //Funciones para password
  showPassword() {
    if (this.inputType_1 == 'password') {
      this.inputType_1 = 'text';
      this.hide_1 = true;
    }
    else {
      this.inputType_1 = 'password';
      this.hide_1 = false;
    }
  }

  showPwdConfirmar() {
    if (this.inputType_2 == 'password') {
      this.inputType_2 = 'text';
      this.hide_2 = true;
    }
    else {
      this.inputType_2 = 'password';
      this.hide_2 = false;
    }
  }
}
