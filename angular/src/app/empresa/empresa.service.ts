import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SC_API_EMPRESA } from '../app.api';
import { ErrorHandler } from '../app.error-handler';
import { Empresa } from './models/empresa.model';
import { UserService } from '../user/user.service';

@Injectable()
export class EmpresaService {

  messageEvent = new EventEmitter();
  empresa: Empresa;
  colaboradorEntrevista: any;

  constructor(private http: HttpClient,
              private userService: UserService) {}

  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'Authorization': this.userService.user.token
  });

  options = {
    headers: this.httpHeaders
  };

  cadastrarEmpresa(empresa: Empresa): Observable<any> {
    return this.http.post<any>(`${SC_API_EMPRESA}`, empresa, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

  alterarEmpresa(empresa: Empresa): Observable<any> {
    return this.http.put<any>(`${SC_API_EMPRESA}`, empresa, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

  deletarEmpresa(id: number): Observable<any> {
    return this.http.delete<any>(`${SC_API_EMPRESA}/${id}`, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

  empresas(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(`${SC_API_EMPRESA}`, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

  consultaEmpresa(id: number): Observable<Empresa> {
    return this.http.get<Empresa>(`${SC_API_EMPRESA}/${id}`, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

  buscarEmpresas(valor: string): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(`${SC_API_EMPRESA}/nome/${valor}`, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

}
