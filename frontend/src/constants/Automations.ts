

export const AUTOMATIONS = [
  {
    "id": "send_email",
    "label": "Send Email",
    "params": ["to", "subject"]
  },
  {
    "id": "generate_pdf",
    "label": "Generate PDF",
    "params": ["template", "recipient"]
  }
] as const;
