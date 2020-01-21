import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(public userService: UserService,
              private router: Router) {
    if(!this.userService.isLogged()) {
      this.router.navigate(['']);
    }
  }

  ngOnInit() {
  }

}
