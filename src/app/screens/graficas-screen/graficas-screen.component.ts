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
    labels: ["Administradores", "Maestros", "Alumnos"],
    datasets: [
      {
        data: {},
        label: 'Registro de materias',
        backgroundColor: '#F88406'
      }
    ]
  }
  lineChartOption = {
    responsive:false,
    plugins: {
      legend: {
        display: false
      }
    }
  }
  lineChartPlugins = [ DatalabelsPlugin ];

  ///Barras
  barChartData = {
    labels: ["Administradores", "Maestros", "Alumnos"],
    datasets: [
      {
        data:{},
        // label: 'Registro de materias',
        backgroundColor: [
          '#FB82F5',
          '#FCFF44',
          '#82D3FB'
        ],
      }
    ]
  }
  barChartOption = {
    responsive:false,
    plugins: {
      legend: {
        display: false
      }
    }
  }
  barChartPlugins = [ DatalabelsPlugin ];

  //Circular
  pieChartData = {
    labels: ["Administradores", "Maestros", "Alumnos"],
    datasets: [
      {
        data: {},
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
        data: {},
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
    this.barChartData.datasets[0].data= [this.total_user.admins,this.total_user.maestros,this.total_user.alumnos]
    this.lineChartData.datasets[0].data= [this.total_user.admins,this.total_user.maestros,this.total_user.alumnos]
    this.pieChartData.datasets[0].data= [this.total_user.admins,this.total_user.maestros,this.total_user.alumnos]
    this.doughnutChartData.datasets[0].data= [this.total_user.admins,this.total_user.maestros,this.total_user.alumnos]
  }
}
