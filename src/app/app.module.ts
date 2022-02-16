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

import { PlayerMenuComponent } from './components/player-menu/player-menu.component';
import { GameComponent } from './views/game/game.component';
import { AppRoutingModule } from './app-routing.module';

const material = [MatToolbarModule, MatIconModule, MatInputModule, MatSelectModule, MatButtonModule, MatDialogModule, MatCardModule];

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    PlayerMenuComponent,
    GameComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    ...material
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
