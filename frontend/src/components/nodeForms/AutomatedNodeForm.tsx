import { AUTOMATIONS } from "../../constants/Automations";

type Props = {
  data: any;
  onChange: (data: any) => void;
};

export default function AutomatedNodeForm({ data, onChange }: Props) {
  const selectedAction = AUTOMATIONS.find(
    (a) => a.id === data.actionId
  );

  return (
    <div>
      <h3>Automated Step</h3>

      <label>Action</label>
      <select
        value={data.actionId}
        onChange={(e) => {
          const actionId = e.target.value;
          const action = AUTOMATIONS.find((a) => a.id === actionId);

          onChange({
            ...data,
            title: action?.label ?? "Automated Step",
            actionId,
            params: {},
          });
        }}
      >
        <option value="">Select action</option>
        {AUTOMATIONS.map((a) => (
          <option key={a.id} value={a.id}>
            {a.label}
          </option>
        ))}
      </select>
      
      {selectedAction?.params.map((param) => (
        <div key={param}>
          <label>{param}</label>
          <input
            value={data.params[param] || ""}
            onChange={(e) =>
              onChange({
                ...data,
                params: {
                  ...data.params,
                  [param]: e.target.value,
                },
              })
            }
          />
        </div>
      ))}
    </div>
  );
}
