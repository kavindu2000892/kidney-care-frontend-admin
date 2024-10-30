import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class SignsService {

    baseUrl= environment.baseUrl;

    constructor(private http:HttpClient) { }

    create(obj:any):Observable<any>{
      return this.http.post(this.baseUrl+'signs',{
        patientId:obj.patientId,
        date:obj.date,
        bloodPressure:obj.bloodPressure,
        heartRate:obj.heartRate,
        respiratoryRate:obj.respiratoryRate,
        bloodOxygenSaturation:obj.bloodOxygenSaturation,
        bodyTemperature:obj.bodyTemperature,
        bodyWeight:obj.bodyWeight,
        patientSymptoms:obj.patientSymptoms
      })
    }

    search(page:any, size:any, searchText:any):Observable<any>{
      let params = new HttpParams();
      params=params.append('searchText', searchText);
      params=params.append('page', page);
      params=params.append('size', size);
      return this.http.get(this.baseUrl+'signs/list',{params:params});
    }

    delete(id:any):Observable<any>{
      return this.http.delete(this.baseUrl+'signs/'+id);
    }

    update(obj:any, id:any):Observable<any>{
      return this.http.put(this.baseUrl+'signs/'+id,{
        patientId:obj.patientId,
        date:obj.date,
        bloodPressure:obj.bloodPressure,
        heartRate:obj.heartRate,
        respiratoryRate:obj.respiratoryRate,
        bloodOxygenSaturation:obj.bloodOxygenSaturation,
        bodyTemperature:obj.bodyTemperature,
        bodyWeight:obj.bodyWeight,
        patientSymptoms:obj.patientSymptoms,
      })
    }

}
