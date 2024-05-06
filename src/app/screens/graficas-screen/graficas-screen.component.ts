import { Component, OnInit, ViewChild } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { AdministradorService } from 'src/app/services/administrador.service';
import { BaseChartDirective } from 'ng2-charts';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-graficas-screen',
  templateUrl: './graficas-screen.component.html',
  styleUrls: ['./graficas-screen.component.scss']
})
export class GraficasScreenComponent implements OnInit{
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  //Agregar chartjs-plugin-datalabels
  //Variables
  public total_user: any = {};
  public availableData = false;
  //Histograma
  lineChartData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        data:[98, 34, 43, 54, 28, 74, 93],
        label: 'Registro de materias',
        backgroundColor: '#F88406'
      }
    ]
  }
  lineChartOption = {
    responsive:false
  }
  lineChartPlugins = [ DatalabelsPlugin ];


  ///Barras
  barChartData = {
    labels: ["Desarrollo Web", "Minería de Datos", "Redes", "Móviles", "Matemáticas"],
    datasets: [
      {
        data:[this.total_user.admins, 43, 54, 28, 74],
        label: 'Registro de materias',
        backgroundColor: [
          '#F88406',
          '#FCFF44',
          '#82D3FB',
          '#FB82F5',
          '#2AD84A'
        ]
      }
    ]
  }
  barChartOption = {
    responsive:false
  }
  barChartPlugins = [ DatalabelsPlugin ];



  //Circular
  //Circular
  pieChartData = {
    labels: ["Administradores", "Maestros", "Alumnos"],
    datasets: [
      {
        data:[89, 34, 43],
        label: 'Registro de usuarios',
        backgroundColor: [
          '#FCFF44',
          '#F1C8F2',
          '#31E731'
        ]
      }
    ]
  }
  pieChartOption = {
    responsive:false
  }
  pieChartPlugins = [ DatalabelsPlugin ];

  // Doughnut
  doughnutChartData = {
    labels: ["Administradores", "Maestros", "Alumnos"],
    datasets: [
      {
        data:[89, 34, 43],
        label: 'Registro de usuarios',
        backgroundColor: [
          '#F88406',
          '#FCFF44',
          '#31E7E7'
        ]
      }
    ]
  }
  doughnutChartOption = {
    responsive:false
  }
  doughnutChartPlugins = [ DatalabelsPlugin ];

  constructor(
    private administradorServices: AdministradorService
  ){}

  ngOnInit(): void {
    this.obtenerTotalUsers();
  }

  public obtenerTotalUsers(){
    this.administradorServices.getTotalUsuarios().subscribe(
      (response)=>{
        this.total_user = response;
        this.availableData = true;
        this.graficarDatos()
        console.log("Total usuarios: ", this.total_user);
      }, (error)=>{
        alert("No se pudo obtener el total de cada rol de usuarios");
      }
    );
  }

  //Método para graficar los datos.
  public graficarDatos(){
    console.log(this.availableData)
    if(this.availableData){
      this.barChartData = {
        labels: ["Admins", "Maestros", "Alumnos"],
        datasets: [
          {
            data: [this.total_user.admins,this.total_user.maestros,this.total_user.alumnos],
            label: 'Registro de materias',
            backgroundColor: [
              '#F88406',
              '#FCFF44',
              '#82D3FB'
            ]
          }
        ]
      }
      this.barChartOption = {
        responsive:false
      }
      this.barChartPlugins = [ DatalabelsPlugin ];
    }
  }
}
