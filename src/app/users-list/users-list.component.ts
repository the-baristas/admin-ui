import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../entities/user';
import { PagerService } from '../services/pager.service';
import { UsersService } from '../services/users.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Page } from '../entities/Page';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  public users: User[] = [];

  updateUserForm!: FormGroup;
  public editUser!: User;


  totalUsers!: number;
  currentPage!: Page<User>;
  pageSize = 10;
  pageNumber!: number;

  searchUsersForm!: FormGroup;
  searchStringId!: string;
  searchStringEmail: string = '';
  searchStringUsername: string = '';
  searchStringPhone: string = '';

  constructor(private usersService: UsersService, private modalService: NgbModal,
    private pagerService: PagerService, private formBuilder: FormBuilder) { }

  private modalRef!: NgbModalRef;
  errMsg: any;
  closeResult: any;
  public action: String = "";
  


  ngOnInit() {
    this.getUsers(0, this.pageSize);
    this.initializeForms();
  }

  public getUsers(page: number, size: number): void {
    this.usersService.getAllUsers(page, size).subscribe(
      (response: Page<User>) => {
        this.currentPage = response;
        this.pageNumber = response.number+1;
        this.users = response.content;
        this.totalUsers = response.totalElements;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
  }

  public onUpdateUser() {
    if (this.action === "Add") {
      this.usersService.createUser(this.updateUserForm.value)
        .subscribe(
          (response: any) => {
            this.searchUsers();
            this.modalRef.close();
            this.updateUserForm.reset();
          },
          (error: HttpErrorResponse) => {
            alert(error);
          }
        );
    }
    //else {
    //  this.usersService.updateUser(this.updateUserForm.value, this.updateUserForm.value.userId)
    //    .subscribe(
    //      (response: any) => {
    //        this.getUsers();
    //        this.modalRef.close();
    //      },
    //      (error: HttpErrorResponse) => {

    //        if (error.status === 404) {
    //          alert("One or more fields are invalid.")
    //        }
    //        else if (error.status === 409) {
    //          alert("Username, email, and/or phone number already exists.")
    //        }
    //      }
    //    );
    //}
    
  }

  open(content: any, obj: any) {
    if (obj != null) {
      this.action = "Edit";
      this.editUser = obj;
      this.updateUserForm = this.formBuilder.group(this.editUser);
    }
    else {
      this.action = "Add";
      this.updateUserForm.patchValue({role:'ROLE_CUSTOMER', active:true})
    }
    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then(
      (result) => {
        this.errMsg = "";
        this.closeResult = 'Close with ${result}';
      },
      (reason) => {
        this.errMsg = "";
        this.closeResult = 'Dismissed';
      }
    );
  }

  setPage(page: number) {
    if (page < 1 || page > this.currentPage.totalPages) {
      return;
    }
    else {
      this.getUsers(page - 1, this.pageSize)
    }
  }

  initializeForms() {
    this.searchUsersForm = new FormGroup(
      {
        searchStringId: new FormControl(this.searchStringId, [Validators.maxLength(45)]),
        searchStringEmail: new FormControl(this.searchStringEmail, [Validators.minLength(1), Validators.email]),
        searchStringUsername: new FormControl(this.searchStringUsername, [Validators.minLength(1), Validators.maxLength(45)]),
        searchStringPhone: new FormControl(this.searchStringPhone, [Validators.minLength(1), Validators.maxLength(10)])
      });

    this.updateUserForm = new FormGroup(
      {
        givenName: new FormControl(this.editUser, [Validators.required, Validators.minLength(1), Validators.maxLength(45)]),
        familyName: new FormControl(this.editUser, [Validators.required, Validators.minLength(1), Validators.maxLength(45)]),
        email: new FormControl(this.editUser, [Validators.required, Validators.email, Validators.maxLength(50)]),
        username: new FormControl(this.editUser, [Validators.required, Validators.minLength(1), Validators.maxLength(45)]),
        password: new FormControl(this.editUser, [Validators.required, Validators.minLength(1), Validators.maxLength(45)]),
        phone: new FormControl(this.editUser, [Validators.required, Validators.maxLength(10)]),
        role: new FormControl(this.editUser),
        active: new FormControl(this.editUser)
      });
  }

  searchUsers() {
    if (this.searchUsersForm.value.searchStringEmail === ''
      && this.searchUsersForm.value.searchStringUsername === ''
      && this.searchUsersForm.value.searchStringPhone === ''    ) {
      this.getUsers(0, this.pageSize);
    }
    else {
      this.users = [];
    }


    if (this.searchUsersForm.value.searchStringEmail !== '')
      this.searchByEmail();
    else {
      let div: any = document.getElementById('searchByEmailErrorMessage');
      div.style.display = "none";
    }

    if (this.searchUsersForm.value.searchStringUsername !== '')
      this.searchByUsername();
    else {
      let div: any = document.getElementById('searchByUsernameErrorMessage');
      div.style.display = "none";
    }

    if (this.searchUsersForm.value.searchStringPhone !== '')
      this.searchByPhoneNumber();
    else {
      let div: any = document.getElementById('searchByPhoneErrorMessage');
      div.style.display = "none";
    }
  }

  searchByEmail() {
    if (this.searchUsersForm.controls.searchStringEmail.dirty &&
      this.searchUsersForm.controls.searchStringEmail.errors === null) {
      this.usersService.getUserByEmail(this.searchUsersForm.value.searchStringEmail).subscribe(
        (response: User) => {
          this.users.push(response);
          this.totalUsers = this.users.length;
          this.pageNumber = 1;
          let div: any = document.getElementById('searchByEmailErrorMessage');
          div.style.display = "none";
        },
        (error: HttpErrorResponse) => {
          let div: any = document.getElementById('searchByEmailErrorMessage');
          div.style.display = "block";
        }
      );
    }
  }

  searchByUsername() {
    if (this.searchUsersForm.controls.searchStringUsername.dirty &&
      this.searchUsersForm.controls.searchStringUsername.errors === null) {
      this.usersService.getUserByUsername(this.searchUsersForm.value.searchStringUsername).subscribe(
        (response: User) => {
          this.users.push(response);
          this.totalUsers = this.users.length;
          this.pageNumber = 1;
          let div: any = document.getElementById('searchByUsernameErrorMessage');
          div.style.display = "none";
        },
        (error: HttpErrorResponse) => {
          let div: any = document.getElementById('searchByUsernameErrorMessage');
          div.style.display = "block";
        }
      );
    }
  }

  searchByPhoneNumber() {
    if (this.searchUsersForm.controls.searchStringPhone.dirty &&
      this.searchUsersForm.controls.searchStringPhone.errors === null) {
      this.usersService.getUserByPhoneNumber(this.searchUsersForm.value.searchStringPhone).subscribe(
        (response: User) => {
          this.users.push(response);
          this.totalUsers = this.users.length;
          this.pageNumber = 1;
          let div: any = document.getElementById('searchByPhoneErrorMessage');
          div.style.display = "none";
        },
        (error: HttpErrorResponse) => {
          let div: any = document.getElementById('searchByPhoneErrorMessage');
          div.style.display = "block";
        }
      );
    }
  }
  clearSearchForm() {
    this.searchUsersForm.reset();
    this.searchUsersForm.value.searchStringEmail = '';
    this.searchUsersForm.value.searchStringUsername = '';
    this.searchUsersForm.value.searchStringPhone = '';
    this.searchUsers();
  }


  closeModal() {
    this.modalRef.close();
    this.updateUserForm.reset();
  }

  get updateUserFormControls() {
    return this.updateUserForm.controls;
  }

}
