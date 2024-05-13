import { Injectable } from '@angular/core';
import { ValidatorService } from './tools/validator.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorsService } from './tools/errors.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FacadeService } from './facade.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  constructor(
    private http: HttpClient,
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
    private facadeService: FacadeService
  ) { }

  public esquemaMateria(){
    return {
      'nrc': '',
      'nombre_materia':'',
      'seccion': '',
      'dias_materia':[],
      'horario': '',
      'salon': '',
      'programa_educativo': '',
    }
  }
  //Validación para el formulario
  public validarMateria(data: any, editar: boolean){
    console.log("Validando materia... ", data);
    let error: any = [];

    if(!this.validatorService.required(data['NRC'])){
      error['NRC'] = this.errorService.required;
    }

    if(!this.validatorService.required(data['nombre_materia'])){
      error['nombre_materia'] = this.errorService.required;
    }

    if(!this.validatorService.required(data["seccion"])){
      error['seccion'] = this.errorService.required;
    }

    if(data['dias_materia'].length === 0){
      error['dias_materia'] = this.errorService.required;
    }

    if(!this.validatorService.required(data['horario'])){
      error['horario'] = this.errorService.required;
    }
    if(!this.validatorService.required(data['salon'])){
      error['salon'] = this.errorService.required;
    }
    if(!this.validatorService.required(data['programa_educativo'])){
      error['programa_educativo'] = this.errorService.required;
    }


    //Return arreglo
    return error;
  }

  //Aquí van los servicios HTTP
  //Servicio para regustrar un nuevo maestro
  public registrarMateria (data: any): Observable <any>{
    console.log("Aquí")
    return this.http.post<any>(`${environment.url_api}/materia/`,data, httpOptions);
  }

  public obtenerListaMaterias (): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.get<any>(`${environment.url_api}/lista-materias/`, {headers:headers});
  }

  //Obtener una sola materia dependiendo su ID
  public getMateriaByID(idUser: Number){
    return this.http.get<any>(`${environment.url_api}/materia/?id=${idUser}`,httpOptions);
  }


  //Servicio para actualizar una materia.
  public editarMateria (data: any): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.put<any>(`${environment.url_api}/materias-edit/`, data, {headers:headers});
  }

  //Eliminar  Materia.
  public eliminarMateria(idMateria: number): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.delete<any>(`${environment.url_api}/materias-edit/?id=${idMateria}`,{headers:headers});
  }
}
