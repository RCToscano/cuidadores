import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Empresa } from '../models/empresa.model';
import { EmpresaService } from '../empresa.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-empresa-consulta',
  templateUrl: './empresa-consulta.component.html'
})
export class EmpresaConsultaComponent implements OnInit {

  submitted = false;
  carregar = false;
  keyword = 'nome';
  placeholder = 'Digite o nome da Empresa';
  uploadForm: FormGroup;
  searchControl: FormControl;
  empresas: Empresa[];
  isLoading = false;
  message: string;
  messageType: string;
  empresaSelected = false;

  constructor(private empresaService: EmpresaService,
              private spinner: NgxSpinnerService,
              private formBuilder: FormBuilder) {

    this.searchControl = this.formBuilder.control('', Validators.required);
    this.uploadForm = this.formBuilder.group({
      empresa: this.searchControl
    });

    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(valor => {
          this.submitted = false;
          this.isLoading = true;
          if (valor != '') {
            return this.empresaService.buscarEmpresas(valor);
          }
          else {
            return this.empresaService.buscarEmpresas('1');
          }
        })
      ).subscribe(
        res => {
          this.empresas = res
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

  }

  get form() {
    if(this.uploadForm != null)
      return this.uploadForm.controls;
  }

  selected() {
    this.empresaSelected = true;
    this.isLoading = false;
  }

  inputCleared() {
    this.empresaSelected = false;
    this.isLoading = false;
  }

}
