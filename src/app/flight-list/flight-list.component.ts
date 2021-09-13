import { Component, OnInit } from '@angular/core';
import { Flight } from '../entities/flight';
import { FlightService } from '../services/flights.service';
import { RouteService } from '../services/routes.service';
import { AirplaneService } from '../services/airplane.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { Page } from '../entities/page';
import { Observable } from 'rxjs';
import { Route } from '../entities/route';
import { Airplane } from '../entities/airplane';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightComponent implements OnInit {

  flights: Flight[] = [];
  foundFlightPages!: Flight[];

  foundRoutes!: Route[];
  foundAirplanes!: Airplane[];

  updateFlightForm!: FormGroup;
  public editFlight!: Flight;
  updatedFlight!: Observable<Flight>;

  addFlightForm!: FormGroup;
  public newFlight!: Flight;

  totalFlights!: number;
  pager: any = {};
  currentPage!: Page<Flight>;
  totalElements: number = 0;
  page: number = 1;
  pageNumber: number = 1;
  pageSize: number = 10;

  searchFlightsForm!: FormGroup;
  searchOrigin!: string;
  searchDestination!: string;

  activeOnly: boolean = true;

  confirmation!: boolean;

  constructor(private flightService: FlightService, private routeService: RouteService, private airplaneService: AirplaneService, private modalService: NgbModal,
    private formBuilder: FormBuilder, private httpClient: HttpClient) { }

  private modalRef!: NgbModalRef;
  errMsg: any;
  closeResult: any;

  ngOnInit(): void {
    const pageIndex = this.pageNumber - 1;
    this.flightService
      .getFlightsPage(pageIndex, this.pageSize, this.activeOnly)
      .subscribe(
        (flightsPage: Page<Flight>) => {
          this.currentPage = flightsPage; // the page object
          this.pageNumber = flightsPage.number + 1;
          this.flights = flightsPage.content;
          this.totalFlights = flightsPage.totalElements;
        }
      );
    this.initializeForms();
    this.getData();
  }

  updateForm(): void {
    this.updateFlightForm.patchValue({
      airplaneId: this.editFlight.airplane.id,
      routeId: this.editFlight.route.id,
      departureTime: this.editFlight.departureTime,
      arrivalTime: this.editFlight.arrivalTime,
      departureGate: this.editFlight.departureGate,
      arrivalGate: this.editFlight.arrivalGate,
      firstReserved: this.editFlight.firstReserved,
      firstPrice: this.editFlight.firstPrice,
      businessReserved: this.editFlight.businessReserved,
      businessPrice: this.editFlight.businessPrice,
      economyReserved: this.editFlight.economyReserved,
      economyPrice: this.editFlight.economyPrice,
      isActive: this.editFlight.isActive
    });
  }

  public getData(): void {
    this.routeService.getAllRoutes().subscribe(
      (response: Route[]) => {
        this.foundRoutes = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
    this.airplaneService.findAll(0, 10).subscribe(
      (response: Page<Airplane>) => {
        this.foundAirplanes = response.content;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
  }

  public onUpdateFlight() {
    this.flightService.updateFlight(this.editFlight as Flight)
      .subscribe(
        (response: any) => {
          const pageIndex = this.pageNumber - 1;
          this.flightService.getFlight(response);
          this.flightService.getFlightsPage(pageIndex, this.pageSize, this.activeOnly)
            .subscribe(
              (flightsPage: Page<Flight>) => {
                this.currentPage = flightsPage;
                this.pageNumber = flightsPage.number + 1;
                this.flights = flightsPage.content;
                this.totalFlights = flightsPage.totalElements;
              });
          this.modalRef.close();
        },
        (error: HttpErrorResponse) => {
          if (error.status === 404) {
            alert("One or more fields are invalid.")
          }
          else if (error.status === 409) {
            alert("Flight already exists.")
          }
          else if (error.status === 500) {
            alert("Internal Server Error! Try again later.")
          }
        }
      );
  }

  public onAddFlight() {
    this.flightService.addFlight(this.addFlightForm.value as Flight)
      .subscribe(
        (response: any) => {
          const pageIndex = this.pageNumber - 1;
          this.updatedFlight = this.flightService.getFlight(response);
          this.flightService.getFlightsPage(pageIndex, this.pageSize, this.activeOnly)
            .subscribe(
              (flightsPage: Page<Flight>) => {
                this.currentPage = flightsPage;
                this.pageNumber = flightsPage.number + 1;
                this.flights = flightsPage.content;
                this.totalFlights = flightsPage.totalElements;
              });
          this.modalRef.close();
        },
        (error: HttpErrorResponse) => {

          if (error.status === 404) {
            alert("One or more fields are invalid.")
          }
        }
      );
  }

  public onDeleteFlight() {
    this.confirmation = confirm("Are you sure you want to delete this flight? (For auditing purposes, flights should be disabled rather than deleted.")

    if (this.confirmation === true) {
      this.flightService.deleteFlight(this.editFlight.id)
        .subscribe(
          (response: any) => {
            const pageIndex = this.pageNumber - 1;
            this.flightService.getFlightsPage(pageIndex, this.pageSize, this.activeOnly)
              .subscribe(
                (flightsPage: Page<Flight>) => {
                  this.currentPage = flightsPage;
                  this.pageNumber = flightsPage.number + 1;
                  this.flights = flightsPage.content;
                  this.totalFlights = flightsPage.totalElements;
                }
              );
            this.modalRef.close();
          },
          (error: HttpErrorResponse) => {
            if (error.status === 204) {
              alert("Deleted Successfully!")
            }
          }
        )
    }
  }

  open(content: any, obj: any) {
    if (obj != null) {
      this.editFlight = obj;
      this.updateForm();
      this.updateFlightForm.valueChanges.subscribe((flight: Flight) => {
        Object.assign(this.editFlight, flight);
      });
    }
    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then(
      (result) => {
        this.errMsg = "";
        this.closeResult = 'Close with ${result}';
      },
      (reason) => {
        this.errMsg = "";
        this.closeResult = 'Dismissed';
      }
    );
  }

  openTwo(content: any) {
    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then(
      (result) => {
        this.errMsg = "";
        this.closeResult = 'Close with ${result}';
      },
      (reason) => {
        this.errMsg = "";
        this.closeResult = 'Dismissed';
      }
    );
  }

  setPage(pageNo: number) {
    if (pageNo < 1 || pageNo > this.totalFlights) {
      return;
    }
    else {
      this.flightService.getFlightsPage(pageNo - 1, this.pageSize, this.activeOnly).subscribe(
        (flightsPage: Page<Flight>) => {
          this.currentPage = flightsPage;
          this.pageNumber = flightsPage.number + 1;
          this.flights = flightsPage.content;
          this.totalFlights = flightsPage.totalElements;
        }
      )
    }
  }

  initializeForms() {
    this.searchFlightsForm = new FormGroup(
      {
        searchOrigin: new FormControl(''),
        searchDestination: new FormControl('')
      });
    this.updateFlightForm = new FormGroup(
      {
        airplaneId: new FormControl(''),
        routeId: new FormControl(''),
        departureTime: new FormControl(''),
        arrivalTime: new FormControl(''),
        departureGate: new FormControl(''),
        arrivalGate: new FormControl(''),
        firstReserved: new FormControl(''),
        firstPrice: new FormControl(''),
        businessReserved: new FormControl(''),
        businessPrice: new FormControl(''),
        economyReserved: new FormControl(''),
        economyPrice: new FormControl(''),
        isActive: new FormControl('')

      });
    this.addFlightForm = new FormGroup(
      {
        airplaneId: new FormControl(this.newFlight),
        routeId: new FormControl(this.newFlight),
        departureTime: new FormControl(this.newFlight),
        arrivalTime: new FormControl(this.newFlight),
        departureGate: new FormControl(''),
        arrivalGate: new FormControl(''),
        firstReserved: new FormControl(this.newFlight),
        firstPrice: new FormControl(this.newFlight),
        businessReserved: new FormControl(this.newFlight),
        businessPrice: new FormControl(this.newFlight),
        economyReserved: new FormControl(this.newFlight),
        economyPrice: new FormControl(this.newFlight),
        isActive: new FormControl(this.newFlight)

      });
  }

  searchFlightsById() {
    if (this.searchFlightsForm.value.searchString === '') {
      let div: any = document.getElementById('searchByIdErrorMessage');
      div.style.display = "none";
      const pageIndex = this.pageNumber - 1;
      this.flightService.getFlightsPage(pageIndex, this.pageSize, this.activeOnly);
      return;
    }

    this.flightService.getFlight(parseInt(this.searchFlightsForm.value.searchString)).subscribe(
      (response: Flight) => {
        this.flights = [response];
        this.totalFlights = this.flights.length;
        let div: any = document.getElementById('searchByIdErrorMessage');
        div.style.display = "none";
      },
      (error: HttpErrorResponse) => {
        let div: any = document.getElementById('searchByIdErrorMessage');
        div.style.display = "block";
      }
    );
  }

  searchFlightsByLocation() {
    if (this.searchFlightsForm.value.searchOrigin === '' || this.searchFlightsForm.value.searchDestination === '') {
      let div: any = document.getElementById('searchByIdErrorMessage');
      div.style.display = "none";
      const pageIndex = this.pageNumber - 1;
      this.flightService.getFlightsPage(pageIndex, this.pageSize, this.activeOnly);
      return;
    }

    const pageIndex = this.pageNumber - 1;
    this.flightService.getFlightByLocation(this.searchFlightsForm.value.searchOrigin, this.searchFlightsForm.value.searchDestination, pageIndex, this.pageSize, this.activeOnly).subscribe(
      (flightsPage: Page<Flight>) => {
        this.currentPage = flightsPage;
        this.pageNumber = flightsPage.number + 1;
        this.flights = flightsPage.content;
        this.totalFlights = flightsPage.totalElements;
        let div: any = document.getElementById('searchByIdErrorMessage');
        div.style.display = "none";
      },
      (error: HttpErrorResponse) => {
        let div: any = document.getElementById('searchByIdErrorMessage');
        div.style.display = "block";
      }
    );
  }

  getActiveOrInactive(active: boolean) {
    if (active)
      return "Active";
    else
      return "Inactive";
  }

  handleActiveToggleChange() {
    if (this.searchFieldsFilled()) {
      this.searchFlightsByLocation();
    }
    else {
      this.flightService
        .getFlightsPage(0, this.pageSize, this.activeOnly)
        .subscribe(
          (flightsPage: Page<Flight>) => {
            this.currentPage = flightsPage; // the page object
            this.pageNumber = flightsPage.number + 1;
            this.flights = flightsPage.content;
            this.totalFlights = flightsPage.totalElements;
          }
        );
    }
  }

  searchFieldsFilled() {
    return this.searchFlightsForm.value.searchOrigin !== '' && this.searchFlightsForm.value.searchDestination !== ''
      && this.searchFlightsForm.value.searchOrigin !== null && this.searchFlightsForm.value.searchDestination !== null
  }

  get updateFlightFormControls() {
    return this.updateFlightForm.controls;
  }

}
