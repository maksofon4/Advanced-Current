import React from "react";

const ButtonsBox: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className="buttons_box">{children}</div>;
};

export default ButtonsBox;
