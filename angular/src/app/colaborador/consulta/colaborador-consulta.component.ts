import { Component, OnInit } from '@angular/core';
import { ColaboradorService } from '../colaborador.service';
import { Colaborador } from '../models/colaborador.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-colaborador-consulta',
  templateUrl: './colaborador-consulta.component.html'
})
export class ColaboradorConsultaComponent implements OnInit {

  colaborador: Colaborador;
  colaboradores: Colaborador[];
  dropdownList: Array<Colaborador> = [];
  selectedItems: Array<Colaborador> = [];
  dropdownSettings = {};
  carregar = false;

  constructor(private colaboradorService: ColaboradorService,
              private spinner: NgxSpinnerService,
              private router: Router) {

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'nome',
      selectAllText: 'Marcar Todos',
      unSelectAllText: 'Desmarcar Todos',
      searchPlaceholderText: "Digite para procurar ...",
      noDataAvailablePlaceholderText: "Nenhum colaborador encontrado",
      itemsShowLimit: 5,
      allowSearchFilter: true
    };
  }

  ngOnInit() {
    this.carregar = true;
    this.spinner.show();

    this.colaboradorService.buscarColaboradores()
      .subscribe(
        res => {
          console.log(res);
          this.dropdownList = res;
          this.carregar = false;
          this.spinner.hide();
        },
        error => {
          console.log(error);
          this.carregar = false;
          this.spinner.hide();
        }
      );
  }

  onSubmit() {
    this.carregar = true;
    this.spinner.show();

    if(this.selectedItems.length == 1) {
      this.spinner.hide();
      this.carregar = false;
      this.router.navigate(['/colaborador/cadastro', this.selectedItems[0].id]);
    }
    else if(this.selectedItems.length > 1) {
        this.colaboradores = this.selectedItems;
        this.spinner.hide();
        this.carregar = false;
    }
    else {
      this.spinner.hide();
      this.carregar = false;
      this.colaboradores = this.dropdownList;
    }
  }

  onItemSelect(item: any) {
    console.log(item);
    this.selectedItems.push(item);
    console.log(this.selectedItems);
  }

  onDeSelect(item: any) {
    console.log(item);
    const index: number = this.selectedItems.indexOf(item.id);
    if (index !== -1) {
      this.selectedItems.splice(index, 1);
    }
  }

  onSelectAll(items: any) {
    console.log(items);
  }

}
