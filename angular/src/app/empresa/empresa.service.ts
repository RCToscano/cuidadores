import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SC_API } from '../app.api';
import { ErrorHandler } from '../app.error-handler';
import { Empresa } from './models/empresa.model';

@Injectable()
export class EmpresaService {

  messageEvent = new EventEmitter();
  empresa: Empresa;
  colaboradorEntrevista: any;

  constructor(private http: HttpClient) {}

  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
  });

  options = {
    headers: this.httpHeaders
  };

  cadastrarEmpresa(empresa: Empresa): Observable<any> {
    return this.http.post<any>(`${SC_API}/empresas`, empresa, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

  empresas(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(`${SC_API}/empresas`, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

  consultaEmpresa(id: number): Observable<Empresa> {
    return this.http.get<Empresa>(`${SC_API}/empresas/${id}`, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

}
