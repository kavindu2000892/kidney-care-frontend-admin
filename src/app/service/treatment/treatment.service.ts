import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class TreatmentService {

  baseUrl= environment.baseUrl;

    constructor(private http:HttpClient) { }

    create(obj:any):Observable<any>{
      return this.http.post(this.baseUrl+'treatments',{
        patientId:obj.patientId,
        fullName:obj.fullName,
        primaryDiagnosis:obj.primaryDiagnosis,
        secondaryDiagnosis:obj.secondaryDiagnosis,
        frequencyOfDialysis:obj.frequencyOfDialysis,
        dialyzerType:obj.dialyzerType,
        preDialysisMedications:obj.preDialysisMedications,
        postDialysisMedications:obj.postDialysisMedications
      })
    }

    search(page:any, size:any, searchText:any):Observable<any>{
      let params = new HttpParams();
      params=params.append('searchText', searchText);
      params=params.append('page', page);
      params=params.append('size', size);
      return this.http.get(this.baseUrl+'treatments/list',{params:params});
    }

    delete(id:any):Observable<any>{
      return this.http.delete(this.baseUrl+'treatments/'+id);
    }

    update(obj:any, id:any):Observable<any>{
      return this.http.put(this.baseUrl+'treatments/'+id,{
        patientId:obj.patientId,
        fullName:obj.fullName,
        primaryDiagnosis:obj.primaryDiagnosis,
        secondaryDiagnosis:obj.secondaryDiagnosis,
        frequencyOfDialysis:obj.frequencyOfDialysis,
        dialyzerType:obj.dialyzerType,
        preDialysisMedications:obj.preDialysisMedications,
        postDialysisMedications:obj.postDialysisMedications
      })
    }

}
