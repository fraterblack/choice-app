import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { take, takeUntil } from 'rxjs/operators';
import { GridComponent } from 'src/app/shared/common';
import { mapToGridResponse } from 'src/app/shared/rxjs-operators';

import { AlertService } from './../../../../core/services/alert.service';
import { AuthService } from './../../../../core/services/auth.service';
import { Message } from './../../../../shared/common';
import { GRID_PAGINATION_LIMIT, GridState } from './../../../../shared/components/grid/grid';
import { TableService } from 'src/app/core/services/table.service';

@Component({
    selector: 'app-table-grid',
    templateUrl: './table-grid.component.html',
    styleUrls: ['./table-grid.component.scss']
})
export class TableGridComponent extends GridComponent implements OnInit {
    @ViewChild('actions', { static: true }) actions: TemplateRef<any>;
    @ViewChild('active', { static: true }) active: TemplateRef<any>;

    private gridState: GridState;

    constructor(private tableService: TableService, private authService: AuthService, alertService: AlertService, private router: Router) {
        super(alertService);
    }

    ngOnInit() {
        // Grid settings
        this.grid = {
            columns: [
                {
                    name: 'created',
                    header: 'Criado',
                    binding: 'createdAt',
                    headerCssClass: 'choice-grid-created-at-column',
                    rowCssClass: 'choice-grid-created-at-row',
                    sortId: 'createdAt',
                    sortActive: true,
                    pipe: new DatePipe('en-US'),
                    pipeParams: 'dd/MM/yyyy HH:mm'
                },
                {
                    name: 'name',
                    header: 'Nome',
                    binding: 'name',
                    sortActive: true
                },
                {
                    name: 'active',
                    header: 'Ativo',
                    binding: this.active,
                    sortActive: true,
                    sortId: 'active',
                    headerCssClass: 'choice-grid-check-column',
                },
                {
                    name: 'actions',
                    header: 'Ações',
                    binding: this.actions,
                    headerCssClass: 'choice-grid-actions-column',
                }
            ],
            paging: {
                page: 1,
                limit: GRID_PAGINATION_LIMIT
            },
            sorting: {
                default: {
                    column: 'name',
                    direction: 'asc'
                },
                additional: [
                    {
                        column: 'createdAt',
                        direction: 'desc'
                    }
                ]
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

    onAction(action: string, index: number, id: number) {
        switch (action) {
            case 'new':
                this.router.navigate([`/admin/tables/create`]);
                break;
            case 'edit':
                this.router.navigate([`/admin/tables/update/${id}`]);
                break;
            case 'delete':
                this.busy = true;

                this.tableService.delete(id)
                    .pipe(takeUntil(this.ngUnsubscribe))
                    .subscribe(() => {
                        this.busy = false;

                        this.emitSuccessMessage(Message.SUCCESSFUL_REGISTRY_DELETION);

                        this.updateGridData(this.gridState);
                    },
                        error => this.emitErrorMessage(error)
                    );
                break;
        }
    }

    private updateGridData(state: GridState): void {
        this.busy = true;

        const params = this.parseGridStateToHttpParams(state);

        this.tableService.query(params)
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
