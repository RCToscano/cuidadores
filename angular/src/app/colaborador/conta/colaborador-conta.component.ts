import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ColaboradorService } from '../colaborador.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ColaboradorContaSituacaoComponent } from './situacao/conta-situacao.component';
import { ColaboradorContaPadraoComponent } from './padrao/conta-padrao.component';
import { ColaboradorContaExclusaoComponent } from './exclusao/conta-exclusao.component';
import { ActivatedRoute } from '@angular/router';
import { ScrollToService } from 'ng2-scroll-to-el';
import { ColaboradorConta } from '../models/colaborador-conta.model';


const MODALS = {
  modalSituacao: ColaboradorContaSituacaoComponent,
  modalPadrao: ColaboradorContaPadraoComponent,
  modalExclusao: ColaboradorContaExclusaoComponent
};

@Component({
  selector: 'app-colaborador-conta',
  templateUrl: './colaborador-conta.component.html'
})
export class ColaboradorContaCadastroComponent implements OnInit {

  uploadFormConta: FormGroup;
  submittedConta = false;
  carregar = false;
  message: string;
  messageType: string;
  closeResult: string;
  colaboradorContas: ColaboradorConta[];

  maskCPF = [/[0-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];

  constructor(public colaboradorService: ColaboradorService,
              private formBuilder: FormBuilder,
              private spinner: NgxSpinnerService,
              private el: ElementRef,
              private modalService: NgbModal,
              private activatedRoute: ActivatedRoute,
              private scrollService: ScrollToService) {

    this.criarForm();
  }

  ngOnInit() {
    this.carregarBancos();
    this.carregarDadosConta(false);
  }

  criarForm() {
    this.uploadFormConta = this.formBuilder.group({
      titular: ['sim', [Validators.required]],
      idBanco: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      nomeTitular: ['', [Validators.maxLength(100)]],
      cpfTitular: ['', [Validators.minLength(14), Validators.maxLength(14)]],
      agencia: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
      conta: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(11)]],
      digito: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]],
      operacao: ['', [Validators.maxLength(4)]]
    });
  }

  carregarBancos() {
    if(this.colaboradorService.bancos == undefined) {
      this.colaboradorService.getBancos()
        .subscribe(
          res => {
            this.colaboradorService.bancos = res;
          },
          error => {
            console.log(error);
          }
      );
    }
  }

  carregarDadosConta(carregar: boolean) {
    if(this.colaboradorService.colaboradorContas == undefined || carregar) {
      this.carregar = true;
      this.spinner.show();
      setTimeout(() => {
        this.colaboradorService.colaboradoresContas(this.activatedRoute.snapshot.params['id'])
          .subscribe(
            res => {
              this.colaboradorService.setColaboradorConta(res);
              this.carregar = false;
              this.spinner.hide();
            },
            error => {
              console.log(error);
              this.messageType = 'danger';
              this.message = error;
              this.scrollService.scrollTo('#header');
              this.carregar = false;
              this.spinner.hide();
            }
        );
      }, 0);
    }
  }

  get form() {
    if(this.uploadFormConta != null)
      return this.uploadFormConta.controls;
  }

  cadastrarConta() {
    console.log(this.uploadFormConta.value);
    this.submittedConta = true;

    const controls = this.uploadFormConta.controls;
    for (const name in controls) {
        this.checkField(controls[name].value, name);
        if (controls[name].invalid) {
            console.log('invalido: ' + name);
            console.log(controls[name].errors);
        }
    }

    if(this.uploadFormConta.invalid) {
      console.log('invalido');
      const invalidElements = this.el.nativeElement.querySelectorAll('.ng-invalid');
      invalidElements[1].focus();
      return;
    }
    else {
      console.log('ok');
      this.carregar = true;
      this.spinner.show();

      let colaboradorConta = {} as ColaboradorConta;
      colaboradorConta = this.uploadFormConta.value;
      colaboradorConta.idColaborador = this.colaboradorService.colaboradorContas[0].idColaborador;

      setTimeout(() => {
        this.colaboradorService.cadastrarContas(colaboradorConta)
          .subscribe(
            res => {
              console.log(res);
              this.uploadFormConta.reset();
              this.uploadFormConta.controls.titular.setValue('sim');
              this.carregarDadosConta(true);
              this.messageType = 'success';
              this.message = 'Conta cadastrada com sucesso';
              this.scrollService.scrollTo('#header');
              this.carregar = false;
              this.spinner.hide();
            },
            error => {
              console.log(error);
              this.messageType = 'danger';
              this.message = error;
              this.scrollService.scrollTo('#header');
              this.carregar = false;
              this.spinner.hide();
            }
        );
      }, 0);
    }
  }

  alterarTitular() {
    if(this.uploadFormConta.controls.titular.value == 'nao') {
      this.uploadFormConta.controls.nomeTitular.setValidators([Validators.required, Validators.maxLength(100)]);
      this.uploadFormConta.controls.nomeTitular.updateValueAndValidity();
      this.uploadFormConta.controls.cpfTitular.setValidators([Validators.required, Validators.maxLength(15)]);
      this.uploadFormConta.controls.cpfTitular.updateValueAndValidity();
    }
    else {
      this.uploadFormConta.controls.nomeTitular.clearValidators();
      this.uploadFormConta.controls.nomeTitular.updateValueAndValidity();
      this.uploadFormConta.controls.cpfTitular.clearValidators();
      this.uploadFormConta.controls.cpfTitular.updateValueAndValidity();
    }
  }

  open(content: any) {
    this.modalService.open(content, {centered: true, ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openModal(name: string, informacao: any) {
    const ref = this.modalService.open(MODALS[name], {centered: true});
    ref.componentInstance.colaborador = informacao;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  checkField(value: string, field: string) {
    // console.log('valor: ' + value);
    try {
      if (value != null && value.indexOf('_') !== -1 ) {
        console.log(field + ' ' + value);
        let aux = this.uploadFormConta.get(field);
        aux.setErrors({ required: true });
      }
    }
    catch(error) { }
  }

}
