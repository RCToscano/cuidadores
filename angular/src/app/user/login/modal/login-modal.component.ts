import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { User } from "../../models/user.model";
import { UserService } from "../../user.service";
import { Login } from "../../models/login.model";

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html'
})
export class LoginModalComponent implements OnInit {

  @Input()
  user: User = {} as User;
  uploadForm: FormGroup;
  submitted = false;
  carregar = false;
  sair = false;
  message: string;
  messageType: string;

  constructor(public userService: UserService,
              private spinner: NgxSpinnerService,
              public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private el: ElementRef) {

      this.uploadForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });
  }

  ngOnInit() {
  }

  login() {
    this.submitted = true;
    this.userService.error = '';

    if(this.uploadForm.invalid) {
      const controls = this.uploadForm.controls;
      for (const name in controls) {
          if (controls[name].invalid) {
              console.log('invalido: ' + name);
          }
      }
      const invalidElements = this.el.nativeElement.querySelectorAll('.ng-invalid');
      invalidElements[1].focus();
      return;
    }
    else {
      this.carregar = true;
      this.spinner.show();
      setTimeout(() => {
        const login = {} as Login;
        login.usuario = this.uploadForm.controls.email.value;
        login.senha = this.uploadForm.controls.password.value;

        this.userService.login(login)
          .subscribe(
          res => {
            this.userService.setUser(res);
            this.activeModal.close(true);
            this.carregar = false;
            this.spinner.hide();
          },
          error =>  {
            this.messageType = 'danger';
            this.message = error;
            this.carregar = false;
            this.spinner.hide();
          }
        );
      }, 0);
    }
  }

  cancel() {
    this.sair = true;
    this.spinner.show();
    setTimeout(() => {
      this.activeModal.close(false);
      this.sair = false;
      this.spinner.hide();
    }, 2000);
  }

  get form() {
    return this.uploadForm.controls;
  }

}
