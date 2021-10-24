import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './user/login/login.component';
import { AuthGuard } from "./auth-guard.service";

import { HomeComponent } from './home/home.component';

// Assistido
import { AssistidoCadastroComponent } from './assistido/cadastro/assistido-cadastro.component';
import { AssistidoOcorrenciaComponent } from './assistido/ocorrencia/assistido-ocorrencia.component';
import { VisitaCadastroComponent } from './assistido/visita/cadastro/visita-cadastro.component';

//Cliente
import { ClienteConsultaComponent } from './cliente/consulta/cliente-consulta.component';
import { ClienteCadastroComponent } from './cliente/cadastro/cliente-cadastro.component';

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
import { ProspectConsultaComponent } from './prospect/consulta/prospect-consulta.component';
import { UserPerfilComponent } from "./user/perfil/user-perfil.component";
import { Funcionalidade } from "./common/models/funcionalidade.models";



const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'assistido/cadastro', component: AssistidoCadastroComponent, canActivate: [AuthGuard]  },
  { path: 'assistido/ocorrencia/cadastro', component: AssistidoOcorrenciaComponent, canActivate: [AuthGuard]  },
  { path: 'assistido/visita/cadastro', component: VisitaCadastroComponent, canActivate: [AuthGuard]  },
  { path: 'cliente/consulta', component: ClienteConsultaComponent, canActivate: [AuthGuard], data: { feature: Funcionalidade.CLIENTE_CONSULTA },  },
  { path: 'cliente/cadastro', component: ClienteCadastroComponent, canActivate: [AuthGuard], data: { feature: Funcionalidade.CLIENTE_CADASTRO },  },
  { path: 'cliente/cadastro/:id', component: ClienteCadastroComponent, canActivate: [AuthGuard], data: { feature: Funcionalidade.CLIENTES_ALTERACAO },  },
  { path: 'colaborador', loadChildren: './colaborador/colaborador.module#ColaboradorModule' },
  // { path: 'colaborador/cadastro/:id', loadChildren: './colaborador/colaborador.module#ColaboradorModule' },
  { path: 'colaborador/cadastro', loadChildren: './colaborador/colaborador.module#ColaboradorModule' },
  // { path: 'colaborador/conta/cadastro', loadChildren: './colaborador/colaborador.module#ColaboradorModule' },
  // { path: 'colaborador/entrevista/cadastro', loadChildren: './colaborador/colaborador.module#ColaboradorModule' },
  // { path: 'colaborador/ocorrencia/cadastro', loadChildren: './colaborador/colaborador.module#ColaboradorModule' },
  // { path: 'colaborador/incompativel/cadastro', loadChildren: './colaborador/colaborador.module#ColaboradorModule' },
  { path: 'prospect/cadastro', component: ProspectCadastroComponent, canActivate: [AuthGuard], data: { feature: Funcionalidade.PROSPECT_CADASTRO },  },
  { path: 'prospect/cadastro/:id', component: ProspectCadastroComponent, canActivate: [AuthGuard], data: { feature: Funcionalidade.PROSPECT_ALTERACAO },  },
  { path: 'prospect/consulta', component: ProspectConsultaComponent, canActivate: [AuthGuard], data: { feature: Funcionalidade.PROSPECT_CONSULTA },  },
  { path: 'empresa/consulta', component: EmpresaConsultaComponent, canActivate: [AuthGuard], data: { feature: Funcionalidade.EMPRESA_CONSULTA },  },
  { path: 'empresa/cadastro/:id', component: EmpresaCadastroComponent, canActivate: [AuthGuard], data: { feature: Funcionalidade.EMPRESA_ALTERACAO },  },
  { path: 'empresa/cadastro', component: EmpresaCadastroComponent, canActivate: [AuthGuard], data: { feature: Funcionalidade.EMPRESA_ALTERACAO },  },
  { path: 'escala/inclusao', component: EscalaInclusaoComponent, canActivate: [AuthGuard], data: { feature: Funcionalidade.ESCALA_PROGRAMACAO },  },
  { path: 'escala/consulta', component: EscalaConsultaComponent, canActivate: [AuthGuard], data: { feature: Funcionalidade.ESCALA_CONSULTA },  },
  { path: 'usuario/consulta', component: UsuarioConsultaComponent, canActivate: [AuthGuard], data: { feature: Funcionalidade.USUARIOS_CONSULTA },  },
  { path: 'usuario/cadastro/:id', component: UsuarioCadastroComponent, canActivate: [AuthGuard], data: { feature: Funcionalidade.USUARIOS_ALTERACAO },  },
  { path: 'usuario/cadastro', component: UsuarioCadastroComponent, canActivate: [AuthGuard], data: { feature: Funcionalidade.USUARIOS_CADASTRO },  },
  { path: 'perfil', component: UserPerfilComponent, canActivate: [AuthGuard]  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
