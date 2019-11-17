import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { take, takeUntil } from 'rxjs/operators';
import { ServiceService } from 'src/app/core/services/service.service';
import { GridComponent } from 'src/app/shared/common';
import { mapToGridResponse } from 'src/app/shared/rxjs-operators';

import { AlertService } from './../../../../core/services/alert.service';
import { AuthService } from './../../../../core/services/auth.service';
import { Message } from './../../../../shared/common';
import { GRID_PAGINATION_LIMIT, GridState } from './../../../../shared/components/grid/grid';

@Component({
    selector: 'app-services-grid',
    templateUrl: './services-grid.component.html',
    styleUrls: ['./services-grid.component.scss']
})
export class ServicesGridComponent extends GridComponent implements OnInit {
    @ViewChild('actions', { static: true }) actions: TemplateRef<any>;
    @ViewChild('finished', { static: true }) finished: TemplateRef<any>;

    private gridState: GridState;

    constructor(private serviceService: ServiceService, private authService: AuthService, alertService: AlertService, private router: Router) {
        super(alertService);
    }

    ngOnInit() {
        // Grid settings
        this.grid = {
            columns: [
                {
                    name: 'started',
                    header: 'Criado',
                    binding: 'startAt',
                    headerCssClass: 'choice-grid-created-at-column',
                    rowCssClass: 'choice-grid-created-at-row',
                    sortId: 'startAt',
                    sortActive: true,
                    pipe: new DatePipe('en-US'),
                    pipeParams: 'dd/MM/yyyy HH:mm'
                },
                {
                    name: 'finish',
                    header: 'Finalizado',
                    binding: 'finishAt',
                    headerCssClass: 'choice-grid-created-at-column',
                    rowCssClass: 'choice-grid-created-at-row',
                    sortId: 'finishAt',
                    sortActive: true,
                    pipe: new DatePipe('en-US'),
                    pipeParams: 'dd/MM/yyyy HH:mm'
                },
                {
                    name: 'table',
                    header: 'Mesa',
                    binding: "table.name",
                    sortId: 'table.name',
                    sortActive: true,
                },
                {
                    name: 'finished',
                    header: 'Encerrado',
                    binding: this.finished,
                    sortActive: false,
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
                    column: 'finishAt',
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

    onAction(action: string, index: number, id: number) {
        switch (action) {
            case 'new': break;
            case 'edit': break;
            case 'delete': break;
        }
    }

    markServiceAsFinished(originalService: any) {
        this.busy = true;

        const service = originalService;
        service.finishAt = new Date();

        this.serviceService.put(service.id, service)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(() => {
                this.busy = false;

                this.emitSuccessMessage(Message.SUCCESSFUL_REGISTRY_EDITION);

                this.updateGridData(this.gridState);
            },
                error => this.emitErrorMessage(error)
            );
    }

    private updateGridData(state: GridState): void {
        this.busy = true;

        const params = this.parseGridStateToHttpParams(state);

        this.serviceService.query(params, 'table')
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
