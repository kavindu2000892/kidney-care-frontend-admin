import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from "rxjs";
import {inject} from "@angular/core";
import {CookiemanagerService} from "../service/cookie/cookiemanager.service";



export const httpManagerInterceptor: HttpInterceptorFn = (req, next) => {

  let cookiemanagerService: CookiemanagerService =inject(CookiemanagerService);

  if(cookiemanagerService.isExists()){
    const token = cookiemanagerService.get();
    req = req.clone({
      setHeaders:{
        Authorization:token
        }
      });
    console.log(req)
    }



  return next(req).pipe(
    catchError((error:HttpErrorResponse)=>{
      return throwError(()=>error)
    })
  )
};
