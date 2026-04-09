'use client';

import { QiitaResponse } from "../../../domain/Article";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Qiita() {
  const [qiitaItems, setQiitaItems] = useState<QiitaResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchQiitaItems = async () => {
    const response = await axios.get<QiitaResponse[]>("/api/qiita/items", {
      timeout: 8000,
    });
    return response.data ?? [];
  };

  useEffect(() => {
    let cancelled = false;

    setIsLoading(true);
    setErrorMessage(null);

    fetchQiitaItems()
      .then((items) => {
        if (cancelled) return;
        setQiitaItems(items);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        if (axios.isAxiosError(err)) {
          const status = err.response?.status;
          if (status === 429) {
            setErrorMessage(
              "現在アクセスが集中しています。しばらくしてから再試行してください。"
            );
            return;
          }
        }
        setErrorMessage("Qiitaの記事一覧の取得に失敗しました。");
      })
      .finally(() => {
        if (cancelled) return;
        setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">Qiita</h1>
        <p className="mt-2 text-muted">Qiita に投稿した技術記事一覧</p>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-card-border bg-card p-5"
            >
              <div className="skeleton mb-3 h-5 w-3/4" />
              <div className="skeleton mb-2 h-4 w-full" />
              <div className="skeleton h-4 w-1/2" />
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {!isLoading && errorMessage && (
        <div className="rounded-xl border border-card-border bg-card p-5">
          <p className="text-sm text-foreground">{errorMessage}</p>
          <button
            type="button"
            onClick={() => location.reload()}
            className="mt-3 rounded-md border border-card-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-qiita-green"
          >
            再読み込み
          </button>
        </div>
      )}

      {/* Article List */}
      {!isLoading && !errorMessage && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {qiitaItems.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-card-border bg-card p-5 transition-all hover:border-qiita-green hover:shadow-lg"
            >
              <h2 className="line-clamp-2 text-base font-semibold leading-snug text-foreground group-hover:text-qiita-green">
                {item.title}
              </h2>
              <div className="mt-3 flex items-center gap-2">
                <span className="inline-block rounded-full bg-qiita-green-light px-2.5 py-0.5 text-xs font-medium text-qiita-green">
                  Qiita
                </span>
                <span className="text-xs text-muted">外部リンク &nearr;</span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
