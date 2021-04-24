import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../entities/user';
import { PagerService } from '../services/pager.service';
import { UsersService } from '../services/users.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  public users: User[] = [];
  public editEmployee!: User;

  updateUserForm!: FormGroup;
  public editUser!: User;

  totalUsers!: number;
  pager: any = {};
  pagedUsers!: any[];

  searchUsersForm!: FormGroup;
  searchString!: string;

  constructor(private usersService: UsersService, private modalService: NgbModal,
    private pagerService: PagerService, private formBuilder: FormBuilder) { }

  private modalRef!: NgbModalRef;
  errMsg: any;
  closeResult: any;



  ngOnInit() {
    this.getUsers();
    this.initializeForms();
  }

  public getUsers(): void {
    this.usersService.getAllUsers().subscribe(
      (response: User[]) => {
        this.users = response;
        this.totalUsers = this.users.length;
        this.setPage(1);
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
  }

  public onUpdateUser() {
    this.usersService.updateUser(this.updateUserForm.value, this.updateUserForm.value.userId)
      .subscribe(
        (response: any) => {
          this.searchUsersById();
        },
        (error: HttpErrorResponse) => {
          
          if (error.status === 404) {
            alert("One or more fields are invalid.")
          }
          else if (error.status === 409) {
            alert("Username, email, and/or phone number already exists.")
          }
        }
      );
  }

  open(content: any, obj: any) {
    if (obj != null) {
      this.editUser = obj;
      this.updateUserForm = this.formBuilder.group(this.editUser);
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
    if (page < 1 || page > this.totalUsers) {
      return;
    }
    this.pager = this.pagerService.getPager(this.totalUsers, page, 10);
    this.pagedUsers = this.users.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    )
  }

  initializeForms() {
    this.searchUsersForm = new FormGroup(
      {
        searchString: new FormControl(this.searchString,
          [Validators.maxLength(45)])
      });
    this.updateUserForm = new FormGroup(
      {
        givenName: new FormControl(this.editUser, [Validators.required, Validators.minLength(1), Validators.maxLength(45)]),
        familyName: new FormControl(this.editUser, [Validators.required, Validators.minLength(1), Validators.maxLength(45)]),
        email: new FormControl(this.editUser, [Validators.required, Validators.email, Validators.maxLength(50)]),
        username: new FormControl(this.editUser, [Validators.required, Validators.minLength(1), Validators.maxLength(45)]),
        phone: new FormControl(this.editUser, [ Validators.required, Validators.maxLength(10)])

      });
  }

  searchUsersById() {
    if (this.searchUsersForm.value.searchString === '') {
      let div: any = document.getElementById('searchByIdErrorMessage');
      div.style.display = "none";
      this.getUsers();
      return;
    }

    this.usersService.getUserByUserId(Number.parseInt(this.searchUsersForm.value.searchString)).subscribe(
      (response: User) => {
        this.users = [response];
        this.totalUsers = this.users.length;
        this.setPage(1);
        let div: any = document.getElementById('searchByIdErrorMessage');
        div.style.display = "none";
      },
      (error: HttpErrorResponse) => {
        let div: any = document.getElementById('searchByIdErrorMessage');
        div.style.display = "block";
      }
    );
  }

  get updateUserFormControls() {
    return this.updateUserForm.controls;
  }

}
