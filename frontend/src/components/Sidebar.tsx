import "@xyflow/react/dist/style.css";
import { SIDEBAR_NODES } from "../constants/SideBarNodes";

export default function Sidebar() {
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div style={{ padding: "2px" }}>
      <aside>
        {SIDEBAR_NODES.map((node) => (
          <div
            style={{
              padding: "10px",
              width: "40%",
              margin: "auto",
              justifyContent: "center",
              textAlign: "center",
              marginBottom: "8px",
              background: "white",
              border: "1px solid #ccc",
              borderRadius: "4px",
              cursor: "grab",
            }}
            key={node.type}
            className="dndnode"
            onDragStart={(event) => onDragStart(event, node.type)}
            draggable
          >
            {node.label}
          </div>
        ))}
      </aside>
    </div>
  );
}
