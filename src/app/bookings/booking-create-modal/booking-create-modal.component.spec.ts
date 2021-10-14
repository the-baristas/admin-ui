import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingCreateModalComponent } from './booking-create-modal.component';

describe('BookingAddModalComponent', () => {
    let component: BookingCreateModalComponent;
    let fixture: ComponentFixture<BookingCreateModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BookingCreateModalComponent],
            imports: [HttpClientModule],
            providers: [NgbActiveModal]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BookingCreateModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
