import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventEmitter } from 'events';
import { take, takeUntil } from 'rxjs/operators';
import { AlertService, AlertType } from 'src/app/core/services/alert.service';
import { Unsubscrable } from 'src/app/shared/common';

import { Service } from './../../../core/models/service.model';
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

  private encryptedTableId: string;

  service: Service;
  options: ChooseOption[];

  constructor(
    private attendanceService: AttendanceService,
    private alertService: AlertService,
    private communicationService: CommunicationService,
    route: ActivatedRoute
  ) {
    super();

    this.encryptedTableId = route.snapshot.params.tableId;
  }

  ngOnInit() {
    this.attendanceService.get(this.encryptedTableId)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res) => {
          this.service = res.service;
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

    this.attendanceService.setOptionStatus(
      this.encryptedTableId,
      option.product.id,
      this.service.id,
      option.isAvailable
    )
      .pipe(
        take(1),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(
        (res) => {},
        () => {
          this.alertService.open('Houve um erro ao gravar sua preferência. Por favor solicite ajuda ao atendente.', AlertType.ERROR);
        }
      );
  }
}
