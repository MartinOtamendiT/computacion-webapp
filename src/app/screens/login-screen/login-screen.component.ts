import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacadeService } from '../../services/facade.service';
declare var $: any;

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})

export class LoginScreenComponent implements OnInit {
  public username: string = "";
  public password: string = "";
  public type: string = "password";
  public errors: any = {};

  constructor(
    private router: Router,
    private facadeService: FacadeService
  ) {}

  ngOnInit(): void {

  }

  public showPassword() {
    if (this.type == "password") {
      $("#show-password").addClass("show-password");
      $("#show-password").attr("data-password", true);
      this.type = "text";
    } else if (this.type == "text") {
      $("#show-password").removeClass("show-password");
      $("#show-password").attr("data-password", false);
      this.type = "password";
    }

  }

  public login() {
    //Validar.
    this.errors = {};

    this.errors = this.facadeService.validarLogin(this.username, this.password);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
  }

  public registrar() {
    this.router.navigate(["registro-usuarios"]);
  }
}
