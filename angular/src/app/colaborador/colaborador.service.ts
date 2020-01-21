import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SC_API_COLABORADOR, SC_API } from '../app.api';
import { ErrorHandler } from '../app.error-handler';
import { CadastroParametros } from './models/cadastro-parametros-model';
import { Colaborador } from './models/colaborador.model';
import { ColaboradorConta } from './models/colaborador-conta.model';
import { Banco } from './models/bancos.model';

@Injectable()
export class ColaboradorService {

  messageEvent = new EventEmitter();
  colaborador: Colaborador;
  colaboradorContas: ColaboradorConta[];
  bancos: Banco[];
  colaboradorEntrevista: any;

  constructor(private http: HttpClient) {}

  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
  });

  options = {
    headers: this.httpHeaders
  };

  cadastroParametros(): Observable<CadastroParametros> {
    return this.http.get<CadastroParametros>(`${SC_API}/parametros`, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

  getBancos(): Observable<Banco[]> {
    return this.http.get<Banco[]>(`${SC_API}/bancos`, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

  cadastrarColaborador(colaborador: Colaborador): Observable<any> {
    return this.http.post<any>(`${SC_API}/colaboradores`, colaborador, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

  colaboradores(): Observable<Colaborador[]> {
    return this.http.get<Colaborador[]>(`${SC_API}/colaboradores`, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

  consultaColaborador(id: number): Observable<Colaborador> {
    return this.http.get<Colaborador>(`${SC_API}/colaboradores/${id}`, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

  colaboradoresContas(): Observable<ColaboradorConta[]> {
    return this.http.get<ColaboradorConta[]>(`${SC_API}/contas`, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

}
