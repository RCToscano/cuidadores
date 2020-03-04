import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SC_API_CLIENTE } from '../app.api';
import { ErrorHandler } from '../app.error-handler';
import { CadastroParametros } from './models/cadastro-parametros-model';
import { Cliente } from './models/cliente.model';

@Injectable()
export class ClienteService {

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
    return this.http.get<CadastroParametros>(`${SC_API_CLIENTE}/cliente`, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

  cadastrarCliente(cliente: Cliente): Observable<any> {
    return this.http.post<any>(`${SC_API_CLIENTE}/cliente/cadastrar`, cliente, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

}
