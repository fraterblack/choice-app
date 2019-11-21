import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { take, takeUntil } from 'rxjs/operators';
import { OptionService } from 'src/app/core/services/option.service';
import { GridComponent } from 'src/app/shared/common';
import { mapToGridResponse } from 'src/app/shared/rxjs-operators';

import { AlertService } from './../../../../core/services/alert.service';
import { GridState } from './../../../../shared/components/grid/grid';
import { OptionsFormOnTheFlyComponent } from './../options-form/options-form-on-the-fly.component';

@Component({
  selector: 'app-options-new-from-suggestions',
  templateUrl: './options-new-from-suggestions.component.html',
  styleUrls: ['./options-new-from-suggestions.component.scss']
})
export class OptionsNewFromSuggestionsComponent extends GridComponent implements OnInit {
  @ViewChild('actions', { static: true }) actions: TemplateRef<any>;
  @ViewChild('used', { static: true }) used: TemplateRef<any>;

  private gridState: GridState;

  constructor(
    private optionService: OptionService,
    alertService: AlertService,
    private router: Router,
    private dialog: MatDialog) {
      super(alertService);
  }

  ngOnInit() {
      // Grid settings
      this.grid = {
          columns: [
              {
                  name: 'name',
                  header: 'Nome',
                  binding: 'name',
                  sortActive: true,
                  rowCssClass: 'suggestions-grid-name-row',
              },
              {
                  name: 'ingredients',
                  header: 'Ingredientes',
                  binding: 'ingredients',
                  rowCssClass: 'suggestions-grid-ingredients-row',
              },
              {
                  name: 'used',
                  header: 'Usado',
                  binding: this.used,
                  sortActive: true,
                  sortId: 'isUsage',
                  headerCssClass: 'choice-grid-check-column suggestions-grid-used-colum',
                  rowCssClass: 'suggestions-grid-used-row',
              },
              {
                  name: 'actions',
                  header: 'Ação',
                  binding: this.actions,
                  headerCssClass: 'suggestions-grid-action-column',
              }
          ],
          paging: {
              page: 1,
              limit: 50
          },
          sorting: {
              default: {
                  column: 'name',
                  direction: 'asc'
              }
          }
      };

      // Load data for the first time
      this.gridState = this.getQueryParamsFromGrid(this.grid);
      this.updateGridData(this.gridState);
  }

  onGridStateChange(state: GridState) {
      this.gridState = state;

      this.updateGridData(state);
  }

  onCreate(item) {
    const dialogRef = this.dialog.open(OptionsFormOnTheFlyComponent, {
      width: '900px',
      data: {
        name: item.name,
        ingredients: item.ingredients
      }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          item.isUsage = false;
        }
      });
  }

  private updateGridData(state: GridState): void {
      this.busy = true;

      const params = this.parseGridStateToHttpParams(state);

      this.optionService.querySuggestions(params)
          .pipe(mapToGridResponse())
          .pipe(
              take(1),
              takeUntil(this.ngUnsubscribe)
          )
          .subscribe((resp) => {
              this.busy = false;

              this.data.next(resp);
              this.data.asObservable();
          });
  }
}
