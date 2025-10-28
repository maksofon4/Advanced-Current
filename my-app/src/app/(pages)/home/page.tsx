"use client";
import { useState, useCallback } from "react";
import Board from "../../../components/Board/Board";
import { ReactFlowProvider } from "@xyflow/react";

const Home = () => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlowProvider>
        <Board />
      </ReactFlowProvider>
    </div>
  );
};

export default Home;
