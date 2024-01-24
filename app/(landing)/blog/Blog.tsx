"use client";

import Image from "next/image";
import Link from "next/link";

import { localImageLoader } from "app/lib/utils";

interface BlogProps {
  title: string;
  slug: string;
}
export default function Blog(props: BlogProps) {
  return (
    <Link href={`/blog/${props.slug}`}>
      <article className="relative h-[384px] w-full bg-slate-400 rounded-2xl bg-gradient-to-t from-gray-900/50 to-gray-900/25 hover:shadow-xl">
        <Image
          alt="article image"
          src="https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&q=80"
          className="rounded-2xl opacity-85 inset-0 "
          loader={localImageLoader}
          fill
        />

        <div className="absolute bottom-0 pb-4 px-4 text-left">
          <div className="text-gray-100 font-bold w-full">
            <small>Date</small>
          </div>
          <div className="text-white font-bold">
            <p>{props.title}</p>
          </div>
        </div>
      </article>
    </Link>
  );
}
