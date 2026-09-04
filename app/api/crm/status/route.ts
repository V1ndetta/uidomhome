export const dynamic = "force-dynamic";

export async function GET() {
  const enabled = Boolean(process.env.BITRIX24_WEBHOOK_URL?.trim());

  return Response.json(
    { enabled },
    { headers: { "Cache-Control": "no-store" } },
  );
}
