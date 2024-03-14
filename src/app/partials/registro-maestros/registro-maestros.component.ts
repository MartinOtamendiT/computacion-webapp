import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MaestrosService } from 'src/app/services/maestros.service';
declare var $: any;

interface area_investigacion {
  id: string
  value: string
}

interface materias_para_impartir {
  name: string
  selected: boolean
}

@Component({
  selector: 'app-registro-maestros',
  templateUrl: './registro-maestros.component.html',
  styleUrls: ['./registro-maestros.component.scss']
})

export class RegistroMaestrosComponent implements OnInit{
  @Input() rol: string = "";

  public maestro: any = {};
  public editar: boolean = false;
  public errors: any = {};
  //Para contraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';


  constructor(
    private maestrosService: MaestrosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.maestro = this.maestrosService.esquemaMaestro();
    this.maestro.rol = this.rol;
    console.log("Alumno: ", this.maestro);

  }

  areas_investiacion: area_investigacion[] = [
    {id:'1', value: 'Desarrollo web'},
    {id:'2', value: 'Programación'},
    {id:'3', value: 'Bases de datos'},
    {id:'4', value: 'Redes'},
    {id:'5', value: 'Matemáticas'},
  ]

  materias: materias_para_impartir[] = [
    {name:'Aplicaciones web', selected: false},
    {name:'Programación 1', selected: false},
    {name:'Bases de datos', selected: false},
    {name:'Tecnologías web', selected: false},
    {name:'Minería de datos', selected: false},
    {name:'Desarrollo móvil', selected: false},
    {name:'Estructuras de datos', selected: false},
    {name:'Administración de redes', selected: false},
    {name:'Ingeniería de software', selected: false},
    {name:'Administración de S.O', selected: false},
  ]

  public actualizar() {

  }

  public regresar() {

  }

  public registrar() {
    //Validar
    this.errors = [];

    this.errors = this.maestrosService.validarMaestro(this.maestro, this.editar);
    if (!$.isEmptyObject(this.errors)) {
      return false;
    }
    //Validamos que las contraseñas coincidan
    // Validar la contraseña
    if(this.maestro.password == this.maestro.confirmar_password){
      //Aquí si todo es correcto vamos a registrar - aquí se manda a consumir el servicio
      this.maestrosService.registrarMaestro(this.maestro).subscribe(
        (response)=>{
          alert("Maestro registrado corrrectamente");
          console.log("Maestro registrado: ", response);
          this.router.navigate(["/"])
        }, (error)=>{
          alert("No se pudo registrar al Maestro");
        }
      );
    }else{
      alert("Las contraseñas no coinciden");
      this.maestro.password = "";
      this.maestro.confirmar_password="";
    }
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
