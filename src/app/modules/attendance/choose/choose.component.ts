import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventEmitter } from 'events';
import { takeUntil } from 'rxjs/operators';
import { Table } from 'src/app/core/models/table.model';
import { AlertService, AlertType } from 'src/app/core/services/alert.service';
import { Unsubscrable } from 'src/app/shared/common';

import { AttendanceService } from './../../../core/services/attendance.service';
import { CommunicationService } from './../../../core/services/communication.service';
import { ChooseOption } from './choose';

@Component({
  selector: 'app-choose',
  templateUrl: './choose.component.html',
  styleUrls: ['./choose.component.scss']
})
export class ChooseComponent extends Unsubscrable implements OnInit {

  @Output() serviceChange = new EventEmitter();

  private encryptedCompanyId: string;
  private encryptedTableId: string;

  table: Table;
  options: ChooseOption[];

  constructor(
    private attendanceService: AttendanceService,
    private alertService: AlertService,
    private communicationService: CommunicationService,
    route: ActivatedRoute
  ) {
    super();

    this.encryptedCompanyId = route.snapshot.params.companyId;
    this.encryptedTableId = route.snapshot.params.tableId;
  }

  ngOnInit() {
    this.attendanceService.get(this.encryptedCompanyId, this.encryptedTableId)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res) => {
          this.table = res.service.table;
          this.options = res.options;

          this.communicationService.emitChange(res.service);
        },
        () => {
          this.alertService.open('Houve um erro ao carregar as opções. Por favor solicite ajuda ao atendente.', AlertType.ERROR);
        }
      );
  }

  onToggleChange(option: ChooseOption) {
    option.isAvailable = !option.isAvailable;
  }
}
