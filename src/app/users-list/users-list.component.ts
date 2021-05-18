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
import { PagerService } from '../services/pager.service';
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
    searchStringId!: string;
    searchStringEmail: string = '';
    searchStringUsername: string = '';
    searchStringPhone: string = '';

    constructor(
        private usersService: UsersService,
        private modalService: NgbModal,
        private pagerService: PagerService,
        private formBuilder: FormBuilder
    ) {}

    private modalRef!: NgbModalRef;
    errMsg: any;
    closeResult: any;
    public action: String = '';

    ngOnInit() {
        this.getUsers(0, this.pageSize);
        this.initializeForms();
    }

    public getUsers(page: number, size: number): void {
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

    public userModalPerformAction() {
        if (this.action === 'Add') {
            this.createUser();
        } else {
            //then this.action is "Edit"
            this.updateUser();
        }
    }

    createUser() {
        this.usersService.createUser(this.updateUserForm.value).subscribe(
            (response: any) => {
                this.searchUsers();
                this.modalRef.close();
                this.updateUserForm.reset();
                alert('User created successfully');
            },
            (error: HttpErrorResponse) => {
                if (error.status === 404) {
                    alert('One or more fields are invalid.');
                } else if (error.status === 409) {
                    alert(
                        'Username, email, and/or phone number already exists.'
                    );
                }
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
                    if (error.status === 404) {
                        alert('One or more fields are invalid.');
                    } else if (error.status === 409) {
                        alert(
                            'Username, email, and/or phone number already exists.'
                        );
                    }
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

    setPage(page: number) {
        if (page < 1 || page > this.currentPage.totalPages) {
            return;
        } else {
            this.getUsers(page - 1, this.pageSize);
        }
    }

    initializeForms() {
        this.searchUsersForm = new FormGroup({
            searchStringId: new FormControl(this.searchStringId, [
                Validators.maxLength(45)
            ]),
            searchStringEmail: new FormControl(this.searchStringEmail, [
                Validators.minLength(1),
                Validators.email
            ]),
            searchStringUsername: new FormControl(this.searchStringUsername, [
                Validators.minLength(1),
                Validators.maxLength(45)
            ]),
            searchStringPhone: new FormControl(this.searchStringPhone, [
                Validators.minLength(1),
                Validators.maxLength(10)
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
        if (
            this.searchUsersForm.value.searchStringEmail === '' &&
            this.searchUsersForm.value.searchStringUsername === '' &&
            this.searchUsersForm.value.searchStringPhone === ''
        ) {
            this.getUsers(0, this.pageSize);
        } else {
            this.users = [];
        }

        this.searchByEmail();

        this.searchByUsername();

        this.searchByPhoneNumber();
    }

    searchByEmail() {
        if (this.searchUsersForm.value.searchStringEmail !== '')
            if (
                this.searchUsersForm.controls.searchStringEmail.dirty &&
                this.searchUsersForm.controls.searchStringEmail.errors === null
            ) {
                this.usersService
                    .getUserByEmail(
                        this.searchUsersForm.value.searchStringEmail
                    )
                    .subscribe(
                        (response: User) => {
                            this.users.push(response);
                            this.totalUsers = this.users.length;
                            this.pageNumber = 1;
                            let div: any = document.getElementById(
                                'searchByEmailErrorMessage'
                            );
                            div.style.display = 'none';
                        },
                        (error: HttpErrorResponse) => {
                            let div: any = document.getElementById(
                                'searchByEmailErrorMessage'
                            );
                            div.style.display = 'block';
                        }
                    );
            } else {
                let div: any = document.getElementById(
                    'searchByEmailErrorMessage'
                );
                div.style.display = 'none';
            }
    }

    searchByUsername() {
        if (this.searchUsersForm.value.searchStringUsername !== '')
            if (
                this.searchUsersForm.controls.searchStringUsername.dirty &&
                this.searchUsersForm.controls.searchStringUsername.errors ===
                    null
            ) {
                this.usersService
                    .getUserByUsername(
                        this.searchUsersForm.value.searchStringUsername
                    )
                    .subscribe(
                        (response: User) => {
                            this.users.push(response);
                            this.totalUsers = this.users.length;
                            this.pageNumber = 1;
                            let div: any = document.getElementById(
                                'searchByUsernameErrorMessage'
                            );
                            div.style.display = 'none';
                        },
                        (error: HttpErrorResponse) => {
                            let div: any = document.getElementById(
                                'searchByUsernameErrorMessage'
                            );
                            div.style.display = 'block';
                        }
                    );
            } else {
                let div: any = document.getElementById(
                    'searchByUsernameErrorMessage'
                );
                div.style.display = 'none';
            }
    }

    searchByPhoneNumber() {
        if (this.searchUsersForm.value.searchStringPhone !== '')
            if (
                this.searchUsersForm.controls.searchStringPhone.dirty &&
                this.searchUsersForm.controls.searchStringPhone.errors === null
            ) {
                this.usersService
                    .getUserByPhoneNumber(
                        this.searchUsersForm.value.searchStringPhone
                    )
                    .subscribe(
                        (response: User) => {
                            this.users.push(response);
                            this.totalUsers = this.users.length;
                            this.pageNumber = 1;
                            let div: any = document.getElementById(
                                'searchByPhoneErrorMessage'
                            );
                            div.style.display = 'none';
                        },
                        (error: HttpErrorResponse) => {
                            let div: any = document.getElementById(
                                'searchByPhoneErrorMessage'
                            );
                            div.style.display = 'block';
                        }
                    );
            } else {
                let div: any = document.getElementById(
                    'searchByPhoneErrorMessage'
                );
                div.style.display = 'none';
            }
    }

    clearSearchForm() {
        this.searchUsersForm.reset();
        this.searchUsersForm.value.searchStringEmail = '';
        this.searchUsersForm.value.searchStringUsername = '';
        this.searchUsersForm.value.searchStringPhone = '';
        this.searchUsers();
    }

    openDeleteModal(modal: any, userId: number) {
        let delModalRef = this.modalService.open(UserDeleteModalComponent, {
            centered: true
        });
        delModalRef.componentInstance.userIdToDelete = userId;

        delModalRef.result.then((result) => {
            if (result === 1) {
                console.log('result is ' + result);
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