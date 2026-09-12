import React, { useState } from 'react';
import { Calculator as CalcIcon, TrendingUp, Send, CheckCircle2, IndianRupee, Sparkles, ArrowRight, Crown, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { COMPANY_DETAILS } from '../data';

export const Calculator: React.FC = () => {
  const [serviceType, setServiceType] = useState<'ads' | 'seo' | 'web' | 'app'>('ads');
  const [adSpend, setAdSpend] = useState<number>(25000);
  const [averageDealValue, setAverageDealValue] = useState<number>(5000);
  const [webPages, setWebPages] = useState<number>(1);
  const [appComplexity, setAppComplexity] = useState<'starter' | 'business' | 'custom'>('business');
  const [seoTier, setSeoTier] = useState<'local' | 'growth' | 'national'>('growth');

  // Calculations for Paid Ads
  const estimatedClicks = Math.round(adSpend / 22);
  const estimatedInquiries = Math.round(estimatedClicks * 0.038);
  const estimatedDeals = Math.max(1, Math.round(estimatedInquiries * 0.18));
  const estimatedRevenue = estimatedDeals * averageDealValue;
  const roasMultiplier = (estimatedRevenue / adSpend).toFixed(1);

  // Web estimate - starts at ₹5,000 for single page landing page
  const webEstimateInr = webPages === 1 ? 5000 : 5000 + (webPages - 1) * 1800;

  // SEO plans
  const seoPlans = {
    local: {
      title: 'Local SEO & Google Maps (GMB)',
      cost: '₹8,500 – ₹12,000 / mo',
      targetVisits: '~1,200 – 3,500 / mo',
      targetLeads: '20 – 45 calls & inquiries',
      timeline: 'Top 3 Map Pack in 60–90 Days',
      desc: 'Ideal for local clinics, retail showrooms, manufacturers & professional service providers looking to capture high-intent regional buyers.'
    },
    growth: {
      title: 'Commercial Keyword Ranking (Regional + State)',
      cost: '₹16,000 – ₹24,000 / mo',
      targetVisits: '~4,500 – 12,000 / mo',
      targetLeads: '60 – 140 high-intent leads',
      timeline: 'Page 1 Breakout in 90–120 Days',
      desc: 'Target competitive commercial keywords, fix Technical Core Web Vitals, and build domain authority against top state competitors.'
    },
    national: {
      title: 'National Enterprise & E-Commerce SEO',
      cost: '₹28,000 – ₹45,000 / mo',
      targetVisits: '~20,000 – 60,000+ / mo',
      targetLeads: '150 – 400+ organic conversions',
      timeline: 'Compounding Velocity (4–6 Months)',
      desc: 'Complete technical architecture, category page optimization, programmatic SEO, and high-DA editorial outreach for nationwide dominance.'
    }
  };

  // App estimate
  const appEstimates = {
    starter: { range: '₹45,000 – ₹75,000', weeks: '3 – 4 Weeks' },
    business: { range: '₹80,000 – ₹1,50,000', weeks: '4 – 6 Weeks' },
    custom: { range: '₹1,50,000+', weeks: '6 – 10 Weeks' },
  };

  const getWhatsAppUrl = () => {
    let summary = '';
    if (serviceType === 'ads') {
      summary = `*Estimated Performance Marketing Plan*%0A` +
        `• Monthly Ad Spend: ₹${adSpend.toLocaleString('en-IN')}%0A` +
        `• Est. Target Clicks: ~${estimatedClicks}%0A` +
        `• Est. Inbound Inquiries: ~${estimatedInquiries}%0A` +
        `• Est. Revenue Generation: ~₹${estimatedRevenue.toLocaleString('en-IN')} (${roasMultiplier}x ROAS)%0A`;
    } else if (serviceType === 'seo') {
      summary = `*SEO Optimization & Ranking Plan*%0A` +
        `• Package: ${seoPlans[seoTier].title}%0A` +
        `• Monthly Retainer: ${seoPlans[seoTier].cost}%0A` +
        `• Est. Organic Traffic: ${seoPlans[seoTier].targetVisits}%0A` +
        `• Est. Inbound Leads: ${seoPlans[seoTier].targetLeads}%0A` +
        `• Expected Milestone: ${seoPlans[seoTier].timeline}%0A`;
    } else if (serviceType === 'web') {
      summary = `*Custom Website Inquiry Plan*%0A` +
        `• Selected Scope: ${webPages === 1 ? '1 Page (Single Page Starter - ₹5,000)' : `${webPages} Pages (Custom Multi-Page)`}%0A` +
        `• Estimated Project Investment: ₹${webEstimateInr.toLocaleString('en-IN')}%0A` +
        `• Includes Sub-2s Speed Optimization, SEO & Mobile-first Design%0A`;
    } else {
      summary = `*Custom Mobile App Project Plan*%0A` +
        `• Complexity Tier: ${appComplexity.toUpperCase()}%0A` +
        `• Estimated Bracket: ${appEstimates[appComplexity].range}%0A` +
        `• Estimated Delivery: ${appEstimates[appComplexity].weeks}%0A`;
    }

    const fullMsg = `Hello Widecraft Digital, I used your website estimator for a project plan:%0A%0A${summary}%0APlease let me know how we can proceed.`;
    return `${COMPANY_DETAILS.whatsappBaseUrl}?text=${fullMsg}`;
  };

  const tabs: { id: 'ads' | 'seo' | 'web' | 'app'; label: string }[] = [
    { id: 'ads', label: 'Google & Meta Ads ROI' },
    { id: 'seo', label: 'SEO Ranking & Traffic' },
    { id: 'web', label: 'Website Cost Estimate' },
    { id: 'app', label: 'Mobile App Scope' },
  ];

  return (
    <section id="calculator" className="py-24 relative overflow-hidden bg-[#050714]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3 border bg-[#0c1228] border-amber-500/30 text-amber-300"
          >
            <Crown className="w-3.5 h-3.5 text-amber-400" /> Interactive ROI & Scope Estimator
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white"
          >
            Calculate Your Projected{' '}
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-300 bg-clip-text text-transparent">
              Investment & Return
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg mt-3 max-w-2xl mx-auto leading-relaxed text-slate-300"
          >
            Test our benchmark assumptions for performance campaigns, customized web builds, or mobile applications.
          </motion.p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl border max-w-full overflow-x-auto bg-[#0c1228] border-amber-500/25">
            {tabs.map((tab) => {
              const isActive = serviceType === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setServiceType(tab.id)}
                  className={`relative px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-slate-950 font-black'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCalculatorTab"
                      className="absolute inset-0 rounded-xl shadow-md bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Calculator Body with animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={serviceType}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="rounded-3xl p-6 sm:p-10 border shadow-2xl bg-[#0a0f24] border-amber-500/25 text-white"
          >
            {serviceType === 'ads' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <div className="flex justify-between items-center text-sm font-semibold mb-2">
                      <span className="text-slate-300">
                        Planned Monthly Ad Budget
                      </span>
                      <span className="text-amber-400 font-extrabold text-base">
                        ₹{adSpend.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10000"
                      max="200000"
                      step="5000"
                      value={adSpend}
                      onChange={(e) => setAdSpend(Number(e.target.value))}
                      className="w-full accent-amber-400 cursor-pointer h-2 rounded-lg bg-slate-800"
                    />
                    <div className="flex justify-between text-[11px] mt-1 text-slate-400">
                      <span>₹10,000 / mo</span>
                      <span>₹1,00,000 / mo</span>
                      <span>₹2,00,000+ / mo</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center text-sm font-semibold mb-2">
                      <span className="text-slate-300">
                        Average Deal / Order Value (AOV)
                      </span>
                      <span className="text-emerald-400 font-extrabold text-base">
                        ₹{averageDealValue.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1000"
                      max="50000"
                      step="1000"
                      value={averageDealValue}
                      onChange={(e) => setAverageDealValue(Number(e.target.value))}
                      className="w-full accent-emerald-400 cursor-pointer h-2 rounded-lg bg-slate-800"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                      <span>₹1,000</span>
                      <span>₹25,000</span>
                      <span>₹50,000+</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border text-xs leading-relaxed bg-[#060918] border-amber-500/20 text-slate-300">
                    Based on typical Meta & Google Search benchmarks for Indian SME service & eCommerce campaigns:
                    CPC ~ ₹22, inquiry conversion ~ 3.8%, close rate ~ 18%.
                  </div>
                </div>

                {/* Ads Result Preview Box */}
                <div className="lg:col-span-5 p-6 sm:p-7 rounded-2xl border flex flex-col justify-between space-y-6 bg-gradient-to-br from-[#0c1228] to-[#070b1a] border-amber-500/30 shadow-xl">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-amber-500/20">
                      <span className="text-xs text-slate-400">
                        Estimated Monthly Clicks
                      </span>
                      <span className="font-bold text-white">
                        ~{estimatedClicks}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pb-3 border-b border-amber-500/20">
                      <span className="text-xs text-slate-400">
                        Target Inbound Inquiries
                      </span>
                      <span className="font-bold text-amber-300">~{estimatedInquiries} leads</span>
                    </div>

                    <div className="flex items-center justify-between pb-3 border-b border-amber-500/20">
                      <span className="text-xs text-slate-400">
                        Projected Closed Sales
                      </span>
                      <span className="font-bold text-emerald-400">~{estimatedDeals} deals</span>
                    </div>

                    <div className="pt-2">
                      <span className="text-xs font-semibold block mb-1 text-amber-400">
                        Est. Revenue Potential
                      </span>
                      <div className="text-2xl sm:text-3xl font-black text-white">
                        ₹{estimatedRevenue.toLocaleString('en-IN')}
                      </div>
                      <span className="text-xs font-bold mt-1 inline-block text-emerald-400">
                        &bull; {roasMultiplier}x Return on Ad Spend (ROAS)
                      </span>
                    </div>
                  </div>

                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl text-xs font-black text-slate-950 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:brightness-110 transition flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 active:scale-95"
                  >
                    <Send className="w-4 h-4 text-slate-950" />
                    <span>Send This Plan to WhatsApp</span>
                  </a>
                </div>
              </div>
            )}

            {serviceType === 'seo' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <span className="text-xs font-semibold block mb-2.5 text-slate-300">
                      Select SEO Campaign Scope
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {(['local', 'growth', 'national'] as const).map((tier) => (
                        <button
                          key={tier}
                          type="button"
                          onClick={() => setSeoTier(tier)}
                          className={`p-3.5 rounded-xl border text-left transition ${
                            seoTier === tier
                              ? 'border-amber-400 bg-amber-500/15 text-amber-200 ring-2 ring-amber-500/30'
                              : 'border-slate-800 bg-[#060918] hover:border-amber-500/40 text-slate-300'
                          }`}
                        >
                          <div className="capitalize font-bold text-xs sm:text-sm text-white">
                            {tier === 'local' && 'Local / GMB'}
                            {tier === 'growth' && 'Regional Growth'}
                            {tier === 'national' && 'Pan-India / D2C'}
                          </div>
                          <div className="text-[10px] mt-1 text-slate-400">
                            {tier === 'local' && 'Map Pack Ranking'}
                            {tier === 'growth' && 'Commercial Search'}
                            {tier === 'national' && 'High-Volume Scale'}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border space-y-2 bg-[#060918] border-amber-500/20 text-slate-300">
                    <h4 className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <Search className="w-3.5 h-3.5 text-amber-400" />
                      {seoPlans[seoTier].title}
                    </h4>
                    <p className="text-xs leading-relaxed text-slate-300">
                      {seoPlans[seoTier].desc}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl border bg-[#060918] border-amber-500/20">
                      <span className="text-slate-400 block text-[11px]">Primary Focus</span>
                      <span className="font-semibold text-white">On-Page + Tech SEO + Schema</span>
                    </div>
                    <div className="p-3 rounded-xl border bg-[#060918] border-amber-500/20">
                      <span className="text-slate-400 block text-[11px]">Zero Click Ad Cost</span>
                      <span className="font-semibold text-emerald-400">Permanent Free Traffic</span>
                    </div>
                  </div>
                </div>

                {/* SEO Result Preview Box */}
                <div className="lg:col-span-5 p-6 sm:p-7 rounded-2xl border flex flex-col justify-between space-y-6 bg-gradient-to-br from-[#0c1228] to-[#070b1a] border-amber-500/30 shadow-xl">
                  <div className="space-y-4">
                    <div className="pb-3 border-b border-amber-500/20">
                      <span className="text-xs font-semibold uppercase tracking-wider block mb-1 text-amber-400">
                        Monthly Retainer Bracket
                      </span>
                      <div className="text-2xl sm:text-3xl font-black text-white">
                        {seoPlans[seoTier].cost}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pb-3 border-b border-amber-500/20">
                      <span className="text-xs text-slate-400">Target Organic Reach</span>
                      <span className="font-bold text-white">{seoPlans[seoTier].targetVisits}</span>
                    </div>

                    <div className="flex items-center justify-between pb-3 border-b border-amber-500/20">
                      <span className="text-xs text-slate-400">Expected Inbound Leads</span>
                      <span className="font-bold text-amber-300">{seoPlans[seoTier].targetLeads}</span>
                    </div>

                    <div>
                      <span className="text-xs block text-slate-400">Ranking Milestone Expectation</span>
                      <span className="text-xs font-semibold text-emerald-400">{seoPlans[seoTier].timeline}</span>
                    </div>
                  </div>

                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl text-xs font-black text-slate-950 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:brightness-110 transition flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 active:scale-95"
                  >
                    <Send className="w-4 h-4 text-slate-950" />
                    <span>Get Free SEO Audit on WhatsApp</span>
                  </a>
                </div>
              </div>
            )}

            {serviceType === 'web' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-6">
                  {/* Preset Quick Selectors */}
                  <div>
                    <span className="text-xs font-semibold block mb-2.5 text-slate-300">
                      Popular Website Packages
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setWebPages(1)}
                        className={`p-3 rounded-xl border text-left transition ${
                          webPages === 1
                            ? 'border-amber-400 bg-amber-500/15 text-amber-200 ring-2 ring-amber-500/30'
                            : 'border-slate-800 bg-[#060918] hover:border-amber-500/40 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs sm:text-sm text-white">1 Page Starter</span>
                          <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            ₹5,000
                          </span>
                        </div>
                        <p className="text-[10px] mt-1 text-slate-400">
                          Landing Page / Lead Funnel
                        </p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setWebPages(5)}
                        className={`p-3 rounded-xl border text-left transition ${
                          webPages === 5
                            ? 'border-amber-400 bg-amber-500/15 text-amber-200 ring-2 ring-amber-500/30'
                            : 'border-slate-800 bg-[#060918] hover:border-amber-500/40 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs sm:text-sm text-white">5 Pages</span>
                          <span className="text-[10px] font-bold text-amber-300">
                            ₹12,200
                          </span>
                        </div>
                        <p className="text-[10px] mt-1 text-slate-400">
                          Small Business Showcase
                        </p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setWebPages(10)}
                        className={`p-3 rounded-xl border text-left transition ${
                          webPages === 10
                            ? 'border-amber-400 bg-amber-500/15 text-amber-200 ring-2 ring-amber-500/30'
                            : 'border-slate-800 bg-[#060918] hover:border-amber-500/40 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs sm:text-sm text-white">10 Pages</span>
                          <span className="text-[10px] font-bold text-amber-300">
                            ₹21,200
                          </span>
                        </div>
                        <p className="text-[10px] mt-1 text-slate-400">
                          Full Corporate Portal
                        </p>
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center text-sm font-semibold mb-2">
                      <span className="text-slate-300">
                        Custom Page Count / Scope
                      </span>
                      <span className="text-amber-400 font-extrabold text-base">
                        {webPages} {webPages === 1 ? 'Page (Single Page Starter)' : 'Pages'}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="25"
                      value={webPages}
                      onChange={(e) => setWebPages(Number(e.target.value))}
                      className="w-full accent-amber-400 cursor-pointer h-2 rounded-lg bg-slate-800"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                      <span className="text-amber-300 font-bold">1 Page (Starts ₹5,000)</span>
                      <span>10 Pages (Corporate)</span>
                      <span>25+ Pages (Portal)</span>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <div className="text-xs font-bold uppercase tracking-wider text-amber-300">
                      Included with Every Website:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-2 text-amber-400">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span className="text-slate-300">
                          Sub-2s Speed Optimization
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-amber-400">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span className="text-slate-300">
                          SEO Schema & Meta Tags
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-amber-400">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span className="text-slate-300">
                          Direct WhatsApp & Call Triggers
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-amber-400">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span className="text-slate-300">
                          SSL & Security Hardening
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Web Result Preview */}
                <div className="lg:col-span-5 p-6 sm:p-7 rounded-2xl border flex flex-col justify-between space-y-6 bg-gradient-to-br from-[#0c1228] to-[#070b1a] border-amber-500/30 shadow-xl">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                        Estimated Project Investment
                      </span>
                      {webPages === 1 && (
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300">
                          Starts at ₹5,000
                        </span>
                      )}
                    </div>
                    <div className="text-3xl font-black text-white">
                      ₹{webEstimateInr.toLocaleString('en-IN')}
                    </div>
                    <p className="text-xs mt-2 leading-relaxed text-slate-300">
                      {webPages === 1
                        ? 'Starter Single-Page Plan: Complete high-converting landing page with hero banner, service highlights, WhatsApp click-to-chat, and mobile-first responsiveness.'
                        : 'Complete custom multi-page build. Includes responsive design, high-speed hosting setup, domain DNS configuration, and 30 days of post-launch maintenance.'}
                    </p>
                  </div>

                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl text-xs font-black text-slate-950 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:brightness-110 transition flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 active:scale-95"
                  >
                    <Send className="w-4 h-4 text-slate-950" />
                    <span>Get Exact Quote on WhatsApp</span>
                  </a>
                </div>
              </div>
            )}

            {serviceType === 'app' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <span className="text-sm font-semibold block mb-3 text-slate-300">
                      Select App Architecture & Complexity
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {(['starter', 'business', 'custom'] as const).map((tier) => (
                        <button
                          key={tier}
                          onClick={() => setAppComplexity(tier)}
                          className={`p-3.5 rounded-xl border text-left transition ${
                            appComplexity === tier
                              ? 'border-amber-400 bg-amber-500/15 text-amber-200 ring-2 ring-amber-500/30'
                              : 'border-slate-800 bg-[#060918] hover:border-amber-500/40 text-slate-300'
                          }`}
                        >
                          <div className="capitalize font-bold text-xs sm:text-sm text-white">
                            {tier}
                          </div>
                          <div className="text-[10px] mt-1 text-slate-400">
                            {tier === 'starter' && 'MVP / Catalog'}
                            {tier === 'business' && 'Bookings / Auth'}
                            {tier === 'custom' && 'Realtime / Scale'}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border text-xs leading-relaxed bg-[#060918] border-amber-500/20 text-slate-300">
                    Built with modern cross-platform stacks (React Native / Flutter) so your app publishes to both{' '}
                    <strong className="text-white font-bold">Google Play Store</strong> and{' '}
                    <strong className="text-white font-bold">Apple App Store</strong> with a single codebase.
                  </div>
                </div>

                {/* App Result Preview */}
                <div className="lg:col-span-5 p-6 sm:p-7 rounded-2xl border flex flex-col justify-between space-y-6 bg-gradient-to-br from-[#0c1228] to-[#070b1a] border-amber-500/30 shadow-xl">
                  <div className="space-y-3">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider block mb-1 text-amber-400">
                        Estimated Budget Bracket
                      </span>
                      <div className="text-2xl sm:text-3xl font-black text-white">
                        {appEstimates[appComplexity].range}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-amber-500/20">
                      <span className="text-xs block text-slate-400">Typical Delivery Duration</span>
                      <span className="text-sm font-bold text-amber-300">
                        {appEstimates[appComplexity].weeks}
                      </span>
                    </div>
                  </div>

                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl text-xs font-black text-slate-950 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:brightness-110 transition flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 active:scale-95"
                  >
                    <Send className="w-4 h-4 text-slate-950" />
                    <span>Discuss App Scope on WhatsApp</span>
                  </a>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
