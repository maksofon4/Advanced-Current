"use client";
import { ReactNode, useEffect, useState, useMemo } from "react";
import React from "react";
import ComponentModal from "../../componentModal/ComponentModal";
import InputNumber from "../../InputNumber/InputNumber";
import "./resistor.css";
import { Resistor } from "@/models/Resistor";
import { v4 as uuidv4 } from "uuid";
import { HandleCustom } from "../../Handle/Handle";
import { Position } from "@xyflow/react";
import { ComponentInfo } from "../../ComponentInfo/ComponentInfo";
import { DeleteComponentButton } from "../../DeleteComponentButton/DeleteComponentButton";
import { RotateComponentButton } from "../../RotateComponentButton/RotateComponentButton";
import { useUpdateNodeInternals } from "@xyflow/react";

interface ResistorComponentProps {
  id: string;
  data: {
    angle?: number;
    resistance?: number;
  };
  onDelete: () => void;
}

const ResistorComponent: React.FC<ResistorComponentProps> = ({
  id,
  onDelete,
}) => {
  const [voltage, setVoltage] = useState<number>(0);
  const [temperature, setTemperature] = useState<number>(0);
  const [tcr, setTcr] = useState<number>(0);
  const [T_nominal, setT_nominal] = useState<number>(25); //nominal temperture in celsius
  const [resistance, setResistance] = useState<number>(25); // nominal resistance in Oms
  const [actualResistance, setActualResistance] = useState<number>(resistance);
  const [outputCurrent, setoutputCurrent] = useState<number>(0);
  const [outputVoltage, setOutputVoltage] = useState<number>(voltage || 0);
  const [power, setPower] = useState<number>(0);

  // hovered state
  const [isHovered, setIsHovered] = useState(false);

  // Rotation states
  const [angle, setAngle] = useState<number>(0);

  // Resistor Class
  const resistor = new Resistor(voltage, resistance);

  // Modal
  const [isModalOpened, setIsModalopened] = useState<boolean>(false);

  // Handles positioning
  const updateNodeInternals = useUpdateNodeInternals();

  const handlePositions = useMemo(() => {
    switch (angle % 360) {
      case 0:
        return { handle1: Position.Left, handle2: Position.Right };
      case 90:
        return { handle1: Position.Bottom, handle2: Position.Top };
      case 180:
        return { handle1: Position.Right, handle2: Position.Left };
      case 270:
        return { handle1: Position.Top, handle2: Position.Bottom };
      default:
        return { handle1: Position.Left, handle2: Position.Right };
    }
  }, [angle]);

  useEffect(() => {
    updateNodeInternals(id);
  }, [handlePositions, id, updateNodeInternals]);

  useEffect(() => {
    const resistanceActual = resistance * (1 + tcr * (temperature - T_nominal));
    const currentOutputCurrent = outputVoltage / resistanceActual;
    setActualResistance(resistanceActual);
    setoutputCurrent(currentOutputCurrent);
    const power = outputVoltage * currentOutputCurrent;

    setPower(power);
  }, [resistance]);

  const handleRotate = (rotation: number) => {
    setAngle(rotation);
  };

  return (
    <>
      <RotateComponentButton onRotate={handleRotate} />
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
      <div
        className="resistor_model position-relative cursor-pointer p-1 rounded-1"
        onClick={(e) => {
          setIsModalopened(true);
          e.stopPropagation();
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered && (
          <DeleteComponentButton
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          />
        )}

        <img
          className="resistor_model_img w-100"
          src={resistor.skin}
          alt="Resistor"
          style={{ transform: `rotate(${angle}deg)` }}
        />

        <HandleCustom type="target" position={handlePositions.handle1} />
        <HandleCustom type="source" position={handlePositions.handle2} />
      </div>
    </>
  );
};
export default ResistorComponent;
