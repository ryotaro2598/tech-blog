'use server'; // 'use server'ディレクティブにより、このファイル全体がサーバー上でのみ実行されます。

// revalidatePathは、Next.jsが提供する関数で、指定したパスのキャッシュを無効化します。
// この関数を実行すると、/blogs/${id}のキャッシュが削除されて、次にユーザーがこのページにアクセスすると、サーバーが再度MicroCMS APIを呼び出します。
// そして最新データで新しいHTMLを生成して再びキャッシュされます。
import { revalidatePath } from "next/cache";

export async function reloadBlog(formData: FormData) {
  const id = formData.get("id") as string;
  revalidatePath(`/blogs/${id}`);
}
