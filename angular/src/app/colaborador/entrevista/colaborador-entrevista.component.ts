import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ColaboradorService } from '../colaborador.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ScrollToService } from 'ng2-scroll-to-el';
import { defineLocale, formatDate } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
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
  uploadForm: FormGroup;
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
              private scrollService: ScrollToService,
              private el: ElementRef) {
    defineLocale('pt-br', ptBrLocale);
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
    this.uploadForm = this.formBuilder.group({
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
      experiencia: [''],
      observacoes: ['', [Validators.maxLength(500)]],
    });
  }

  formartDate(data: string): Date {
    if(data != null && data != '') {
      return new Date(data);
    }
    return null;
  }

  onSubmit() {
    this.submitted = true;

    const controls = this.uploadForm.controls;
    for (const name in controls) {
        this.checkField(controls[name].value, name);
        if (controls[name].invalid) {
            console.log('invalido: ' + name);
            console.log(controls[name].errors);
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
      console.log(this.uploadForm.value);
      this.colaboradorEntrevista = this.uploadForm.value;
      this.colaboradorEntrevista.dtEntrevista = formatDate(controls.dtEntrevista.value, 'DD/MM/YYYY').trim();

      if(this.alterar) {
        this.colaboradorService.alterarEntrevista(this.colaboradorEntrevista)
          .subscribe(
            res => {
              this.messageType = 'success';
              this.message = 'Alteração realizada com sucesso';
              this.scrollService.scrollTo('#header');
              this.submitted = false;
              this.carregar = false;
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
        );
      }
      else {
        this.colaboradorService.cadastrarEntrevista(this.colaboradorEntrevista)
          .subscribe(
            res => {
              console.log(res);
              this.uploadForm.reset();
              this.messageType = 'success';
              this.message = 'Cadastro realizado com sucesso';
              this.scrollService.scrollTo('#header');
              this.submitted = false;
              this.carregar = false;
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
        );
      }
    }
  }

  get form() {
    if(this.uploadForm != null)
      return this.uploadForm.controls;
  }

  checkField(value: string, field: string) {
    // console.log('valor: ' + value);
    try {
      if (value != null && value.indexOf('_') !== -1 ) {
        console.log(field + ' ' + value);
        let aux = this.uploadForm.get(field);
        aux.setErrors({ required: true });
      }
    }
    catch(error) {

    }
  }

}
