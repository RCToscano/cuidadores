import { Component, OnInit, Input } from '@angular/core';
import { ColaboradorService } from '../../colaborador.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-colaborador-conta-exclusao',
  templateUrl: './conta-exclusao.component.html'
})
export class ColaboradorContaExclusaoComponent implements OnInit {

  @Input()
  colaboradorId: number;

  @Input()
  conta: number;

  carregar = false;

  constructor(public colaboradorService: ColaboradorService,
              private spinner: NgxSpinnerService,
              public modal: NgbActiveModal) { }

    ngOnInit() {
    }

    excluir() {
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
