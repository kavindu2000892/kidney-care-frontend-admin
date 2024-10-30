import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class ForexService {
  key = '62107a4211-41bde14afe-sg23ls';

  constructor(private http: HttpClient) {
  }

  public exchange(from: any, to: any): Observable<any> {
    const options = {method: 'GET', headers: {accept: 'application/json'}};
    return this.http.get('https://api.fastforex.io/fetch-one?from=' + from + '&to=' + to + '&api_key=' + this.key, options);
  }


}
