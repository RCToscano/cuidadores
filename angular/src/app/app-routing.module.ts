import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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


const routes: Routes = [
  { path: '', component: AssistidoCadastroComponent },
  { path: 'assistido/cadastro', component: AssistidoCadastroComponent },
  { path: 'assistido/ocorrencia/cadastro', component: AssistidoOcorrenciaComponent },
  { path: 'colaborador/cadastro', component: ColaboradorCadastroComponent },
  { path: 'colaborador/conta/cadastro', component: ColaboradorContaCadastroComponent },
  { path: 'colaborador/entrevista/cadastro', component: ColaboradorEntrevistaCadastroComponent },
  { path: 'colaborador/colaborador/cadastro', component: ColaboradorOcorrenciaComponent },
  { path: 'prospect/cadastro', component: ProspectCadastroComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
