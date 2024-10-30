import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class NurseService {


  baseUrl= environment.baseUrl;

  constructor(private http:HttpClient) { }

  create(obj:any):Observable<any>{
    return this.http.post(this.baseUrl+'nurses',{
      fullName:obj.fullName,
      contact:obj.contact,
      lisenceNumber:obj.lisenceNumber,
      onCallStatus:obj.onCallStatus,
      specialization:obj.specialization
    })
  }

  search(page:any, size:any, searchText:any):Observable<any>{
    let params = new HttpParams();
    params=params.append('searchText', searchText);
    params=params.append('page', page);
    params=params.append('size', size);
    return this.http.get(this.baseUrl+'nurses/list',{params:params});
  }

  delete(id:any):Observable<any>{
    return this.http.delete(this.baseUrl+'nurses/'+id);
  }

  update(obj:any, id:any):Observable<any>{
    return this.http.put(this.baseUrl+'nurses/'+id,{
      fullName:obj.fullName,
      contact:obj.contact,
      lisenceNumber:obj.lisenceNumber,
      onCallStatus:obj.onCallStatus,
      specialization:obj.specialization
    })
  }


}
