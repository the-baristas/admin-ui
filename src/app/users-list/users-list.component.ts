import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Page } from '../entities/page';
import { User } from '../entities/user';
import { UsersService } from '../services/users.service';
import { UserDeleteModalComponent } from '../user-delete-modal/user-delete-modal.component';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
    public users: User[] = [];

    updateUserForm!: FormGroup;
    public editUser: User = {} as User;
    public userIdToDelete!: number;

    totalUsers!: number;
    currentPage!: Page<User>;
    pageSize = 10;
    pageNumber!: number;

    searchUsersForm!: FormGroup;
    searchString!: string;

    constructor(
        private usersService: UsersService,
        private modalService: NgbModal,
        private formBuilder: FormBuilder
    ) {}

    private modalRef!: NgbModalRef;
    errMsg: any;
    closeResult: any;
    public action: String = '';

    ngOnInit() {
      this.initializeForms();
      this.getUsers(0, this.pageSize);
    }

  public getUsers(page: number, size: number): void {
    if (this.searchUsersForm.value.searchString) {
      this.handleSearch(page, size);
    }
    else {
            this.usersService.getAllUsers(page, size).subscribe(
        (response: Page<User>) => {
          this.currentPage = response;
          this.pageNumber = response.number + 1;
          this.users = response.content;
          this.totalUsers = response.totalElements;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
      
  }

  createUser() {
        this.usersService.createUser(this.updateUserForm.value).subscribe(
          (response: any) => {

            this.modalRef.close();
            this.updateUserForm.reset();
            alert('User created successfully');
            this.searchUsers();
            },
          (error: Error) => {
            alert(error);
          }
        );
    }

    updateUser() {
        this.usersService
            .updateUser(this.updateUserForm.value, this.editUser.userId)
            .subscribe(
              (response: any) => {
                this.getUsers(this.currentPage.number, this.pageSize);
                this.modalRef.close();
                alert('User updated successfully');
              },
                (error: HttpErrorResponse) => {
                  alert(error);
              }
            );
    }

    openModal(modal: any, user: any) {
        this.updateUserForm.reset();

        if (user != null) {
            this.action = 'Edit';
            this.editUser = user;
            this.updateUserForm.patchValue({ givenName: user.givenName });
            this.updateUserForm.patchValue({ familyName: user.familyName });
            this.updateUserForm.patchValue({ email: user.email });
            this.updateUserForm.patchValue({ username: user.username });
            this.updateUserForm.patchValue({ password: user.password });
            this.updateUserForm.patchValue({ phone: user.phone });
            this.updateUserForm.patchValue({ role: user.role });
            this.updateUserForm.patchValue({ active: user.active });
        } else {
            this.action = 'Add';
            this.updateUserForm.patchValue({
                role: 'ROLE_CUSTOMER',
                active: true
            });
        }
        this.modalRef = this.modalService.open(modal);
        this.modalRef.result.then((result) => {
            this.errMsg = '';
            this.closeResult = 'Close with ${result}';
        });
  }

  public userModalPerformAction() {
    if (this.action === 'Add') {
      this.createUser();
    } else {
      //then this.action is "Edit"
      this.updateUser();
    }
  }

    setPage(page: number) {
        if (page < 1 || page > this.currentPage.totalPages) {
            return;
        } else {
            this.getUsers(page - 1, this.pageSize);
        }
    }

    initializeForms() {
        this.searchUsersForm = new FormGroup({
            searchString: new FormControl(this.searchString, [
                Validators.maxLength(45)
            ])
        });

        this.updateUserForm = new FormGroup({
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
            role: new FormControl(''),
            active: new FormControl('')
        });
    }

  searchUsers() {
    
        if (this.searchUsersForm.value.searchString === '')
        {
          this.getUsers(0, this.pageSize);
          return;
        }
        else if (this.searchUsersForm.value.searchString.length < 3)
          return;
        else {
            this.users = [];
        }
      
      this.handleSearch(0,this.pageSize);
  }

  handleSearch(page: number, size: number) {
    this.usersService.findUsersBySearchTerm(this.searchUsersForm.value.searchString, page, size).subscribe(
      (response: Page<User>) => {
        this.currentPage = response;
        this.pageNumber = response.number + 1;
        this.users = response.content;
        this.totalUsers = response.totalElements;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }

    clearSearchForm() {
        this.searchUsersForm.reset();
        this.searchUsersForm.value.searchString = '';
        this.searchUsers();
    }

    openDeleteModal(modal: any, userId: number) {
        let delModalRef = this.modalService.open(UserDeleteModalComponent, {
            centered: true
        });
        delModalRef.componentInstance.userIdToDelete = userId;

        delModalRef.result.then((result) => {
            if (result === 1) {
                //if there's only one element left on the page we delete from, then we should be sent to the previous page
                if (this.currentPage.numberOfElements > 1)
                    this.getUsers(this.currentPage.number, this.pageSize);
                else this.getUsers(this.currentPage.number - 1, this.pageSize);
                this.errMsg = '';
                this.closeResult = 'Close with ${result}';
            }
        });
    }

    closeModal() {
        this.modalRef.close();
    }

    get updateUserFormControls() {
        return this.updateUserForm.controls;
    }
}
