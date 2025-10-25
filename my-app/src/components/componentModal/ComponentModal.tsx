"use client";
import "./ComponentModal.css";

import React, { ReactNode } from "react";

interface ComponentModalProps {
  componentName: string;
  onClose: () => void;
  isOpened: boolean;
  children: ReactNode;
}

const ComponentModal: React.FC<ComponentModalProps> = ({
  componentName,
  onClose,
  isOpened,
  children,
}) => {
  if (!isOpened) {
    return;
  }
  return (
    <div className="component_modal p-2 shadow rounded-3">
      <div className="component_modal_header d-flex justify-content-between ">
        <div className="component_modal_component_name">{componentName}</div>
        <button
          className="componentModal_close_button button_normal button_normal_blue"
          onClick={(e) => {
            onClose();
            e.stopPropagation();
          }}
        >
          Close
        </button>
      </div>
      {children}
    </div>
  );
};

export default ComponentModal;
