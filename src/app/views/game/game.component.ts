import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GameStateService } from 'src/app/services/game-state.service';
import { IGame, Player } from 'src/app/shared/utils';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  currentGame: IGame = null as any;
  players: Player[] = [];
  activePlayer: BehaviorSubject<Player['name']>;
  $activePlayer: Observable<Player['name']>;

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
      { title: '<-', action: () => { this.removeLast() } }
    ],
    actions: [
      { title: 'OK', action: () => { this.addCount() } }

    ]
  };



  keyPadCountStr = '';
  keyPadCount = 0;
  maxCount = 3 * 60;
  constructor(private gameState: GameStateService) {
    this.currentGame = this.gameState.$game.getValue();
    this.players = this.gameState.$players.getValue();
    this.activePlayer = new BehaviorSubject(this.players[0].name);
    this.$activePlayer = this.activePlayer.asObservable();
  }

  addNumber(num: number) {
    let tempCount = 0;
    if (this.keyPadCountStr.length) {
      tempCount = parseInt(this.keyPadCountStr + num);
    }
    console.log('newTempCount', tempCount)
    if (tempCount <= this.maxCount) {
      this.keyPadCountStr += num;
      this.keyPadCount = parseInt(this.keyPadCountStr);
      console.log('calcTempCount', this.keyPadCount)
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
    const playerName = this.activePlayer.getValue();
    this.players.find((p, index) => {
      if (p.name === playerName) {
        const newCount = p.count - this.keyPadCount;
        if (newCount >= 0) {
          this.players[index].count = p.count - this.keyPadCount;
        }
        this.nextPlayer(index);
      }
    });
  }

  nextPlayer(index?: number) {
    let playerIndex;
    if (index) {
      playerIndex = index;
    } else {
      const playerName = this.activePlayer.getValue();
      this.players.find((p, index) => {
        if (p.name === playerName) {
          playerIndex = index;
        }
      });
    }


    if (playerIndex || playerIndex === 0) {
      let newPlayer;
      if (playerIndex === this.players.length - 1) {
        newPlayer = this.players[0].name;
      } else {
        newPlayer = this.players[playerIndex + 1].name;
      }
      this.activePlayer.next(newPlayer);
      this.keyPadCount = 0;
      this.keyPadCountStr = '';
      console.log('newPlayer', newPlayer, playerIndex);
    }


  }

  ngOnInit(): void {
  }


}
