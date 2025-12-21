type Props = {
  data: {
    title: string;
    approverRole: string;
    autoApproveThreshold: number;
  };
  onChange: (data: any) => void;
};

export default function ApprovalNodeForm({ data, onChange }: Props) {
  const update = (key: string, value: any) =>
    onChange({ ...data, [key]: value });

  return (
    <>
      <h3>Approval Node</h3>

      <input
        placeholder="Title"
        value={data.title}
        onChange={(e) => update("title", e.target.value)}
      />

      <input
        placeholder="Approver Role"
        value={data.approverRole}
        onChange={(e) => update("approverRole", e.target.value)}
      />

      <input
        type="number"
        placeholder="Auto-approve threshold"
        value={data.autoApproveThreshold}
        onChange={(e) =>
          update("autoApproveThreshold", Number(e.target.value))
        }
      />
    </>
  );
}
