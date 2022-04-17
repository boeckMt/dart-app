import { Component, OnInit } from '@angular/core';
import { IGame, Game301, Player, Game501, savePlayers, restorePlayers } from 'src/app/shared/utils';
import { MatDialog } from '@angular/material/dialog';
import { PlayerMenuComponent } from 'src/app/components/player-menu/player-menu.component';
import { GameStateService } from 'src/app/services/game-state.service';
import { AddToHomeService } from 'src/app/services/add-to-home.service';
import { BehaviorSubject } from 'rxjs';

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

  isAddToHomeScreenEnabled$: BehaviorSubject<boolean> = null as never;

  constructor(public dialog: MatDialog, private gameState: GameStateService, private a2hs: AddToHomeService) {
    this.getSelectedGame();
    const storePlayers = restorePlayers();
    if (storePlayers) {
      storePlayers.forEach(p => {
        const player = new Player(p.name, this.currentGame)
        this.players.push(player);
      });
    } else {
      this.players.push(...[new Player('Player 1', this.currentGame), new Player('Player 2', this.currentGame)]);
    }

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
    this.isAddToHomeScreenEnabled$ = this.a2hs.deferredPromptFired;
  }

  showPrompt() {
    this.a2hs.showPrompt();
  }

  startGame() {
    savePlayers(this.players);
  }

  openMenu(player: Player) {
    const dialogRef = this.dialog.open(PlayerMenuComponent, {
      width: '250px',
      data: { name: player.name, remove: true },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (typeof result === 'string') {
        player.name = result;
      } else if (typeof result === 'boolean') {
        if (result === true) {
          // remove
          this.players = this.players.filter(p => p.name !== player.name);
          this.updateState();
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
