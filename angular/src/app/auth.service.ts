import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { User } from "./user/models/user.model";
import { catchError, map } from "rxjs/operators";
import { UserService } from "./user/user.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { LoginModalComponent } from "./user/login/modal/login-modal.component";
import { TOKEN } from './app.api';


const MODALS = {
  loginModal: LoginModalComponent
};


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userService: UserService,
              private modalService: NgbModal) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let user: User = JSON.parse(localStorage.getItem(TOKEN));
    // console.log('intercept');

    if (!req.url.includes('login/autenticar')  && !req.url.includes('users/token') && user) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer '.concat(user.token))
      });

      return next.handle(cloned).pipe(
        map((event: HttpResponse<any>) => {
          if(event instanceof HttpResponse) {
              user.token = event.headers.get('Authorization');
              this.userService.setUser(user);
          }
          return event;
        }),
        catchError((error: HttpErrorResponse) => {
          // console.log('error')
          if (error.status === 401) {
            this.loginModal();
          }
          return throwError(error);
       })
      );
    }
    else {
      // console.log('ignorado');
      return next.handle(req);
    }
  }

  loginModal() {
    const modalRef = this.modalService.open(MODALS['loginModal'], {centered: true});
    modalRef.result.then((result: boolean) => {
      console.log(result);
      if (!result) {
        this.userService.logout();
      }
    },
    () => {
      this.userService.logout();
    });
  }

}
