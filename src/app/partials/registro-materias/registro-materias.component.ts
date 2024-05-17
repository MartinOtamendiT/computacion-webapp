import { MateriasService } from 'src/app/services/materias.service';
import { Component, OnInit, Input } from '@angular/core';
import { FacadeService } from 'src/app/services/facade.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { EditarUserModalComponent } from 'src/app/modals/editar-user-modal/editar-user-modal.component';
import { MatDialog } from '@angular/material/dialog';

declare var $: any;

interface dias_a_impartir {
  name: string
  selected: boolean
}
interface programa_educativo {
  id: string
  value: string
}

@Component({
  selector: 'app-registro-materias',
  templateUrl: './registro-materias.component.html',
  styleUrls: ['./registro-materias.component.scss'],
})
export class RegistroMateriasComponent implements OnInit {

  public tipo: string = "registro-materias";
  @Input() datos_materia : any = {};

  //public materias: any = {};
  public token: string = "";
  public editar: boolean = false;
  public errors: any = {};
  public materia : any = {};
  public idMateria : Number = 0;

  constructor(
    private location : Location,
    private materiasService : MateriasService,
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
      this.idMateria = this.activatedRoute.snapshot.params['id'];
      console.log("ID Materia: ", this.idMateria);

      //Obtenemos los datos de la materia y se muestran en pantalla.
      this.materiasService.getMateriaByID(this.idMateria).subscribe(
        (response)=>{
          this.materia = response;
          //Agregamos valores faltantes
          this.materia.nrc = response.NRC;
          this.materia.horario_inicio = response.horario.split("-")[0];
          this.materia.horario_fin = response.horario.split("-")[1];
          console.log("Datos materia: ", this.materia);
        }, (error)=>{
          alert("No se pudieron obtener los datos de la materia para editar");
          console.log(error)
        }
      );
    }else{
      this.materia = this.materiasService.esquemaMateria();
      this.token = this.facadeService.getSessionToken();
    }
  }

  dias: dias_a_impartir[] = [
    {name:'Lunes', selected: false},
    {name:'Martes', selected: false},
    {name:'Miercoles', selected: false},
    {name:'Jueves', selected: false},
    {name:'Viernes', selected: false},
    {name:'Sabado', selected: false}
  ]
  programa_educativo: programa_educativo[] = [
    {id:'1', value: 'Ingeniería en Ciencias de la Computación'},
    {id:'2', value: 'Licenciatura en Ciencias de la Computación'},
    {id:'3', value: 'Licenciatura en Tecnologías de la Información'},
  ]

  public regresar() {
    this.location.back();
  }
  public registrar() {
    //Validar
    this.errors = [];
    this.errors = this.materiasService.validarMateria(this.materia, this.editar);
    console.log(this.errors)
    if (!$.isEmptyObject(this.errors)) {
      return false;
    }

    this.materiasService.registrarMateria(this.materia).subscribe(
      (response)=>{
        alert("Materia registrada correctamente");
        console.log("Materia registrada: ", response);
        if(this.token != ""){
          this.router.navigate(["home"]);
        }else{
          this.router.navigate(["/"]);
        }
      }, (error)=>{
        alert("No se pudo registrar materia");
      }
    )
  }


  public actualizar() {
    //Validación
    this.errors = [];

    this.errors = this.materiasService.validarMateria(this.materia, this.editar);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
    console.log("Pasó la validación");

    this.materia.rol = 'materia';
    const dialogRef = this.dialog.open(EditarUserModalComponent,{
      data: this.materia, //Se pasan valores a través del componente
      height: '288px',
      width: '328px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.isEdited){
        alert("Materia editada correctamente");
        //Si se editó, entonces mandar al home
        this.router.navigate(["home"]);
      }else{
        console.log("Edición cancelada");
      }
    });
  }

}

