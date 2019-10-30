import { throwError } from 'rxjs';

export class ErrorHandler {

  static handlerError(error: any) {
    let errorMessage = 'Unavailable Service';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      // console.log('errorHandler0' + JSON.stringify(error));
      errorMessage = error.error.message;
    }
    else if (error instanceof Response) {
      // console.log('errorHandler1' + JSON.stringify(error));
      errorMessage = error.text.toString();
    }
    else if (error != undefined) {
      // server-side error
      // console.log('errorHandler2' + JSON.stringify(error));
      if (error.status == 0 || error.status == 400 || error.status == 504) {
        errorMessage = 'Unavailable Service';
      }
      else if (error.error.message != '') {
        errorMessage = error.error.message;
      }
      else if (error.message != '') {
        errorMessage = error.message;
      }
      else {
        errorMessage = error.error;
      }
    }
    return throwError(errorMessage);
  }
}
