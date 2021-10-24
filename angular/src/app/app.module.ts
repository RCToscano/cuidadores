import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { LocationStrategy, HashLocationStrategy, CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { CalendarHeaderComponent } from "./common/calendario/calendar-header.component";

import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { LoginComponent } from './user/login/login.component';
import { LoginModalComponent } from "./user/login/modal/login-modal.component";
import { AuthGuard } from "./auth-guard.service";
import { AuthInterceptor } from "./auth.service";

import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

// Usuario
import { UserService } from './user/user.service';
import { UsuarioConsultaComponent } from './user/consulta/usuario-consulta.component';
import { UsuarioCadastroComponent } from './user/cadastro/usuario-cadastro.component';

// Assistido
import { AssistidoCadastroComponent } from './assistido/cadastro/assistido-cadastro.component';
import { AssistidoOcorrenciaComponent } from './assistido/ocorrencia/assistido-ocorrencia.component';
import { VisitaCadastroComponent } from './assistido/visita/cadastro/visita-cadastro.component';

//Cliente
import { ClienteService } from './cliente/cliente.service';
import { ProspectService } from './prospect/prospect.service';
import { ClienteConsultaComponent } from './cliente/consulta/cliente-consulta.component';
import { ClienteCadastroComponent } from './cliente/cadastro/cliente-cadastro.component';

// Prospect
import { ProspectCadastroComponent } from './prospect/cadastro/prospect-cadastro.component';
import { ProspectConsultaComponent } from './prospect/consulta/prospect-consulta.component';

// Escala
import { EscalaInclusaoComponent } from './escala/inclusao/escala-inclusao.component';
import { EscalaConsultaComponent } from './escala/consulta/escala-consulta.component';

// Empresa
import { EmpresaService } from './empresa/empresa.service';
import { EmpresaConsultaComponent } from './empresa/consulta/empresa-consulta.component';
import { EmpresaCadastroComponent } from './empresa/cadastro/empresa-cadastro.component';

// Perfil
import { UserPerfilComponent } from './user/perfil/user-perfil.component';
import { UserPerfilSenhaComponent } from './user/perfil/senha/user-perfil-senha.component';





@NgModule({
  declarations: [
    AppComponent,
    // DigitOnlyDirective,
    LoginComponent,
    LoginModalComponent,
    MenuComponent,
    AssistidoCadastroComponent,
    ClienteCadastroComponent,
    FooterComponent,
    HeaderComponent,
    ProspectCadastroComponent,
    AssistidoOcorrenciaComponent,
    EscalaInclusaoComponent,
    EmpresaConsultaComponent,
    EmpresaCadastroComponent,
    VisitaCadastroComponent,
    EscalaConsultaComponent,
    HomeComponent,
    UsuarioCadastroComponent,
    UsuarioConsultaComponent,
    EscalaConsultaComponent,
    ClienteCadastroComponent,
    ProspectConsultaComponent,
    ClienteConsultaComponent,
    UserPerfilComponent,
    UserPerfilSenhaComponent,
    CalendarHeaderComponent
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
    FileUploadModule,
    AutocompleteLibModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  entryComponents: [
    LoginModalComponent
  ],
  exports: [
    CalendarHeaderComponent
  ],
  providers: [
    UserService,
    EmpresaService,
    ClienteService,
    ProspectService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
