import { Component, OnInit, ElementRef, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDate, NgbCalendar, NgbDatepickerConfig, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from '../models/cliente.model';
import '../../../assets/scripts/endereco.js';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute } from '@angular/router';
import { CadastroParametros } from '../models/cadastro-parametros-model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ScrollToService } from 'ng2-scroll-to-el';

defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente-cadastro.component.html'
})
export class ClienteCadastroComponent implements OnInit {

  cliente: Cliente = {} as Cliente;
  parametros: CadastroParametros;
  titulo = 'Cadastro';
  botao = 'Cadastrar';
  alterar = false;
  message: string;
  messageType: string;
  uploadForm: FormGroup;
  submitted = false;
  carregar = false;
  maskCPF = [/[0-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  maskTel = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  maskCel = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  maskCEP = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  maskAltura = [/[0-9]/,'.', /\d/, /\d/];

  @ViewChild("placesRef")
  placesRef: GooglePlaceDirective;
  link = '';

  options = {
    types: [],
    componentRestrictions: { country: 'BR' }
  }

  constructor(private formBuilder: FormBuilder,
    private el: ElementRef,
    private activatedRoute: ActivatedRoute,
    private clienteService: ClienteService,
    private spinner: NgxSpinnerService,
    private scrollService: ScrollToService
  ) {

    if (this.activatedRoute.snapshot.params['id'] != undefined) {
      this.titulo = 'Alteração';
      this.botao = 'Alterar';
      this.alterar = true;
    }
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.carregar = true;
    this.spinner.show();
    this.criarForm();

    if (this.alterar) {
      this.clienteService.consultaCliente(this.activatedRoute.snapshot.params['id'])
        .subscribe(
          (res: Cliente) => {
            this.cliente = res;
            console.log(res);
            setTimeout(() => {
              this.buscarParametros();
              this.criarForm();
              this.spinner.hide();
              this.carregar = false;
            }, 0);
          },
          error => {
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
    this.clienteService.cadastroParametros()
      .subscribe(
        (res: CadastroParametros) => {
          this.parametros = res;
          console.log(this.parametros);
        },
        error => {
          this.messageType = 'danger';
          this.message = error;
          this.scrollService.scrollTo('#header');
        }
      );
  }

  criarForm() {
    this.uploadForm = this.formBuilder.group({
      idGenero: [null, [Validators.required]],
      idEstadoCivil: [null, [Validators.required]],
      idClienteSituacao: [null, [Validators.required]],
      cpf: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      rg: ['', [Validators.required, Validators.maxLength(15)]],
      nome: ['', [Validators.required, Validators.maxLength(100)]],
      //dataNascimento: [this.cliente.dataNascimento, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      dataNascimento: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      peso: [null, [Validators.required, Validators.maxLength(3)]],
      altura: [null, [Validators.required]],
      telFixo: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      telCel: ['', [Validators.required, Validators.minLength(15), Validators.maxLength(15)]],
      nomeContato: ['', [Validators.required]],
      //coordenadas: [this.cliente.coordenadas, [Validators.required]],
      coordenadas: [''],
      latitude: [''],
      longitude: [''],
      endereco: ['', [Validators.required, Validators.maxLength(100)]],
      numero: ['', [Validators.required, Validators.maxLength(6)]],
      complemento: ['', [Validators.maxLength(50)]],
      municipio: ['', [Validators.required, Validators.maxLength(100)]],
      //uf: ['', [Validators.required, Validators.maxLength(50)]],
      //esse vou substituir
      estado: [this.cliente.estado, [Validators.required, Validators.maxLength(50)]],
      cep: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      pais: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  onSubmit() {
    this.submitted = true;

    const controls = this.uploadForm.controls;
    for (const name in controls) {
        this.checkField(controls[name].value, name);
        if (controls[name].invalid) {
            console.log('invalido: ' + name);
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

      this.cliente = this.uploadForm.value;
      this.clienteService.cadastrarCliente(this.cliente)
        .subscribe(
          res => {
            console.log(res);
            this.uploadForm.reset();
            this.messageType = 'success';
            this.message = 'Cadastro realizado com sucesso';
            this.scrollService.scrollTo('#header');
            this.carregar = false;
            this.spinner.hide();
          },
          error => {
            console.log(error);
            this.messageType = 'danger';
            this.message = 'erro';
            this.scrollService.scrollTo('#header', 350, -100);
            this.carregar = false;
            this.spinner.hide();
          }
      );
    }
  }

  get form() {
    if(this.uploadForm != null)
      return this.uploadForm.controls;
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

  handleAddressChange(address: Address) {
    console.log(address);
    this.link = address.url;
    if (address.types[0] == "street_address") {
      this.uploadForm.controls.numero.setValue(address.address_components[0].long_name);
      this.uploadForm.controls.endereco.setValue(address.address_components[1].short_name);
      this.uploadForm.controls.municipio.setValue(address.address_components[3].long_name);
      this.uploadForm.controls.estado.setValue(address.address_components[4].long_name);
      this.uploadForm.controls.pais.setValue(address.address_components[5].long_name);
      this.uploadForm.controls.cep.setValue(address.address_components[6].long_name);
      this.uploadForm.controls.coordenadas.setValue(address.geometry.location.lat().toString() + ',' +
        address.geometry.location.lng().toString());
      this.uploadForm.controls.latitude.setValue(address.geometry.location.lat().toString());
      this.uploadForm.controls.longitude.setValue(address.geometry.location.lng().toString());
    }
    else if (address.types[0] == "postal_code") {
      this.uploadForm.controls.numero.setValue('');
      this.uploadForm.controls.endereco.setValue('');
      this.uploadForm.controls.municipio.setValue(address.address_components[2].long_name);
      this.uploadForm.controls.estado.setValue(address.address_components[3].long_name);
      this.uploadForm.controls.pais.setValue(address.address_components[4].long_name);
      this.uploadForm.controls.cep.setValue(address.address_components[0].long_name);
      this.uploadForm.controls.coordenadas.setValue(address.geometry.location.lat().toString() + ',' +
        address.geometry.location.lng().toString());
      this.uploadForm.controls.latitude.setValue(address.geometry.location.lat().toString());
      this.uploadForm.controls.longitude.setValue(address.geometry.location.lng().toString());
    }
    else {
      this.uploadForm.controls.numero.setValue('');
      this.uploadForm.controls.cep.setValue('');
      this.uploadForm.controls.endereco.setValue(address.address_components[0].short_name);
      this.uploadForm.controls.municipio.setValue(address.address_components[2].long_name);
      this.uploadForm.controls.estado.setValue(address.address_components[3].long_name);
      this.uploadForm.controls.pais.setValue(address.address_components[4].long_name);
      if (address.address_components[5] != undefined) {
        this.uploadForm.controls.cep.setValue(address.address_components[5].long_name);
      }
      this.uploadForm.controls.coordenadas.setValue(address.geometry.location.lat().toString() + ',' +
        address.geometry.location.lng().toString());
      this.uploadForm.controls.latitude.setValue(address.geometry.location.lat().toString());
      this.uploadForm.controls.longitude.setValue(address.geometry.location.lng().toString());
    }
  }

  abrirMapa() {
    if (this.link != '') {
      window.open(this.link, "_blank");
    }
  }
}
