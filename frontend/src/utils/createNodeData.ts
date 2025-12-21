import type { SIDEBAR_NODES } from "../constants/SideBarNodes";

type NodeType = typeof SIDEBAR_NODES[number]["type"];

export function createNodeData(type: NodeType) {
  switch (type) {
    case "input":
      return {
        title: "Start"
      };

    case "task":
      return {
        title: "Task",
        description: "",
        assignee: "",
        dueDate: "",
        customFields: {},
      };

    case "approval":
      return {
        title: "Approval",
        approverRole: "Manager",
        autoApproveThreshold: 0,
      };

    case "automated":
      return {
        title: "Automated Step",
        actionId: "",
        params: {},
      };

    case "end":
      return {
        title: "End",
        endMessage: "Workflow completed",
        showSummary: false,
      };
  }
}
