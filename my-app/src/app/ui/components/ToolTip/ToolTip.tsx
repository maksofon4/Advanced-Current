import React from "react";

export enum ToolTipPositions {
  TOP_LEFT = "bottom-[100%] right-[100%]",
  TOP_RIGHT = "bottom-[100%] left-[100%]",
  BOTTOM_LEFT = "top-[100%] right-[100%]",
  BOTTOM_RIGHT = "top-[100%] left-[100%]",
}
interface ToolTipProps {
  position: ToolTipPositions;
  children: React.ReactNode;
}

const ToolTip: React.FC<ToolTipProps> = ({ children, position }) => {
  return <div className={`tool_tip ${position}`}>{children}</div>;
};

export default ToolTip;
