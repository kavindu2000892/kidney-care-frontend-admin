import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';  // Fix the import for CookieService

@Injectable({
  providedIn: 'root'
})
export class CookiemanagerService {

  constructor(private cookieService: CookieService) { }  // Corrected the service name

  public set(token: string): void {
    this.cookieService.set('token', token, 90);  // Fix method formatting
  }

  public isExists(): boolean {
    return this.cookieService.check('token');
  }

  public get(): string {
    return this.cookieService.get('token');
  }
}
