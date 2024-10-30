import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class VisitsService {

 baseUrl= environment.baseUrl;

  constructor(private http:HttpClient) { }

  create(obj:any):Observable<any>{
    return this.http.post(this.baseUrl+'visits',{
      patientId:obj.patientId,
      preDialysisAssesments:obj.preDialysisAssesments,
      postDialysisAssesments:obj.postDialysisAssesments,
      actions:obj.actions,
      healthcareTeam:obj.healthcareTeam
    })
  }

  search(page:any, size:any, searchText:any):Observable<any>{
    let params = new HttpParams();
    params=params.append('searchText', searchText);
    params=params.append('page', page);
    params=params.append('size', size);
    return this.http.get(this.baseUrl+'visits/list',{params:params});
  }

  delete(id:any):Observable<any>{
    return this.http.delete(this.baseUrl+'visits/'+id);
  }

  update(obj:any, id:any):Observable<any>{
    return this.http.put(this.baseUrl+'visits/'+id,{
      patientId:obj.patientId,
      preDialysisAssesments:obj.preDialysisAssesments,
      postDialysisAssesments:obj.postDialysisAssesments,
      actions:obj.actions,
      healthcareTeam:obj.healthcareTeam
    })
  }



}
