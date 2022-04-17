import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddToHomeService {

  public deferredPromptFired$ = new BehaviorSubject<boolean>(false);
  public deferredPrompt: any;
  constructor() { }


  get deferredPromptFired() {
    this.deferredPromptFired$.next(!!this.deferredPrompt);
    return this.deferredPromptFired$;
  }

  public showPrompt() {
    if (this.deferredPrompt) {
      // will show prompt
      this.deferredPrompt.prompt();

      // Wait for the user to respond to the prompt
      this.deferredPrompt.userChoice.then((choiceResult: any) => {
        // outcome is either "accepted" or "dismissed"
        if (choiceResult.outcome === 'accepted') {
          // User accepted the A2HS prompt
          // send data to analytics
          // do whatever you want
          console.log(choiceResult);

        } else {
          // User dismissed the A2HS prompt
          // send data to analytics
          // do whatever you want
          console.log(choiceResult);

        }
        // we don't need this event anymore
        this.deferredPrompt = null;
        this.deferredPromptFired$.next(false);
      });

    }
  }
}
