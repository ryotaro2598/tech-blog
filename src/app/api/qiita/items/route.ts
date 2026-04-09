import { NextResponse } from "next/server";

const QIITA_ITEMS_URL =
  "https://qiita.com/api/v2/items?query=user:Sicut_study&per_page=20";

export async function GET() {
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
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch Qiita items" },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
