"use client";
import { ReactNode, useEffect, useState, useMemo } from "react";
import React from "react";
import ComponentModal from "../../../components/componentModal/ComponentModal";
import InputNumber from "../../../components/InputNumber/InputNumber";
import { Resistor } from "@/models/Resistor";
import { HandleCustom } from "../../../components/Handle/Handle";
import { Position } from "@xyflow/react";
import { ComponentInfo } from "../../../components/ComponentInfo/ComponentInfo";
import { DeleteComponentButton } from "../../../components/DeleteComponentButton/DeleteComponentButton";
import { RotateComponentButton } from "../../../components/RotateComponentButton/RotateComponentButton";
import { useUpdateNodeInternals } from "@xyflow/react";
import { useUpdateNodeData } from "@/app/Hooks/ReactFlow/UseUpdateNodeData/UseUpdateNodeData";
import "./resistor.css";

interface ResistorComponentProps {
  id: string;
  temperature: number;
  onDelete: () => void;
}

const ResistorComponent: React.FC<ResistorComponentProps> = ({
  id,
  temperature,
  onDelete,
}) => {
  const [voltage, setVoltage] = useState<number>(0);
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
  const resistor = new Resistor(temperature, voltage, resistance);

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

  // Retrive values of the component for its node

  const updateNodeData = useUpdateNodeData();

  const updateVoltage = (voltage: number) => {
    setVoltage(voltage);
    updateNodeData(id, {
      voltage,
    });
  };

  const updateResistance = (resistance: number) => {
    setResistance(resistance);
    updateNodeData(id, {
      resistance,
    });
  };

  useEffect(() => {
    calculateData();
  }, [resistance, temperature, voltage]);

  const handleRotate = (rotation: number) => {
    setAngle(rotation);
  };

  const calculateData = () => {
    const resistanceActual = resistor.getResistance();
    const calculatedOutputCurrent = resistor.getCurrent();
    const calculatedOutputVoltage = resistor.getVoltage();
    const power = calculatedOutputVoltage * calculatedOutputCurrent;
    updateNodeData(id, {
      power,
      outputCurrent,
    });

    setActualResistance(resistanceActual);
    setoutputCurrent(calculatedOutputCurrent);
    setOutputVoltage(calculatedOutputVoltage);
    setPower(power);
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
          onChange={updateResistance}
        />
        <InputNumber
          value={voltage}
          inputName="Input Voltage"
          onChange={updateVoltage}
        />
        <ComponentInfo type="input">
          <p>voltage: {voltage}</p>
          <p>temperature: {temperature}</p>
          <p>resistance: {actualResistance}</p>
        </ComponentInfo>
        <ComponentInfo type="output">
          <p>Current: {outputCurrent.toFixed(5)} A</p>
          <p>Voltage: {outputVoltage.toFixed(2)} V</p>
          <p>Power Dissipated: {power.toFixed(5)} W</p>
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
          className="component_model_img"
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
