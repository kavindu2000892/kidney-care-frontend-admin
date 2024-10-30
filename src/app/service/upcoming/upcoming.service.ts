import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class UpcomingService {

    baseUrl= environment.baseUrl;

    constructor(private http:HttpClient) { }

    create(obj:any):Observable<any>{
      return this.http.post(this.baseUrl+'upcomings',{
        patientId:obj.patientId,
        date:obj.date,
        time:obj.time,
        sessionStatus:obj.sessionStatus,
        assignedBed:obj.assignedBed
      })
    }

    search(page:any, size:any, searchText:any):Observable<any>{
      let params = new HttpParams();
      params=params.append('searchText', searchText);
      params=params.append('page', page);
      params=params.append('size', size);
      return this.http.get(this.baseUrl+'upcomings/list',{params:params});
    }

    delete(id:any):Observable<any>{
      return this.http.delete(this.baseUrl+'upcomings/'+id);
    }

    update(obj:any, id:any):Observable<any>{
      return this.http.put(this.baseUrl+'upcomings/'+id,{
        patientId:obj.patientId,
        date:obj.date,
        time:obj.time,
        sessionStatus:obj.sessionStatus,
        assignedBed:obj.assignedBed
      })
    }


}
