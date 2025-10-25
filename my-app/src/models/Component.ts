export abstract class Component {
  name: string;
  skin: string;

  constructor(name: string, skin: string) {
    this.name = name;
    this.skin = skin;
  }

  abstract getResistance(): number;
}
