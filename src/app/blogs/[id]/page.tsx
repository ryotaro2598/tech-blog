// 関数にasyncを使うことで、Server Componentの大きな特徴で、非同期処理を直接コンポーネント内で実行できる。
// Server Componentとは、サーバー上でのみ実行され、HTMLとして完成した状態でブラウザに送られるReactコンポーネントのことです。
async function BlogContent({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params; // 動的ルートのパラメータは非同期で取得する必要があるため、await paramsとして受け取ります。そこから分割代入でidを取り出しています。
    return (
      <div>
        <h1>BlogDetailページ</h1>
        <p>ID: {id}</p>
      </div>
    );
  }
  
  export default function BlogDetail({ params }: { params: Promise<{ id: string }> }) {
    return <BlogContent params={params} />;
  }
  