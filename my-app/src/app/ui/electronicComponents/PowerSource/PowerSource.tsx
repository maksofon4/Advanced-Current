import { ReactNode, useEffect, useState, useMemo, useCallback } from "react";
import { DeleteComponentButton } from "../../components/DeleteComponentButton/DeleteComponentButton";
import ComponentModal from "../../components/componentModal/ComponentModal";
import InputNumber from "../../components/InputNumber/InputNumber";
import { PowerSource } from "@/models/PowerSource";
import { ComponentInfo } from "../../components/ComponentInfo/ComponentInfo";
import { Position } from "@xyflow/react";
import { HandleCustom } from "../../components/Handle/Handle";
import { RotateComponentButton } from "../../components/RotateComponentButton/RotateComponentButton";
import { useUpdateNodeInternals } from "@xyflow/react";
import { useUpdateNodeData } from "@/Hooks/ReactFlow/UseUpdateNodeData/UseUpdateNodeData";

interface PowerSourceProps {
  id: string;
  data: {
    angle: number;
    temperature: number;
    nominalVoltage: number;
    internalResistance: number;
    circuitlResistance: number;
  };
  onDelete: () => void;
}

export const PowerSourceComponent: React.FC<PowerSourceProps> = ({
  id,
  data,
  onDelete,
}) => {
  const {
    angle,
    nominalVoltage = 0,
    internalResistance = 0,
    circuitlResistance = 0,
    temperature = 0,
  } = data;

  const [isModalOpened, setIsModalopened] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const powerSource = useMemo(
    () =>
      new PowerSource(
        nominalVoltage,
        internalResistance,
        circuitlResistance,
        temperature
      ),
    [nominalVoltage, internalResistance, circuitlResistance, temperature]
  );

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

  const updateNodeData = useUpdateNodeData();

  const updateNominalVoltage = (nominalVoltage: number) => {
    updateNodeData(id, {
      nominalVoltage,
    });
  };

  const updateInternalResistance = (internalResistance: number) => {
    updateNodeData(id, {
      internalResistance,
    });
  };

  const updateCircuitlResistance = (circuitlResistance: number) => {
    updateNodeData(id, {
      circuitlResistance,
    });
  };

  const updateAngle = (angle: number) => {
    updateNodeData(id, {
      angle,
    });
  };

  return (
    <>
      <RotateComponentButton onRotate={updateAngle} />
      <div
        className="component_model position-relative cursor-pointer p-1 rounded-1"
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
          src={powerSource.skin}
          alt="Power Source"
        />
        <ComponentModal
          isOpened={isModalOpened}
          onClose={() => setIsModalopened(false)}
          componentName="Power Source"
        >
          <InputNumber
            value={circuitlResistance}
            inputName="Circuit Resistance"
            onChange={updateCircuitlResistance}
          />
          <InputNumber
            value={internalResistance}
            inputName="Internal Battery Resistance"
            onChange={updateInternalResistance}
          />
          <InputNumber
            value={nominalVoltage}
            inputName="Nominal Voltage"
            onChange={updateNominalVoltage}
          />
          <ComponentInfo type="input">
            <p>temperature: {temperature}</p>
          </ComponentInfo>
          <ComponentInfo type="output">
            <p>Current: {powerSource.getOutputCurrent().toFixed(5)} A</p>
            <p>Voltage: {powerSource.getOutputVoltage().toFixed(2)} V</p>
            <p>Power: {powerSource.getPowerOutput().toFixed(5)} W</p>
          </ComponentInfo>
        </ComponentModal>
        <HandleCustom type="target" position={handlePositions.handle1} />
        <HandleCustom type="source" position={handlePositions.handle2} />
      </div>
    </>
  );
};
