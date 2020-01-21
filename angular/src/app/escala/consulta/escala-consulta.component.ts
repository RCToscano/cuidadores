import { Component, OnInit } from '@angular/core';
import '../../../assets/scripts/cuidadores.js';
import '../../../assets/scripts/datatables.js';
import '../../../assets/scripts/dataTables.fixedColumns.js';

@Component({
  selector: 'app-escala-consulta',
  templateUrl: './escala-consulta.component.html'
})
export class EscalaConsultaComponent implements OnInit {

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  dropdownList2 = [];
  selectedItems2 = [];
  dropdownSettings2 = {};

  constructor() {
    this.dropdownList = [
      { item_id: 1, item_text: 'ADALBERTO BAGGIO' },
      { item_id: 2, item_text: 'ADELE GLOGOWSKY' },
      { item_id: 3, item_text: 'ADLIZ SARTORELLI' },
      { item_id: 4, item_text: 'ADORACAO GIL CLIQUET DORA' },
      { item_id: 5, item_text: 'AFRA' },
      { item_id: 6, item_text: 'AGNES HORST PIMENTA' },
      { item_id: 7, item_text: 'ALCIDA ENI DEMETRIO MIRISOLA' },
      { item_id: 8, item_text: 'ALFREDO DO NASCIMENTO CANTEIRO' },
      { item_id: 9, item_text: 'AMELIA DE CARVALHO' }
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.dropdownList2 = [
      { item_id: 1, item_text: 'Ativo' },
      { item_id: 2, item_text: 'Inativo' },
      { item_id: 3, item_text: 'Suspenso' },
      { item_id: 4, item_text: 'Ativo Internado' },
      { item_id: 5, item_text: 'Ativo Viagem' },
      { item_id: 6, item_text: 'Prospect' }
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
    ];
    this.dropdownSettings2 = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  ngOnInit() {

  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }


}
