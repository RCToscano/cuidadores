import { Injectable, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SC_API_COLABORADOR, SC_API_GENERICO } from '../app.api';
import { ErrorHandler } from '../app.error-handler';
import { CadastroParametros } from './models/cadastro-parametros-model';
import { Colaborador } from './models/colaborador.model';
import { ColaboradorConta } from './models/colaborador-conta.model';
import { Banco } from './models/bancos.model';
import { UserService } from '../user/user.service';
import { ColaboradorImagem } from './models/colaborador-imagem.model';
import { ColaboradorOcorrencia } from './models/colaborador-ocorrencia.model';

@Injectable()
export class ColaboradorService {

  messageEvent = new EventEmitter();
  colaborador: Colaborador;
  colaboradorContas: ColaboradorConta[];
  colaboradorImagens: ColaboradorImagem[];
  colaboradorOcorrencias: ColaboradorOcorrencia[];
  bancos: Banco[];
  colaboradorEntrevista: any;

  constructor(private http: HttpClient,
              private userService: UserService) {}

  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'Authorization': this.userService.user.token
    // 'Authorization': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0ZSJ9.Zr5btXBGTotvJdjk2cEe_8KxXP2yoa96Eh3J4rKzRgzrColBx6ka8kf2iJ6wNJQmzygG9idcT9Db56EmDcyq0Q'
  });

  options = {
    headers: this.httpHeaders
  };

  setColaboradorConta(colaboradorContas: ColaboradorConta[]) {
    this.colaboradorContas = colaboradorContas;
    this.messageEvent.emit(this.colaboradorContas);
  }

  cadastroParametros(): Observable<CadastroParametros> {
    return this.http.get<CadastroParametros>(`${SC_API_COLABORADOR}/parametros`, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

  getBancos(): Observable<Banco[]> {
    return this.http.get<Banco[]>(`${SC_API_GENERICO}/bancos`, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

  cadastrarColaborador(colaborador: Colaborador): Observable<any> {
    return this.http.post<any>(`${SC_API_COLABORADOR}`, colaborador, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

  alterarColaborador(colaborador: Colaborador): Observable<any> {
    return this.http.post<any>(`${SC_API_COLABORADOR}/alterar`, colaborador, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

  buscarColaboradorImagens(id: number): Observable<ColaboradorImagem[]> {
    return this.http.get<ColaboradorImagem[]>(`${SC_API_COLABORADOR}/imagens/${id}`, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

  uploadImage(file: FormData): Observable<any> {
    return this.http.post<any>(`${SC_API_COLABORADOR}/imagens`, file,
      {
        headers: new HttpHeaders({
          'Authorization': this.userService.user.token
        }),
        observe: 'response'
      }
    )
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

  deletarImagem(idImagem: number, idColaborador: number): Observable<any> {
    return this.http.delete(`${SC_API_COLABORADOR}/imagens/${idImagem}/${idColaborador}`,
      {
        headers: new HttpHeaders({
          'Authorization': this.userService.user.token
        }),
        observe: 'response'
      }
    )
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

  buscarTodosColaboradores(): Observable<Colaborador[]> {
    return this.http.get<Colaborador[]>(`${SC_API_COLABORADOR}`, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

  buscarColaboradores(valor: string): Observable<Colaborador[]> {
    return this.http.get<Colaborador[]>(`${SC_API_COLABORADOR}/nome/${valor}`, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

  consultaColaborador(id: number): Observable<Colaborador> {
    return this.http.get<Colaborador>(`${SC_API_COLABORADOR}/${id}`, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

  colaboradoresContas(id: number): Observable<ColaboradorConta[]> {
    return this.http.get<ColaboradorConta[]>(`${SC_API_COLABORADOR}/contas/${id}`, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

  cadastrarContas(colaboradorConta: ColaboradorConta): Observable<any> {
    return this.http.post<any>(`${SC_API_COLABORADOR}/contas`, colaboradorConta, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

  alterarSituacaoConta(colaboradorConta: ColaboradorConta): Observable<any> {
    return this.http.post<any>(`${SC_API_COLABORADOR}/contas/alterar`, colaboradorConta, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

  deletarConta(idConta: number, idColaborador: number): Observable<any> {
    return this.http.delete<any>(`${SC_API_COLABORADOR}/contas/${idConta}/${idColaborador}`, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

  cadastrarOcorrencia(ocorrencia: ColaboradorOcorrencia): Observable<any> {
    return this.http.post<any>(`${SC_API_COLABORADOR}/ocorrencia`, ocorrencia, this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

  colaboradoresOcorrencias(id: number): Observable<ColaboradorOcorrencia[]> {
    return this.http.get<ColaboradorOcorrencia[]>(`${SC_API_COLABORADOR}/ocorrencia/colaborador/${id}`,
      this.options)
      .pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

}
