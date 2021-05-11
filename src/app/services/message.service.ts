import { Injectable } from '@angular/core';
import { Subscription, timer } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MessageService {
    message: string = '';
    timerSubscription!: Subscription;

    add(message: string) {
        this.message = message;
        this.timerSubscription = timer(4000).subscribe(() => {
            this.clear();
        })
    }

    clear() {
        this.message = '';
        this.timerSubscription.unsubscribe();
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> e2e98dbef79e118ea4118cfbdc61ad30802c56d4
