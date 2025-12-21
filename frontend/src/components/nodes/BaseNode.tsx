import { Handle, Position, type NodeProps } from "@xyflow/react";

export default function BaseNode({ data, selected, type }: NodeProps) {
  const isStart = type === "input";
  const isEnd = type === "end";
  const isApproval = type === "approval";

  return (
    <div
      style={{
        padding: 10,
        borderRadius: 6,
        background: "#fff",
        minWidth: 160,
        textAlign: "center",
        border: selected ? "2px solid #2563eb" : "1px solid #ccc",
      }}
    >
      <strong>{data.title}</strong>

      {type === "task" && (
        <div style={{ fontSize: 12, marginTop: 6, color: "#555" }}>
          {data.assignee && <div> {data.assignee}</div>}
          {data.description && <div> {data.description}</div>}
          {data.dueDate && <div> {data.dueDate}</div>}
        </div>
      )}

      {type === "approval" && (
        <div style={{ fontSize: 12, marginTop: 6, color: "#555" }}>
          <div>Role: {data.approverRole}</div>
        </div>
      )}

      {type === "automated" && (
        <div style={{ fontSize: 12, marginTop: 6, color: "#555" }}>
         {data.title}
        </div>
      )}

      {!isStart && <Handle type="target" position={Position.Top} />}

      {!isEnd && !isApproval && (
        <Handle type="source" position={Position.Bottom} />
      )}

      {isApproval && (
        <>
          <Handle type="source" position={Position.Left} id="approve" />
          <Handle type="source" position={Position.Right} id="reject" />
        </>
      )}
    </div>
  );
}

