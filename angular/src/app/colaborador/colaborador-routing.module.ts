import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from "../auth-guard.service";

// Colaborador
import { Funcionalidade } from "../common/models/funcionalidade.models";
import { ColaboradorConsultaComponent } from './consulta/colaborador-consulta.component';
import { ColaboradorCadastroComponent } from './cadastro/colaborador-cadastro.component';
import { ColaboradorContaCadastroComponent } from './conta/colaborador-conta.component';
import { ColaboradorEntrevistaComponent } from './entrevista/colaborador-entrevista.component';
import { ColaboradorOcorrenciaComponent } from './ocorrencia/colaborador-ocorrencia.component';
import { IncompativeisCadastroComponent } from './incompativeis/cadastro/incompativeis-cadastro.component';



const routes: Routes = [
  { path: '', component: ColaboradorConsultaComponent, canActivate: [AuthGuard], data: { feature: Funcionalidade.COLABORADOR_CONSULTA }, },
  { path: 'cadastro', component: ColaboradorCadastroComponent, canActivate: [AuthGuard], data: { feature: Funcionalidade.COLABORADOR_CADASTRO }, },
  { path: 'cadastro/:id', component: ColaboradorCadastroComponent, canActivate: [AuthGuard], data: { feature: Funcionalidade.COLABORADOR_CONSULTA }, },
  { path: 'conta/cadastro', component: ColaboradorContaCadastroComponent, canActivate: [AuthGuard], data: { feature: Funcionalidade.COLABORADOR_CONTAS_CADASTRO },  },
  { path: 'entrevista/cadastro', component: ColaboradorEntrevistaComponent, canActivate: [AuthGuard], data: { feature: Funcionalidade.COLABORADOR_ENTREVISTA_CADASTRO },  },
  { path: 'ocorrencia/cadastro', component: ColaboradorOcorrenciaComponent, canActivate: [AuthGuard], data: { feature: Funcionalidade.COLABORADOR_OCORRENCIA_CADASTRO },  },
  { path: 'incompativel/cadastro', component: IncompativeisCadastroComponent, canActivate: [AuthGuard], data: { feature: Funcionalidade.COLABORADOR_INCOMPATIVEL_CADASTRO },  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColaboradorRoutingModule { }
