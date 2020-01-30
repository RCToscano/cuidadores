import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DigitOnlyDirective } from './common/directives/digitonly/digit-only.directive';
import { TextMaskModule } from 'angular2-text-mask';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";


import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

// Assistido
import { AssistidoCadastroComponent } from './assistido/cadastro/assistido-cadastro.component';
import { AssistidoOcorrenciaComponent } from './assistido/ocorrencia/assistido-ocorrencia.component';
import { VisitaCadastroComponent } from './assistido/visita/cadastro/visita-cadastro.component';

//Cliente
import { ClienteCadastroComponent } from './cliente/cadastro/cliente-cadastro.component';

// Colaborador
import { ColaboradorCadastroComponent } from './colaborador/cadastro/colaborador-cadastro.component';
import { ColaboradorContaCadastroComponent } from './colaborador/conta/cadastro/conta-cadastro.component';
import { ColaboradorEntrevistaCadastroComponent } from './colaborador/entrevista/cadastro/entrevista-cadastro.component';
import { ColaboradorOcorrenciaComponent } from './colaborador/ocorrencia/colaborador-ocorrencia.component';
import { IncompativeisCadastroComponent } from './colaborador/incompativeis/cadastro/incompativeis-cadastro.component';

// Prospect
import { ProspectCadastroComponent } from './prospect/cadastro/prospect-cadastro.component';


// Escala
import { EscalaInclusaoComponent } from './colaborador/escala/inclusao/escala-inclusao.component';
import { EscalaConsultaComponent } from './colaborador/escala/consulta/escala-consulta.component';


// Empresa
import { EmpresaCadastroComponent } from './empresa/cadastro/empresa-cadastro.component';

@NgModule({
  declarations: [
    AppComponent,
    DigitOnlyDirective,
    LoginComponent,
    MenuComponent,
    AssistidoCadastroComponent,
    ClienteCadastroComponent,
    FooterComponent,
    HeaderComponent,
    ColaboradorCadastroComponent,
    ColaboradorContaCadastroComponent,
    ColaboradorEntrevistaCadastroComponent,
    ProspectCadastroComponent,
    AssistidoOcorrenciaComponent,
    ColaboradorOcorrenciaComponent,
    EscalaInclusaoComponent,
    IncompativeisCadastroComponent,
    EmpresaCadastroComponent,
    VisitaCadastroComponent,
    EscalaConsultaComponent,
    ClienteCadastroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgMultiSelectDropDownModule.forRoot(),
    TextMaskModule,
    GooglePlaceModule,
    BrowserModule,
    FormsModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
