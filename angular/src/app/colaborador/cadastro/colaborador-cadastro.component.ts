import { Component, OnInit, ElementRef, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDate, NgbCalendar, NgbDatepickerConfig, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Colaborador } from '../models/colaborador.model';
import '../../../assets/scripts/endereco.js';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-colaborador',
  templateUrl: './colaborador-cadastro.component.html'
})
export class ColaboradorCadastroComponent implements OnInit {

  colaborador: Colaborador;
  uploadForm: FormGroup;
  submitted = false;
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
              private el: ElementRef) {
    // if(!this.userService.isLogged()) {
    //   this.router.navigate(['']);
    // }
    // else {
      this.uploadForm = this.formBuilder.group({
        cpf: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
        rg: ['', [Validators.required, Validators.maxLength(15)]],
        nome: ['', [Validators.required, Validators.maxLength(100)]],
        dataNascimento: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
        estadoCivil: [null, [Validators.required]],
        sexo: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.maxLength(100)]],
        situacao: [1, [Validators.required]],
        telFixo: ['', [Validators.minLength(14), Validators.maxLength(14)]],
        telCel: ['', [Validators.required, Validators.minLength(15), Validators.maxLength(15)]],
        vinculo: ['', [Validators.required]],
        funcao: ['', [Validators.required]],
        formaPagamento: ['', [Validators.required]],
        coordenadas: ['', [Validators.required]],
        latitude: [''],
        longitude: [''],
        endereco: ['', [Validators.required, Validators.maxLength(100)]],
        numero: ['', [Validators.required, Validators.maxLength(6)]],
        complemento: ['', [Validators.maxLength(50)]],
        municipio: ['', [Validators.required, Validators.maxLength(100)]],
        estado: ['', [Validators.required, Validators.maxLength(50)]],
        cep: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
        pais: ['', [Validators.required, Validators.maxLength(50)]]
      });
    // }
  }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }

  onSubmit() {
    this.submitted = true;
    if(this.uploadForm.invalid){
      const controls = this.uploadForm.controls;
      for (const name in controls) {
          this.checkField(controls[name].value, name);
          if (controls[name].invalid) {
              console.log('invalido: ' + name);
          }
      }
      const invalidElements = this.el.nativeElement.querySelectorAll('.ng-invalid');
      if (invalidElements.length > 0) {
        console.log(invalidElements[1]);

        invalidElements[1].focus();
      }
      return;
    }
    else {
      this.colaborador = this.uploadForm.value;
      console.log('tudo ok');
    }
  }

  get form() {
    return this.uploadForm.controls;
  }

  checkField(value: string, field: string) {
    console.log('valor: ' + value);
    if (value != null && (value.indexOf('_') !== -1 || value.length === 0)) {
      let phone = this.uploadForm.get(field);
      phone.setErrors({ required: true });
    }
  }

  public handleAddressChange(address: Address) {
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
      this.uploadForm.controls.municipio.setValue(address.address_components[1].long_name);
      this.uploadForm.controls.estado.setValue(address.address_components[2].long_name);
      this.uploadForm.controls.pais.setValue(address.address_components[3].long_name);
      this.uploadForm.controls.coordenadas.setValue(address.geometry.location.lat().toString() + ',' +
                                                    address.geometry.location.lng().toString());
      this.uploadForm.controls.latitude.setValue(address.geometry.location.lat().toString());
      this.uploadForm.controls.longitude.setValue(address.geometry.location.lng().toString());
    }
  }

  abrirMapa() {
    console.log('teste: ' + this.link);
    if(this.link != '') {
      window.open(this.link, "_blank");
    }
  }

}
