import { Component, OnInit } from '@angular/core';
import { ColaboradorService } from '../../colaborador.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { ScrollToService } from 'ng2-scroll-to-el';

@Component({
  selector: 'app-lista-incompativel',
  templateUrl: './lista-incompativel.component.html'
})
export class ListaIncompativelComponent implements OnInit {

  carregar = false;
  message: string;
  messageType: string;

  constructor(public colaboradorService: ColaboradorService,
              private spinner: NgxSpinnerService,
              private activatedRoute: ActivatedRoute,
              private scrollService: ScrollToService) { }

  ngOnInit() {
    this.carregarIncompativeis(false);
  }

  carregarIncompativeis(carregar: boolean) {
    if(this.colaboradorService.colaboradorIncompativeis == undefined || carregar) {
      this.carregar = true;
      this.spinner.show();
      setTimeout(() => {
        this.colaboradorService.colaboradoresIncompativeis(this.activatedRoute.snapshot.params['id'])
          .subscribe(
            res => {
              this.colaboradorService.colaboradorIncompativeis = res;
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
