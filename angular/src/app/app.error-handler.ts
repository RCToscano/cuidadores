import { throwError } from 'rxjs';

export class ErrorHandler {

  static handlerError(error: any) {
    debugger;
    let errorMessage = 'Servidor Indisponível';
    if (error.error instanceof ErrorEvent) {
      // console.log('errorHandler0' + JSON.stringify(error));
      errorMessage = error.error.message;
    }
    else if (error instanceof Response) {
      // console.log('errorHandler1' + JSON.stringify(error));
      errorMessage = error.text.toString();
    }
    else if (error != undefined) {
      // console.log('errorHandler2' + JSON.stringify(error));
      if (error.status == 0 || error.status == 404 || error.status == 504) {
        errorMessage = 'Servidor Indisponível';
      }
      else if (error.status == 401) {
        errorMessage = 'Não autorizado';
      }
      else if (error.error != undefined && error.error.message != undefined && error.error.message != '') {
        errorMessage = error.error.message;
      }
      else if (error.error != undefined && error.error != '') {
        errorMessage = error.error;
      }
      else {
        errorMessage = error.message;
      }
    }
    return throwError(errorMessage);
  }
}
