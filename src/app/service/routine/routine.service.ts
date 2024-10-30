import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class RoutineService {

    baseUrl= environment.baseUrl;

    constructor(private http:HttpClient) { }

    create(obj:any):Observable<any>{
      return this.http.post(this.baseUrl+'routines',{
        patientId:obj.patientId,
        date:obj.date,
        duration:obj.duration,
        dialysisSite:obj.dialysisSite,
        daialysisMachineSetting:obj.daialysisMachineSetting,
        treatmentAdjustment:obj.treatmentAdjustment,
      })
    }

    search(page:any, size:any, searchText:any):Observable<any>{
      let params = new HttpParams();
      params=params.append('searchText', searchText);
      params=params.append('page', page);
      params=params.append('size', size);
      return this.http.get(this.baseUrl+'routines/list',{params:params});
    }

    delete(id:any):Observable<any>{
      return this.http.delete(this.baseUrl+'routines/'+id);
    }

    update(obj:any, id:any):Observable<any>{
      return this.http.put(this.baseUrl+'routines/'+id,{
          patientId:obj.patientId,
          date:obj.date,
          duration:obj.duration,
          dialysisSite:obj.dialysisSite,
          daialysisMachineSetting:obj.daialysisMachineSetting,
          treatmentAdjustment:obj.treatmentAdjustment,
      })
    }

}
