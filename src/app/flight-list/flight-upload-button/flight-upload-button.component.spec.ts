import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightUploadButtonComponent } from './flight-upload-button.component';

describe('FlightUploadButtonComponent', () => {
  let component: FlightUploadButtonComponent;
  let fixture: ComponentFixture<FlightUploadButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightUploadButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightUploadButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
