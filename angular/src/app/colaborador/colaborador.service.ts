import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SC_API_COLABORADOR } from '../app.api';
import { ErrorHandler } from '../app.error-handler';
import { CadastroParametros } from './models/cadastro-parametros-model';
import { Colaborador } from './models/colaborador.model';

@Injectable()
export class ColaboradorService {

  messageEvent = new EventEmitter();

  constructor(private http: HttpClient) {}

  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
  });

  options = {
    headers: this.httpHeaders
  };

  cadastroParametros(): Observable<CadastroParametros> {
    return this.http.get<CadastroParametros>(`${SC_API_COLABORADOR}/colaborador`, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

  cadastrarColaborador(colaborador: Colaborador): Observable<any> {
    return this.http.post<any>(`${SC_API_COLABORADOR}/colaborador/cadastrar`, colaborador, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

}
