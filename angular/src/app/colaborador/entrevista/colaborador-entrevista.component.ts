import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ColaboradorService } from '../colaborador.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ScrollToService } from 'ng2-scroll-to-el';
import { ColaboradorEntrevista } from '../models/colaborador-entrevista.model';

@Component({
  selector: 'app-colaborador-entrevista',
  templateUrl: './colaborador-entrevista.component.html'
})
export class ColaboradorEntrevistaComponent implements OnInit {

  colaboradorEntrevista: ColaboradorEntrevista = {} as ColaboradorEntrevista;
  titulo = 'Cadastro';
  botao = 'Cadastrar';
  alterar = false;
  message: string;
  messageType: string;
  uploadFormEntrevista: FormGroup;
  submitted = false;
  carregar = false;
  maskCPF = [/[0-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  maskTel = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  maskCel = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  maskCEP = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

  constructor(private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private colaboradorService: ColaboradorService,
              private spinner: NgxSpinnerService,
              private scrollService: ScrollToService) {

  }

  ngOnInit() {
    window.scroll(0,0);
    this.carregar = true;
    this.spinner.show();
    this.criarForm();

    if(this.alterar) {
      this.colaboradorService.consultaColaborador(this.activatedRoute.snapshot.params['id'])
        .subscribe(
        res => {
          // this.colaboradorEntrevista = res;
          console.log(res);
          setTimeout(() => {
            this.criarForm();
            this.spinner.hide();
            this.carregar = false;
          }, 0);
        },
        error =>  {
          console.log(error);
          this.messageType = 'danger';
          this.message = error;
          this.scrollService.scrollTo('#header');
          this.spinner.hide();
          this.carregar = false;
        }
      );
    }
    else {
      this.criarForm();
      this.spinner.hide();
      this.carregar = false;
    }
  }

  criarForm() {
    this.uploadFormEntrevista = this.formBuilder.group({
      dtEntrevista: ['', [Validators.required]],
      aparencia: ['', [Validators.required]],
      postura: ['', [Validators.required]],
      interesse: ['', [Validators.required]],
      potencial: ['', [Validators.required]],
      demencia: [''],
      alzheimer: [''],
      parkinson: [''],
      cadeirante: [''],
      grande: [''],
      acamado: [''],
      necessidadeTransferencia: [''],
      trocaFralda: [''],
      banhoCama: [''],
      banhoCadeira: [''],
      dextro: [''],
      insulinaCaneta: [''],
      insulinaSeringa: [''],
      paAparelho: [''],
      paDigital: [''],
      sneGTT: [''],
      colostomia: [''],
      sondaVesical: [''],
      oxigenio: [''],
      enema: [''],
      posOperatorio: [''],
      operacao: ['', [Validators.maxLength(100)]],
      segundaDia: [''],
      segundaNoite: [''],
      tercaDia: [''],
      tercaNoite: [''],
      quartaDia: [''],
      quartaNoite: [''],
      quintaDia: [''],
      quintaNoite: [''],
      sextaDia: [''],
      sextaNoite: [''],
      sabadoDia: [''],
      sabadoNoite: [''],
      domingoDia: [''],
      domingoNoite: [''],
      experienciaAnterior: [''],
      observacoes: ['', [Validators.maxLength(500)]],
    });
  }

}
