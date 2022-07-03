/** @jsx h */
import { h } from "preact";
import { useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { tw } from "@twind";

interface IProps {
  posts: {
    userId: number;
    id: number;
    title: string;
    body: string;
  }[];
}

export default function Posts(props: IProps) {
  const [posts, setPosts] = useState(props.posts);
  const [form, setForm] = useState({ title: "", body: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(form),
    });

    const newPostJson = await newPost.json();

    setPosts([
      ...posts,
      newPostJson,
    ]);
  };

  return (
    <div>
      <ul class={tw`list-disc`}>
        {posts.map((post) => {
          return (
            <li>
              <a href={`/posts/${post.id}`}>{post.title}</a>
            </li>
          );
        })}
      </ul>

      <form onSubmit={handleSubmit} class={tw`mt-5`}>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          value={form.title}
        />
        <input
          type="text"
          name="body"
          onChange={handleChange}
          value={form.body}
        />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}
