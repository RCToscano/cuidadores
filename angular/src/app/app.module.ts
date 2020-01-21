import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { LocationStrategy, HashLocationStrategy, CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TextMaskModule } from 'angular2-text-mask';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { BsDatepickerModule } from 'ngx-bootstrap';
import { ScrollToModule } from 'ng2-scroll-to-el';
import { NgxSpinnerModule } from "ngx-spinner";
import { FileUploadModule } from 'ng2-file-upload';
// import { DigitOnlyDirective } from './common/directives/digitonly/digit-only.directive';

import { LoginComponent } from './user/login/login.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

// Usuario
import { UserService } from './user/user.service';
import { UsuarioConsultaComponent } from './user/consulta/usuario-consulta.component';
import { UsuarioCadastroComponent } from './user/cadastro/usuario-cadastro.component';

// Assistido
import { AssistidoCadastroComponent } from './assistido/cadastro/assistido-cadastro.component';
import { AssistidoOcorrenciaComponent } from './assistido/ocorrencia/assistido-ocorrencia.component';
import { VisitaCadastroComponent } from './assistido/visita/cadastro/visita-cadastro.component';

// Prospect
import { ProspectCadastroComponent } from './prospect/cadastro/prospect-cadastro.component';

// Escala
import { EscalaInclusaoComponent } from './escala/inclusao/escala-inclusao.component';
import { EscalaConsultaComponent } from './escala/consulta/escala-consulta.component';

// Empresa
import { EmpresaCadastroComponent } from './empresa/cadastro/empresa-cadastro.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    // DigitOnlyDirective,
    LoginComponent,
    MenuComponent,
    AssistidoCadastroComponent,
    FooterComponent,
    HeaderComponent,
    ProspectCadastroComponent,
    AssistidoOcorrenciaComponent,
    EscalaInclusaoComponent,
    EmpresaCadastroComponent,
    VisitaCadastroComponent,
    EscalaConsultaComponent,
    HomeComponent,
    UsuarioCadastroComponent,
    UsuarioConsultaComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule,
    NgbModule,
    NgMultiSelectDropDownModule.forRoot(),
    TextMaskModule,
    GooglePlaceModule,
    BsDatepickerModule.forRoot(),
    ScrollToModule.forRoot(),
    NgxSpinnerModule,
    FileUploadModule
  ],
  providers: [
    UserService,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: LOCALE_ID, useValue: 'pt-br'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
