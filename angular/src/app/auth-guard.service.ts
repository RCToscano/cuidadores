import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from "@angular/router";
import { UserService } from "./user/user.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { LoginModalComponent } from "./user/login/modal/login-modal.component";


const MODALS = {
  loginModal: LoginModalComponent
};

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: UserService,
              private router: Router,
              private modalService: NgbModal) { }

  canActivate(route: ActivatedRouteSnapshot) {
    // console.log('active');
    if (this.authService.isLogged()) {
      if(!this.authService.verificarPermissao(route.data.feature)) {
        // console.log('permissao negada');
        return this.router.parseUrl('');
      }
      else if (!this.isLoggedin()) {
        return false;
      }
      return true;
    }
    else {
      this.authService.logout();
      return false;
    }
  }

  isLoggedin() {
    if (this.tokenIsExpired(this.authService.user.token)) {
      return this.loginModal();
    }
    return true;
  }

  tokenIsExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  loginModal(): boolean {
    const modalRef = this.modalService.open(MODALS['loginModal'], {centered: true});
    modalRef.result.then((result: boolean) => {
      console.log(result);
      if (!result) {
        this.authService.logout();
      }
      return result;
    },
    () => {
      this.authService.logout();
      return false;
    });
    return false;
  }

}
