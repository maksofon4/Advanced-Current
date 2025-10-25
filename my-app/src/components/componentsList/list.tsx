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
    <div className="components_list flex gap-x-3 p-3">
      {components.map((component) => (
        <div key={component.type}>
          <p className="w-full text-center ">{component.type}</p>
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
