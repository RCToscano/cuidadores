import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../user.service';
import { User } from '../models/user.model';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";

@Component({
  selector: 'app-usuario-consulta',
  templateUrl: './usuario-consulta.component.html'
})
export class UsuarioConsultaComponent implements OnInit {

  users: User[];
  userSelected = false;
  uploadForm: FormGroup;
  searchControl: FormControl;
  keyword = 'nome';
  placeholder = 'Digite o nome do Usuário';
  submitted = false;
  carregar = false;
  isLoading = false;
  message: string;
  messageType: string;

  constructor(private userService: UserService,
              private spinner: NgxSpinnerService,
              private formBuilder: FormBuilder) {

    this.searchControl = this.formBuilder.control('', Validators.required);
    this.uploadForm = this.formBuilder.group({
      user: this.searchControl
    });

    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(valor => {
          this.submitted = false;
          this.isLoading = true;
          if (valor != '') {
            return this.userService.buscarUsuariosPorNome(valor)
          }
          else {
            return this.userService.buscarUsuariosPorNome('1');
          }
        })
      ).subscribe(
        res => {
          this.users = res
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
    this.userSelected = true;
    this.isLoading = false;
  }

  inputCleared() {
    this.userSelected = false;
    this.isLoading = false;
  }

}
