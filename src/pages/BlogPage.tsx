import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  Clock,
  User,
  ArrowLeft,
  Share2,
  CheckCircle2,
  Sparkles,
  Bookmark,
  Calendar
} from 'lucide-react';
import { BLOG_POSTS } from '../data/blogData';
import { BlogPost } from '../types';

export const BlogPage: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Articles' },
    { id: 'Nutrition Science', label: 'Nutrition Science' },
    { id: 'Healthy Habits', label: 'Healthy Habits' },
    { id: 'Myths & Facts', label: 'Myths & Facts' },
    { id: 'Indian Nutrition', label: 'Indian Nutrition' },
    { id: 'Meal Planning', label: 'Meal Planning' },
  ];

  const filteredPosts = useMemo(() => {
    let list = [...BLOG_POSTS];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          p.content.some((c) => c.toLowerCase().includes(q))
      );
    }
    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }
    return list;
  }, [search, selectedCategory]);

  // Full article reader view
  if (selectedPost) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
        {/* Back button */}
        <button
          onClick={() => {
            setSelectedPost(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 bg-white border border-gray-200 hover:border-emerald-300 px-4 py-2 rounded-xl shadow-2xs cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Articles</span>
        </button>

        {/* Article Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wider">
              {selectedPost.category}
            </span>
            <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {selectedPost.readTime}
            </span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-500">{selectedPost.publishDate}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight font-['Outfit']">
            {selectedPost.title}
          </h1>

          {/* Author Capsule */}
          <div className="flex items-center gap-3 pt-2">
            <img
              src={selectedPost.author.avatar}
              alt={selectedPost.author.name}
              className="w-11 h-11 rounded-full object-cover ring-2 ring-emerald-500/20"
            />
            <div>
              <span className="text-sm font-bold text-gray-900 block">
                {selectedPost.author.name}
              </span>
              <span className="text-xs text-gray-500">{selectedPost.author.role}</span>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-200 h-72 sm:h-96 w-full">
          <img
            src={selectedPost.image}
            alt={selectedPost.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Key Takeaways Box */}
        <div className="p-6 rounded-3xl bg-[#FFFDF5] border border-amber-200/80 space-y-3">
          <h3 className="text-sm font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Key Clinical Takeaways
          </h3>
          <ul className="space-y-2">
            {selectedPost.takeaways.map((point, idx) => (
              <li key={idx} className="text-xs sm:text-sm text-gray-700 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Body Content Paragraphs */}
        <div className="prose prose-emerald max-w-none space-y-4 text-gray-700 text-sm sm:text-base leading-relaxed">
          {selectedPost.content.map((paragraph, idx) => (
            <p key={idx} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Article Footer & Return */}
        <div className="pt-8 border-t border-gray-200 flex items-center justify-between">
          <button
            onClick={() => {
              setSelectedPost(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Explore More Articles</span>
          </button>

          <span className="text-xs text-gray-400">
            NutriLife Editorial Review Board
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div className="max-w-3xl space-y-2">
        <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
          Science & Wellness Library
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight font-['Outfit']">
          Educational Nutrition Blog
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          Ground your eating habits in rigorous nutritional biochemistry. Articles written by registered dietitians breaking down macronutrients, myth busting, and budget-friendly superfoods.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-3xl border border-gray-200/90 shadow-xs space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles on Protein, Myths, Hydration, Indian Thali, Budget..."
            className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === c.id
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-gray-50 hover:bg-emerald-50 text-gray-700 hover:text-emerald-800 border border-gray-100'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Article Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            onClick={() => {
              setSelectedPost(post);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-white rounded-3xl border border-gray-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              {/* Thumbnail */}
              <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-emerald-800 shadow-xs">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Text */}
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-2 text-[11px] text-gray-400 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{post.readTime}</span>
                  <span>•</span>
                  <span>{post.publishDate}</span>
                </div>

                <h2 className="text-base font-bold text-gray-900 font-['Outfit'] group-hover:text-emerald-700 transition-colors line-clamp-2">
                  {post.title}
                </h2>

                <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                  {post.summary}
                </p>
              </div>
            </div>

            {/* Author Footer */}
            <div className="p-5 pt-0 border-t border-gray-50 flex items-center justify-between text-xs pt-3">
              <div className="flex items-center gap-2">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="font-semibold text-gray-700">{post.author.name}</span>
              </div>
              <span className="text-emerald-700 font-bold group-hover:underline">Read →</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
