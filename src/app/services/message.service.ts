import { Injectable } from '@angular/core';
import { Subscription, timer } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MessageService {
    message: string = '';
    timerSubscription!: Subscription;

    add(message: string) {
        this.message = message;
        // TODO: Uncomment.
        // this.timerSubscription = timer(4000).subscribe(() => {
        //     this.clear();
        // })
    }

    clear() {
        this.message = '';
        this.timerSubscription.unsubscribe();
    }
}
