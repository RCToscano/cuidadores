import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Colaborador } from '../../models/colaborador.model';
import { ColaboradorService } from '../../colaborador.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/user/user.service';
import { ScrollToService } from 'ng2-scroll-to-el';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ClienteService } from 'src/app/cliente/cliente.service';
import { Cliente } from 'src/app/cliente/models/cliente.model';
import { ColaboradorIncompativel } from '../../models/colaborador-incompativel.model';

@Component({
  selector: 'app-colaborador-incompativeis-cadastro',
  templateUrl: './incompativeis-cadastro.component.html'
})
export class IncompativeisCadastroComponent implements OnInit {

  @ViewChild('auto1') auto1;
  @ViewChild('auto2') auto2;

  submitted = false;
  carregar = false;
  keyword = 'nome';
  placeholderCli = 'Digite o nome do Cliente';
  placeholderColab = 'Digite o nome do Colaborador';
  uploadForm: FormGroup;
  searchControlColab: FormControl;
  searchControlCliente: FormControl;
  colaboradores: Colaborador[];
  clientes: Cliente[];
  isLoading = false;
  message: string;
  messageType: string;

  constructor(private formBuilder: FormBuilder,
              private colaboradorService: ColaboradorService,
              private clienteService: ClienteService,
              private userService: UserService,
              private spinner: NgxSpinnerService,
              private scrollService: ScrollToService,
              private el: ElementRef) { }

  ngOnInit() {
    this.searchControlColab = this.formBuilder.control('', Validators.required);
    this.searchControlCliente = this.formBuilder.control('', Validators.required);
    this.uploadForm = this.formBuilder.group({
      colaborador: this.searchControlColab,
      cliente: this.searchControlCliente,
      obs: ['', Validators.required]
    });

    this.searchControlColab.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(valor => {
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
          this.isLoading = false;
        },
        error => {
          this.isLoading = false;
        });

    this.searchControlCliente.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(valor => {
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
          this.isLoading = false;
        },
        error => {
          this.isLoading = false;
        });

  }

  get form() {
    if(this.uploadForm != null)
      return this.uploadForm.controls;
  }

  onSubmit() {
    console.log(this.uploadForm.value);
    this.submitted = true;

    const controls = this.uploadForm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            console.log('invalido: ' + name);
            console.log(controls[name].errors);
        }
    }

    if(this.uploadForm.invalid) {
      console.log('invalido');
      const invalidElements = this.el.nativeElement.querySelectorAll('.ng-invalid');
      invalidElements[1].focus();
      return;
    }
    else {
      console.log('ok');
      this.carregar = true;
      this.spinner.show();

      const incompativel = {} as ColaboradorIncompativel;
      incompativel.idColaborador = this.uploadForm.controls.colaborador.value.id;
      incompativel.idCliente = this.uploadForm.controls.cliente.value.idCliente;
      incompativel.observacao = this.uploadForm.controls.obs.value;
      incompativel.idUser = this.userService.user.idUser;

      this.colaboradorService.cadastrarIncompativel(incompativel)
        .subscribe(
          res => {
            console.log(res);
            this.uploadForm.reset();
            this.messageType = 'success';
            this.message = 'Incompatível cadastrado com sucesso';
            this.scrollService.scrollTo('#header');
            this.submitted = false;
            this.carregar = false;
            this.spinner.hide();
          },
          error => {
            console.log(error);
            this.messageType = 'danger';
            this.message = error;
            this.scrollService.scrollTo('#header');
            this.submitted = false;
            this.carregar = false;
            this.spinner.hide();
          }
      );
    }
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
