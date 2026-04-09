import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl rounded-xl border border-card-border bg-card p-6">
      <h1 className="text-lg font-semibold text-foreground">
        ブログ記事が見つかりません
      </h1>
      <p className="mt-2 text-sm text-muted">
        記事が削除されたか、URLが間違っている可能性があります。
      </p>
      <div className="mt-4">
        <Link
          href="/blogs"
          className="text-sm font-medium text-muted transition-colors hover:text-accent"
        >
          &larr; ブログ一覧へ戻る
        </Link>
      </div>
    </div>
  );
}

