import { Component, OnInit, Input } from '@angular/core';
import { ColaboradorService } from '../../colaborador.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-colaborador-conta-padrao',
  templateUrl: './conta-padrao.component.html'
})
export class ColaboradorContaPadraoComponent implements OnInit {

  @Input()
  conta: number;

  carregar = false;

  constructor(public colaboradorService: ColaboradorService,
              private spinner: NgxSpinnerService,
              public modal: NgbActiveModal) { }

    ngOnInit() {
    }

    alterar() {
      this.carregar = true;
      this.spinner.show();
      setTimeout(() => {

        // this.colaboradorService.colaboradoresContas()
        //   .subscribe(
        //     res => {
        //       console.log(res);
        //       this.colaboradorService.colaboradorContas = res;
                this.carregarContas();
                this.modal.close();
        //       this.carregar = false;
        //       this.spinner.hide();
        //     },
        //     error => {
        //       console.log(error);
        this.modal.close();
        this.carregar = false;
        this.spinner.hide();
        //     }
        // );
      }, 3000);
    }

    carregarContas() {
      this.colaboradorService.colaboradoresContas()
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
