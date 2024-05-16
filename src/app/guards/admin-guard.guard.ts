import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FacadeService } from 'src/app/services/facade.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(public facadeService : FacadeService, private router: Router) {}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const role = this.facadeService.getUserGroup();
    if (role && role === 'administrador') {
      return true;
    } else {
      // Redirect to a not authorized page or home
      this.router.navigate(['/home']);
      return false;
    }
  }
}
