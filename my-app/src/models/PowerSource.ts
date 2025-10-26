import { Component } from "./Component";
import { skins } from "./skins";
import { componentNames } from "./componentNames";

export class PowerSource extends Component {
  private voltage: number;

  constructor(voltage: number = 0) {
    super(componentNames.POWERSOURCE, skins.POWERSOURCE);
    this.voltage = voltage;
  }

  getVoltage(): number {
    return this.voltage;
  }

  getCurrent(): number {
    return 0; // Power sources don't "have" current, they provide voltage
  }

  getResistance(): number {
    return 0; // Ideal power source has zero internal resistance
  }

  getPower(): number {
    return 0; // Power sources supply power, don't consume it
  }
}
