import React, { useState } from 'react';
import {
  Apple,
  ShieldCheck,
  Award,
  Sparkles,
  Mail,
  Send,
  MessageSquare,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  Phone,
  MapPin,
  Heart
} from 'lucide-react';

export const AboutContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Question',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: 'General Question',
        message: '',
      });
    }, 3000);
  };

  const faqs = [
    {
      q: 'Where do NutriLife nutritional values originate from?',
      a: 'All data points are derived from verified public nutrition databases, primarily the USDA FoodData Central and the Indian Council of Medical Research (ICMR-NIN) Indian Food Composition Tables (IFCT). Estimates are clearly marked and never fabricated.',
    },
    {
      q: 'How does the Mifflin-St Jeor TDEE calculator work?',
      a: 'It computes your Basal Metabolic Rate (BMR) from biological sex, weight, height, and age, then scales it with standard physical activity multipliers (1.2 to 1.725) to provide an accurate baseline daily energy expenditure.',
    },
    {
      q: 'Is my logged food and personal profile private?',
      a: 'Yes, 100%. All meal logs, water tracker data, and customized target preferences are stored locally in your browser storage. Your dietary logs are never sold or shared.',
    },
    {
      q: 'Can this replace a doctor’s dietary prescription?',
      a: 'No. NutriLife provides generalized educational nutrition estimates. Individuals with medical conditions such as Type 1 or 2 Diabetes, renal diseases, gastrointestinal syndromes, or eating disorder histories must consult their clinical physician or registered dietitian.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* 1. ABOUT US HERO */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
          Our Scientific Philosophy
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight font-['Outfit']">
          About NutriLife
        </h1>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          At NutriLife, our mission is simple: demystify nutrition so everyone can eat smarter and live healthier. We replace restrictive fads with empirical macronutrient science, portion awareness, and celebrated cultural dishes.
        </p>
      </div>

      {/* 3 Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-gray-200/90 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 font-['Outfit']">
            USDA & ICMR Accuracy
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Nutritional facts are cross-referenced with accredited food composition tables. We do not invent values or promote unverified health claims.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-gray-200/90 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 font-['Outfit']">
            Global & Indian Heritage
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            From overnight chia oats to homemade moong dal khichdi, roti, paneer, and steamed idlis, we celebrate wholesome cultural foods with balanced macro ratios.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-gray-200/90 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 font-['Outfit']">
            Mindful, Sustainable Habits
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            We focus on long-term vitality, muscle retention, and adequate hydration rather than guilt-driven restriction or unsustainable crash diets.
          </p>
        </div>
      </div>

      {/* 2. MEDICAL & NUTRITIONAL DISCLAIMER */}
      <div className="rounded-3xl bg-amber-50/70 border border-amber-200 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3 text-amber-800">
          <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
          <h2 className="text-lg font-bold font-['Outfit']">
            Important Medical & Nutritional Disclaimer
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-amber-950/80 leading-relaxed">
          The content, calculators, recipes, and blogs provided on NutriLife are created solely for general educational and informational purposes. The nutritional information is based on scientific estimates from standard food composition tables. NutriLife does not offer personalized medical diagnoses, medical nutrition therapy, or prescription diets. Nutritional needs vary significantly based on health history, medications, pregnancy, age, and individual metabolic rates. Always consult with a licensed physician, clinical dietitian, or certified medical specialist before initiating any major dietary transformation.
        </p>
      </div>

      {/* 3. CONTACT FORM & FAQs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Contact Form */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/90 shadow-xs space-y-5">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              Get in Touch
            </span>
            <h2 className="text-2xl font-bold text-gray-900 font-['Outfit'] mt-2">
              Contact Our Nutrition Team
            </h2>
            <p className="text-xs text-gray-500">
              Have questions, feedback, recipe suggestions, or need clinical clarification? Send us a note.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="text-base font-bold text-emerald-950 font-['Outfit']">
                Message Sent Successfully!
              </h3>
              <p className="text-xs text-emerald-800">
                Thank you for reaching out. A certified dietitian will review your query within 24-48 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priyanka Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Subject</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="General Question">General Question</option>
                  <option value="Recipe Suggestion">Recipe or Food Request</option>
                  <option value="Nutritional Correction">Nutritional Data Feedback</option>
                  <option value="Editorial Inquiry">Consultation / Editorial Inquiry</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Your Message</label>
                <textarea
                  required
                  rows={4}
                  placeholder="How can we assist your nutrition journey?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-md shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Message</span>
              </button>
            </form>
          )}
        </div>

        {/* Right: FAQs */}
        <div className="lg:col-span-6 space-y-4">
          <div className="mb-2">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl font-bold text-gray-900 font-['Outfit'] mt-2">
              Clear Answers to Nutrition Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs space-y-2"
              >
                <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2 font-['Outfit']">
                  <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          {/* Direct contact note */}
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 text-xs text-gray-600 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-600" />
              <span>Direct inquiries: <strong>hello@nutrilife.health</strong></span>
            </div>
            <span className="text-emerald-700 font-semibold">Available Mon-Fri</span>
          </div>
        </div>
      </div>
    </div>
  );
};
