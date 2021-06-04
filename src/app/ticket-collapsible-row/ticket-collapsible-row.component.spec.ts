import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketCollapsibleRowComponent } from './ticket-collapsible-row.component';

describe('TicketCollapsibleRowComponent', () => {
  let component: TicketCollapsibleRowComponent;
  let fixture: ComponentFixture<TicketCollapsibleRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketCollapsibleRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketCollapsibleRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
