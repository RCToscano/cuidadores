import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ColaboradorService } from '../colaborador.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ScrollToService } from 'ng2-scroll-to-el';
import { defineLocale, formatDate } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { ColaboradorEntrevista } from '../models/colaborador-entrevista.model';
import { Colaborador } from '../models/colaborador.model';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-colaborador-entrevista',
  templateUrl: './colaborador-entrevista.component.html',
  styles: [
    `
      .ng-autocomplete {
        width: 100%;
      }
    `
  ]
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

  keyword = 'nome';
  placeholder = 'Digite o nome do Colaborador';
  searchControl: FormControl;
  isLoading = false;
  colaboradores: Colaborador[];

  constructor(private formBuilder: FormBuilder,
              private colaboradorService: ColaboradorService,
              private spinner: NgxSpinnerService,
              private scrollService: ScrollToService,
              private el: ElementRef) {
    defineLocale('pt-br', ptBrLocale);

    this.searchControl = this.formBuilder.control('', Validators.required);
    this.uploadForm = this.formBuilder.group({
      colaborador: this.searchControl
    });

    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(valor => {
          this.submitted = false;
          this.isLoading = true;
          if (valor != '') {
            return this.colaboradorService.buscarColaboradores(valor);
          }
          else {
            return this.colaboradorService.buscarColaboradores('1');
          }
        })
      ).subscribe(
        res => {
          this.colaboradores = res
          this.submitted = false;
          this.isLoading = false;
        },
        error => {
          this.submitted = false;
          this.isLoading = false;
        }
      );
  }

  ngOnInit() {
    window.scroll(0,0);
    this.criarForm();
  }

  criarForm() {
    this.uploadForm = this.formBuilder.group({
      colaborador: this.searchControl,
      dtEntrevista: [this.formartDate(this.colaboradorEntrevista.dtEntrevista), [Validators.required]],
      aparencia: [this.colaboradorEntrevista.aparencia, [Validators.required]],
      postura: [this.colaboradorEntrevista.postura, [Validators.required]],
      interesse: [this.colaboradorEntrevista.interesse, [Validators.required]],
      potencial: [this.colaboradorEntrevista.potencial, [Validators.required]],
      demencia: [this.colaboradorEntrevista.demencia],
      alzheimer: [this.colaboradorEntrevista.alzheimer],
      parkinson: [this.colaboradorEntrevista.parkinson],
      cadeirante: [this.colaboradorEntrevista.cadeirante],
      grande: [this.colaboradorEntrevista.grande],
      acamado: [this.colaboradorEntrevista.acamado],
      necessidadeTransferencia: [this.colaboradorEntrevista.necessidadeTransferencia],
      trocaFralda: [this.colaboradorEntrevista.trocaFralda],
      banhoCama: [this.colaboradorEntrevista.banhoCama],
      banhoCadeira: [this.colaboradorEntrevista.banhoCadeira],
      dextro: [this.colaboradorEntrevista.dextro],
      insulinaCaneta: [this.colaboradorEntrevista.insulinaCaneta],
      insulinaSeringa: [this.colaboradorEntrevista.insulinaSeringa],
      paAparelho: [this.colaboradorEntrevista.paAparelho],
      paDigital: [this.colaboradorEntrevista.paDigital],
      sneGTT: [this.colaboradorEntrevista.sneGTT],
      colostomia: [this.colaboradorEntrevista.colostomia],
      sondaVesical: [this.colaboradorEntrevista.sondaVesical],
      oxigenio: [this.colaboradorEntrevista.oxigenio],
      enema: [this.colaboradorEntrevista.enema],
      posOperatorio: [this.colaboradorEntrevista.posOperatorio],
      operacao: [this.colaboradorEntrevista.operacao, [Validators.maxLength(100)]],
      segundaDia: [this.colaboradorEntrevista.segundaDia],
      segundaNoite: [this.colaboradorEntrevista.segundaNoite],
      tercaDia: [this.colaboradorEntrevista.tercaDia],
      tercaNoite: [this.colaboradorEntrevista.tercaNoite],
      quartaDia: [this.colaboradorEntrevista.quartaDia],
      quartaNoite: [this.colaboradorEntrevista.quartaNoite],
      quintaDia: [this.colaboradorEntrevista.quintaDia],
      quintaNoite: [this.colaboradorEntrevista.quintaNoite],
      sextaDia: [this.colaboradorEntrevista.sextaDia],
      sextaNoite: [this.colaboradorEntrevista.sextaNoite],
      sabadoDia: [this.colaboradorEntrevista.sabadoDia],
      sabadoNoite: [this.colaboradorEntrevista.sabadoNoite],
      domingoDia: [this.colaboradorEntrevista.domingoDia],
      domingoNoite: [this.colaboradorEntrevista.domingoNoite],
      experiencia: [this.colaboradorEntrevista.experiencia],
      observacao: [this.colaboradorEntrevista.observacao, [Validators.maxLength(1000)]],
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
    console.log(this.uploadForm.value);

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
      this.colaboradorEntrevista.idColaborador = this.uploadForm.controls.colaborador.value.id;
      this.colaboradorEntrevista.colaborador = undefined;

      if(this.alterar) {
        this.colaboradorService.alterarEntrevista(this.colaboradorEntrevista)
          .subscribe(
            res => {
              this.messageType = 'success';
              this.message = 'Alteração realizada com sucesso';
              this.scrollService.scrollTo('#header', 350, -100);
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

  selected() {
    this.isLoading = false;
  }

  inputCleared() {
    this.isLoading = false;
  }

}
