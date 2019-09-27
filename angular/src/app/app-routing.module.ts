import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Assistido
import { AssistidoCadastroComponent } from './assistido/cadastro/assistido-cadastro.component';
import { AssistidoOcorrenciaComponent } from './assistido/ocorrencia/assistido-ocorrencia.component';
import { VisitaCadastroComponent } from './assistido/visita/cadastro/visita-cadastro.component';

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


const routes: Routes = [
  { path: '', component: AssistidoCadastroComponent },
  { path: 'assistido/cadastro', component: AssistidoCadastroComponent },
  { path: 'assistido/ocorrencia/cadastro', component: AssistidoOcorrenciaComponent },
  { path: 'assistido/visita/cadastro', component: VisitaCadastroComponent },
  { path: 'colaborador/cadastro', component: ColaboradorCadastroComponent },
  { path: 'colaborador/conta/cadastro', component: ColaboradorContaCadastroComponent },
  { path: 'colaborador/entrevista/cadastro', component: ColaboradorEntrevistaCadastroComponent },
  { path: 'colaborador/ocorrencia/cadastro', component: ColaboradorOcorrenciaComponent },
  { path: 'colaborador/incompativel/cadastro', component: IncompativeisCadastroComponent },
  { path: 'prospect/cadastro', component: ProspectCadastroComponent },
  { path: 'empresa/cadastro', component: EmpresaCadastroComponent },
  { path: 'escala/inclusao', component: EscalaInclusaoComponent },
  { path: 'escala/consulta', component: EscalaConsultaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
