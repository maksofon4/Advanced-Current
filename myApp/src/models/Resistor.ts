import { Component } from "./Component";
import { skins } from "./skins";
import { componentNames } from "./componentNames";

export class Resistor extends Component {
  private voltage: number;
  private resistance: number;

  constructor(voltage: number, resistance: number) {
    super(componentNames.RESISTOR, skins.RESISTOR);
    this.voltage = voltage; // in volts
    this.resistance = resistance; // in ohms
  }

  getResistance() {
    return this.resistance;
  }

  getCurrent() {
    const resistance = this.getResistance();
    if (resistance === 0) {
      throw new Error("Resistance cannot be zero (division by zero).");
    }
    // Ohm’s Law: I = U / R
    return this.voltage / resistance;
  }
}
