export const dynamic = "force-dynamic";

export async function GET() {
  const bitrixEnabled = Boolean(process.env.BITRIX24_WEBHOOK_URL?.trim());
  const n8nEnabled = Boolean(process.env.N8N_LEADS_WEBHOOK_URL?.trim());

  return Response.json(
    {
      enabled: bitrixEnabled || n8nEnabled,
      integrations: {
        bitrix: bitrixEnabled,
        n8n: n8nEnabled,
      },
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
