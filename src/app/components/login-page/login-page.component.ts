import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { UserService } from "../../service/user/user.service";
import { first } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { CookiemanagerService } from '../../service/cookie/cookiemanager.service';  // Correct import for CookieManagerService

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  constructor(private userService: UserService, private router: Router, private cookieManagerService: CookiemanagerService) { }  // Corrected CookieManagerService spelling

  form = new FormGroup({
    username: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required)
  });

  login() {
    let obj = {
      username: this.form.value?.username,
      password: this.form.value?.password,
    };

    this.userService.login(obj)
      .pipe(first())
      .subscribe((data: HttpResponse<any>) => {
        this.cookieManagerService.set(data.headers.get('Authorization')!);  // Non-null assertion operator added
        this.router.navigateByUrl('/dashboard');  // Fixed method name to navigateByUrl
      });
  }
}
