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
