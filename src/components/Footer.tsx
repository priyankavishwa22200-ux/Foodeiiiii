import React from 'react';
import { Apple, Heart, ShieldAlert, Award, Sparkles, Send, Mail } from 'lucide-react';
import { NavTab } from './Navbar';

interface FooterProps {
  onSelectTab: (tab: NavTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="bg-emerald-950 text-emerald-100 border-t border-emerald-900 mt-20">
      {/* Disclaimer Banner Highlight */}
      <div className="bg-emerald-900/80 border-b border-emerald-800/80 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-4 text-xs text-emerald-200/90 leading-relaxed">
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300 shrink-0 flex items-center justify-center">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-amber-200 uppercase tracking-wider text-[11px] block sm:inline sm:mr-2">
              Medical & Nutritional Disclaimer:
            </span>
            NutriLife is an educational and wellness reference tool designed to promote healthy lifestyle habits.
            The nutritional values, calorie estimations, and macronutrient targets provided are scientifically-derived estimates
            based on USDA and ICMR nutritional tables. They are not intended as medical prescriptions, diagnostic advice, or individualized medical dietary therapy. Always consult a qualified physician, registered dietitian, or clinical healthcare provider regarding specific medical conditions, metabolic disorders, food allergies, or pregnancy nutrition.
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-900/40">
                <Apple className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold font-['Outfit'] text-white">
                Nutri<span className="text-emerald-400">Life</span>
              </span>
            </div>
            <p className="text-sm text-emerald-300/80 leading-relaxed max-w-sm">
              Eat smart, live healthy. Discover verified nutritional profiles, track your daily calories with pinpoint precision, and discover wholesome global & Indian recipes crafted for vitality.
            </p>
            <div className="flex items-center gap-3 text-xs text-emerald-300">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-900/60 border border-emerald-800">
                <Award className="w-4 h-4 text-amber-400" />
                <span>USDA & ICMR References</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-900/60 border border-emerald-800">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Clean Whole Foods</span>
              </div>
            </div>
          </div>

          {/* Quick Tools */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wide mb-4 uppercase">
              Interactive Tools
            </h4>
            <ul className="space-y-2.5 text-sm text-emerald-200/80">
              <li>
                <button
                  onClick={() => onSelectTab('calculator')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Macro Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('dashboard')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Daily Calorie Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('compare')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Food Comparison Tool
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('database')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Nutrition Database (50+ Items)
                </button>
              </li>
            </ul>
          </div>

          {/* Recipes & Learn */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wide mb-4 uppercase">
              Explore & Learn
            </h4>
            <ul className="space-y-2.5 text-sm text-emerald-200/80">
              <li>
                <button
                  onClick={() => onSelectTab('recipes')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  High-Protein Meals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('recipes')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Indian Healthy Foods
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('blog')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Nutrition Science Articles
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('blog')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Debunking Food Myths
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wide mb-4 uppercase">
              Weekly Nutrition Digest
            </h4>
            <p className="text-xs text-emerald-300/80 mb-3">
              Get scientifically-grounded meal planning tips, macro advice, and seasonal produce guides.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you for subscribing to NutriLife Weekly!');
              }}
              className="space-y-2"
            >
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="w-full bg-emerald-900/60 border border-emerald-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-emerald-400/60 focus:outline-none focus:border-emerald-400"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              <span className="text-[11px] text-emerald-400/70 block">
                No spam. Unsubscribe at any time.
              </span>
            </form>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="border-t border-emerald-900 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-400/80 gap-3">
          <p>© {new Date().getFullYear()} NutriLife Platform. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => onSelectTab('about')} className="hover:text-white transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <button onClick={() => onSelectTab('about')} className="hover:text-white transition-colors cursor-pointer">
              Terms of Use
            </button>
            <button onClick={() => onSelectTab('about')} className="hover:text-white transition-colors cursor-pointer">
              Contact Editorial Board
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
