import { Component, OnInit } from '@angular/core';
import { Route } from '../entities/route';
import { RouteService } from '../services/routes.service';
import { PagerService } from '../services/pager.service';
import {
    FormBuilder,
    FormGroup,
    FormControl,
    Validators
} from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse } from '@angular/common/http';
import { RouteConfigLoadEnd } from '@angular/router';

@Component({
    selector: 'app-route-list',
    templateUrl: './route-list.component.html',
    styleUrls: ['./route-list.component.css']
})
export class RouteListComponent implements OnInit {
    foundRoutes: Route[] = [];
    foundRoutePages!: Route[];

    updateRouteForm!: FormGroup;
    public editRoute!: Route;

    addRouteForm!: FormGroup;
    public newRoute!: Route;

    totalRoutes!: number;
    pager: any = {};
    pagedRoutes!: any[];

    searchRoutesForm!: FormGroup;
    searchOrigin!: string;
    searchDestination!: string;

    confirmation!: boolean;

    constructor(
        private routeService: RouteService,
        private modalService: NgbModal,
        private pagerService: PagerService,
        private formBuilder: FormBuilder
    ) {}

    private modalRef!: NgbModalRef;
    errMsg: any;
    closeResult: any;

    ngOnInit(): void {
        this.getRoutes();
        this.initializeForms();
    }

    updateForm(): void {
        this.updateRouteForm.patchValue({
            originId: this.editRoute.originAirport.iataId,
            destinationId: this.editRoute.destinationAirport.iataId,
            isActive: this.editRoute.isActive
        });
    }

    public getRoutes(): void {
        this.routeService.getAllRoutes().subscribe(
            (response: Route[]) => {
                this.foundRoutes = response;
                this.totalRoutes = this.foundRoutes.length;
                this.setPage(1);
                console.log(this.foundRoutes);
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            }
        );
    }

    public onUpdateRoute() {
        this.routeService.updateRoute(this.editRoute as Route).subscribe(
            (response: any) => {
                this.routeService.getRoute(response);
                this.getRoutes();
                this.modalRef.close();
            },
            (error: HttpErrorResponse) => {
                if (error.status === 404) {
                    alert('One or more fields are invalid.');
                } else if (error.status === 409) {
                    alert('Route already exists.');
                } else if (error.status === 500) {
                    alert('Internal Server Error! Try again later.');
                }
            }
        );
    }

    public onAddRoute() {
        this.routeService.addRoute(this.addRouteForm.value as Route).subscribe(
            (response: any) => {
                this.routeService.getRoute(response);
                this.getRoutes();
                this.modalRef.close();
            },
            (error: HttpErrorResponse) => {
                if (error.status === 404) {
                    alert('One or more fields are invalid.');
                }
            }
        );
    }

    public onDeleteRoute() {
        this.confirmation = confirm(
            'Are you sure you want to delete this route? (For auditing purposes, routes should be disabled rather than deleted.'
        );

        if (this.confirmation === true) {
            console.log(this.editRoute.id);
            this.routeService.deleteRoute(this.editRoute.id).subscribe(
                (response: any) => {
                    this.getRoutes();
                    this.modalRef.close();
                },
                (error: HttpErrorResponse) => {
                    if (error.status === 204) {
                        alert('Deleted Successfully!');
                    }
                }
            );
        }
    }

    open(content: any, obj: any) {
        if (obj != null) {
            this.editRoute = obj;
            console.log(this.updateRouteForm);
            this.updateForm();
            this.updateRouteForm.valueChanges.subscribe((route: Route) => {
                Object.assign(this.editRoute, route);
            });
        }
        this.modalRef = this.modalService.open(content);
        this.modalRef.result.then(
            (result) => {
                this.errMsg = '';
                this.closeResult = 'Close with ${result}';
            },
            (reason) => {
                this.errMsg = '';
                this.closeResult = 'Dismissed';
            }
        );
    }

    openTwo(content: any) {
        this.modalRef = this.modalService.open(content);
        this.modalRef.result.then(
            (result) => {
                this.errMsg = '';
                this.closeResult = 'Close with ${result}';
            },
            (reason) => {
                this.errMsg = '';
                this.closeResult = 'Dismissed';
            }
        );
    }

    setPage(pageNo: number) {
        if (pageNo < 1 || pageNo > this.totalRoutes) {
            return;
        }

        this.pager = this.pagerService.getPager(this.totalRoutes, pageNo, 10);
        this.pagedRoutes = this.foundRoutes.slice(
            this.pager.startIndex,
            this.pager.endIndex + 1
        );
    }

    /**  Method to initialize forms! */
    initializeForms() {
        this.updateRouteForm = new FormGroup({
            originId: new FormControl(''),
            destinationId: new FormControl(''),
            isActive: new FormControl('')
        });
        this.addRouteForm = new FormGroup({
            originId: new FormControl(this.newRoute),
            destinationId: new FormControl(this.newRoute),
            isActive: new FormControl(this.newRoute)
        });
        this.searchRoutesForm = new FormGroup({
            query: new FormControl('')
        });
    }

    searchRoutesByAirport() {
        if (this.searchRoutesForm.value.searchString === '') {
            let div: any = document.getElementById('searchByIdErrorMessage');
            div.style.display = 'none';
            this.getRoutes();
            return;
        }

        this.routeService
            .routeQuery(this.searchRoutesForm.value.query)
            .subscribe(
                (response: Route[]) => {
                    this.foundRoutes = response;
                    this.totalRoutes = this.foundRoutes.length;
                    this.setPage(1);
                    let div: any = document.getElementById(
                        'searchByIdErrorMessage'
                    );
                    div.style.display = 'none';
                },
                (error: HttpErrorResponse) => {
                    let div: any = document.getElementById(
                        'searchByIdErrorMessage'
                    );
                    div.style.display = 'block';
                }
            );
    }

    get updateRouteFormControls() {
        return this.updateRouteForm.controls;
    }
}
