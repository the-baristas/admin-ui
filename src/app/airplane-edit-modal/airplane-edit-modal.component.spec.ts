import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirplaneEditModalComponent } from './airplane-edit-modal.component';

fdescribe('AirplaneEditModalComponent', () => {
  let component: AirplaneEditModalComponent;
  let fixture: ComponentFixture<AirplaneEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirplaneEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirplaneEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
