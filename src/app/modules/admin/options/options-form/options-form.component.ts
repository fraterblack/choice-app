import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Option } from 'src/app/core/models/option.model';
import { AlertService } from 'src/app/core/services/alert.service';
import { OptionService } from 'src/app/core/services/option.service';
import { UploadFileService } from 'src/app/core/services/upload-file.service';
import { FormComponent, Message } from 'src/app/shared/common';
import { FormHelper } from 'src/app/shared/form-helper';
import { filterResponse, uploadProgress } from 'src/app/shared/rxjs-operators';

@Component({
    selector: 'app-options-form',
    templateUrl: './options-form.component.html',
    styleUrls: ['./options-form.component.scss']
})
export class OptionsFormComponent extends FormComponent implements OnInit {
    @ViewChild('fileInput', { static: true }) fileInput: any;

    public progressUploadImage = 0;
    public isUploadingImage = false;

    private file: File = null;
    private image: string;

    formGroup: FormGroup = new FormGroup({
        name: new FormControl(),
        description: new FormControl(),
        ingredients: new FormControl(),
        image: new FormControl(),
        active: new FormControl(true)
    });

    modelId: number;

    constructor(
        alertService: AlertService,
        private optionService: OptionService,
        private router: Router, route: ActivatedRoute,
        private uploadFileService: UploadFileService,
    ) {
        super(alertService);

        this.modelId = route.snapshot.params.id;
    }

    ngOnInit() {
        if (this.modelId) {
            this.optionService.get(this.modelId)
                .pipe(takeUntil(this.ngUnsubscribe))
                .subscribe((res) => {
                    FormHelper.setFormGroupValues(this.formGroup, res);

                    this.isUploadingImage = false;
                    // TODO: Aguardar BE retornar o nome correto do vídeo.
                    this.image = res.image;
                });
        }
    }

    onSave(close?: boolean) {
        if (!this.validateForm(this.formGroup)) {
            return;
        }

        // if (this.image) {
        //     return this.save(close);
        // }

        // this.isUploadingImage = true;

        // this.upload()
        //     .subscribe(res => {
        //         this.image = res.message;

        //         this.save(close);
        //     },
        //         (error) => {
        //             this.isUploadingImage = false;

        //             this.emitErrorMessage(error);
        //         }
        //     );

        return this.save(close);
    }

    private save(close?: boolean) {
        const option = new Option();
        option.deserialize(FormHelper.getValuesFromFormGroup(this.formGroup));

        let action$: Observable<any>;

        if (this.modelId) {
            action$ = this.optionService.put(this.modelId, option);
        } else {
            action$ = this.optionService.post(option);
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
                    this.router.navigate([`/admin/options`]);

                    // When save only
                } else {
                    // When is a new registry, redirect to update
                    if (!this.modelId) {
                        this.router.navigate([`/admin/options/update/${res.id}`]);
                    }
                }
            },
                error => this.emitErrorMessage(error)
            );
    }

    private upload(): Observable<any> {
        if (!this.file) {
            this.emitErrorMessage('Por favor, selecione um arquivo!');
            return;
        }

        return this.uploadFileService.post(this.file)
            .pipe(
                takeUntil(this.ngUnsubscribe),
                uploadProgress<any>(progress => {
                    this.progressUploadImage = progress;
                }),
                filterResponse<any>()
            );
    }

    onClickFileInputButton(): void {
        if (!this.modelId) {
            this.fileInput.nativeElement.click();
        }
    }

    onChangeFileInput(): void {
        const files: { [key: string]: File } = this.fileInput.nativeElement.files;
        this.file = files[0];
        this.progressUploadImage = 0;

        this.formGroup.get('image').patchValue(this.file ? this.file.name : '');
    }

    onCancel() {
        this.router.navigate([`/admin/options`]);
    }
}