import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightUploadButtonComponent } from './flight-upload-button.component';

describe('FlightUploadButtonComponent', () => {
  let component: FlightUploadButtonComponent;
  let fixture: ComponentFixture<FlightUploadButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlightUploadButtonComponent],
      imports: [HttpClientTestingModule, HttpClientModule],
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

  it('should have Upload button', () => {
    let compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('#upload-button').textContent).toContain('Upload');
  });

  it('pressing upload button should open modal', () => {
    spyOn(component, 'openModal').and.callThrough();
    let button: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('#upload-button');

    button.click();
    expect(component.openModal).toHaveBeenCalled();
    expect(fixture.debugElement.nativeElement.querySelector("modal-body")).toBeDefined();
  });

});
