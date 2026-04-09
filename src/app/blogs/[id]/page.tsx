import { Suspense } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { MicrocmsContent } from "../../../../domain/Article";
import ReloadButton from "./ReloadButton";

function BlogDetailSkeleton() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="skeleton mb-6 h-8 w-1/3" />
      <div className="skeleton mb-8 aspect-video w-full rounded-xl" />
      <div className="space-y-3">
        <div className="skeleton h-5 w-full" />
        <div className="skeleton h-5 w-5/6" />
        <div className="skeleton h-5 w-4/6" />
        <div className="skeleton h-5 w-full" />
        <div className="skeleton h-5 w-3/4" />
      </div>
    </div>
  );
}

async function BlogContent({ params }: { params: Promise<{ id: string }> }) {
  "use cache";
  const { id } = await params;

  const response = await axios.get<MicrocmsContent>(
    `https://9bftk8xb72.microcms.io/api/v1/blogs/${id}`,
    {
      headers: {
        "X-MICROCMS-API-KEY": `${process.env.MICROCMS_API_KEY}`,
      },
    }
  );

  const blog = response.data;

  return (
    <article className="mx-auto max-w-3xl">
      {/* Back Link */}
      <Link
        href="/blogs"
        className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-muted transition-colors hover:text-accent"
      >
        &larr; ブログ一覧に戻る
      </Link>

      {/* Title */}
      <h1 className="mb-6 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
        {blog.title}
      </h1>

      {/* Eye Catch */}
      <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-xl border border-card-border">
        <Image
          src={blog.eyecatch.url}
          alt={blog.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      {/* Footer Actions */}
      <div className="mt-10 flex items-center justify-between border-t border-card-border pt-6">
        <Link
          href="/blogs"
          className="text-sm font-medium text-muted transition-colors hover:text-accent"
        >
          &larr; ブログ一覧に戻る
        </Link>
        <ReloadButton id={id} />
      </div>
    </article>
  );
}

export default function BlogDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<BlogDetailSkeleton />}>
      <BlogContent params={params} />
    </Suspense>
  );
}
