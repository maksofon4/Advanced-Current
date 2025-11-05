"use client";
import React from "react";
import { useState } from "react";
import { skins } from "@/models/skins";
import ToolTip, { ToolTipPositions } from "../ToolTip/ToolTip";
import Image from "next/image";

const components = [
  { id: "22344", type: "powerSource", image: skins.POWERSOURCE },
  { id: "12344", type: "resistor", image: skins.RESISTOR },
];

const ComponentList: React.FC = () => {
  const [showList, setShowList] = useState<boolean>(false);
  const [isToolTipVisible, setToolTipVisible] = useState<boolean>(false);

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("nodeType", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const showListFunction = () => {
    if (showList) {
      setShowList(false);
    } else {
      setShowList(true);
    }
  };

  console.log(components);

  return (
    <div
      className={`components_list  ${showList ? "components_list_show" : ""}`}
    >
      {components.map((component) => (
        <div key={component.type}>
          <p className="w-full text-center component_list_component_name">
            {component.type}
          </p>
          <div
            className="components_list_component shadow rounded-2 position-relative p-1 d-flex align-items-center justify-content-center"
            key={component.id}
            onDragStart={(e) => onDragStart(e, component.type)}
            draggable
          >
            <Image
              className="components_list_img"
              width={100}
              height={100}
              src={component.image}
              alt={component.type}
            />
          </div>
        </div>
      ))}

      <button
        className="button_normal relative components_list_button_show button_normal_blue components_list_button"
        onClick={showListFunction}
        onMouseEnter={() => setToolTipVisible(true)}
        onMouseLeave={() => setToolTipVisible(false)}
      >
        {isToolTipVisible && !showList && (
          <ToolTip position={ToolTipPositions.BOTTOM_RIGHT}>
            <span className="whitespace-nowrap">Show components</span>
          </ToolTip>
        )}

        {showList ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
          </svg>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1 8a7 7 0 1 1 2.898 5.673c-.167-.121-.216-.406-.002-.62l1.8-1.8a3.5 3.5 0 0 0 4.572-.328l1.414-1.415a.5.5 0 0 0 0-.707l-.707-.707 1.559-1.563a.5.5 0 1 0-.708-.706l-1.559 1.562-1.414-1.414 1.56-1.562a.5.5 0 1 0-.707-.706l-1.56 1.56-.707-.706a.5.5 0 0 0-.707 0L5.318 5.975a3.5 3.5 0 0 0-.328 4.571l-1.8 1.8c-.58.58-.62 1.6.121 2.137A8 8 0 1 0 0 8a.5.5 0 0 0 1 0"
              />
            </svg>
            Components
          </>
        )}
      </button>
    </div>
  );
};

export default ComponentList;
