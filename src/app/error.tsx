'use client';

import { useEffect } from "react";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <div className="rounded-xl border border-card-border bg-card p-6">
      <h2 className="text-lg font-semibold text-foreground">
        予期しないエラーが発生しました
      </h2>
      <p className="mt-2 text-sm text-muted">
        もう一度お試しください。改善しない場合は時間を置いて再度アクセスしてください。
      </p>
      <button
        type="button"
        onClick={() => unstable_retry()}
        className="mt-4 rounded-md border border-card-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-accent"
      >
        再試行
      </button>
    </div>
  );
}

