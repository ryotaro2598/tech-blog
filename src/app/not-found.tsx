import Link from "next/link";

export default function NotFound() {
  return (
    <div className="rounded-xl border border-card-border bg-card p-6">
      <h1 className="text-lg font-semibold text-foreground">
        ページが見つかりません
      </h1>
      <p className="mt-2 text-sm text-muted">
        URLが間違っているか、ページが削除された可能性があります。
      </p>
      <div className="mt-4">
        <Link
          href="/"
          className="text-sm font-medium text-muted transition-colors hover:text-accent"
        >
          &larr; ホームへ戻る
        </Link>
      </div>
    </div>
  );
}

