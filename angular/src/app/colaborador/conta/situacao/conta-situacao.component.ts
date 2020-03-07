import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ColaboradorService } from '../../colaborador.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ColaboradorConta } from '../../models/colaborador-conta.model';

@Component({
  selector: 'app-colaborador-conta-situacao',
  templateUrl: './conta-situacao.component.html'
})
export class ColaboradorContaSituacaoComponent implements OnInit {

  @Input()
  colaborador: ColaboradorConta;
  carregar = false;
  message: string;
  messageType: string;

  constructor(private colaboradorService: ColaboradorService,
              private spinner: NgxSpinnerService,
              public modal: NgbActiveModal) { }

  ngOnInit() {
  }

  alterar() {
    this.carregar = true;
    this.spinner.show();
    setTimeout(() => {
      console.log(this.colaborador);
      this.colaboradorService.alterarSituacaoConta(this.colaborador)
        .subscribe(
          res => {
            console.log(res);
            this.colaboradorService.setColaboradorConta(res);
            this.modal.close();
            this.carregar = false;
            this.spinner.hide();
          },
          error => {
            console.log(error);
            this.messageType = 'danger';
            this.message = error;
            this.carregar = false;
            this.spinner.hide();
          }
      );
    }, 0);
  }

}
