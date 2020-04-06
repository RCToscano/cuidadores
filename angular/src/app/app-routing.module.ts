import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';

// Assistido
import { AssistidoCadastroComponent } from './assistido/cadastro/assistido-cadastro.component';
import { AssistidoOcorrenciaComponent } from './assistido/ocorrencia/assistido-ocorrencia.component';
import { VisitaCadastroComponent } from './assistido/visita/cadastro/visita-cadastro.component';

//Cliente
import { ClienteCadastroComponent } from './cliente/cadastro/cliente-cadastro.component';
import { ClienteConsultaComponent } from './cliente/consulta/cliente-consulta.component';

// Prospect
import { ProspectCadastroComponent } from './prospect/cadastro/prospect-cadastro.component';

// Escala
import { EscalaInclusaoComponent } from './escala/inclusao/escala-inclusao.component';
import { EscalaConsultaComponent } from './escala/consulta/escala-consulta.component';

// Empresa
import { EmpresaConsultaComponent } from './empresa/consulta/empresa-consulta.component';
import { EmpresaCadastroComponent } from './empresa/cadastro/empresa-cadastro.component';

// Usuario
import { UsuarioConsultaComponent } from './user/consulta/usuario-consulta.component';
import { UsuarioCadastroComponent } from './user/cadastro/usuario-cadastro.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'assistido/cadastro', component: AssistidoCadastroComponent },
  { path: 'assistido/ocorrencia/cadastro', component: AssistidoOcorrenciaComponent },
  { path: 'assistido/visita/cadastro', component: VisitaCadastroComponent },
  { path: 'colaborador', loadChildren: './colaborador/colaborador.module#ColaboradorModule' },
  { path: 'cliente/cadastro', component: ClienteCadastroComponent },
  { path: 'cliente/cadastro/:idCliente', component: ClienteCadastroComponent },
  { path: 'cliente/consulta', component: ClienteConsultaComponent },
  // { path: 'colaborador/cadastro/:id', loadChildren: './colaborador/colaborador.module#ColaboradorModule' },
  { path: 'colaborador/cadastro', loadChildren: './colaborador/colaborador.module#ColaboradorModule' },
  // { path: 'colaborador/conta/cadastro', loadChildren: './colaborador/colaborador.module#ColaboradorModule' },
  // { path: 'colaborador/entrevista/cadastro', loadChildren: './colaborador/colaborador.module#ColaboradorModule' },
  // { path: 'colaborador/ocorrencia/cadastro', loadChildren: './colaborador/colaborador.module#ColaboradorModule' },
  // { path: 'colaborador/incompativel/cadastro', loadChildren: './colaborador/colaborador.module#ColaboradorModule' },
  { path: 'prospect/cadastro', component: ProspectCadastroComponent },
  { path: 'empresa/consulta', component: EmpresaConsultaComponent },
  { path: 'empresa/cadastro/:id', component: EmpresaCadastroComponent },
  { path: 'empresa/cadastro', component: EmpresaCadastroComponent },
  { path: 'escala/inclusao', component: EscalaInclusaoComponent },
  { path: 'escala/consulta', component: EscalaConsultaComponent },
  { path: 'usuario/consulta', component: UsuarioConsultaComponent },
  { path: 'usuario/cadastro/:id', component: UsuarioCadastroComponent },
  { path: 'usuario/cadastro', component: UsuarioCadastroComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
