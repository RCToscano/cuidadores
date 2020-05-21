import { NgModule, LOCALE_ID } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TextMaskModule } from 'angular2-text-mask';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { BsDatepickerModule } from 'ngx-bootstrap';
import { ScrollToModule } from 'ng2-scroll-to-el';
import { NgxSpinnerModule } from "ngx-spinner";
import { FileUploadModule } from 'ng2-file-upload';
import { DigitOnlyDirective } from './../common/directives/digitonly/digit-only.directive';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

import { ColaboradorService } from './colaborador.service';
import { ColaboradorRoutingModule } from './colaborador-routing.module';
import { ColaboradorCadastroComponent } from './cadastro/colaborador-cadastro.component';
import { ColaboradorContaCadastroComponent } from './conta/colaborador-conta.component';
import { ColaboradorOcorrenciaComponent } from './ocorrencia/colaborador-ocorrencia.component';
import { IncompativeisCadastroComponent } from './incompativeis/cadastro/incompativeis-cadastro.component';
import { ColaboradorConsultaComponent } from './consulta/colaborador-consulta.component';
import { ColaboradorFotosComponent } from './fotos/colaborador-fotos.component';
import { ColaboradorContaSituacaoComponent } from './conta/situacao/conta-situacao.component';
import { ColaboradorContaPadraoComponent } from './conta/padrao/conta-padrao.component';
import { ColaboradorContaExclusaoComponent } from './conta/exclusao/conta-exclusao.component';
import { ColaboradorCadastroOcorrenciaComponent } from './ocorrencia/cadastro/cadastro-ocorrencia.component';
import { ListaOcorrenciaComponent } from './ocorrencia/lista/lista-ocorrencia.component';
import { ListaIncompativelComponent } from './incompativeis/lista/lista-incompativel.component';
import { ColaboradorEntrevistaComponent } from './entrevista/colaborador-entrevista.component';
import { EntrevistaAlteracaoComponent } from './entrevista/alteracao/entrevista-alteracao.component';


@NgModule({
  declarations: [
    ColaboradorConsultaComponent,
    ColaboradorCadastroComponent,
    ColaboradorFotosComponent,
    ColaboradorContaCadastroComponent,
    ColaboradorEntrevistaComponent,
    ColaboradorOcorrenciaComponent,
    IncompativeisCadastroComponent,
    DigitOnlyDirective,
    ColaboradorContaSituacaoComponent,
    ColaboradorContaPadraoComponent,
    ColaboradorContaExclusaoComponent,
    ColaboradorCadastroOcorrenciaComponent,
    ListaOcorrenciaComponent,
    ListaIncompativelComponent,
    EntrevistaAlteracaoComponent
  ],
  imports: [
    ColaboradorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule,
    NgMultiSelectDropDownModule.forRoot(),
    TextMaskModule,
    GooglePlaceModule,
    BsDatepickerModule.forRoot(),
    ScrollToModule.forRoot(),
    NgxSpinnerModule,
    FileUploadModule,
    SlickCarouselModule,
    AutocompleteLibModule
  ],
  entryComponents: [
    ColaboradorContaSituacaoComponent,
    ColaboradorContaPadraoComponent,
    ColaboradorContaExclusaoComponent
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: LOCALE_ID, useValue: 'pt-br'},
    ColaboradorService
  ]
})
export class ColaboradorModule { }
