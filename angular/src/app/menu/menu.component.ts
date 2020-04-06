import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  carregar = false;

  constructor(public userService: UserService,
              private router: Router,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }

  logout() {
    this.carregar = true;
    this.spinner.show();

    setTimeout(() => {
      this.userService.logout();
      this.router.navigate(['']);
      this.carregar = false;
      this.spinner.hide();
    }, 1000);
  }

}
