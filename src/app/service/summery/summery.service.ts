import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class SummeryService {

    baseUrl= environment.baseUrl;

    constructor(private http:HttpClient) { }

    create(obj:any):Observable<any>{
      return this.http.post(this.baseUrl+'summeries',{
        patientId:obj.patientId,
        reportDate:obj.reportDate,
        doctorInCharge:obj.doctorInCharge,
        treatmentHistory:obj.treatmentHistory,
        dialysisSessionHistory:obj.dialysisSessionHistory,
        symptms:obj.symptms,
      })
    }

    search(page:any, size:any, searchText:any):Observable<any>{
      let params = new HttpParams();
      params=params.append('searchText', searchText);
      params=params.append('page', page);
      params=params.append('size', size);
      return this.http.get(this.baseUrl+'summeries/list',{params:params});
    }

    delete(id:any):Observable<any>{
      return this.http.delete(this.baseUrl+'summeries/'+id);
    }

    update(obj:any, id:any):Observable<any>{
      return this.http.put(this.baseUrl+'summeries/'+id,{
        patientId:obj.patientId,
        reportDate:obj.reportDate,
        doctorInCharge:obj.doctorInCharge,
        treatmentHistory:obj.treatmentHistory,
        dialysisSessionHistory:obj.dialysisSessionHistory,
        symptms:obj.symptms,
      })
    }



}
