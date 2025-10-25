import { useState, useMemo, useEffect } from "react";
import { DeleteComponentButton } from "../../../components/DeleteComponentButton/DeleteComponentButton";
import ComponentModal from "../../../components/componentModal/ComponentModal";
import InputNumber from "../../../components/InputNumber/InputNumber";
import { PowerSource } from "@/models/PowerSource";
import { ComponentInfo } from "../../../components/ComponentInfo/ComponentInfo";
import { Position } from "@xyflow/react";
import { HandleCustom } from "../../../components/Handle/Handle";
import { RotateComponentButton } from "../../../components/RotateComponentButton/RotateComponentButton";
import { useUpdateNodeInternals } from "@xyflow/react";

interface PowerSourceProps {
  id: string;
  onDelete: () => void;
}

export const PowerSourceComponent: React.FC<PowerSourceProps> = ({
  id,
  onDelete,
}) => {
  const [isModalOpened, setIsModalopened] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [resistance, setResistance] = useState<number>(0);
  const [voltage, setVoltage] = useState<number>(0);
  const [current, setCurrent] = useState<number>(0);

  const powerSource = new PowerSource(voltage, resistance, current);

  // Rotation states
  const [angle, setAngle] = useState<number>(0);

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

  const handleRotate = (rotation: number) => {
    setAngle(rotation);
  };

  return (
    <>
      <RotateComponentButton onRotate={handleRotate} />
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
          src={powerSource.skin}
          alt="Power Source"
        />
        <ComponentModal
          isOpened={isModalOpened}
          onClose={() => setIsModalopened(false)}
          componentName="Power Source"
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

          <ComponentInfo type="output">
            <p>Current (Calculated): {current.toFixed(5)} A</p>
            <p>Voltage (Fixed Input): {current.toFixed(2)} V</p>
            <p>Power Dissipated: {powerSource.getPower().toFixed(5)} W</p>
            <p>actual resistance{powerSource.getResistance()}</p>
          </ComponentInfo>
        </ComponentModal>
        <HandleCustom type="target" position={handlePositions.handle1} />
        <HandleCustom type="source" position={handlePositions.handle2} />
      </div>
    </>
  );
};
