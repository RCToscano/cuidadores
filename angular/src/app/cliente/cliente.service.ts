
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

  messageEvent = new EventEmitter();
  cliente: Cliente;

  constructor(private http: HttpClient) {}

  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'Authentication': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ3YWduZXIifQ.zJNGtr7o2gRFmBuAcJzpqa99gxL4sgJ-gRYQ8onEiTMLjY0dJPYsx1WFYKjM73DFVK6n8ArPQqDEMh56NuVAaQ'
  });

  options = {
    headers: this.httpHeaders
  };

  cadastroParametros(): Observable<CadastroParametros> {
    return this.http.get<CadastroParametros>(`${SC_API_CLIENTE}/web/cliente/parametros`, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

  cadastrarCliente(cliente: Cliente): Observable<any> {
    return this.http.post<any>(`${SC_API_CLIENTE}/web/cliente/cadastrar`, cliente, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

  alterarCliente(cliente: Cliente): Observable<any> {
    return this.http.post<any>(`${SC_API_CLIENTE}/web/cliente/alterar`, cliente, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

  buscarPorIdCliente(idCliente: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${SC_API_CLIENTE}/web/cliente/buscar/idCliente/${idCliente}`, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

  listarCliente(): Observable<any> {
    return this.http.get<any>(`${SC_API_CLIENTE}/web/cliente/listar`, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }
}
