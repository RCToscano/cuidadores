import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Colaborador
import { ColaboradorConsultaComponent } from './consulta/colaborador-consulta.component';
import { ColaboradorCadastroComponent } from './cadastro/colaborador-cadastro.component';
import { ColaboradorContaCadastroComponent } from './conta/colaborador-conta.component';
import { ColaboradorEntrevistaComponent } from './entrevista/colaborador-entrevista.component';
import { ColaboradorOcorrenciaComponent } from './ocorrencia/colaborador-ocorrencia.component';
import { IncompativeisCadastroComponent } from './incompativeis/cadastro/incompativeis-cadastro.component';



const routes: Routes = [
  { path: '', component: ColaboradorConsultaComponent },
  { path: 'cadastro', component: ColaboradorCadastroComponent },
  { path: 'cadastro/:id', component: ColaboradorCadastroComponent },
  { path: 'conta/cadastro', component: ColaboradorContaCadastroComponent },
  { path: 'entrevista/cadastro', component: ColaboradorEntrevistaComponent },
  { path: 'ocorrencia/cadastro', component: ColaboradorOcorrenciaComponent },
  { path: 'incompativel/cadastro', component: IncompativeisCadastroComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColaboradorRoutingModule { }
