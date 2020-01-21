import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from './models/user.model';
import { ErrorHandler } from '../app.error-handler';
import { SC_API_USER } from '../app.api';
import { CadastroParametros } from './models/cadastro-parametros-model';


@Injectable()
export class UserService {

  messageEvent = new EventEmitter();
  user: User;
  navigateTo: string;
  token = localStorage.getItem('tokenCuidadores');

  constructor(private http: HttpClient, private router: Router) {
    if (this.token != null && this.token != 'null') {
      this.consultaUsuarioToken(this.token).subscribe(
        res => {
            this.user = res;
            this.user.token = this.token;
            this.setUser(this.user);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  setUser(user: User) {
    this.user = user;
    localStorage.setItem('tokenCuidadores', user.token);
    this.messageEvent.emit(user);
  }

  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' });

  options = {
    headers: this.httpHeaders
  };

  isLogged(): boolean {
    if ((this.user != undefined && this.user.token != null) ||
          (this.token != null && this.token != 'null')) {
      return true;
    }
    return false;
  }

  handleLogin() {
    this.router.navigate(['/user/register']);
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<any>(`${SC_API_USER}/users/login`, { emailAdress: email, password: password }, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

  logout() {
    this.user = null;
    localStorage.clear();
    this.messageEvent.emit(this.user);
  }

  cadastroParametros(): Observable<CadastroParametros> {
    return this.http.get<CadastroParametros>(`${SC_API_USER}/parametros`, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

  consultaUsuarioToken(token: string): Observable<any> {
    return this.http.get(`${SC_API_USER}/users/token/${token}`, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

  consultaUsuarioId(id: number): Observable<any> {
    return this.http.get(`${SC_API_USER}/users/${id}`, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

  cadastrarUsuario(user: User): Observable<any> {
    return this.http.post<any>(`${SC_API_USER}/users`, user, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

  usuarios(): Observable<User[]> {
    return this.http.get<User[]>(`${SC_API_USER}/users`, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

}
