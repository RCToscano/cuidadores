import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SC_API_PROSPECT } from '../app.api';
import { ErrorHandler } from '../app.error-handler';
import { UserService } from '../user/user.service';
import { Prospect } from './models/prospect.model';
import { Genero } from '../common/models/genero.models';
import { User } from '../user/models/user.model';

@Injectable()
export class ProspectService {

  token: string;
  options = {headers: new HttpHeaders()};
  messageEvent = new EventEmitter();
  prospect: Prospect;

  constructor(private http: HttpClient) {
    let user: User = JSON.parse(localStorage.getItem('token-cuidadores'));
    this.token = user.token;
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Authorization': this.token
    });
    this.options = {
      headers: httpHeaders
    };
  }


  buscarGeneros(): Observable<Genero[]> {
    return this.http.get<Genero[]>(`${SC_API_PROSPECT}/parametros`, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

  cadastrarProspect(prospect: Prospect): Observable<any> {
    return this.http.post<any>(`${SC_API_PROSPECT}`, prospect, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

  alterarProspect(prospect: Prospect): Observable<any> {
    return this.http.put<any>(`${SC_API_PROSPECT}`, prospect, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

  buscarTodosProspects(): Observable<Prospect[]> {
    return this.http.get<Prospect[]>(`${SC_API_PROSPECT}`, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

  buscarProspects(valor: string): Observable<Prospect[]> {
    return this.http.get<Prospect[]>(`${SC_API_PROSPECT}/nome/${valor}`, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

  consultaProspect(id: number): Observable<Prospect> {
    return this.http.get<Prospect>(`${SC_API_PROSPECT}/${id}`, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

}
