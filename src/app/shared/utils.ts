import { checkoutTable } from './table';

export class Player {
  count: number;
  protected privName: string = '';
  protected privGame: IGame = null as any;
  set name(value: string) {
    this.privName = value;
  }
  get name() {
    return this.privName;
  }

  set game(value: IGame) {
    this.count = value.count;
    this.privGame = value;
  }

  get game() {
    return this.privGame;
  }
  constructor(name: string, game: IGame) {
    this.name = name;
    this.count = game.count;
  }
}

export class CheckoutTable {
  table = checkoutTable;

  get(value: number | string, v: 'v1' | 'v2' | 'v3' = 'v1') {
    const index = `${value}`;
    if (this.table[index]) {
      return this.table[index][v];
    } else {
      return null;
    }
  }
}

export interface IGame {
  count: number;
  name: string;
  selected: boolean;
}

export class Game301 implements IGame {
  count = 301;
  name = "301";
  constructor(public selected = false) {

  }
}

export class Game501 implements IGame {
  count = 501;
  name = "501";
  constructor(public selected = false) {

  }
}

const STORAGE_KEY = 'dart-app';
export function restorePlayers(): Player[] | null {
  const playersStr = localStorage.getItem(STORAGE_KEY);
  if (playersStr) {
    return JSON.parse(playersStr);
  } else {
    return null;
  }
}

export function savePlayers(players: Player[]) {
  const playersJson: { name: string, count: number }[] = [];
  players.forEach(p => {
    playersJson.push({ name: p.name, count: p.count });
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(playersJson));
}
