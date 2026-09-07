# n8n lead notifications

The UIDOMHOME lead API can forward validated lead payloads to n8n in addition to creating the Bitrix24 contact/deal.

Set the server-side environment variable:

`N8N_LEADS_WEBHOOK_URL=https://<your-n8n-host>/webhook/<workflow-id>`

The URL is read only on the server. If it is missing or invalid, Bitrix24 lead creation continues normally. If n8n returns an error, the failure is logged but does not block the website form or Bitrix24.
