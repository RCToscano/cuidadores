import { Component, OnInit } from '@angular/core';
import { ColaboradorService } from '../../colaborador.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { ScrollToService } from 'ng2-scroll-to-el';

@Component({
  selector: 'app-lista-ocorrencia',
  templateUrl: './lista-ocorrencia.component.html'
})
export class ListaOcorrenciaComponent implements OnInit {

  carregar = false;
  message: string;
  messageType: string;

  constructor(public colaboradorService: ColaboradorService,
              private spinner: NgxSpinnerService,
              private activatedRoute: ActivatedRoute,
              private scrollService: ScrollToService) { }

  ngOnInit() {
    this.carregarOcorrencias(false);
  }

  carregarOcorrencias(carregar: boolean) {
    if(this.colaboradorService.colaboradorOcorrencias == undefined || carregar) {
      this.carregar = true;
      this.spinner.show();
      setTimeout(() => {
        this.colaboradorService.colaboradoresOcorrencias(this.activatedRoute.snapshot.params['id'])
          .subscribe(
            res => {
              this.colaboradorService.colaboradorOcorrencias = res;
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

}
