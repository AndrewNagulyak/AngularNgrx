import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AppService} from '../../app.service';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private appService: AppService, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {


    this.appService.heartbeat();
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.status === 401) {
          this.router.navigateByUrl('/authorization/login');
          // redirect to the login route
          // or show a modal showing, we are redirecting to you login page.
        }
        if (error.error instanceof ErrorEvent) {
          console.log('this is client side error');
          errorMsg = `Error: ${error.error.message}`;
        } else {
          console.log('this is server side error');
          errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
        }
        console.log(errorMsg);
        return throwError(errorMsg);
      })
    );
  }
}

// INTERCEPTOR FOR REDIRECTING TO AUTHORISATION
// /
// import { Injectable } from '@angular/core';
// import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
// import { Observable } from 'rxjs';
//
// @Injectable()
// export class JwtInterceptor implements HttpInterceptor {
//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     // add authorization header with jwt token if available
//     let currentUser = JSON.parse(localStorage.getItem('currentUser'));
//     if (currentUser && currentUser.token) {
//       request = request.clone({
//         setHeaders: {
//           Authorization: `Bearer ${currentUser.token}`
//         }
//       });
//     }
//
//     return next.handle(request).do((event: HttpEvent<any>) => {
//       if (event instanceof HttpResponse) {
//         // do stuff with response if you want
//       }
//     }, (err: any) => {
//       if (err instanceof HttpErrorResponse) {
//         if (err.status === 401) {
//           // redirect to the login route
//           // or show a modal showing, we are redirecting to you login page.
//         }
//       }
//     });
//   }
// }
