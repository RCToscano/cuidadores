import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { defineLocale, formatDate } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import '../../../assets/scripts/endereco.js';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ScrollToService } from 'ng2-scroll-to-el';
import { UserService } from 'src/app/user/user.service';
import { ProspectService } from '../prospect.service';
import { Prospect } from '../models/prospect.model';
import { Genero } from 'src/app/common/models/genero.models';
import { User } from 'src/app/user/models/user.model';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-prospect-cadastro',
  templateUrl: './prospect-cadastro.component.html'
})
export class ProspectCadastroComponent implements OnInit {

  prospect: Prospect = {} as Prospect;
  generos: Genero[];
  titulo = 'Cadastro';
  botao = 'Cadastrar';
  alterar = false;
  message: string;
  messageType: string;
  uploadForm: FormGroup;
  submitted = false;
  carregar = false;

  keyword = 'nome';
  initialValue = 'Rafael';
  searchControl: FormControl;
  usuarios: User[];
  user: User = {} as User;
  isLoading = false;

  maskCPF = [/[0-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  maskTel = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  maskCel = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  maskAltura = [/[1-9]/, '.', /\d/, /\d/];

  constructor(private formBuilder: FormBuilder,
              private el: ElementRef,
              private activatedRoute: ActivatedRoute,
              private prospectService: ProspectService,
              private userService: UserService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private scrollService: ScrollToService) {

    if(!this.userService.isLogged()) {
      this.router.navigate(['']);
    }
    else {
      defineLocale('pt-br', ptBrLocale);

      if(this.activatedRoute.snapshot.params['id'] != undefined) {
        this.titulo = 'Alteração';
        this.botao = 'Alterar';
        this.alterar = true;
      }
    }
  }

  ngOnInit() {
    window.scroll(0,0);

    this.carregar = true;
    this.spinner.show();

    this.criarForm();

    if(this.alterar) {
      this.prospectService.consultaProspect(this.activatedRoute.snapshot.params['id'])
        .subscribe(
        res => {
          console.log(res);
          this.prospect = res;
          setTimeout(() => {
            this.userService.consultaUsuarioId(this.prospect.idUser).subscribe(
              res => {
                console.log(res);
                this.user = res;
                this.buscarParametros();
                this.criarForm();
                this.spinner.hide();
                this.carregar = false;
              },
              error => {
                this.spinner.hide();
                this.carregar = false;
              }
            )
          }, 0);
        },
        error =>  {
          console.log(error);
          this.messageType = 'danger';
          this.message = error;
          this.scrollService.scrollTo('#header');
          this.spinner.hide();
          this.carregar = false;
        }
      );
    }
    else {
      this.buscarParametros();
      this.criarForm();
      this.spinner.hide();
      this.carregar = false;
    }
  }

  buscarParametros() {
    this.prospectService.buscarGeneros()
      .subscribe(
      res => {
        this.generos = res;
        console.log(this.generos);
      },
      error =>  {
        this.messageType = 'danger';
        this.message = error;
        this.scrollService.scrollTo('#header');
      }
    );
  }

  criarForm() {
    console.log(this.user.nome)
    this.searchControl = this.formBuilder.control(this.user.nome, Validators.required);

    this.uploadForm = this.formBuilder.group({
      idProspect: [this.prospect.idProspect],
      nomeResponsavel: this.searchControl,
      data: [this.formartDate(this.prospect.dataNascimento), [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      nomeContato: [this.prospect.nomeContato, [Validators.required, Validators.maxLength(100)]],
      emailContato: [this.prospect.emailContato, [Validators.required, Validators.email, Validators.maxLength(100)]],
      telFixo: [this.prospect.telFixo, [Validators.minLength(14), Validators.maxLength(14)]],
      telCel: [this.prospect.telCel, [Validators.required, Validators.maxLength(16)]],
      cpfCliente: [this.prospect.cpfCliente, [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      nomeCliente: [this.prospect.nomeCliente, [Validators.required, Validators.maxLength(100)]],
      dataNascimento: [this.formartDate(this.prospect.dataNascimento), [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      idGenero: [this.prospect.idGenero, [Validators.required]],
      peso: [this.prospect.peso, [Validators.required, Validators.maxLength(3)]],
      altura: [this.prospect.altura, [Validators.required, Validators.maxLength(4)]],
      proposta: [this.prospect.proposta, [Validators.required, Validators.maxLength(1000)]],
      historico: [this.prospect.historico, [Validators.required, Validators.maxLength(1000)]]
    });

    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(valor => {
          this.isLoading = true;
          if (valor != '') {
            return this.userService.buscarUsuariosPorNome(valor);
          }
          else {
            return this.userService.buscarUsuariosPorNome('1');
          }
        })
      ).subscribe(
        res => {
          this.usuarios = res
          this.isLoading = false;
        },
        error => {
          this.isLoading = false;
        });
  }

  onSubmit() {
    this.submitted = true;

    const controls = this.uploadForm.controls;
    for (const name in controls) {
        this.checkField(controls[name].value, name);
        if (controls[name].invalid) {
            console.log('invalido: ' + name);
            console.log(controls[name].errors);
        }
    }

    if(this.uploadForm.invalid) {
      const invalidElements = this.el.nativeElement.querySelectorAll('.ng-invalid');
      invalidElements[1].focus();
      return;
    }
    else {
      this.carregar = true;
      this.spinner.show();

      this.prospect = this.uploadForm.value;
      this.prospect.dataNascimento = formatDate(controls.dataNascimento.value, 'DD/MM/YYYY').trim();
      this.prospect.data = formatDate(controls.data.value, 'DD/MM/YYYY').trim();
      if(this.user.idUser != null) {
        this.prospect.idUser = this.user.idUser;
      }
      else {
          this.prospect.idUser = this.uploadForm.controls.nomeResponsavel.value.idUser;
      }
      this.prospect.nomeResponsavel = undefined;

      if(this.alterar) {
        this.prospectService.alterarProspect(this.prospect)
          .subscribe(
            res => {
              this.messageType = 'success';
              this.message = 'Alteração realizada com sucesso';
              this.scrollService.scrollTo('#header');
              this.submitted = false;
              this.carregar = false;
              this.spinner.hide();
            },
            error => {
              console.log(error);
              this.messageType = 'danger';
              this.message = error;
              this.scrollService.scrollTo('#header', 350, -100);
              this.carregar = false;
              this.spinner.hide();
            }
        );
      }
      else {
        this.prospectService.cadastrarProspect(this.prospect)
          .subscribe(
            res => {
              console.log(res);
              this.uploadForm.reset();
              this.messageType = 'success';
              this.message = 'Cadastro realizado com sucesso';
              this.scrollService.scrollTo('#header');
              this.submitted = false;
              this.carregar = false;
              this.spinner.hide();
            },
            error => {
              console.log(error);
              this.messageType = 'danger';
              this.message = error;
              this.scrollService.scrollTo('#header', 350, -100);
              this.carregar = false;
              this.spinner.hide();
            }
        );
      }
    }
  }

  get form() {
    if(this.uploadForm != null)
      return this.uploadForm.controls;
  }

  formartDate(data: string): Date {
    if(data != null && data != '') {
      return new Date(data);
    }
    return null;
  }

  checkField(value: string, field: string) {
    // console.log('valor: ' + value);
    try {
      if (value != null && value.indexOf('_') !== -1 ) {
        console.log(field + ' ' + value);
        let aux = this.uploadForm.get(field);
        aux.setErrors({ required: true });
      }
    }
    catch(error) {

    }
  }

  onValueChange(value: Date): void {
    this.uploadForm.controls.dataNascimento.setValue(formatDate(value, 'YYYY-MM-DD').trim());
  }

  selected() {
    console.log('selected');
    this.isLoading = false;
  }

  inputCleared() {
    console.log('inputCleared');
    this.isLoading = false;
  }

}
