import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {CookiemanagerService} from "../service/cookie/cookiemanager.service";

export const authGuard: CanActivateFn = (route, state) => {

  let cookieManagerService = inject(CookiemanagerService);
  let router = inject(Router);

  if (cookieManagerService.isExists()) {
    router.navigateByUrl('/dashboard');
    return false;
  }
  return true;
};
