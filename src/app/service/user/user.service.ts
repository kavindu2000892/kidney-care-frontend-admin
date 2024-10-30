import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';  // Ensure map is imported

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  register(obj: any): Observable<any> {
    return this.http.post(this.baseUrl + 'users/visitor/signup', {
      email: obj.email,
      displayName: obj.displayName,
      password: obj.password
    });
  }

  login(obj: any): Observable<any> {
    return this.http.post('http://localhost:8002/login', {
      username: obj.username,
      password: obj.password
    }, { observe: 'response' })
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }
}
