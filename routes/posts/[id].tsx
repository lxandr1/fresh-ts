/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "https://deno.land/x/fresh@1.0.0/server.ts";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const handler: Handlers<Post> = {
  async GET(_req, ctx) {
    const id = ctx.params.id;
    const rawPost = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
    );
    const post = await rawPost.json();

    return ctx.render(post);
  },
};

export default function Post({ data }: PageProps<Post>) {
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <h1 class={tw`font-bold mb-2`}>{data.title}</h1>
      <p>{data.body}</p>
      <a
        class={tw
          `px-4 py-1 text-sm text-black-600 font-semibold border-solid border-2 border-sky-500 rounded float-right`}
        href={`/`}
      >
        Back
      </a>
    </div>
  );
}
