import { Component, OnInit } from '@angular/core';
import { GameStateService } from 'src/app/services/game-state.service';
import { IGame, Player } from 'src/app/shared/utils';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  currentGame: IGame = null as any;
  players: Player[] = [];
  constructor(private gameState: GameStateService) {
    this.currentGame = this.gameState.$game.getValue();
    this.players = this.gameState.$players.getValue();
  }

  ngOnInit(): void {
  }

}
