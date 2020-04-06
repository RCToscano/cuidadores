import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-usuario-consulta',
  templateUrl: './usuario-consulta.component.html'
})
export class UsuarioConsultaComponent implements OnInit {

  user: User;
  users: User[];
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  carregar = false;

  constructor(private userService: UserService,
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
      noDataAvailablePlaceholderText: "Nenhum usuário encontrado",
      itemsShowLimit: 5,
      allowSearchFilter: true
    };
  }

  ngOnInit() {
    this.carregar = true;
    this.spinner.show();

    this.userService.usuarios()
      .subscribe(
        res => {
          console.log(res);
          this.users = res;

          const temp = [];
          for (let variable of this.users) {
              const obj = {"id":variable.idUser,"nome":variable.nome}
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

    this.userService.consultaUsuarioId(1)
      .subscribe(
        res => {
          this.user = res;

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
