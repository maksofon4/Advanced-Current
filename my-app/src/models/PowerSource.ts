import { Component } from "./Component";
import { skins } from "./skins";
import { componentNames } from "./componentNames";

export class PowerSource extends Component {
  private voltage: number;
  private resistance: number;
  private current: number;

  constructor(voltage: number, resistance: number, current: number) {
    super(componentNames.POWERSOURCE, skins.POWERSOURCE);
    this.voltage = voltage; // in volts
    this.resistance = resistance; // in ohms
    this.current = current;
  }

  getResistance() {
    return this.resistance;
  }

  getVoltage() {
    return this.voltage;
  }

  getCurrent() {
    return this.current;
  }

  getPower() {
    return this.voltage * this.current;
  }
}
