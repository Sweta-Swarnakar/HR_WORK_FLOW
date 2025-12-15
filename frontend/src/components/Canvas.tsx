import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  useReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
} from "@xyflow/react";
import { useCallback } from "react";
import type { Node, Edge, Connection } from "@xyflow/react";

export default function Canvas() {
  const { screenToFlowPosition } = useReactFlow();

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onConnect = useCallback(
    (params: Connection) => {
      if (!params.source || !params.target) return;

      const sourceNode = nodes.find((n) => n.id === params.source);
      const targetNode = nodes.find((n) => n.id === params.target);

      setEdges((eds) => addEdge(params, eds));
    },
    [nodes, edges]
  );

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const sidebarNodeType = event.dataTransfer
        .getData("application/reactflow")
        .trim();

      if (!sidebarNodeType) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      if (
        sidebarNodeType === "input" &&
        nodes.some((n) => n.type === "input")
      ) {
        alert("Only one input Node is allowed.");
        return;
      }
      let name = sidebarNodeType === "input" ? "start" : sidebarNodeType;
      setNodes((prevNodes) => {
        const newNode: Node = {
          id: crypto.randomUUID(),
          type: sidebarNodeType,
          position,
          data: { label: `${name} Node` },
        };

        return [...prevNodes, newNode];
      });
    },
    [screenToFlowPosition, nodes]
  );

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        defaultEdgeOptions={{
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
        }}
        fitView
      >
        <Controls />
        <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
      </ReactFlow>
    </div>
  );
}
