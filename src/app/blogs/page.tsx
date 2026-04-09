'use cache';

import { MicrocmsResponse } from "../../../domain/Article";
import axios from "axios";
import Image from "next/image";

export default async function Blogs() {

  const getBlogs = async () => {
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

  const blogs = await getBlogs();

  return (
    <div>
      <h1>Blogsページ</h1>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Image src={blog.image} alt={blog.title} width={100} height={100} />
            <a href={blog.url}>{blog.title}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
