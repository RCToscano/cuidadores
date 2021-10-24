import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { UserService } from "../../user.service";
import { MustMatch } from "src/app/common/function/must-match.validator";
import { ScrollToService } from "ng2-scroll-to-el";

@Component({
  selector: 'app-user-perfil-senha',
  templateUrl: './user-perfil-senha.component.html'
})
export class UserPerfilSenhaComponent implements OnInit {

  uploadFormSenha: FormGroup;
  submittedSenha = false;
  carregar = false;
  message: string;
  messageType: string;

  passwordStrength: number = 0;
  colors = ['darkred', 'orangered', 'orange', 'yellowgreen'];
  bar0: string;
  bar1: string;
  bar2: string;
  bar3: string;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private spinner: NgxSpinnerService,
              private scrollService: ScrollToService,
              private el: ElementRef) { }

  ngOnInit() {
    this.uploadFormSenha = this.formBuilder.group({
      senhaAtual: ['', Validators.required],
      novaSenha: ['', Validators.required],
      confirmNovaSenha: ['', Validators.required]
    },
      {
        validator: MustMatch('novaSenha', 'confirmNovaSenha')
      }
    );

    this.uploadFormSenha.get('novaSenha').valueChanges.subscribe(val => {
      this.changePassword(val);
    });
  }

  alterarSenha() {
    this.submittedSenha = true;

    if(this.uploadFormSenha.invalid || this.passwordStrength < 40) {
      const controls = this.uploadFormSenha.controls;
      for (const name in controls) {
          this.checkField(controls[name].value, name);
          if (controls[name].invalid) {
              console.log('invalido: ' + name + ' | ' + JSON.stringify(controls[name].errors));
          }
      }
      const invalidElements = this.el.nativeElement.querySelectorAll('.ng-invalid');
      if(invalidElements != undefined)
        invalidElements[1].focus();
      return;
    }
    else {
      this.carregar = true;
      this.spinner.show();

      this.userService.alterarSenha(this.uploadFormSenha.value).subscribe(
        res => {
          console.log(res);
          this.uploadFormSenha.reset();
          this.messageType = 'success';
          this.message = 'Alteração realizada com sucesso';
          this.scrollService.scrollTo('#header');
          this.carregar = false;
          this.submittedSenha = false;
          this.spinner.hide();
        },
        error => {
          console.log(error);
          this.messageType = 'danger';
          this.message = error;
          this.scrollService.scrollTo('#header', 350, -100);
          this.carregar = false;
          this.spinner.hide();
        }
      )
    }
  }

  get form() {
    if(this.uploadFormSenha != null)
      return this.uploadFormSenha.controls;
  }

  checkField(value: string, field: string) {
    // console.log('valor: ' + value);
    try {
      if (value != null && value.indexOf('_') !== -1 ) {
        console.log(field + ' ' + value);
        let aux = this.uploadFormSenha.get(field);
        aux.setErrors({ required: true });
      }
    }
    catch(error) {

    }
  }

  changePassword(password: string) {
    this.setBarColors(4, '#DDD');
    if (password) {
      const c = this.getColor(this.checkStrength(password));
      this.setBarColors(c.index, c.color);
    }
  }

  checkStrength(p: string) {
    // 1
    let force = 0;

    // 2
    const regex = /[$-/:-?{-~!"^_@`\[\]]/g;
    const lowerLetters = /[a-z]+/.test(p);
    const upperLetters = /[A-Z]+/.test(p);
    const numbers = /[0-9]+/.test(p);
    const symbols = regex.test(p);

    // 3
    const flags = [lowerLetters, upperLetters, numbers, symbols];

    // 4
    let passedMatches = 0;
    for (const flag of flags) {
      passedMatches += flag === true ? 1 : 0;
    }

    // 5
    force += 2 * p.length + ((p.length >= 10) ? 1 : 0);
    force += passedMatches * 10;

    // 6
    force = (p.length <= 6) ? Math.min(force, 10) : force;

    // 7
    force = (passedMatches === 1) ? Math.min(force, 10) : force;
    force = (passedMatches === 2) ? Math.min(force, 20) : force;
    force = (passedMatches === 3) ? Math.min(force, 30) : force;
    force = (passedMatches === 4) ? Math.min(force, 40) : force;
    this.passwordStrength = force;
    return force;
  }

  getColor(s) {
    let index = 0;
    if (s === 10) {
      index = 0;
    } else if (s === 20) {
      index = 1;
    } else if (s === 30) {
      index = 2;
    } else if (s === 40) {
      index = 3;
    } else {
      index = 4;
    }
    return {
      index: index + 1,
      color: this.colors[index]
    };
  }

  setBarColors(count, col) {
    for (let n = 0; n < count; n++) {
      this['bar' + n] = col;
    }
  }

}
