import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import '../../../assets/scripts/endereco.js';
import { EmpresaService } from '../empresa.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ScrollToService } from 'ng2-scroll-to-el';
import { Empresa } from '../models/empresa.model';

defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-empresa-cadastro',
  templateUrl: './empresa-cadastro.component.html'
})
export class EmpresaCadastroComponent implements OnInit {

  empresa: Empresa = {} as Empresa;
  titulo = 'Cadastro';
  botao = 'Cadastrar';
  alterar = false;
  message: string;
  messageType: string;
  uploadForm: FormGroup;
  submitted = false;
  carregar = false;
  maskCNPJ = [/[0-9]/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/,];
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
              private empresaService: EmpresaService,
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
      this.empresaService.consultaEmpresa(this.activatedRoute.snapshot.params['id'])
        .subscribe(
        (res : Empresa) => {
          this.empresa = res;
          console.log(res);
          setTimeout(() => {
            this.criarForm();
            this.spinner.hide();
            this.carregar = false;
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
      this.criarForm();
      this.spinner.hide();
      this.carregar = false;
    }
  }

  criarForm() {
    this.uploadForm = this.formBuilder.group({
      idEmpresa: [this.empresa.idEmpresa],
      cnpj: [this.empresa.cnpj, [Validators.required, Validators.minLength(18), Validators.maxLength(18)]],
      nome: [this.empresa.nome, [Validators.required, Validators.maxLength(100)]],
      coordenadas: [this.empresa.coordenadas],
      latitude: [this.empresa.latitude],
      longitude: [this.empresa.longitude],
      endereco: [this.empresa.endereco, [Validators.required, Validators.maxLength(100)]],
      numero: [this.empresa.numero, [Validators.required, Validators.maxLength(6)]],
      complemento: [this.empresa.complemento, [Validators.maxLength(50)]],
      municipio: [this.empresa.municipio, [Validators.required, Validators.maxLength(100)]],
      uf: [this.empresa.uf, [Validators.required, Validators.maxLength(50)]],
      cep: [this.empresa.cep, [Validators.required, Validators.maxLength(9)]],
      pais: [this.empresa.pais, [Validators.required, Validators.maxLength(50)]]
    });
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.uploadForm.value);

    // const controls = this.uploadForm.controls;
    // for (const name in controls) {
    //     this.checkField(controls[name].value, name);
    //     if (controls[name].invalid) {
    //         console.log('invalido: ' + name);
    //         console.log(controls[name].errors);
    //     }
    // }

    if(this.uploadForm.invalid) {
      const invalidElements = this.el.nativeElement.querySelectorAll('.ng-invalid');
      invalidElements[1].focus();
      return;
    }
    else {
      this.carregar = true;
      this.spinner.show();

      this.empresa = this.uploadForm.value;

      if(this.alterar) {
        this.empresaService.alterarEmpresa(this.empresa)
          .subscribe(
            res => {
              console.log(res);
              this.messageType = 'success';
              this.message = 'Alteração realizada com sucesso';
              this.scrollService.scrollTo('#header');
              this.carregar = false;
              this.submitted = false;
              this.spinner.hide();
            },
            error => {
              console.log(error);
              this.messageType = 'danger';
              this.message = error;
              this.scrollService.scrollTo('#header', 350, -100);
              this.submitted = false;
              this.carregar = false;
              this.spinner.hide();
            }
        );
      }
      else {
        this.empresaService.cadastrarEmpresa(this.empresa)
          .subscribe(
            res => {
              console.log(res);
              this.messageType = 'success';
              this.message = 'Cadastro realizado com sucesso';
              this.scrollService.scrollTo('#header');
              this.carregar = false;
              this.submitted = false;
              this.uploadForm.reset();
              this.spinner.hide();
            },
            error => {
              console.log(error);
              this.messageType = 'danger';
              this.message = error;
              this.scrollService.scrollTo('#header', 350, -100);
              this.submitted = false;
              this.carregar = false;
              this.spinner.hide();
            }
        );
      }
    }
  }

  deletar() {
    this.carregar = true;
    this.spinner.show();

    this.empresa = this.uploadForm.value;

    this.empresaService.deletarEmpresa(this.empresa.idEmpresa)
      .subscribe(
        res => {
          console.log(res);
          this.messageType = 'success';
          this.message = 'Empresa excluída com sucesso';
          this.scrollService.scrollTo('#header');
          this.carregar = false;
          this.submitted = false;
          this.uploadForm.reset();
          this.alterar = false;
          this.spinner.hide();
        },
        error => {
          console.log(error);
          this.messageType = 'danger';
          this.message = error;
          this.scrollService.scrollTo('#header', 350, -100);
          this.submitted = false;
          this.carregar = false;
          this.spinner.hide();
        }
    );
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
      this.uploadForm.controls.uf.setValue(address.address_components[4].short_name);
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
      this.uploadForm.controls.uf.setValue(address.address_components[3].short_name);
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
      this.uploadForm.controls.uf.setValue(address.address_components[3].short_name);
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
