import { Component, OnInit } from '@angular/core';
import { Option } from 'src/app/core/models/option.model';
import { Services } from 'src/app/core/models/services.model';
import { Table } from 'src/app/core/models/table.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public openServices: Array<any> = new Array();

  constructor() {
    this.getData();
  }

  ngOnInit() {
  }

  getData() {
    let service = new Services();
    let table = new Table();
    let option1 = new Option();
    let option2 = new Option();
    let option3 = new Option();

    table.id = 1;
    table.name = 'Mesa 1';
    table.active = true;

    service.id = 1;
    service.start_at = new Date();
    service.finish_at = new Date();
    service.table = table;

    option1.id = 1;
    option1.name = 'Calabresa'
    option1.description = 'Pizza Grande';
    option1.image = 'https://t1.rg.ltmcdn.com/pt/images/9/8/3/img_pizza_calabresa_e_mussarela_4389_600.jpg';

    option2.id = 2;
    option2.name = 'Frango'
    option2.description = 'Pizza Grande';
    option2.image = 'https://www.receiteria.com.br/wp-content/uploads/receitas-de-pizza-de-frango-11.jpg';

    option3.id = 3;
    option3.name = 'Quatro Queijos'
    option3.description = 'Pizza Grande';
    option3.image = 'https://craftlog.com/m/i/1563829=s1280=h960';

    this.openServices.push({
      service: service,
      optionsDeclined: [option1, option2, option3]
    });

    service = new Services();
    table = new Table();

    table.id = 2;
    table.name = 'Mesa 2';
    table.active = true;

    service.id = 2;
    service.start_at = new Date();
    service.finish_at = new Date();
    service.table = table;

    this.openServices.push({
      service: service,
      optionsDeclined: [option1, option2, option3]
    });

    service = new Services();
    table = new Table();

    table.id = 3;
    table.name = 'Mesa 3';
    table.active = true;

    service.id = 3;
    service.start_at = new Date();
    service.finish_at = new Date();
    service.table = table;

    this.openServices.push({
      service: service,
      optionsDeclined: [option1, option2, option3]
    });

    service = new Services();
    table = new Table();

    table.id = 4;
    table.name = 'Mesa 4';
    table.active = true;

    service.id = 4;
    service.start_at = new Date();
    service.finish_at = new Date();
    service.table = table;

    this.openServices.push({
      service: service,
      optionsDeclined: [option1, option2, option3]
    });

    service = new Services();
    table = new Table();

    table.id = 5;
    table.name = 'Mesa 5';
    table.active = true;

    service.id = 5;
    service.start_at = new Date();
    service.finish_at = new Date();
    service.table = table;

    this.openServices.push({
      service: service,
      optionsDeclined: [option1, option2, option3]
    });

    service = new Services();
    table = new Table();

    table.id = 6;
    table.name = 'Mesa 6';
    table.active = true;

    service.id = 6;
    service.start_at = new Date();
    service.finish_at = new Date();
    service.table = table;

    this.openServices.push({
      service: service,
      optionsDeclined: [option1, option2, option3]
    });
  }
}
