import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StartComponent } from './views/start/start.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { PlayerMenuComponent } from './components/player-menu/player-menu.component';
import { GameComponent } from './views/game/game.component';
import { AppRoutingModule } from './app-routing.module';
import { EndDialogComponent } from './components/end-dialog/end-dialog.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CheckoutTableComponent } from './components/checkout-table/checkout-table.component';

const material = [MatToolbarModule, MatIconModule, MatInputModule, MatSelectModule, MatButtonModule, MatDialogModule, MatCardModule, MatSnackBarModule];

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    PlayerMenuComponent,
    GameComponent,
    EndDialogComponent,
    CheckoutTableComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    ...material,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
