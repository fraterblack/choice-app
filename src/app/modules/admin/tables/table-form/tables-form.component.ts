import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Table } from 'src/app/core/models/table.model';
import { AlertService } from 'src/app/core/services/alert.service';
import { TableService } from 'src/app/core/services/table.service';
import { FormComponent, Message } from 'src/app/shared/common';
import { FormHelper } from 'src/app/shared/form-helper';

@Component({
  selector: 'app-tables-form',
  templateUrl: './tables-form.component.html',
  styleUrls: ['./tables-form.component.scss']
})
export class TablesFormComponent extends FormComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({
    name: new FormControl(),
    active: new FormControl(true)
  });

  isImageLoading = false;
  imgQrCode: any;

  modelId: number;

  constructor(
    alertService: AlertService,
    private tableService: TableService,
    private router: Router, route: ActivatedRoute
  ) {
    super(alertService);

    this.modelId = route.snapshot.params.id;
  }

  ngOnInit() {
    if (this.modelId) {
      this.tableService.get(this.modelId)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((res) => {
          FormHelper.setFormGroupValues(this.formGroup, res);
        });

      this.isImageLoading = true;
      this.tableService.getQrCode(this.modelId)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data) => {
          this.createImageFromBlob(data);
          this.isImageLoading = false;
        }, error => {
          this.isImageLoading = false;
          this.emitErrorMessage(error);
        });
    }
  }

  onSave(close?: boolean) {
    if (!this.validateForm(this.formGroup)) {
      return;
    }

    return this.save(close);
  }

  private save(close?: boolean) {
    const table = new Table();
    table.deserialize(FormHelper.getValuesFromFormGroup(this.formGroup));

    let action$: Observable<any>;

    if (this.modelId) {
      action$ = this.tableService.put(this.modelId, table);
    } else {
      action$ = this.tableService.post(table);
    }

    action$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
        this.emitSuccessMessage(
          this.modelId
            ? Message.SUCCESSFUL_REGISTRY_EDITION
            : Message.SUCCESSFUL_REGISTRY_INSERTION);

        // When save & close
        if (close) {
          this.router.navigate([`/admin/tables`]);

          // When save only
        } else {
          // When is a new registry, redirect to update
          if (!this.modelId) {
            this.router.navigate([`/admin/tables/update/${res.id}`]);
          }
        }
      },
        error => this.emitErrorMessage(error)
      );
  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.imgQrCode = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  onCancel() {
    this.router.navigate([`/admin/tables`]);
  }
}
