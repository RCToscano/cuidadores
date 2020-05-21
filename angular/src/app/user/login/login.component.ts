import { Component, OnInit, ElementRef } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from '../models/user.model';
import { Login } from '../models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  user: User = {} as User;
  uploadForm: FormGroup;
  submitted = false;
  carregar = false;

  constructor(public userService: UserService,
              private router: Router,
              private formBuilder: FormBuilder,
              private spinner: NgxSpinnerService,
              private el: ElementRef) {

    this.uploadForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    this.userService.error = '';

    const controls = this.uploadForm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            console.log('invalido: ' + name);
        }
    }

    if(this.uploadForm.invalid) {
      const invalidElements = this.el.nativeElement.querySelectorAll('.ng-invalid');
      invalidElements[1].focus();
      return;
    }
    else {
      this.carregar = true;
      this.spinner.show();

      const login = {} as Login;
      login.usuario = this.uploadForm.controls.email.value;
      login.senha = this.uploadForm.controls.password.value;

      this.userService.login(login)
        .subscribe(
        res => {
          this.userService.setUser(res);
          this.carregar = false;
          this.spinner.hide();
          this.router.navigate(['/home']);
        },
        error =>  {
          this.userService.error = error;
          this.carregar = false;
          this.spinner.hide();
        }
      );
    }
  }

  get form() {
    return this.uploadForm.controls;
  }

}
