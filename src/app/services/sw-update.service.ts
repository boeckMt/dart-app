import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate, UpdateAvailableEvent } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class SwUpdateService {

  constructor(private swUpdate: SwUpdate, private snackbar: MatSnackBar) {
  }

  checkUpdates() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe((event: UpdateAvailableEvent) => {
        // check Update

        // download Update
        this.swUpdate.activateUpdate().then(e => {
          // Update gets downloaded
          // `Current version is: ${event.current} - Update Available; ${event.available}`
          const snack = this.snackbar.open(`Update for the App Available`, 'Reload');
          const sub = snack.onAction().subscribe(() => {
            window.location.reload();
            sub.unsubscribe();
          });
        });
      });
      this.swUpdate.checkForUpdate();
    }
  }
}
