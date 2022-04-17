import { Component, HostListener } from '@angular/core';
import { AddToHomeService } from './services/add-to-home.service';
import { SwUpdateService } from './services/sw-update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dart-app';

  @HostListener('window:beforeinstallprompt', ['$event'])
  onEventFire(e: any) {
    this.a2hs.deferredPrompt = e;
    console.log('onEventFire', e)
  }

  constructor(
    private a2hs: AddToHomeService, private swUpdateSvc: SwUpdateService
  ) {
    this.swUpdateSvc.checkUpdates();
  }
}
