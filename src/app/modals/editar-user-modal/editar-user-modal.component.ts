import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdministradorService } from 'src/app/services/administrador.service';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { MaestrosService } from 'src/app/services/maestros.service';
import { MateriasService } from 'src/app/services/materias.service';

@Component({
  selector: 'app-editar-user-modal',
  templateUrl: './editar-user-modal.component.html',
  styleUrls: ['./editar-user-modal.component.scss']
})
export class EditarUserModalComponent {
  public rol: string = "";

  constructor(
    private administradorService: AdministradorService,
    private maestrosService: MaestrosService,
    private alumnosService: AlumnosService,
    private materiasService: MateriasService,
    private dialogRef: MatDialogRef<EditarUserModalComponent>,
    @Inject (MAT_DIALOG_DATA) public data: any
  ){}

  ngOnInit(): void {
    this.rol = this.data.rol;
    console.log("Rol modal: ", this.rol);
  }

  public cerrar_modal(){
    this.dialogRef.close({isDelete:false});
  }

  public editarUser(){
    if(this.rol == "administrador"){
      this.administradorService.editarAdmin(this.data).subscribe(
        (response)=>{
          console.log("Administrador editado: ", response);
          this.dialogRef.close({isEdited:true});
        }, (error)=>{
          this.dialogRef.close({isEdited:false});
        }
      );

    }else if(this.rol == "maestro"){
      this.maestrosService.editarMaestro(this.data).subscribe(
        (response)=>{
          console.log("Maestro editado: ", response);
          this.dialogRef.close({isEdited:true});
        }, (error)=>{
          this.dialogRef.close({isEdited:false});
        }
      );

    }else if(this.rol == "alumno"){
      this.alumnosService.editarAlumno(this.data).subscribe(
        (response)=>{
          console.log("Alumno editado: ", response);
          this.dialogRef.close({isEdited:true});
        }, (error)=>{
          this.dialogRef.close({isEdited:false});
        }
      );

    }else if(this.rol == "materia"){
      this.materiasService.editarMateria(this.data).subscribe(
        (response)=>{
          console.log("Materia editada: ", response);
          this.dialogRef.close({isEdited:true});
        }, (error)=>{
          this.dialogRef.close({isEdited:false});
        }
      );
    }
  }
}
