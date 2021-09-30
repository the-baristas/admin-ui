import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from '../../services/users.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/entities/user';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent implements OnInit {

  public action: String = '';

  userForm!: FormGroup;
  public user: User = {} as User;

  now = Date.now();
  private currentTime: Date = new Date(Date.now());
  currentDate: string = `${this.currentTime.getFullYear()}-`;

  constructor(
    public activeModal: NgbActiveModal,
    private usersService: UsersService
) {
  this.initializeForms();

}

  ngOnInit(): void {
    //this.initializeForms();
  }

  initializeForms() {

    this.userForm = new FormGroup({
      givenName: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(45)
      ]),
      familyName: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(45)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,4}$")
      ]),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(45)
      ]),
      password: new FormControl(''),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('1?\W*([2-9][0-8][0-9])\W*([2-9][0-9]{2})\W*([0-9]{4})(\se?x?t?(\d*))?')
      ]),
      dob: new FormControl('', [
        Validators.required
      ]),
      streetAddress: new FormControl('', [
        Validators.required
      ]),
      city: new FormControl('', [
        Validators.required
      ]),
      state: new FormControl('', [
        Validators.required,
        Validators.pattern("(A[LKSZR])|(C[AOT])|(D[EC])|(F[ML])|(G[AU])|(HI)|(I[DLNA])|(K[SY])|(LA)|(M[EHDAINSOT])|(N[EVHJMYCD])|(MP)|(O[HKR])|(P[WAR])|(RI)|(S[CD])|(T[NX])|(UT)|(V[TIA])|(W[AVIY])")
      ]),
      zip: new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]{5}(?:-[0-9]{4})?$")
      ]),
      role: new FormControl(''),
      active: new FormControl('')
    });
  }

  openModal(user: any) {
    this.userForm.reset();

    if (user != null) {
      this.action = 'Edit';
      this.user = user;
      this.userForm.patchValue({ givenName: user.givenName });
      this.userForm.patchValue({ familyName: user.familyName });
      this.userForm.patchValue({ email: user.email });
      this.userForm.patchValue({ username: user.username });
      this.userForm.patchValue({ password: user.password });
      this.userForm.patchValue({ phone: user.phone });
      this.userForm.patchValue({ role: user.role });
      this.userForm.patchValue({ active: user.active });
      this.userForm.patchValue({ dob: user.dob });
      this.userForm.patchValue({ streetAddress: user.streetAddress });
      this.userForm.patchValue({ city: user.city });
      this.userForm.patchValue({ state: user.state });
      this.userForm.patchValue({ zip: user.zip });
    } else {
      this.action = 'Add';
      this.userForm.patchValue({
        role: 'ROLE_CUSTOMER',
        active: true
      });
    }
  }

  //Called by submit button in modal
  public userModalPerformAction() {
    if (this.action === 'Add') {
      this.createUser();
    } else {
      //then this.action is "Edit"
      this.updateUser();
    }
  }

  createUser() {
    this.usersService.createUser(this.userForm.value).subscribe(
      (response: any) => {
        this.activeModal.close(1);
        this.userForm.reset();
        alert('User created successfully');
      },
      (error: Error) => {
        alert(error);
      }
    );
  }

  updateUser() {
    this.usersService
      .updateUser(this.userForm.value, this.user.userId)
      .subscribe(
        (response: any) => {
          this.activeModal.close(1);
          alert('User updated successfully');
        },
        (error: HttpErrorResponse) => {
          alert(error);
        }
      );
  }


  closeModal() {
    this.activeModal.close();
  }

  get userFormControls() {
    return this.userForm.controls;
  }

}
