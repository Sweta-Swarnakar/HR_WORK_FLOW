type Props = {
  data: {
    title: string;
    metadata?: Record<string, string>;
  };
  onChange: (data: any) => void;
};

export default function StartNodeForm({ data, onChange }: Props) {
  const metadata = data.metadata ?? {};

  const updateMetadata = (key: string, value: string) => {
    onChange({
      ...data,
      metadata: { ...metadata, [key]: value },
    });
  };

  return (
    <>
      <h3>Start Node</h3>

      <label>Title</label>
      <input
        value={data.title}
        onChange={(e) => onChange({ ...data, title: e.target.value })}
      />

      <h4>Metadata</h4>

      {Object.entries(metadata).map(([key, value]) => (
        <input
          key={key}
          placeholder={key}
          value={value}
          onChange={(e) => updateMetadata(key, e.target.value)}
        />
      ))}

      <button
        onClick={() => updateMetadata(`key_${Date.now()}`, "")}
      >
        + Add Metadata
      </button>
    </>
  );
}
