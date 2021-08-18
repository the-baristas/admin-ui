import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { FlightService } from '../../services/flights.service';

@Component({
  selector: 'app-flight-upload-button',
  templateUrl: './flight-upload-button.component.html',
  styleUrls: ['./flight-upload-button.component.css']
})
export class FlightUploadButtonComponent implements OnInit {

  private modalRef!: NgbModalRef;
  errMsg: any;
  closeResult: any;

  uploadForm!: FormGroup;
  file: any;

  constructor(private modalService: NgbModal, private flightService: FlightService) { }
  
  ngOnInit(): void {
    this.uploadForm = new FormGroup({
      file: new FormControl("", [
        Validators.required
      ]) 
    }); 
  }

  onFileChange(event: any): void {
    this.file = event.target.files[0]
  }

  onSubmitUpload() {
    this.flightService.uploadFlightCsv(this.file).subscribe((response: any) => {
      alert("File uploaded successfully.")
    },
      (error: Error) => {
        alert("Unable to upload file.")
      }
    )
    this.modalService.dismissAll();
  }

  openModal(modal: any) {
    this.modalRef = this.modalService.open(modal);
    this.modalRef.result.then((result) => {
      this.errMsg = '';
      this.closeResult = 'Close with ${result}';
    });
  }

  closeModal() {
    this.file = null;
    this.uploadForm.reset();
    this.modalRef.close();
  }

  uploadIsValid() {
    return this.uploadForm.valid && this.uploadForm.value.file.toString().endsWith(".csv")
  }
}
