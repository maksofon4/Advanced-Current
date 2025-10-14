"use client";
import { ReactNode, useEffect, useState } from "react";
import React from "react";
import ComponentModal from "../../componentModal/ComponentModal";
import InputNumber from "../../InputNumber/InputNumber";
import "./resistor.css";
import { Resistor } from "@/models/Resistor";
import { v4 as uuidv4 } from "uuid";
import { HandleCustom } from "../../Handle/Handle";
import { Position } from "@xyflow/react";
import { ComponentInfo } from "../../ComponentInfo/ComponentInfo";

const ResistorComponent: React.FC = () => {
  const [voltage, setVoltage] = useState<number>(0);
  const [temperature, setTemperature] = useState<number>(0);
  const [tcr, setTcr] = useState<number>(0);
  const [T_nominal, setT_nominal] = useState<number>(25); //nominal temperture in celsius
  const [resistance, setResistance] = useState<number>(25); // nominal resistance in Oms
  const [actualResistance, setActualResistance] = useState<number>(resistance);
  const [outputCurrent, setoutputCurrent] = useState<number>(0);
  const [outputVoltage, setOutputVoltage] = useState<number>(voltage || 0);
  const [power, setPower] = useState<number>(0);

  // Resistor Class
  const resistor = new Resistor(voltage, resistance);

  // Modal
  const [isModalOpened, setIsModalopened] = useState<boolean>(false);

  useEffect(() => {
    const resistanceActual = resistance * (1 + tcr * (temperature - T_nominal));
    const currentOutputCurrent = outputVoltage / resistanceActual;
    setActualResistance(resistanceActual);
    setoutputCurrent(currentOutputCurrent);
    const power = outputVoltage * currentOutputCurrent;

    setPower(power);
  }, [resistance]);

  return (
    <>
      <div
        className="resistor_model position-relative cursor-pointer p-1 rounded-1"
        onClick={(e) => {
          setIsModalopened(true);
          e.stopPropagation();
        }}
      >
        <img
          className="resistor_model_img w-100"
          src={resistor.skin}
          alt="Resistor"
        />
        <ComponentModal
          isOpened={isModalOpened}
          onClose={() => setIsModalopened(false)}
          componentName="Resistor"
        >
          <InputNumber
            value={resistance}
            inputName="Resistance"
            onChange={(value) => setResistance(value)}
          />
          <InputNumber
            value={voltage}
            inputName="Input Voltage"
            onChange={(value) => setVoltage(value)}
          />
          <ComponentInfo type="input">
            <p>voltage {voltage}</p>
            <p>temperature {temperature}</p>
            <p>resistance {resistance}</p>
          </ComponentInfo>
          <ComponentInfo type="output">
            <p>Current (Calculated): {outputCurrent.toFixed(5)} A</p>
            <p>Voltage (Fixed Input): {outputVoltage.toFixed(2)} V</p>
            <p>Power Dissipated: {power.toFixed(5)} W</p>
            <p>actual resistance{actualResistance}</p>
          </ComponentInfo>
        </ComponentModal>
      </div>
      <HandleCustom type="target" position={Position.Left} />
      <HandleCustom type="source" position={Position.Right} />
    </>
  );
};

export default ResistorComponent;
