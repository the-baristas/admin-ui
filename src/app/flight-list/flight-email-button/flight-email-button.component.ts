import { Component, Input, OnInit } from '@angular/core';
import { Flight } from '../../entities/flight';
import { FlightService } from '../../services/flights.service';

@Component({
  selector: 'app-flight-email-button',
  templateUrl: './flight-email-button.component.html',
  styleUrls: ['./flight-email-button.component.css']
})
export class FlightEmailButtonComponent implements OnInit {
  @Input('flight') flight!: Flight;
  buttonDisabled: boolean = false;

  constructor(private flightService: FlightService) { }

  ngOnInit(): void {
    this.setButtonDisabled();
  }

  onClickEmail(): void {
    this.handleSendEmail();
  }

  handleSendEmail(): void {
    this.flightService.emailAllBookedUsers(this.flight.id)
      .subscribe(
        (response: any) => {
        alert("Emails sent successfully.")
        },
        (error: Error) => {
          alert("Unable to send emails.")
        }
    )
  }

  setButtonDisabled(): void {
    this.buttonDisabled = (this.flight.businessReserved === 0) && (this.flight.economyReserved === 0)
      && (this.flight.firstReserved === 0);
  }

}
