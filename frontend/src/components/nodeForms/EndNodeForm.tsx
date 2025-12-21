type Props = {
  data: {
    title: string;
    endMessage: string;
    showSummary: boolean;
  };
  onChange: (data: any) => void;
};

export default function EndNodeForm({ data, onChange }: Props) {
  return (
    <>
      <h3>End Node</h3>

      <input
        placeholder="Title"
        value={data.title}
        onChange={(e) =>
          onChange({ ...data, title: e.target.value })
        }
      />

      <textarea
        placeholder="End Message"
        value={data.endMessage}
        onChange={(e) =>
          onChange({ ...data, endMessage: e.target.value })
        }
      />

      <label>
        <input
          type="checkbox"
          checked={data.showSummary}
          onChange={(e) =>
            onChange({ ...data, showSummary: e.target.checked })
          }
        />
        Show Summary
      </label>
    </>
  );
}
