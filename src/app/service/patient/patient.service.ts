import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class PatientService {

    baseUrl= environment.baseUrl;

    constructor(private http:HttpClient) { }

    create(obj:any):Observable<any>{
      return this.http.post(this.baseUrl+'patients',{
        fullName:obj.fullName,
        birthDay:obj.birthDay,
        gender:obj.gender,
        contact:obj.contact,
        diagnosisType:obj.diagnosisType,
        surgicalHistory:obj.surgicalHistory,
        allergies:obj.allergies
      })
    }

    search(page:any, size:any, searchText:any):Observable<any>{
      let params = new HttpParams();
      params=params.append('searchText', searchText);
      params=params.append('page', page);
      params=params.append('size', size);
      return this.http.get(this.baseUrl+'patients/list',{params:params});
    }

    delete(id:any):Observable<any>{
      return this.http.delete(this.baseUrl+'patients/'+id);
    }

    update(obj:any, id:any):Observable<any>{
      return this.http.put(this.baseUrl+'patients/'+id,{
        fullName:obj.fullName,
        birthDay:obj.birthDay,
        gender:obj.gender,
        contact:obj.contact,
        diagnosisType:obj.diagnosisType,
        surgicalHistory:obj.surgicalHistory,
        allergies:obj.allergies
      })
    }


}
