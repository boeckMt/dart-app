import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './views/game/game.component';
import { StartComponent } from './views/start/start.component';


const routes: Routes = [
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  {
    path: 'start',
    component: StartComponent,
    data: {
      title: 'Start',
    }
  },
  {
    // https://angular.io/api/router/RouterLink
    // https://angular.io/guide/router#link-parameters-array
    path: 'game',
    component: GameComponent,
    data: {
      title: 'Game',
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
