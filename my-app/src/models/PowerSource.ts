import { Component } from "./Component";
import { skins } from "./skins";
import { componentNames } from "./componentNames";

export class PowerSource extends Component {
  private nominalVoltage: number;
  private internalResistance: number;
  private circuitResistance: number;
  private temperature: number;

  // Calculated values
  private outputVoltage: number;
  private outputCurrent: number;
  private powerOutput: number;
  private effectiveInternalResistance: number;

  constructor(
    nominalVoltage: number,
    internalResistance: number,
    circuitResistance: number,
    temperature: number
  ) {
    super(componentNames.POWERSOURCE, skins.POWERSOURCE);
    this.nominalVoltage = nominalVoltage;
    this.internalResistance = internalResistance;
    this.circuitResistance = circuitResistance;
    this.temperature = temperature;

    // Calculate everything once in constructor
    this.effectiveInternalResistance =
      this.calculateEffectiveInternalResistance();
    this.outputCurrent = this.calculateOutputCurrent();
    this.outputVoltage = this.calculateOutputVoltage();
    this.powerOutput = this.calculatePowerOutput();
  }

  private calculateEffectiveInternalResistance(): number {
    // Temperature effect on internal resistance
    const alpha = 0.0039;
    const baseTemp = 25;
    return (
      this.internalResistance * (1 + alpha * (this.temperature - baseTemp))
    );
  }

  private calculateOutputCurrent(): number {
    const totalResistance =
      this.effectiveInternalResistance + this.circuitResistance;
    return totalResistance > 0 ? this.nominalVoltage / totalResistance : 0;
  }

  private calculateOutputVoltage(): number {
    return (
      this.nominalVoltage -
      this.outputCurrent * this.effectiveInternalResistance
    );
  }

  private calculatePowerOutput(): number {
    return this.outputVoltage * this.outputCurrent;
  }

  // Simple getters - just return pre-calculated values
  getOutputVoltage(): number {
    return this.outputVoltage;
  }

  getOutputCurrent(): number {
    return this.outputCurrent;
  }

  getInternalResistance(): number {
    return this.effectiveInternalResistance;
  }

  getPowerOutput(): number {
    return this.powerOutput;
  }

  // Optional: get the original values for display
  getNominalVoltage(): number {
    return this.nominalVoltage;
  }

  getcircuitResistance(): number {
    return this.circuitResistance;
  }

  getTemperature(): number {
    return this.temperature;
  }
}
