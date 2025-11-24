"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
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
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useAnimationProps } from "@/lib/hooks/useAnimationProps";
import type { BlogSectionProps } from "@/types";

interface BlogCardProps {
  post: BlogSectionProps["posts"][0];
  index: number;
  isInView: boolean;
}

function BlogCard({ post, index, isInView }: BlogCardProps) {
  const cardAnimation = useAnimationProps({
    variants: fadeInUp,
    isInView,
    delay: index * 0.1,
  });

  return (
    <motion.div {...cardAnimation}>
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
            <Badge variant="secondary">{post.category}</Badge>
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
            className="text-primary-ocean hover:text-primary-aqua font-medium text-sm transition-colors"
          >
            Ler mais →
          </Link>
        </div>
      </Card>
    </motion.div>
  );
}

export function Blog({ title, posts, ctaLink }: BlogSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const headerAnimation = useAnimationProps({ isInView });
  const containerAnimation = useAnimationProps({
    variants: staggerContainer,
    isInView,
  });
  const ctaAnimation = useAnimationProps({ isInView, delay: 0.4 });

  return (
    <section id="blog" ref={ref} className="py-section bg-primary-sea/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...headerAnimation} className="text-center mb-12">
          <h2 className="text-h2 font-bold text-white mb-4">{title}</h2>
          <p className="text-body text-white max-w-2xl mx-auto">
            Descubra histórias fascinantes sobre o mar, a pesca e nossa cultura
            marítima
          </p>
        </motion.div>

        <motion.div
          {...containerAnimation}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {posts.map((post, index) => (
            <BlogCard
              key={post.id}
              post={post}
              index={index}
              isInView={isInView}
            />
          ))}
        </motion.div>

        <motion.div {...ctaAnimation} className="text-center">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border border-white hover:border-primary-sea hover:bg-primary-sea rounded-md p-4 text-white"
          >
            <Link href={ctaLink}>Ver Todos os Artigos</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
