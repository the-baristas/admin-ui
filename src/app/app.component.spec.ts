import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { LoginService } from './services/login.service';

describe('AppComponent', () => {
    let loginServiceSpy: jasmine.SpyObj<LoginService>;

    beforeEach(async () => {
        loginServiceSpy = jasmine.createSpyObj('LoginService', [
            'loggedIn',
            'setPreviousPage'
        ]);
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [AppComponent],
            providers: [{ provide: LoginService, useValue: loginServiceSpy }]
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it('should render title', () => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('h1').textContent).toContain('Admin UI');
    });
});
