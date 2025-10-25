import { Component } from "./Component";
import { skins } from "./skins";
import { componentNames } from "./componentNames";

export class Resistor extends Component {
  private temperature: number;
  private voltage: number;
  private resistance: number;
  private alpha: number;
  private readonly T0 = 20;

  constructor(
    temperature: number,
    voltage: number,
    resistance: number,
    alpha = 0.0039
  ) {
    super(componentNames.RESISTOR, skins.RESISTOR);
    this.voltage = voltage;
    this.resistance = resistance;
    this.temperature = temperature;
    this.alpha = alpha;
  }

  getResistance(): number {
    return this.resistance * (1 + this.alpha * (this.temperature - this.T0));
  }

  getVoltage(): number {
    const I = this.getCurrent();
    const R = this.getResistance();
    return I * R;
  }

  getCurrent(): number {
    const R = this.getResistance();

    return this.voltage / R;
  }

  getPower(): number {
    const R = this.getResistance();

    return this.voltage ** 2 / R;
  }
}
