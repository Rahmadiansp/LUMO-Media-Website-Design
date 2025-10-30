import { useState } from "react";
import { HeadlineNews } from "./HeadlineNews";
import { NewsCard } from "./NewsCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface Article {
  id: string;
  title: string;
  author: string;
  category: string;
  date: string;
  reads: number;
  gradient: string;
  glowbitsReward: number;
  content: string;
  type: "editorial" | "user-generated";
}

interface FeedsProps {
  articles: Article[];
  onArticleClick: (article: Article) => void;
}

export function Feeds({ articles, onArticleClick }: FeedsProps) {
  const editorialArticles = articles.filter(article => article.type === "editorial");
  const userGeneratedArticles = articles.filter(article => article.type === "user-generated");

  return (
    <div className="space-y-8">
      {/* Headline News - Top Stories */}
      <HeadlineNews 
        articles={articles}
        onArticleClick={onArticleClick}
      />

      {/* Berita Section dengan Tabs */}
      <div>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 rounded-2xl p-1 bg-gray-100">
            <TabsTrigger value="all" className="rounded-xl">
              Semua Berita
            </TabsTrigger>
            <TabsTrigger value="editorial" className="rounded-xl">
              Redaksi LUMO
            </TabsTrigger>
            <TabsTrigger value="user" className="rounded-xl">
              Dari Pembaca
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.map((article) => (
                <NewsCard
                  key={article.id}
                  title={article.title}
                  author={article.author}
                  reads={article.reads}
                  gradient={article.gradient}
                  category={article.category}
                  earnedGlowbits={article.glowbitsReward}
                  onClick={() => onArticleClick(article)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="editorial">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {editorialArticles.map((article) => (
                <NewsCard
                  key={article.id}
                  title={article.title}
                  author={article.author}
                  reads={article.reads}
                  gradient={article.gradient}
                  category={article.category}
                  earnedGlowbits={article.glowbitsReward}
                  onClick={() => onArticleClick(article)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="user">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userGeneratedArticles.map((article) => (
                <NewsCard
                  key={article.id}
                  title={article.title}
                  author={article.author}
                  reads={article.reads}
                  gradient={article.gradient}
                  category={article.category}
                  earnedGlowbits={article.glowbitsReward}
                  onClick={() => onArticleClick(article)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
