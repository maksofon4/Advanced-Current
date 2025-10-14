import React, { ReactNode } from "react";
import "./ComponentInfo.css";

interface ComponentInfoProps {
  type: "input" | "output";
  children: ReactNode;
}

export const ComponentInfo: React.FC<ComponentInfoProps> = ({
  type,
  children,
}) => {
  return (
    <div
      className={
        type === "input"
          ? `component_info component_info_input`
          : `component_info component_info_output`
      }
    >
      <h2>{type === "input" ? `Input` : `Output`}</h2>
      <div className="component_info_data">{children}</div>
    </div>
  );
};
