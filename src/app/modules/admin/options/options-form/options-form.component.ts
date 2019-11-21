import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, take, takeUntil } from 'rxjs/operators';
import { Option } from 'src/app/core/models/option.model';
import { AlertService } from 'src/app/core/services/alert.service';
import { OptionService } from 'src/app/core/services/option.service';
import { UploadFileService } from 'src/app/core/services/upload-file.service';
import { FormComponent, Message } from 'src/app/shared/common';
import { FormHelper } from 'src/app/shared/form-helper';
import { filterResponse, uploadProgress } from 'src/app/shared/rxjs-operators';

import { DialogComponent } from './../../../../shared/components/dialog/dialog.component';

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
export class OptionsFormComponent extends FormComponent implements OnInit {
    @ViewChild('fileInput', { static: true }) fileInput: any;

    public progressUploadImage = 0;
    public isUploadingImage = false;

    suggestedOptions: SuggestedOption[];
    options: SuggestedOption[] = [];

    formGroup: FormGroup = new FormGroup({
        name: new FormControl(),
        description: new FormControl(),
        ingredients: new FormControl(),
        image: new FormControl(),
        active: new FormControl(true)
    });

    modelId: number;
    autocompleteIsActive = false;

    protected file: File = null;
    protected image: string;

    constructor(
        alertService: AlertService,
        protected optionService: OptionService,
        protected router: Router, route: ActivatedRoute,
        protected uploadFileService: UploadFileService,
        protected dialog: MatDialog,
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
                this.image = res.image;
            });
        } else {
          this.autocompleteIsActive = true;
        }

        this.startAutoComplete();
    }

    protected startAutoComplete() {
      this.formGroup.get('name').valueChanges
          .pipe(
            debounceTime(500),
            distinctUntilChanged(),
            startWith('')
          ).subscribe(this.loadSuggestedOptions.bind(this));
    }

    protected loadSuggestedOptions(value: string) {
      if (!value || typeof value === 'object' || value.length < 3) {
        return [];
      }

      const filterValue = value.toLowerCase();

      this.optionService.getSuggestions(filterValue)
        .pipe(take(1))
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data) => {
          this.suggestedOptions = data.items.map((item) => {
            return { id: item.id, name: item.name, ingredients: item.ingredients };
          });
        });
    }

    onOptionSelected(data: any) {
      this.suggestedOptions = [];

      setTimeout(() => {
        const dialogRef = this.dialog.open(DialogComponent, {
          width: '500px',
          data: {
            message: 'Gostaria de importar os ingredientes?'
          }
        });

        dialogRef.afterClosed()
          .subscribe(result => {
            if (result) {
              this.formGroup.get('ingredients').setValue(data.option.value ? data.option.value.ingredients : '');
            }
          });
      }, 500);
    }

    displayOption(option: SuggestedOption) {
      return option ? option.name : undefined;
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

    protected save(close?: boolean) {
      const option = new Option();
      option.deserialize(FormHelper.getValuesFromFormGroup(this.formGroup));

      // Ensure name is a string
      if (typeof option.name === 'object') {
        // tslint:disable-next-line: no-string-literal
        option.name = option.name['name'];
      }

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

    protected upload(): Observable<any> {
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
