import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../service/user/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  constructor(private userService: UserService, private router: Router) {
  }

  form = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    displayName: new FormControl('', Validators.required)
  })

  signup() {
    let obj = {
      email: this.form.value?.email,
      displayName: this.form.value?.displayName,
      password: this.form.value?.password,
    }
    this.userService.register(obj).subscribe(resp => {
      this.router.navigateByUrl('/login');
      alert('please login');
    })
  }
}
