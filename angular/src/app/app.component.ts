import { Component } from '@angular/core';
import { UserService } from './user/user.service';
import { TOKEN } from './app.api';
import { Router, ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  title = 'angular';
  carregar = false;
  user = JSON.parse(localStorage.getItem(TOKEN));

  constructor(private userService: UserService,
              private spinner: NgxSpinnerService,
              private router: Router,
              private route: ActivatedRoute) {
    this.carregarUsuario();
  }

  carregarUsuario() {
    // debugger;
    console.log(this.route);
    if (this.user == null) {
      this.userService.logout();
    }
    else if (this.user != null) {
      // this.userService.consultaUsuarioToken(this.user.token)
      //   .subscribe(
      //   res => {
      //     this.userService.setUser(res);
      //     this.router.navigate(['/home']);
      //   },
      //   error =>  {
      //     console.log('error '.concat(error));
      //   }
      // );
    }
  }


}
