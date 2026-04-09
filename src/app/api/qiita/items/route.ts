import { NextResponse } from "next/server";

const QIITA_ITEMS_URL =
  "https://qiita.com/api/v2/items?query=user:Sicut_study&per_page=20";

export async function GET() {
  try {
    const token = process.env.QIITA_API_KEY;
    if (!token) {
      return NextResponse.json(
        { error: "Qiita API key is not configured" },
        { status: 503 }
      );
    }

    const res = await fetch(QIITA_ITEMS_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      // Qiita upstream errors should not be forwarded 1:1 as-is.
      const upstreamStatus = res.status;
      const status =
        upstreamStatus >= 500 ? 502 : upstreamStatus === 429 ? 429 : 502;

      return NextResponse.json(
        { error: "Failed to fetch Qiita items", upstreamStatus },
        { status }
      );
    }

    const data = (await res.json()) as unknown;
    return NextResponse.json(data);
  } catch (err) {
    const name = err instanceof Error ? err.name : "UnknownError";
    const status = name === "TimeoutError" ? 504 : 502;
    return NextResponse.json(
      { error: "Unexpected error while fetching Qiita items" },
      { status }
    );
  }
}
