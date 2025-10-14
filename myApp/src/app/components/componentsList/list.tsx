import React from "react";
import "./list.css";
import { skins } from "@/models/skins";

const components = [{ id: "12344", type: "resistor", image: skins.RESISTOR }];

const ComponentList: React.FC = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("nodeType", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <div className="components_list p-3 d-flex flex-column">
      {components.map((component) => (
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
          <p className="m-0 component_name"> {component.type}</p>
        </div>
      ))}
    </div>
  );
};

export default ComponentList;
