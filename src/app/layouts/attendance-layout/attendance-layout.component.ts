import { Component } from '@angular/core';

import { CommunicationService } from './../../core/services/communication.service';

@Component({
  selector: 'app-attendance-layout',
  templateUrl: './attendance-layout.component.html',
  styleUrls: ['./attendance-layout.component.scss']
})
export class AttendanceLayoutComponent {
  tableName: string;

  constructor(communicationService: CommunicationService) {
    communicationService.changeEmitted$.subscribe(data => {
      this.tableName = data.table.name;
    });
  }
}
