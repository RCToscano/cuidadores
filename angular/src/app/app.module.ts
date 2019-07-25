import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

// Assistido
import { AssistidoCadastroComponent } from './assistido/cadastro/assistido-cadastro.component';
import { AssistidoOcorrenciaComponent } from './assistido/ocorrencia/assistido-ocorrencia.component';

// Colaborador
import { ColaboradorCadastroComponent } from './colaborador/cadastro/colaborador-cadastro.component';
import { ColaboradorContaCadastroComponent } from './colaborador/conta/cadastro/conta-cadastro.component';
import { ColaboradorEntrevistaCadastroComponent } from './colaborador/entrevista/cadastro/entrevista-cadastro.component';
import { ColaboradorOcorrenciaComponent } from './colaborador/ocorrencia/colaborador-ocorrencia.component';

// Prospect
import { ProspectCadastroComponent } from './prospect/cadastro/prospect-cadastro.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    AssistidoCadastroComponent,
    FooterComponent,
    HeaderComponent,
    ColaboradorCadastroComponent,
    ColaboradorContaCadastroComponent,
    ColaboradorEntrevistaCadastroComponent,
    ProspectCadastroComponent,
    AssistidoOcorrenciaComponent,
    ColaboradorOcorrenciaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
