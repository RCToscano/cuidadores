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
  token = localStorage.getItem('tokenCuidadores');

  constructor(private userService: UserService,
              private router: Router,
              private spinner: NgxSpinnerService) {
    this.carregarUsuario();
  }

  carregarUsuario() {
    if (this.userService.user.token == null && this.token != null) {
      this.carregar = true;
      this.spinner.show();

      this.userService.consultaUsuarioToken(this.token).subscribe(
        res => {
            const user = res.body;
            user.token = this.token;
            this.userService.setUser(user);
            this.carregar = false;
            this.spinner.hide();
        },
        error => {
          console.log(error);
          this.userService.user = undefined;
          localStorage.clear();
          this.carregar = false;
          this.spinner.hide();
          this.router.navigate(['']);
        }
      );
    }
    else {
      this.router.navigate(['']);
    }
  }

}
