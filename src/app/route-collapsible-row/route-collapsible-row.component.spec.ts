import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteCollapsibleRowComponent } from './route-collapsible-row.component';

describe('RouteCollapsibleRowComponent', () => {
  let component: RouteCollapsibleRowComponent;
  let fixture: ComponentFixture<RouteCollapsibleRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteCollapsibleRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteCollapsibleRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
