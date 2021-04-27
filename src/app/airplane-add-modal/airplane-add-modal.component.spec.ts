import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirplaneAddModalComponent } from './airplane-add-modal.component';

describe('AirplaneAddModalComponent', () => {
  let component: AirplaneAddModalComponent;
  let fixture: ComponentFixture<AirplaneAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirplaneAddModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirplaneAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
