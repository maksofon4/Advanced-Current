import React from "react";
import "./list.css";
import { skins } from "@/models/skins";

const components = [
  { id: "22344", type: "powerSource", image: skins.POWERSOURCE },
  { id: "12344", type: "resistor", image: skins.RESISTOR },
];

const ComponentList: React.FC = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("nodeType", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <div className="components_list p-3 d-flex gap-3">
      {components.map((component) => (
        <div>
          <p className="m-0 component_name text-center w-100">
            {component.type}
          </p>
          <div
            className="components_list_component shadow rounded-2 position-relative p-1 d-flex align-items-center justify-content-center"
            key={component.id}
            onDragStart={(e) => onDragStart(e, component.type)}
            draggable
          >
            <img
              className="components_list_img"
              src={component.image}
              alt={component.type}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComponentList;
