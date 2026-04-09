'use cache';

import { MicrocmsResponse } from "../../../domain/Article";
import Image from "next/image";
import Link from "next/link";

type BlogCard = {
  id: string;
  title: string;
  url: string;
  image: string;
};

async function getBlogs(): Promise<BlogCard[]> {
  const apiKey = process.env.MICROCMS_API_KEY;
  if (!apiKey) throw new Error("MICROCMS_API_KEY is not set");

  const res = await fetch("https://9bftk8xb72.microcms.io/api/v1/blogs", {
    headers: {
      "X-MICROCMS-API-KEY": apiKey,
    },
    cache: "force-cache",
    signal: AbortSignal.timeout(8000),
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch blogs (status: ${res.status})`);
  }

  const data = (await res.json()) as MicrocmsResponse;
  return (data.contents ?? []).map((item) => ({
    id: item.id,
    title: item.title,
    url: `/blogs/${item.id}`,
    image: item.eyecatch.url,
  }));
}

export default async function Blogs() {
  const blogs = await getBlogs();

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">Blogs</h1>
        <p className="mt-2 text-muted">MicroCMS で管理しているブログ記事一覧</p>
      </div>

      {/* Article Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <Link
            key={blog.id}
            href={blog.url}
            className="group overflow-hidden rounded-xl border border-card-border bg-card transition-all hover:border-accent hover:shadow-lg"
          >
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h2 className="line-clamp-2 text-base font-semibold leading-snug text-foreground group-hover:text-accent">
                {blog.title}
              </h2>
              <span className="mt-3 inline-block rounded-full bg-accent-bg px-2.5 py-0.5 text-xs font-medium text-accent">
                Blog
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
