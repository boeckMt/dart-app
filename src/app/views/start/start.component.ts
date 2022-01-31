import { Component, OnInit } from '@angular/core';
import { IGame, Game301, Player } from 'src/app/shared/utils';
import { MatDialog } from '@angular/material/dialog';
import { PlayerMenuComponent } from 'src/app/components/player-menu/player-menu.component';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
  title = "Dart"

  players: Player[] = [];
  games: IGame[] = [new Game301(true)];

  currentGame: IGame = null as any;
  constructor(public dialog: MatDialog) {
    const game = this.games.find(g => g.selected);
    if (game) {
      this.currentGame = game;
      this.players.push(...[new Player('Player 1', game), new Player('Player 2', game)])
    }
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
  }

}
