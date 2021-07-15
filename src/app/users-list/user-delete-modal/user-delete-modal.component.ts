import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from '../../services/users.service';

@Component({
    selector: 'app-user-delete-modal',
    templateUrl: './user-delete-modal.component.html',
    styleUrls: ['./user-delete-modal.component.css']
})
export class UserDeleteModalComponent implements OnInit {
    userIdToDelete!: number;
    constructor(
        public activeModal: NgbActiveModal,
        private usersService: UsersService
    ) {}

    ngOnInit(): void {}

    deleteUser() {
        this.usersService.deleteUser(this.userIdToDelete).subscribe(
            (response: any) => {
                alert('Deleted successfully');
                this.activeModal.close(1);
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            }
        );
    }

    closeModal() {
        this.activeModal.close();
    }
}
