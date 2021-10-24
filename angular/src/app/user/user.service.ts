import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from './models/user.model';
import { ErrorHandler } from '../app.error-handler';
import { TOKEN, SC_API_GENERICO, SC_API_USER } from '../app.api';
import { CadastroParametros } from './models/cadastro-parametros-model';
import { Login } from './models/login.model';


@Injectable()
export class UserService {

  messageEvent = new EventEmitter();
  user: User = {} as User;
  navigateTo: string;
  error: string;

  httpHeaders: HttpHeaders;
  options = {};

  constructor(private http: HttpClient,
              private router: Router) {

    let user: User = JSON.parse(localStorage.getItem(TOKEN));
    if (user != null) {
      this.user = user;
      let httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      });
      this.options = {
        headers: httpHeaders
      };
    }
  }

  setUser(user: User) {
    this.user = user;
    localStorage.setItem(TOKEN, JSON.stringify(user));
    this.messageEvent.emit(user);
    this.httpHeaders = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    );
    this.options = {
      headers: this.httpHeaders
    };
  }

  isLogged(): boolean {
    if (this.user != undefined && this.user.token != null) {
      return true;
    }
    return false;
  }

  verificarPermissao(feature: string): boolean {
    if (this.user != undefined && this.user.token != null && this.user.funcionalidades.includes(feature)) {
      return true;
    }
    return false;
  }

  handleLogin() {
    this.router.navigate(['/user/register']);
  }

  login(login: Login): Observable<User> {
    return this.http.post<any>(`${SC_API_GENERICO}/login/autenticar`, login)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

  logout() {
    this.user = {} as User;
    localStorage.clear();
    this.messageEvent.emit(this.user);
    this.router.navigate(['']);
  }

  cadastroParametros(): Observable<CadastroParametros> {
    return this.http.get<CadastroParametros>(`${SC_API_USER}/parametros`, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

  consultaUsuarioToken(token: string): Observable<any> {
    return this.http.get(`${SC_API_USER}/token`,
      {
        headers: new HttpHeaders({
          'Authorization': token
        }),
        observe: 'response'
      }
    )
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

  consultaUsuarioId(id: number): Observable<User> {
    return this.http.get<User>(`${SC_API_USER}/${id}`, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

  cadastrarUsuario(user: User): Observable<any> {
    return this.http.post<any>(`${SC_API_USER}`, user, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

  alterarUsuario(user: User): Observable<any> {
    return this.http.put<any>(`${SC_API_USER}`, user, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

  alterarSenha(senha: any): Observable<any> {
    return this.http.put<any>(`${SC_API_USER}/senha`, senha, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

  usuarios(): Observable<User[]> {
    return this.http.get<User[]>(`${SC_API_USER}`, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

  buscarUsuariosPorNome(valor: string): Observable<User[]> {
    return this.http.get<User[]>(`${SC_API_USER}/nome/${valor}`, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

}
