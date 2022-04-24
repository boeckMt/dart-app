import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GameStateService } from 'src/app/services/game-state.service';
import { CheckoutTable, IGame, Player } from 'src/app/shared/utils';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EndDialogComponent } from 'src/app/components/end-dialog/end-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  currentGame: IGame = null as any;
  players: Player[] = [];
  activePlayer: BehaviorSubject<number>;
  $activePlayer: Observable<number>;

  keyPad = {
    numbers: [
      { title: '1', action: () => { this.addNumber(1) } },
      { title: '2', action: () => { this.addNumber(2) } },
      { title: '3', action: () => { this.addNumber(3) } },
      { title: '4', action: () => { this.addNumber(4) } },
      { title: '5', action: () => { this.addNumber(5) } },
      { title: '6', action: () => { this.addNumber(6) } },
      { title: '7', action: () => { this.addNumber(7) } },
      { title: '8', action: () => { this.addNumber(8) } },
      { title: '9', action: () => { this.addNumber(9) } },
      { title: '0', action: () => { this.addNumber(0) } },
      {
        title: 'back', action: () => { this.removeLast() }
      },
      {
        title: '+', action: () => { this.addNumber('+') }
      }
    ],
    actions: [
      { title: 'OK', action: () => { this.addCount() } }

    ]
  };



  keyPadCountStr = '';
  keyPadCount = 0;
  maxCount = 3 * 60;


  checkoutTable = new CheckoutTable();
  constructor(private gameState: GameStateService, private router: Router, public dialog: MatDialog, private snackBar: MatSnackBar) {


    this.currentGame = this.gameState.$game.getValue();
    this.players = this.gameState.$players.getValue();
    if (!this.currentGame && !this.players.length) {
      this.router.navigate(['start']);
    }
    this.activePlayer = new BehaviorSubject(0);
    this.$activePlayer = this.activePlayer.asObservable();
  }

  addNumber(num: number | '+') {
    let tempCount = 0;
    let tempkeyPadCountStr = this.keyPadCountStr;
    if (this.keyPadCountStr.length) {
      if (num !== '+') {
        tempkeyPadCountStr += num;
      }
      const keyPadCount = this.keyPadCountStr2Count(tempkeyPadCountStr);
      tempCount = keyPadCount;
    }

    if (tempCount <= this.maxCount) {
      this.keyPadCountStr += num;
      const keyPadCount = this.keyPadCountStr2Count(this.keyPadCountStr);
      this.keyPadCount = keyPadCount;
    } else {
      this.snackBar.open(`${tempCount} looks not possible - max count: ${this.maxCount}`, 'close', { verticalPosition: 'bottom' });
    }
  }

  keyPadCountStr2Count(keyPadCountStr: string) {
    const keyPadCountArr = keyPadCountStr.split('+').map(i => parseInt(i)).filter(i => !isNaN(i));
    if (keyPadCountArr.length > 1) {
      return keyPadCountArr.reduce((p, c) => p + c, 0);
    } else if (keyPadCountArr.length === 1) {
      return keyPadCountArr[0];
    } else {
      return 0;
    }
  }


  removeLast() {
    this.keyPadCountStr = this.keyPadCountStr.slice(0, -1)
    if (this.keyPadCountStr.length > 0) {
      this.keyPadCount = parseInt(this.keyPadCountStr);
    } else {
      this.keyPadCount = 0;
    }

  }

  addCount() {
    const playerName = this.players[this.activePlayer.getValue()].name;
    this.players.find((p, index) => {
      if (p.name === playerName) {
        const newCount = p.count - this.keyPadCount;
        if (newCount > 0) {
          this.players[index].count = p.count - this.keyPadCount;
          this.nextPlayer(index);
        } else if (newCount === 0) {
          this.gameEnd(p);
        }
      }
    });
  }

  nextPlayer(index?: number) {
    let playerIndex;
    if (index) {
      playerIndex = index;
    } else {
      const playerName = this.players[this.activePlayer.getValue()].name;
      this.players.find((p, index) => {
        if (p.name === playerName) {
          playerIndex = index;
        }
      });
    }


    if (playerIndex || playerIndex === 0) {
      let newPlayer;
      if (playerIndex === this.players.length - 1) {
        newPlayer = 0
      } else {
        newPlayer = playerIndex + 1
      }
      this.setActivePlayer(newPlayer);
    }
  }

  setActivePlayer(newPlayer: number) {
    this.activePlayer.next(newPlayer);
    this.keyPadCount = 0;
    this.keyPadCountStr = '';
  }

  gameEnd(player: Player) {
    const dialogRef = this.dialog.open(EndDialogComponent, {
      width: '250px',
      data: { name: player.name },
    });

    dialogRef.afterClosed().subscribe(result => {
      const counts = this.players.map(p => p.count);
      const lastCount = Math.max(...counts);
      const lastPlayer = counts.indexOf(lastCount);

      this.players.forEach(p => p.count = this.currentGame.count);
      this.setActivePlayer(lastPlayer);
    });
  }

  isActivePLayerOrNext(index: number) {
    const activePlayer = this.activePlayer.getValue();
    const lastPLayer = this.activePlayer.getValue() - 1;

    if (index === activePlayer) {
      return true;
    } else if (activePlayer === 0 && index === activePlayer + 1) {
      return true;
    }
    else if (index === lastPLayer) {
      return true;
    } else {
      return false;
    }
  }

  isActivePLayer(index: number) {
    const activePlayer = this.activePlayer.getValue();
    return index === activePlayer;
  }

  getCheckout(count: number) {
    const arr = this.checkoutTable.get(count);
    if (Array.isArray(arr)) {
      return `<span>${arr[0] || ''}</span><span>${arr[1] || ''}</span><span>${arr[2] || ''}</span>`;
    };
    return false;
  }

  hasCheckout(count: number) {
    return (this.getCheckout(count)) ? true : false;
  }

  ngOnInit(): void {
  }


}
