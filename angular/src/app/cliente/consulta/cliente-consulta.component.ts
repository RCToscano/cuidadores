import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../models/cliente.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cliente-consulta',
  templateUrl: './cliente-consulta.component.html'
})
export class ClienteConsultaComponent implements OnInit {

  cliente: Cliente;
  listCliente: Cliente[];
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  carregar = false;

  constructor(private clienteService: ClienteService,
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

    this.clienteService.listarCliente()

      .subscribe(
        res => {
          console.log(res);
          this.listCliente = res;

          // const temp = [];
          // for (let variable of this.colaboradores) {
          //     const obj = {"id":variable.id,"nome":variable.nome}
          //     temp.push(obj);
          // }
          //this.dropdownList = temp;
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

    // this.colaboradorService.consultaColaborador(1)
    //   .subscribe(
    //     res => {
    //       this.colaborador = res;
    //
    //       this.carregar = false;
    //       this.spinner.hide();
    //     },
    //     error => {
    //       console.log(error);
    //       this.carregar = false;
    //       this.spinner.hide();
    //     }
    //   );
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
