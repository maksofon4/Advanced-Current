import { useRef, useEffect } from "react";
import React from "react";

interface ThermometerProps {
  onTemperatureChange: (temperature: number) => void;
}

const Thermometer: React.FC<ThermometerProps> = ({ onTemperatureChange }) => {
  const [temperature, setTemperature] = React.useState<number>(25);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const getTemperatureColor = (temp: number): string => {
    switch (true) {
      case temp <= 0:
        return "rgb(0, 102, 204)"; // deep blue - freezing
      case temp <= 10:
        return "rgb(0, 153, 255)"; // light blue
      case temp <= 15:
        return "rgb(0, 204, 204)"; // cyan
      case temp <= 20:
        return "rgba(0, 209, 104, 1)"; // turquoise
      case temp <= 25:
        return "rgba(0, 200, 0, 1)"; // green
      case temp <= 30:
        return "rgba(215, 215, 39, 1)"; // yellow
      case temp <= 35:
        return "rgb(255, 204, 0)"; // amber
      case temp <= 40:
        return "rgb(255, 153, 51)"; // orange
      case temp <= 50:
        return "rgba(255, 106, 106, 1)"; // red
      case temp <= 60:
        return "rgba(255, 59, 59, 1)"; // strong red
      default:
        return "rgba(196, 0, 0, 1)"; // white-hot
    }
  };

  const startIncrease = () => {
    increaseTemperature(); // immediate increment
    intervalRef.current = setInterval(increaseTemperature, 50); // repeat while holding
  };

  const startDecrease = () => {
    decreaseTemperature(); // immediate decrement
    intervalRef.current = setInterval(decreaseTemperature, 50);
  };

  const stopChange = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    onTemperatureChange(temperature);
  }, [temperature, onTemperatureChange]);

  const increaseTemperature = () => {
    setTemperature((prev) => Math.min(prev + 1, 1000));
  };

  const decreaseTemperature = () => {
    setTemperature((prev) => Math.max(prev - 1, -273));
  };

  const color = getTemperatureColor(temperature);

  return (
    <div className="thermometer">
      <div
        className="thermometer_value"
        style={{ color: color, transition: "color 0.3s" }}
      >
        {temperature}&#8451;
      </div>
      <div className="thermometer_controllers">
        <button
          onMouseDown={startDecrease}
          onMouseUp={stopChange}
          onMouseLeave={stopChange}
          className="button_normal bg-blue-500 "
        >
          <span className="m-auto leading-none h-[20px] block font-bold w-[12px]">
            -
          </span>
        </button>
        <button
          onMouseDown={startIncrease}
          onMouseUp={stopChange}
          onMouseLeave={stopChange}
          className="button_normal bg-red-500"
        >
          <span className="m-auto leading-none h-[20px] block font-bold w-[12px]">
            +
          </span>
        </button>
      </div>
    </div>
  );
};

export default Thermometer;
