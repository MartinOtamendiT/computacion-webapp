import { Component, Input, OnInit } from '@angular/core';
import { AdministradorService } from 'src/app/services/administrador.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
import { Location } from '@angular/common';
import { EditarUserModalComponent } from 'src/app/modals/editar-user-modal/editar-user-modal.component';
import { MatDialog } from '@angular/material/dialog';

//Para poder usar jquery definir esto
declare var $:any;

@Component({
  selector: 'app-registro-admin',
  templateUrl: './registro-admin.component.html',
  styleUrls: ['./registro-admin.component.scss']
})
export class RegistroAdminComponent implements OnInit {
  @Input() rol: string = "";
  @Input() datos_User: any = {};

  public admin: any = {};
  public editar: boolean = false;
  public token: string = "";
  public errors: any = {};
  //Para contraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';
  public idUser: Number = 0;


  constructor(
    private administradoresService: AdministradorService,
    private location : Location,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private facadeService: FacadeService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // this.admin = this.administradoresService.esquemaAdmin();
    // this.admin.rol = this.rol;
    //El primer if valida si existe un parámetro en la URL
    if(this.activatedRoute.snapshot.params['id'] != undefined){
      this.editar = true;
      //Asignamos a nuestra variable global el valor del ID que viene por la URL
      this.idUser = this.activatedRoute.snapshot.params['id'];
      console.log("ID User: ", this.idUser);
      //Al iniciar la vista asignamos los datos del user
      this.admin = this.datos_User;
    }else{
      this.admin = this.administradoresService.esquemaAdmin();
      this.admin.rol = this.rol;
      this.token = this.facadeService.getSessionToken();
    }
    //Imprimir datos en consola
    console.log("Admin: ", this.admin);

  }

  public regresar() {
    this.location.back();
  }

  public registrar() {
    //Validar
    this.errors = [];

    this.errors = this.administradoresService.validarAdmin(this.admin, this.editar);
    if (!$.isEmptyObject(this.errors)) {
      return false;
    }

    //Validamos que las contraseñas coincidan
    // Validar la contraseña
    if(this.admin.password == this.admin.confirmar_password){
      //Aquí si todo es correcto vamos a registrar - aquí se manda a consumir el servicio
      this.administradoresService.registrarAdmin(this.admin).subscribe(
        (response)=>{
          alert("Usuario registrado corrrectamente");
          console.log("Usuario registrado: ", response);
          this.router.navigate(["/"])
        }, (error)=>{
          alert("No se pudo registrar al usuario");
        }
      );
    }else{
      alert("Las contraseñas no coinciden");
      this.admin.password = "";
      this.admin.confirmar_password="";
    }

  }

  public actualizar() {
    //Validación
    this.errors = [];

    this.errors = this.administradoresService.validarAdmin(this.admin, this.editar);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
    console.log("Pasó la validación");

    this.admin.rol = 'administrador';
    const dialogRef = this.dialog.open(EditarUserModalComponent,{
      data: this.admin, //Se pasan valores a través del componente
      height: '288px',
      width: '328px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.isEdited){
        alert("Administrador editado correctamente");
        //Si se editó, entonces mandar al home
        this.router.navigate(["home"]);
      }else{
        console.log("Edición cancelada");
      }
    });

    /*this.administradoresService.editarAdmin(this.admin).subscribe(
      (response)=>{
        alert("Administrador editado correctamente");
        console.log("Admin editado: ", response);
        //Si se editó, entonces mandar al home
        this.router.navigate(["home"]);
      }, (error)=>{
        alert("No se pudo editar el administrador");
      }
    );*/
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
