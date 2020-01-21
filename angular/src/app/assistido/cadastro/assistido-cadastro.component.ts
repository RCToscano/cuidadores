import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assistido',
  templateUrl: './assistido-cadastro.component.html'
})
export class AssistidoCadastroComponent implements OnInit {

  maskCPF = [/[0-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];

  constructor() { }

  ngOnInit() {
  }

}
