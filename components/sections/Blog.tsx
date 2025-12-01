"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { BlogSectionProps } from "@/types";

interface BlogCardProps {
  post: BlogSectionProps["posts"][0];
}

function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="h-full flex flex-col hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
        <Image
          src={post.thumbnail}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Badge variant="info">{post.category}</Badge>
          <time className="text-small text-neutral-gray-800">
            {new Date(post.publishedAt).toLocaleDateString("pt-BR")}
          </time>
        </div>
        <CardTitle className="text-xl">{post.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <CardDescription className="line-clamp-2">
          {post.excerpt}
        </CardDescription>
      </CardContent>
      <div className="px-6 pb-6">
        <Link
          href={`/blog/${post.slug}`}
          className="text-primary-sea hover:text-primary-aqua font-medium text-sm transition-colors"
        >
          Ler mais →
        </Link>
      </div>
    </Card>
  );
}

export function Blog({ title, posts, ctaLink }: BlogSectionProps) {
  return (
    <section id="blog" className="relative py-section bg-primary-sea/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-h2 font-bold text-white mb-4">{title}</h2>
          <p className="text-body text-white max-w-2xl mx-auto">
            Descubra histórias fascinantes sobre o mar, a pesca e nossa cultura
            marítima
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        <div className="text-center">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border rounded-full border-white hover:border-primary-sea hover:bg-primary-sea p-4 text-white"
          >
            <Link href={ctaLink} target="_blank">
              Ver Todos os Artigos
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
