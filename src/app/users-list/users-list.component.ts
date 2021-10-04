import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Page } from '../entities/page';
import { User } from '../entities/user';
import { UsersService } from '../services/users.service';
import { UserDeleteModalComponent } from './user-delete-modal/user-delete-modal.component';
import { UserModalComponent } from './user-modal/user-modal.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  public users: User[] = [];

  public editUser: User = {} as User;
  public userIdToDelete!: number;

  totalUsers!: number;
  currentPage!: Page<User>;
  pageSize = 10;
  pageNumber!: number;

  searchUsersForm!: FormGroup;
  searchString!: string;
  activeOnly: boolean = true;

  now = Date.now();
  private currentTime: Date = new Date(Date.now());
  currentDate: string = `${this.currentTime.getFullYear()}-`;

  constructor(
    private usersService: UsersService,
    private modalService: NgbModal
  ) { }

  private modalRef!: NgbModalRef;
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
      this.usersService.getAllUsers(page, size, this.activeOnly).subscribe(
        (response: Page<User>) => {
          this.currentPage = response;
          this.pageNumber = response.number + 1;
          this.users = response.content;
          this.totalUsers = response.totalElements;
        },
        (error: HttpErrorResponse) => {
          alert(error);
        }
      );
    }

  }

  openModal(user: any) {

    let userModalRef = this.modalService.open(UserModalComponent, {
      centered: true
    });

    userModalRef.componentInstance.openModal(user);


    userModalRef.result.then((result) => {
      if (result === 1) {
        //if there's only one element left on the page we delete from, then we should be sent to the previous page
        if (this.currentPage.numberOfElements > 1)
          this.getUsers(this.currentPage.number, this.pageSize);
        else
          this.getUsers(this.currentPage.number - 1, this.pageSize);
      }
      else
        return;
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
      searchString: new FormControl(this.searchString, [
        Validators.maxLength(45)
      ]),
      activeOnly: new FormControl(this.activeOnly)
    });
  }

  searchUsers() {
    if (!this.searchUsersForm.value.searchString || this.searchUsersForm.value.searchString === '') {
      this.getUsers(0, this.pageSize);
      return;
    }
    else if (this.searchUsersForm.value.searchString?.length < 3)
      return;
    else {
      this.users = [];
    }

    this.handleSearch(0, this.pageSize);
  }

  handleSearch(page: number, size: number) {
    this.usersService.findUsersBySearchTerm(this.searchUsersForm.value.searchString, page, size, this.activeOnly).subscribe(
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

  handleActiveToggleChange() {
    this.searchUsers();
  }

  clearSearchForm() {
    this.searchUsersForm.reset();
    this.searchUsersForm.value.searchString = '';
    this.searchUsers();
  }

  openDeleteModal(userId: number) {
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
      }
    });
  }

  closeModal() {
    this.modalRef.close();
  }

  getActiveOrInactive(active: boolean) {
    if (active)
      return "Active";
    else
      return "Inactive";
  }
}
