import { motion } from "motion/react";
import { INSTAGRAM_POSTS } from "../data";
import { Instagram, Heart, MessageCircle, Play } from "lucide-react";

export default function SocialFeed() {
  return (
    <div className="space-y-6" id="social-instagram-workspace">
      {/* Social Title Panel */}
      <div className="text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 px-3.5 py-1 text-xs text-rose-400 font-mono tracking-wide uppercase">
          <Instagram className="h-3.5 w-3.5" />
          @otisandfinnbarbers
        </div>
        <h3 className="mt-2.5 font-display text-xl sm:text-2xl font-bold text-white uppercase tracking-tight">
          SOCIALLY IN TOUCH
        </h3>
        <p className="mt-1 text-xs text-zinc-400 max-w-sm mx-auto leading-normal">
          Explore day-to-day designs, grooming formulas, and street style, direct from our LIC & Brooklyn chairs.
        </p>
      </div>

      {/* Grid containing 6 premium interactive social cards */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6" id="social-posts-grid">
        {INSTAGRAM_POSTS.map((post, idx) => {
          return (
            <motion.a
              key={post.id}
              href="https://www.instagram.com/otisandfinnbarbers/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -4 }}
              className="group relative aspect-square overflow-hidden rounded-xl border border-zinc-c border-zinc-850 bg-zinc-950 block shadow-xl transition-all"
              id={`social-card-${post.id}`}
            >
              {/* Thumbnail image representation */}
              <img
                src={post.thumbnail}
                alt=""
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover grayscale brightness-90 contrast-105 transition-transform duration-500 group-hover:scale-110"
              />

              {/* Centered play icon representing visual video content */}
              <div className="absolute top-2.5 right-2.5 bg-black/60 rounded-full h-6 w-6 flex items-center justify-center text-white shrink-0 backdrop-blur-sm shadow z-10 border border-white/10 group-hover:bg-[#14b8a6] transition-colors">
                <Play className="h-2.5 w-2.5 fill-current text-white group-hover:text-black transition-colors" />
              </div>

              {/* Hover Overlay with Instagram statistics */}
              <div className="absolute inset-0 bg-black/80 z-20 flex flex-col justify-between p-4 opacity-0 transition-opacity group-hover:opacity-100 duration-300">
                {/* Stats Header */}
                <div className="flex justify-between items-center font-mono text-[10px] text-zinc-300">
                  <span className="flex items-center gap-1">
                    <Heart className="h-3 w-3 text-rose-500 fill-current" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1 font-bold">
                    <MessageCircle className="h-3 w-3 text-[#14b8a6] fill-currentColor" />
                    {post.comments}
                  </span>
                </div>

                {/* Subtitle Caption */}
                <p className="text-[10px] leading-relaxed text-zinc-300 line-clamp-4 font-sans select-none">
                  {post.caption}
                </p>

                {/* Bottom Trigger Label */}
                <span className="text-[8px] font-mono tracking-widest text-[#14b8a6] uppercase font-bold text-center block border-t border-zinc-850 pt-2">
                  EXPLORE INSTAGRAM ↗
                </span>
              </div>
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}
