import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IGame, Player } from '../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  $players: BehaviorSubject<Player[]> = new BehaviorSubject([] as any);
  $game: BehaviorSubject<IGame> = new BehaviorSubject(null as any);
  constructor() { }
}
