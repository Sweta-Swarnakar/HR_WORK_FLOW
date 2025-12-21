import type { Node } from "@xyflow/react";
import StartNodeForm from "./nodeForms/StartNodeForm";
import TaskNodeForm from "./nodeForms/TaskNodeForm";
import ApprovalNodeForm from "./nodeForms/ApprovalNodeForm";
import AutomatedNodeForm from "./nodeForms/AutomatedNodeForm";
import EndNodeForm from "./nodeForms/EndNodeForm";

type Props = {
  node: Node | null;
  onChange: (id: string, data: any) => void;
};

export default function NodeFormPanel({ node, onChange }: Props) {
  if (!node) {
    return <div>Select a node to configure</div>;
  }

  const update = (data: any) => onChange(node.id, data);

  switch (node.type) {
    case "input":
      return <StartNodeForm data={node.data} onChange={update} />;
    case "task":
      return <TaskNodeForm data={node.data} onChange={update} />;
    case "approval":
      return <ApprovalNodeForm data={node.data} onChange={update} />;
    case "automated":
      return <AutomatedNodeForm data={node.data} onChange={update} />;
    case "end":
      return <EndNodeForm data={node.data} onChange={update} />;
    default:
      return null;
  }
}
