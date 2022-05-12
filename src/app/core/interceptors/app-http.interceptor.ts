import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {SnackbarService} from '../ui/services/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private router: Router, private snackBar: SnackbarService ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {


    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.status === 401) {
          localStorage.removeItem('Authorization');
          this.router.navigateByUrl('/authorization/login');
        }
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
          this.snackBar.openErrorSnackBar(errorMsg, 8000, true);
        } else {
          errorMsg = `Error Code: ${error.error.statusCode},  Message: ${error.error.message}`;
          this.snackBar.openErrorSnackBar(errorMsg, 8000,true);
        }
        console.log(errorMsg);
        return throwError(errorMsg);
      })
    );
  }
}
