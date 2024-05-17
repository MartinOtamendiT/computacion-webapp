import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaestrosService } from 'src/app/services/maestros.service';
import { FacadeService } from 'src/app/services/facade.service';
import { Location } from '@angular/common';
import { EditarUserModalComponent } from 'src/app/modals/editar-user-modal/editar-user-modal.component';
import { MatDialog } from '@angular/material/dialog';

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
  @Input() datos_user: any = {};

  public maestro: any = {};
  public token: string = "";
  public editar: boolean = false;
  public errors: any = {};
  //Para contraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';
  public idUser: Number = 0;


  constructor(
    private location : Location,
    private maestrosService: MaestrosService,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private facadeService: FacadeService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    //El primer if valida si existe un parámetro en la URL
    if(this.activatedRoute.snapshot.params['id'] != undefined){
      this.editar = true;
      //Asignamos a nuestra variable global el valor del ID que viene por la URL
      this.idUser = this.activatedRoute.snapshot.params['id'];
      console.log("ID User: ", this.idUser);
      //Al iniciar la vista asignamos los datos del user
      this.maestro = this.datos_user;
    }else{
      this.maestro = this.maestrosService.esquemaMaestro();
      this.maestro.rol = this.rol;
      this.token = this.facadeService.getSessionToken();
    }
    //Imprimir datos en consola
    console.log("Maestro: ", this.maestro);

  }

  areas_investiacion: area_investigacion[] = [
    {id:'1', value: 'Desarrollo web'},
    {id:'2', value: 'Programación'},
    {id:'3', value: 'Bases de datos'},
    {id:'4', value: 'Redes'},
    {id:'5', value: 'Matemáticas'},
  ]

  // public materias:any[]= [
  //   {value: '1', nombre: 'Aplicaciones Web'},
  //   {value: '2', nombre: 'Programación 1'},
  //   {value: '3', nombre: 'Bases de datos'},
  //   {value: '4', nombre: 'Tecnologías Web'},
  //   {value: '5', nombre: 'Minería de datos'},
  //   {value: '6', nombre: 'Desarrollo móvil'},
  //   {value: '7', nombre: 'Estructuras de datos'},
  //   {value: '8', nombre: 'Administración de redes'},
  //   {value: '9', nombre: 'Ingeniería de Software'},
  //   {value: '10', nombre: 'Administración de S.O.'},
  // ];

  materias: materias_para_impartir[]   = [
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
    //Validación
    this.errors = [];

    this.errors = this.maestrosService.validarMaestro(this.maestro, this.editar);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
    console.log("Pasó la validación");

    this.maestro.rol = 'maestro';
    const dialogRef = this.dialog.open(EditarUserModalComponent,{
      data: this.maestro, //Se pasan valores a través del componente
      height: '288px',
      width: '328px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.isEdited){
        alert("Maestro editado correctamente");
        //Si se editó, entonces mandar al home
        this.router.navigate(["home"]);
      }else{
        console.log("Edición cancelada");
      }
    });
  }

  public regresar() {
    this.location.back();
  }

  public checkboxChange(event:any){
    console.log("Evento: ", event);
    //console.log("Evento: ", event);
    if(event.checked){
      this.maestro.materias_json.push(event.source.value)
    }else{
      console.log(event.source.value);
      this.maestro.materias_json.forEach((materia, i) => {
        if(materia == event.source.value){
          this.maestro.materias_json.splice(i,1);
          this.maestro.materias_json.splice(i,1)
        }
      });
    }
    console.log("Array materias: ", this.maestro);
  }

  public revisarSeleccion(nombre: string){
    if(this.maestro.materias_json){
      var busqueda = this.maestro.materias_json.find((element)=>element==nombre);
      if(busqueda != undefined){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }

  public registrar() {
    //Validar
    this.errors = [];

    this.errors = this.maestrosService.validarMaestro(this.maestro, this.editar);
    if (!$.isEmptyObject(this.errors)) {
      return false;
    }
    //Validar la contraseña
    if(this.maestro.password == this.maestro.confirmar_password){
      //Aquí si todo es correcto vamos a registrar - aquí se manda a llamar al servicio
      this.maestrosService.registrarMaestro(this.maestro).subscribe(
        (response)=>{
          alert("Usuario registrado correctamente");
          console.log("Usuario registrado: ", response);
          if(this.token != ""){
            this.router.navigate(["home"]);
          }else{
            this.router.navigate(["/"]);
          }
        }, (error)=>{
          alert("No se pudo registrar usuario");
        }
      )
    }else{
      alert("Las contraseñas no coinciden");
      this.maestro.password="";
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
