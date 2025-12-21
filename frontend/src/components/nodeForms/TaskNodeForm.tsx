type Props = {
  data: {
    title: string;
    description: string;
    assignee: string;
    dueDate: string;
    customFields: Record<string, string>;
  };
  onChange: (data: any) => void;
};

export default function TaskNodeForm({ data, onChange }: Props) {
  const update = (key: string, value: any) =>
    onChange({ ...data, [key]: value });

  const updateCustomField = (key: string, value: string) => {
    onChange({
      ...data,
      customFields: { ...data.customFields, [key]: value },
    });
  };

  return (
    <>
      <h3>Task Node</h3>

      <input
        placeholder="Title"
        value={data.title}
        onChange={(e) => update("title", e.target.value)}
        required
      />

      <textarea
        placeholder="Description"
        value={data.description}
        onChange={(e) => update("description", e.target.value)}
      />

      <input
        placeholder="Assignee"
        value={data.assignee}
        onChange={(e) => update("assignee", e.target.value)}
      />

      <input
        type="date"
        value={data.dueDate}
        onChange={(e) => update("dueDate", e.target.value)}
      />

      <h4>Custom Fields</h4>

      {Object.entries(data.customFields).map(([key, value]) => (
        <input
          key={key}
          placeholder={key}
          value={value}
          onChange={(e) => updateCustomField(key, e.target.value)}
        />
      ))}

      <button
        onClick={() =>
          updateCustomField(`field_${Date.now()}`, "")
        }
      >
        + Add Field
      </button>
    </>
  );
}
