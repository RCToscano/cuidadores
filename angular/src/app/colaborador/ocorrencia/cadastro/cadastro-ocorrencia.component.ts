import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Colaborador } from '../../models/colaborador.model';
import { ColaboradorService } from '../../colaborador.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ScrollToService } from 'ng2-scroll-to-el';
import { ColaboradorOcorrencia } from '../../models/colaborador-ocorrencia.model';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-colaborador-cadastro-ocorrencia',
  templateUrl: './cadastro-ocorrencia.component.html'
})
export class ColaboradorCadastroOcorrenciaComponent implements OnInit {

  @ViewChild('auto') auto;

  submitted = false;
  carregar = false;
  keyword = 'nome';
  uploadForm: FormGroup;
  searchControl: FormControl;
  colaboradores: Colaborador[];
  isLoading = false;
  message: string;
  messageType: string;

  constructor(private formBuilder: FormBuilder,
              private colaboradorService: ColaboradorService,
              private userService: UserService,
              private spinner: NgxSpinnerService,
              private scrollService: ScrollToService,
              private el: ElementRef) { }

  ngOnInit() {
    this.searchControl = this.formBuilder.control('', Validators.required);
    this.uploadForm = this.formBuilder.group({
      colaborador: this.searchControl,
      data: ['', Validators.required],
      ocorrencia: ['', Validators.required]
    });

    this.searchControl.valueChanges
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

      const ocorrencia = {} as ColaboradorOcorrencia;
      ocorrencia.dtInsert = this.uploadForm.controls.data.value;
      ocorrencia.idColaborador = this.uploadForm.controls.colaborador.value.id;
      ocorrencia.ocorrencia = this.uploadForm.controls.ocorrencia.value;
      ocorrencia.idUser = this.userService.user.idUser;

      this.colaboradorService.cadastrarOcorrencia(ocorrencia)
        .subscribe(
          res => {
            console.log(res);
            this.uploadForm.reset();
            this.messageType = 'success';
            this.message = 'Ocorrência cadastrada com sucesso';
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
