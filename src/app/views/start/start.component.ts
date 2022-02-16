import { Component, OnInit } from '@angular/core';
import { IGame, Game301, Player, Game501 } from 'src/app/shared/utils';
import { MatDialog } from '@angular/material/dialog';
import { PlayerMenuComponent } from 'src/app/components/player-menu/player-menu.component';
import { GameStateService } from 'src/app/services/game-state.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
  title = "Dart"

  players: Player[] = [];
  games: IGame[] = [new Game301(true), new Game501()];

  currentGame: IGame = null as any;
  constructor(public dialog: MatDialog, private gameState: GameStateService) {
    this.getSelectedGame();
    this.players.push(...[new Player('Player 1', this.currentGame), new Player('Player 2', this.currentGame)]);
    this.updateState();
  }

  getSelectedGame() {
    const game = this.games.find(g => g.selected);
    if (game) {
      this.currentGame = game;
    }
  }

  setGame(name: IGame['name']) {
    this.games.forEach(g => {
      if (g.name === name) {
        g.selected = true;
      } else {
        g.selected = false;
      }
    });
    this.getSelectedGame();
    this.players.forEach(p => {
      p.game = this.currentGame;
    });
    this.updateState();
  }

  updateState() {
    this.gameState.$players.next(this.players);
    this.gameState.$game.next(this.currentGame);
  }

  ngOnInit(): void {
  }

  startGame() {
    // this.currentGame;
  }

  openMenu(player: Player) {
    const dialogRef = this.dialog.open(PlayerMenuComponent, {
      width: '250px',
      data: { name: player.name, remove: true },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (typeof result === 'string') {
        player.name = result;
      } else if (typeof result === 'boolean') {
        if (result === true) {
          this.players = this.players.filter(p => p.name !== player.name);
        }
      }

    });
  }

  addPlayer() {
    const player = new Player(`Player ${this.players.length + 1}`, this.currentGame);
    this.players.push(player);
    this.updateState();
  }

}
