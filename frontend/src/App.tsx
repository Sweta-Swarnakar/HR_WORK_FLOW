import { ReactFlowProvider } from "@xyflow/react";
import Sidebar from "./components/Sidebar";
import Canvas from "./components/Canvas";

export default function App() {
  return (
    <ReactFlowProvider fitView>
      <div
        style={{
          display: "flex",
          height: "90vh",
          width: "90vw",
          backgroundColor: "white",
          margin: "auto",
        }}
      >
        <div style={{ width: "30vw", flexShrink: 0 }}>
          <Sidebar />
        </div>

        <div style={{ flex: 1, border: "1px solid black" }}>
          <Canvas />
        </div>
      </div>
    </ReactFlowProvider>
  );
}
