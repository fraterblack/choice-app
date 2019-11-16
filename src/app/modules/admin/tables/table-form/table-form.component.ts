import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AlertService } from 'src/app/core/services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormComponent, Message } from 'src/app/shared/common';
import { TableService } from 'src/app/core/services/table.service';
import { takeUntil } from 'rxjs/operators';
import { FormHelper } from 'src/app/shared/form-helper';
import { Table } from 'src/app/core/models/table.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-table-form',
    templateUrl: './table-form.component.html',
    styleUrls: ['./table-form.component.scss']
})
export class TableFormComponent extends FormComponent implements OnInit {
    formGroup: FormGroup = new FormGroup({
        name: new FormControl(),
        active: new FormControl(true)
    });

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

    onCancel() {
        this.router.navigate([`/admin/tables`]);
    }
}
