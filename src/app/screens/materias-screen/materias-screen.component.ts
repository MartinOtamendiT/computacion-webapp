import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
import { MateriasService } from 'src/app/services/materias.service';
import { EliminarUserModalComponent } from 'src/app/modals/eliminar-user-modal/eliminar-user-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-materias-screen',
  templateUrl: './materias-screen.component.html',
  styleUrls: ['./materias-screen.component.scss']
})
export class MateriasScreenComponent implements OnInit{
  public name_user:string = "";
  public rol: string = "";
  public token : string = "";
  public lista_materias: any[] = [];

  //Para la tabla
  adminActions : string[] = ['editar', 'eliminar'];

  displayedColumns: string[] = ['NRC', 'nombre_materia', 'seccion', 'dias_materia', 'horario', 'salon', 'programa'];
  dataSource = new MatTableDataSource<DatosMaterias>(this.lista_materias as DatosMaterias[]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public facadeService: FacadeService,
    private materiasService: MateriasService,
    private router: Router,
    public dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.name_user = this.facadeService.getUserCompleteName();
    this.rol = this.facadeService.getUserGroup();

    if(this.rol === 'administrador') {
      this.displayedColumns = [...this.displayedColumns, ...this.adminActions];
    }

    //Validar que haya inicio de sesión
    //Obtengo el token del login
    this.token = this.facadeService.getSessionToken();
    console.log("Token: ", this.token);

    if(this.token == ""){
      this.router.navigate([""]);
    }

    this.obtenerMaterias();
    //Para paginador
    this.initPaginator();
  }

  //Para paginación
  public initPaginator(){
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      //console.log("Paginator: ", this.dataSourceIngresos.paginator);
      //Modificar etiquetas del paginador a español
      this.paginator._intl.itemsPerPageLabel = 'Registros por página';
      this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length === 0 || pageSize === 0) {
          return `0 / ${length}`;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return `${startIndex + 1} - ${endIndex} de ${length}`;
      };
      this.paginator._intl.firstPageLabel = 'Primera página';
      this.paginator._intl.lastPageLabel = 'Última página';
      this.paginator._intl.previousPageLabel = 'Página anterior';
      this.paginator._intl.nextPageLabel = 'Página siguiente';
    },500);
    //this.dataSourceIngresos.paginator = this.paginator;
  }

  //Obtener materias
  public obtenerMaterias(){
    this.materiasService.obtenerListaMaterias().subscribe(
      (response)=>{
        this.lista_materias = response;
        console.log("Lista materias: ", this.lista_materias);
        if(this.lista_materias.length > 0){
          //Agregar datos del nombre e email
          this.lista_materias.forEach(materia => {
          });

          this.dataSource = new MatTableDataSource<DatosMaterias>(this.lista_materias as DatosMaterias[]);
        } else {
          this.dataSource = new MatTableDataSource<DatosMaterias>([] as DatosMaterias[]);
        }
      }, (error)=>{
        alert("No se pudo obtener la lista de usuarios");
      }
    );
  }

   //Funcion para editar
  public goEditar(idMateria: number){
    this.router.navigate(["registro-materias/"+idMateria]);
  }

  public delete(idMateria: number){
    const dialogRef = this.dialog.open(EliminarUserModalComponent,{
      data: {id: idMateria, rol: 'materia'}, //Se pasan valores a través del componente
      height: '288px',
      width: '328px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.isDelete){
        console.log("Materia eliminada");
        //Recargar página
        window.location.reload();
      }else{
        alert("Materia no eliminada");
        console.log("No se eliminó a la materia");
      }
    });
  }
}//Cierre de la clase

//Esto va fuera de la llave que cierra la clase
export interface DatosMaterias {
  id: number,
  nrc: string;
  nombre_materia: string;
  seccion: string;
  dias_materia: string;
  horario: string,
  salon: string,
  programa_educativo: string,
}
