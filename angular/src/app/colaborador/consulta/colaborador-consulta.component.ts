import { Component, OnInit, ViewChild } from '@angular/core';
import { ColaboradorService } from '../colaborador.service';
import { Colaborador } from '../models/colaborador.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-colaborador-consulta',
  templateUrl: './colaborador-consulta.component.html'
})
export class ColaboradorConsultaComponent implements OnInit {

  @ViewChild('auto') auto;

  submitted = false;
  carregar = false;
  keyword = 'nome';
  placeholder = 'Digite o nome do Colaborador';
  uploadForm: FormGroup;
  searchControl: FormControl;
  colaboradores: Colaborador[];
  isLoading = false;
  message: string;
  messageType: string;
  colaboradorSelected = false;

  constructor(private colaboradorService: ColaboradorService,
              private spinner: NgxSpinnerService,
              private router: Router,
              private formBuilder: FormBuilder) {

    this.searchControl = this.formBuilder.control('', Validators.required);
    this.uploadForm = this.formBuilder.group({
      colaborador: this.searchControl
    });

    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(valor => {
          this.submitted = false;
          this.isLoading = true;
          if (valor != '') {
            return this.colaboradorService.buscarColaboradores(valor);
          }
          else {
            return this.colaboradorService.buscarColaboradores('1');
          }
        })
      ).subscribe(
        res => {
          this.colaboradores = res
          this.submitted = false;
          this.isLoading = false;
        },
        error => {
          this.submitted = false;
          this.isLoading = false;
        }
      );
  }

  ngOnInit() {

  }

  onSubmit() {
    this.submitted = true;
  }

  get form() {
    if(this.uploadForm != null)
      return this.uploadForm.controls;
  }

  selected() {
    this.colaboradorSelected = true;
    this.isLoading = false;
  }

  inputCleared() {
    this.colaboradorSelected = false;
    this.isLoading = false;
  }

}
