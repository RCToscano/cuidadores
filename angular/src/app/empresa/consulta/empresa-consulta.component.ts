import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Empresa } from '../models/empresa.model';
import { EmpresaService } from '../empresa.service';


@Component({
  selector: 'app-empresa-consulta',
  templateUrl: './empresa-consulta.component.html'
})
export class EmpresaConsultaComponent implements OnInit {

  empresa: Empresa;
  users: Empresa[];
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  carregar = false;

  constructor(private empresaService: EmpresaService,
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
      noDataAvailablePlaceholderText: "Nenhuma empresa encontrada",
      itemsShowLimit: 5,
      allowSearchFilter: true
    };
  }

  ngOnInit() {
    this.carregar = true;
    this.spinner.show();

    this.empresaService.empresas()
      .subscribe(
        res => {
          console.log(res);
          this.users = res;

          const temp = [];
          for (let variable of this.users) {
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

    this.empresaService.consultaEmpresa(1)
      .subscribe(
        res => {
          this.empresa = res;

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
