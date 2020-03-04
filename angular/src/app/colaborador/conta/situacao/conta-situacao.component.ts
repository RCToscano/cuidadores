import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ColaboradorService } from '../../colaborador.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { ColaboradorConta } from '../../models/colaborador-conta.model';

@Component({
  selector: 'app-colaborador-conta-situacao',
  templateUrl: './conta-situacao.component.html'
})
export class ColaboradorContaSituacaoComponent implements OnInit {

  @Input()
  colaborador: ColaboradorConta;
  carregar = false;

  constructor(private colaboradorService: ColaboradorService,
              private spinner: NgxSpinnerService,
              public modal: NgbActiveModal,
              private activatedRoute: ActivatedRoute) { }

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
            this.carregar = false;
            this.spinner.hide();
      //     }
      // );
    }, 3000);
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
