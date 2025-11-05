"use client";
import Board from "@/app/ui/components/Board/Board";
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
