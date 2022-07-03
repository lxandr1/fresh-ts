/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "https://deno.land/x/fresh@1.0.0/server.ts";
import Post from "./posts/[id].tsx";
import Posts from "../islands/Posts.tsx";

interface Post {
  [x: string]: any;
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const handler: Handlers<Post> = {
  async GET(_req, ctx) {
    const rawPosts = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    const posts = await rawPosts.json();

    return ctx.render(posts);
  },

  async POST(req, ctx) {
    const postBody = req.body?.getReader();
    const readBody: any = await postBody?.read();

    const decodeBody = new TextDecoder().decode(readBody.value);

    const body = Object.fromEntries(new URLSearchParams(decodeBody));

    console.log(body);

    const newPost = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    });

    console.log(`Post result => ${await newPost.text()}`);

    // Load data from api
    const rawPosts = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    const posts = await rawPosts.json();

    return ctx.render(posts);
  },
};

export default function Home({ data }: PageProps<Post>) {
  // Passing data to props

  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <img
        src="/logo.svg"
        height="100px"
        alt="the fresh logo: a sliced lemon dripping with juice"
      />
      <p class={tw`my-6`}>
        Fresh Framework from Deno
      </p>

      <h1 class={tw`mb-4 font-bold`}>Post List</h1>

      <Posts posts={data} />
    </div>
  );
}
