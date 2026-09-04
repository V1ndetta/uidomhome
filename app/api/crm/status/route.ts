import { env } from "cloudflare:workers";

export const dynamic = "force-dynamic";

export async function GET() {
  const runtimeEnv = env as unknown as Record<string, string | undefined>;
  const enabled = Boolean(runtimeEnv.BITRIX24_WEBHOOK_URL?.trim());

  return Response.json(
    { enabled },
    { headers: { "Cache-Control": "no-store" } },
  );
}
