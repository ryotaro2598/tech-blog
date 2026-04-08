import { QiitaResponse, MicrocmsResponse } from "../../domain/Article";
import axios from "axios";
import Image from "next/image";

// Server Componentでの非同期処理。
export default async function Home() {

  // コンポーネント内で直接awaitを使ってデータ取得ができます。従来のReactのようにuseEffectフックを使う必要がありません。
  const getQiitaItems = async () => {
    const response = await axios.get<QiitaResponse[]>(
      "https://qiita.com/api/v2/items?query=user:Sicut_study&per_page=4",
      {
        headers: {
          "Authorization": `Bearer ${process.env.QIITA_API_KEY}`
        }
      }
    );
    return response.data.map((item) => ({
      id: item.id,
      title: item.title,
      url: item.url,
      image: "https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F810513%2F04c6ef92-7b08-467f-95b0-efd05a0e7ea4.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&w=1400&fit=max&s=255a4084e07534dc5871b77aa1318d0e"
    }));
  }

  const getMicrocmsItems = async () => {
    const response = await axios.get<MicrocmsResponse>(
      "https://9bftk8xb72.microcms.io/api/v1/blogs",
      {
        headers: {
          "X-MICROCMS-API-KEY": `${process.env.MICROCMS_API_KEY}`
        }
      }
    );

    return response.data.contents.map((item) => ({
      id: item.id,
      title: item.title,
      url: `/blogs/${item.id}`,
      image: item.eyecatch.url
    }));
  }
  const qiitaItems = await getQiitaItems();
  const microcmsItems = await getMicrocmsItems();

  return (
    <div>
      <h1>Topページ</h1>
      <ul>
        {qiitaItems.map((item) => (
          <li key={item.id}>
            {/* 通常のHTMLの<img>タグの代わりに使えるImageコンポーネントが用意されています。このコンポーネントを使うことで、画像の最適化やパフォーマンス向上を自動的に行ってくれます。 */}
            {/* Imageコンポーネントには必須のプロパティがいくつかあります。srcは画像のURL、altは画像の説明文（アクセシビリティやSEOに重要）、そしてwidthとheightは画像の幅と高さをピクセル単位で指定します。主な利点として、WebPなどの次世代フォーマットへの自動変換、遅延読み込み（Lazy Loading）のデフォルト有効化、レイアウトシフトの防止などがあります。 */}
            <Image src={item.image} alt={item.title} width={100} height={100} />
            <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
          </li>
        ))}
      </ul>
      <ul>
        {microcmsItems.map((item) => (
          <li key={item.id}>
            <Image src={item.image} alt={item.title} width={100} height={100} />
            <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
