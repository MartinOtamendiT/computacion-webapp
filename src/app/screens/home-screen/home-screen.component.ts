import { FacadeService } from './../../services/facade.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss']
})
export class HomeScreenComponent implements OnInit{
  public rol:string = "";

  constructor(
    private facadeService: FacadeService
  ){}

  ngOnInit(): void {
      this.rol = this.facadeService.getUserGroup();
      console.log("Rol: :", this.rol)
  }
}
