import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import '../../../assets/scripts/endereco.js';
import { ActivatedRoute } from '@angular/router';
import { CadastroParametros } from '../../colaborador/models/cadastro-parametros-model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ScrollToService } from 'ng2-scroll-to-el';
import { UserService } from '../user.service';
import { User } from '../models/user.model';

defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html'
})
export class UsuarioCadastroComponent implements OnInit {

  user: User = {} as User;
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
              private userService: UserService,
              private spinner: NgxSpinnerService,
              private scrollService: ScrollToService) {
    // if(!this.userService.isLogged()) {
    //   this.router.navigate(['']);
    // }
    // else {

      if(this.activatedRoute.snapshot.params['id'] != undefined) {
        this.titulo = 'Alteração';
        this.botao = 'Alterar';
        this.alterar = true;
      }
    // }
  }

  ngOnInit() {
    window.scroll(0,0);

    this.carregar = true;
    this.spinner.show();
    this.criarForm();

    if(this.alterar) {
      this.userService.consultaUsuarioId(this.activatedRoute.snapshot.params['id'])
        .subscribe(
        (res : User) => {
          this.user = res;
          console.log(res);
          setTimeout(() => {
            this.buscarParametros();
            this.criarForm();
            this.spinner.hide();
            this.carregar = false;
          }, 0);
        },
        error =>  {
          console.log(error);
          this.messageType = 'danger';
          this.message = error;
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
    this.userService.cadastroParametros()
      .subscribe(
      (res : CadastroParametros) => {
        this.parametros = res;
        console.log(this.parametros);
      },
      error =>  {
        this.messageType = 'danger';
        this.message = error;
      }
    );
  }

  criarForm() {
    this.uploadForm = this.formBuilder.group({
      cpf: [this.user.cpf, [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      rg: [this.user.rg, [Validators.required, Validators.maxLength(15)]],
      nome: [this.user.nome, [Validators.required, Validators.maxLength(100)]],
      dataNascimento: [this.user.dataNascimento, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      estadoCivil: [this.user.estadoCivil, [Validators.required]],
      sexo: [this.user.sexo, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email, Validators.maxLength(100)]],
      situacao: [this.user.situacao, [Validators.required]],
      telFixo: [this.user.telFixo, [Validators.minLength(14), Validators.maxLength(14)]],
      telCel: [this.user.telCel, [Validators.required, Validators.maxLength(16)]],
      tpUser: [this.user.tpUser, [Validators.required]],
      coordenadas: [this.user.coordenadas, [Validators.required]],
      latitude: [''],
      longitude: [''],
      endereco: [this.user.endereco, [Validators.required, Validators.maxLength(100)]],
      numero: [this.user.numero, [Validators.required, Validators.maxLength(6)]],
      complemento: [this.user.complemento, [Validators.maxLength(50)]],
      municipio: [this.user.municipio, [Validators.required, Validators.maxLength(100)]],
      estado: [this.user.estado, [Validators.required, Validators.maxLength(50)]],
      cep: [this.user.cep, [Validators.required, Validators.maxLength(9)]],
      pais: [this.user.pais, [Validators.required, Validators.maxLength(50)]]
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

      this.user = this.uploadForm.value;
      this.user.idUser = 6;
      this.userService.cadastrarUsuario(this.user)
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
    if(address.types[0] == "street_address") {
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
      if(address.address_components[5] != undefined) {
        this.uploadForm.controls.cep.setValue(address.address_components[5].long_name);
      }
      this.uploadForm.controls.coordenadas.setValue(address.geometry.location.lat().toString() + ',' +
                                                    address.geometry.location.lng().toString());
      this.uploadForm.controls.latitude.setValue(address.geometry.location.lat().toString());
      this.uploadForm.controls.longitude.setValue(address.geometry.location.lng().toString());
    }
  }

  abrirMapa() {
    if(this.link != '') {
      window.open(this.link, "_blank");
    }
  }

}
