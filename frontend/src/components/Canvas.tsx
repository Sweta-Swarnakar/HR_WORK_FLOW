import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  useReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType
} from "@xyflow/react";
import { useCallback, useState } from "react";
import type { Node, Edge, Connection } from "@xyflow/react";
import { createNodeData } from "../utils/createNodeData";
import { SIDEBAR_NODES } from "../constants/SideBarNodes";
import BaseNode from "./nodes/BaseNode";
import NodeFormPanel from "./NodeFormPanel";

export default function Canvas() {
  const { screenToFlowPosition } = useReactFlow();

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const nodeTypes = {
    task: BaseNode,
    approval: BaseNode,
    automated: BaseNode,
    end: BaseNode,
    input: BaseNode,
  };

  const updateNodeData = useCallback((id: string, data: any) => {
    setNodes((nds) =>
      nds.map((n) => (n.id === id ? { ...n, data } : n))
    );
  }, []);



  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onConnect = useCallback(
    (params: Connection) => {
      if (!params.source || !params.target) return;

      if (params.sourceHandle) {
        const exists = edges.some(
          (e) =>
            e.source === params.source &&
            e.sourceHandle === params.sourceHandle
        );

        if (exists) {
          alert("This path is already connected");
          return;
        }
      }

      setEdges((eds) =>
        addEdge(
          {
            ...params,
            label:
              params.sourceHandle === "approve"
                ? "Approved"
                : params.sourceHandle === "reject"
                  ? "Rejected"
                  : "",
          },
          eds
        )
      );
    },
    [edges]
  );



  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      type SidebarNodeType = typeof SIDEBAR_NODES[number]['type'];
      const sidebarNodeType = event.dataTransfer
        .getData("application/reactflow")
        .trim() as SidebarNodeType;

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

      setNodes((prevNodes) => {
        const newNode: Node = {
          id: crypto.randomUUID(),
          type: sidebarNodeType,
          position,
          data: createNodeData(sidebarNodeType),
        };

        return [...prevNodes, newNode];
      });
    },
    [screenToFlowPosition, nodes]
  );
  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || null;


  return (
    <div style={{ display: "flex", width: "100%", height: "100%" }}>
      {/* Canvas */}
      <div style={{ flex: 1 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onDrop={onDrop}
          nodeTypes={nodeTypes}
          onDragOver={onDragOver}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={(_, node) => setSelectedNodeId(node.id)}
          defaultEdgeOptions={{
            markerEnd: { type: MarkerType.ArrowClosed },
          }}
          fitView
        >
          <Controls />
          <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
        </ReactFlow>
      </div>

      <div
        style={{
          width: 300,
          borderLeft: "1px solid #ddd",
          padding: 12,
          background: "#fafafa",
        }}
      >
        <NodeFormPanel node={selectedNode} onChange={updateNodeData} />
      </div>
    </div>
  );

}
