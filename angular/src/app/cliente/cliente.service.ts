import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SC_API_CLIENTE} from '../app.api';
import { ErrorHandler } from '../app.error-handler';
import { CadastroParametros } from './models/cadastro-parametros-model';
import { Cliente } from './models/cliente.model';

@Injectable()
export class ClienteService {

  options = {headers: new HttpHeaders()};
  messageEvent = new EventEmitter();
  cliente: Cliente;


  constructor(private http: HttpClient) {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    this.options = {
      headers: httpHeaders
    };
  }

  cadastroParametros(): Observable<CadastroParametros> {
    return this.http.get<CadastroParametros>(`${SC_API_CLIENTE}/parametros`, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

  cadastrarCliente(cliente: Cliente): Observable<any> {
    return this.http.post<any>(`${SC_API_CLIENTE}`, cliente, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

  alterarCliente(cliente: Cliente): Observable<any> {
    return this.http.put<any>(`${SC_API_CLIENTE}`, cliente, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

  consultaCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${SC_API_CLIENTE}/${id}`, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

  buscarClientesPorNome(valor: string): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${SC_API_CLIENTE}/nome/${valor}`, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

}
