import { Component } from '@angular/core';
import { UserService } from './user/user.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  title = 'angular';
  carregar = false;
  user = JSON.parse(localStorage.getItem('token-cuidadores'));

  constructor(private userService: UserService,
              private router: Router,
              private spinner: NgxSpinnerService) {
    this.carregarUsuario();
  }

  carregarUsuario() {
    if (this.user == null) {
      this.router.navigate(['']);
    }
  }

}
