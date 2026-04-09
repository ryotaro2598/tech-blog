'use client';

import { reloadBlog } from "./actions";

export default function ReloadButton({ id }: { id: string }) {
  return (
    // Server Actionsを使うと、クライアントコンポーネントからサーバー側の関数を直接呼び出せる
    <form action={reloadBlog}>
      <input type="hidden" name="id" value={id} />
      <button type="submit">再読み込み</button>
    </form>
  );
}
