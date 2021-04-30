import { Component, OnInit } from '@angular/core';
import { Flight } from '../entities/flight';
import { FlightService } from '../services/flights.service';
import { PagerService } from '../services/pager.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse } from '@angular/common/http';
import { RouteConfigLoadEnd } from '@angular/router';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightComponent implements OnInit {

      foundFlights: Flight[] = [];

      updateFlightForm!: FormGroup;
      public editFlight!: Flight;

      addFlightForm!: FormGroup;
      public newFlight!: Flight;
    
      totalFlights!: number;
      pager: any = {};
      pagedFlights!: any[];
    
      searchFlightsForm!: FormGroup;
      searchOrigin!: string;
      searchDestination!: string;

      confirmation!: boolean;

      constructor(private flightService: FlightService, private modalService: NgbModal, 
        private pagerService: PagerService, private formBuilder: FormBuilder) { }
            
      private modalRef!: NgbModalRef;
      errMsg: any;
      closeResult: any;

      ngOnInit(): void {
        this.getFlights();
        this.initializeForms();
      }

      public getFlights(): void {
        this.flightService.getAllFlights().subscribe(
          (response: Flight[]) => {
            this.foundFlights = response;
            this.totalFlights = this.foundFlights.length;
            this.setPage(1);
            console.log(this.foundFlights);
          },
          (error: HttpErrorResponse) => {
            alert(error.message)
          }
        );
      }

      public onUpdateFlight() {
        this.flightService.updateFlight(this.updateFlightForm.value)
          .subscribe(
            (response: any) => {
              this.flightService.getFlight(response);
              this.getFlights();
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
        this.flightService.addFlight(this.addFlightForm.value)
          .subscribe(
            (response: any) => {
              this.flightService.getFlight(response);
              this.getFlights();
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
          console.log(this.updateFlightForm.value.id);
          this.flightService.deleteFlight(this.updateFlightForm.value.id)
          .subscribe(
            (response: any) => {
              this.getFlights();
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
          this.updateFlightForm = this.formBuilder.group(this.editFlight);
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

      setPage(page: number) {
        if (page < 1 || page > this.totalFlights) {
          return;
        }
        this.pager = this.pagerService.getPager(this.totalFlights, page, 10);
        this.pagedFlights = this.foundFlights.slice(
          this.pager.startIndex,
          this.pager.endIndex + 1
        )
      }

      initializeForms() {
        this.searchFlightsForm = new FormGroup(
          {
            searchOrigin: new FormControl(this.searchOrigin),
            searchDestination: new FormControl(this.searchDestination)
          });
        this.updateFlightForm = new FormGroup(
          {
            airplaneId: new FormControl(this.editFlight),
            routeId: new FormControl(this.editFlight),
            departureTime: new FormControl(this.editFlight),
            arrivalTime: new FormControl(this.editFlight),
            firstReserved: new FormControl(this.editFlight),
            firstPrice: new FormControl(this.editFlight),
            businessReserved: new FormControl(this.editFlight),
            businessPrice: new FormControl(this.editFlight),
            economyReserved: new FormControl(this.editFlight),
            economyPrice: new FormControl(this.editFlight),
            isActive: new FormControl(this.editFlight)
    
          });
          this.addFlightForm = new FormGroup(
            {
              airplaneId: new FormControl(this.newFlight),
              routeId: new FormControl(this.newFlight),
              departureTime: new FormControl(this.newFlight),
              arrivalTime: new FormControl(this.newFlight),
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
          this.getFlights();
          return;
        }
        
        this.flightService.getFlight(parseInt(this.searchFlightsForm.value.searchString)).subscribe(
          (response: Flight) => {
            this.foundFlights = [response];
            this.totalFlights = this.foundFlights.length;
            this.setPage(1);
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
          this.getFlights();
          return;
        }
    
        this.flightService.getFlightByLocation(this.searchFlightsForm.value.searchOrigin, this.searchFlightsForm.value.searchDestination).subscribe(
          (response: Flight[]) => {
            this.foundFlights = response;
            this.totalFlights = this.foundFlights.length;
            this.setPage(1);
            let div: any = document.getElementById('searchByIdErrorMessage');
            div.style.display = "none";
            console.log(this.foundFlights);
          },
          (error: HttpErrorResponse) => {
            let div: any = document.getElementById('searchByIdErrorMessage');
            div.style.display = "block";
          }
        );
      }

      get updateFlightFormControls() {
        return this.updateFlightForm.controls;
      }

}
