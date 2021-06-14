import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { PassengerAddModalComponent } from './passenger-add-modal.component';

describe('PassengerAddModalComponent', () => {
  let component: PassengerAddModalComponent;
  let fixture: ComponentFixture<PassengerAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PassengerAddModalComponent],
      imports: [HttpClientModule],
      providers: [NgbActiveModal, FormBuilder]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengerAddModalComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
