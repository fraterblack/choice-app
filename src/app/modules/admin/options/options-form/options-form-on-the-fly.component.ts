import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert.service';
import { OptionService } from 'src/app/core/services/option.service';
import { UploadFileService } from 'src/app/core/services/upload-file.service';
import { Message } from 'src/app/shared/common';

import { Option } from './../../../../core/models/option.model';
import { FormHelper } from './../../../../shared/form-helper';
import { OptionsFormComponent } from './options-form.component';

export class SuggestedOption {
  id: number;
  name: string;
  ingredients: string;
}

@Component({
    selector: 'app-options-form',
    templateUrl: './options-form.component.html',
    styleUrls: ['./options-form.component.scss']
})
export class OptionsFormOnTheFlyComponent extends OptionsFormComponent {
    onTheFlyMode = true;

    constructor(
        alertService: AlertService,
        optionService: OptionService,
        router: Router, route: ActivatedRoute,
        uploadFileService: UploadFileService,
        dialog: MatDialog,

        private dialogRef: MatDialogRef<OptionsFormOnTheFlyComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any
    ) {
        super(alertService, optionService, router, route, uploadFileService, dialog);

        this.formGroup.get('name').setValue(data.name);
        this.formGroup.get('ingredients').setValue(data.ingredients);
    }

    protected startAutoComplete() {
      // Do nothing
    }

    protected save(close?: boolean) {
      const option = new Option();
      option.deserialize(FormHelper.getValuesFromFormGroup(this.formGroup));

      this.optionService.post(option)
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(res => {
              this.emitSuccessMessage(Message.SUCCESSFUL_REGISTRY_INSERTION);

              this.dialogRef.close(true);
          },
              error => this.emitErrorMessage(error)
          );
    }

    onCancel() {
      this.dialogRef.close(false);
    }
}
