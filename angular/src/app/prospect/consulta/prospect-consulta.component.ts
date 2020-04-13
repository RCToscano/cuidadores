import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Prospect } from '../models/prospect.model';
import { ProspectService } from '../prospect.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-prospect-consulta',
  templateUrl: './prospect-consulta.component.html'
})
export class ProspectConsultaComponent implements OnInit {

  @ViewChild('auto') auto;

  submitted = false;
  carregar = false;
  keyword = 'nomeCliente';
  placeholder = 'Digite o nome do Prospect';
  uploadForm: FormGroup;
  searchControl: FormControl;
  prospects: Prospect[];
  isLoading = false;
  message: string;
  messageType: string;
  prospectSelected = false;

  constructor(private prospectService: ProspectService,
              private spinner: NgxSpinnerService,
              private router: Router,
              private formBuilder: FormBuilder) {

    this.searchControl = this.formBuilder.control('', Validators.required);
    this.uploadForm = this.formBuilder.group({
      prospect: this.searchControl
    });

    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(valor => {
          this.submitted = false;
          this.isLoading = true;
          if (valor != '') {
            return this.prospectService.buscarProspects(valor);
          }
          else {
            return this.prospectService.buscarProspects('1');
          }
        })
      ).subscribe(
        res => {
          this.prospects = res
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
    this.prospectSelected = true;
    this.isLoading = false;
  }

  inputCleared() {
    this.prospectSelected = false;
    this.isLoading = false;
  }

}
