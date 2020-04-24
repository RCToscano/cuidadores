import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Cliente } from '../models/cliente.model';
import { ClienteService } from '../cliente.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-cliente-consulta',
  templateUrl: './cliente-consulta.component.html'
})
export class ClienteConsultaComponent implements OnInit {

  submitted = false;
  carregar = false;
  keyword = 'nome';
  placeholder = 'Digite o nome do Cliente';
  uploadForm: FormGroup;
  searchControl: FormControl;
  clientes: Cliente[];
  isLoading = false;
  message: string;
  messageType: string;
  clienteSelected = false;

  constructor(private clienteService: ClienteService,
              private spinner: NgxSpinnerService,
              private router: Router,
              private formBuilder: FormBuilder) {

    this.searchControl = this.formBuilder.control('', Validators.required);
    this.uploadForm = this.formBuilder.group({
      cliente: this.searchControl
    });

    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(valor => {
          this.submitted = false;
          this.isLoading = true;
          if (valor != '') {
            return this.clienteService.buscarClientesPorNome(valor);
          }
          else {
            return this.clienteService.buscarClientesPorNome('1');
          }
        })
      ).subscribe(
        res => {
          this.clientes = res
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
    this.clienteSelected = true;
    this.isLoading = false;
  }

  inputCleared() {
    this.clienteSelected = false;
    this.isLoading = false;
  }

}
