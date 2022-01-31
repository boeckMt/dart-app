export class Player {
  count: number;
  protected privName: string = '';
  set name(value: string) {
    this.privName = value;
  }
  get name() {
    return this.privName;
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
