import { Component, OnInit } from '@angular/core';
import { ColaboradorService } from '../colaborador.service';
import { Colaborador } from '../models/colaborador.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-colaborador-consulta',
  templateUrl: './colaborador-consulta.component.html'
})
export class ColaboradorConsultaComponent implements OnInit {

  colaborador: Colaborador;
  colaboradores: Colaborador[];
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  carregar = false;

  constructor(private colaboradorService: ColaboradorService,
              private spinner: NgxSpinnerService) {
    // this.selectedItems = [
    //   { item_id: 3, item_text: 'Pune' },
    //   { item_id: 4, item_text: 'Navsari' }
    // ];
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

    this.colaboradorService.colaboradores()
      .subscribe(
        res => {
          console.log(res);
          this.colaboradores = res;

          const temp = [];
          for (let variable of this.colaboradores) {
              const obj = {"id":variable.id,"nome":variable.nome}
              temp.push(obj);
          }
          this.dropdownList = temp;
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

    this.colaboradorService.consultaColaborador(1)
      .subscribe(
        res => {
          this.colaborador = res;

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
