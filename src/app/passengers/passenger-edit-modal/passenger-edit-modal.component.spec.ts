import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { PassengerEditModalComponent } from './passenger-edit-modal.component';

describe('PassengerEditModalComponent', () => {
  let component: PassengerEditModalComponent;
  let fixture: ComponentFixture<PassengerEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PassengerEditModalComponent],
      imports: [HttpClientTestingModule],
      providers: [NgbActiveModal, FormBuilder]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengerEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
