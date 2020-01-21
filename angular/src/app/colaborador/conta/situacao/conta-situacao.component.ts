import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ColaboradorService } from '../../colaborador.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-colaborador-conta-situacao',
  templateUrl: './conta-situacao.component.html'
})
export class ColaboradorContaSituacaoComponent implements OnInit {

  @Input()
  situacao: string;
  @Input()
  colabadorId: number;
  @Input()
  contaId: number;

  carregar = false;

  constructor(private colaboradorService: ColaboradorService,
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
