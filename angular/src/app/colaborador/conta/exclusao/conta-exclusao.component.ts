import { Component, OnInit, Input } from '@angular/core';
import { ColaboradorService } from '../../colaborador.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { ColaboradorConta } from '../../models/colaborador-conta.model';

@Component({
  selector: 'app-colaborador-conta-exclusao',
  templateUrl: './conta-exclusao.component.html'
})
export class ColaboradorContaExclusaoComponent implements OnInit {

  @Input()
  colaborador: ColaboradorConta;
  carregar = false;
  message: string;
  messageType: string;

  constructor(public colaboradorService: ColaboradorService,
              private spinner: NgxSpinnerService,
              public modal: NgbActiveModal,
              private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
    }

    excluir() {
      this.carregar = true;
      this.spinner.show();
      setTimeout(() => {
        console.log(this.colaborador);
        this.colaboradorService.deletarConta(this.colaborador.idConta, this.colaborador.idColaborador)
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

    carregarContas() {
      this.colaboradorService.colaboradoresContas(this.activatedRoute.snapshot.params['id'])
      .subscribe(
        res => {
          console.log(res);
          this.colaboradorService.colaboradorContas = res;
        },
        error => {
          console.log(error);
        }
      );
    }

}
