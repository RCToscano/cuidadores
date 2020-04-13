import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ColaboradorService } from '../../colaborador.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ScrollToService } from 'ng2-scroll-to-el';
import { defineLocale, formatDate } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { ColaboradorEntrevista } from '../../models/colaborador-entrevista.model';

@Component({
  selector: 'app-entrevista-alteracao',
  templateUrl: './entrevista-alteracao.component.html'
})
export class EntrevistaAlteracaoComponent implements OnInit {

  colaboradorEntrevista: ColaboradorEntrevista = {} as ColaboradorEntrevista;
  message: string;
  messageType: string;
  uploadForm: FormGroup;
  submitted = false;
  carregar = false;

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

    this.colaboradorService.consultaEntrevista(this.activatedRoute.snapshot.params['id'])
      .subscribe(
      res => {
        this.colaboradorEntrevista = res;
        this.colaboradorService.colaboradorEntrevista = res;
        console.log(res);
        setTimeout(() => {
          this.criarForm();
          this.spinner.hide();
          this.carregar = false;
        }, 0);
      },
      error =>  {
        console.log(error);
        this.spinner.hide();
        this.carregar = false;
      }
    );
  }

  criarForm() {
    this.uploadForm = this.formBuilder.group({
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
      this.colaboradorEntrevista.idColaborador = this.activatedRoute.snapshot.params['id'];

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

  formartDate(data: string): Date {
    if(data != null && data != '') {
      return new Date(data);
    }
    return null;
  }

}
