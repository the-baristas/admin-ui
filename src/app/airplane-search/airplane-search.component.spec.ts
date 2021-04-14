import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirplaneSearchComponent } from './airplane-search.component';

describe('AirplaneSearchComponent', () => {
  let component: AirplaneSearchComponent;
  let fixture: ComponentFixture<AirplaneSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirplaneSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirplaneSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
