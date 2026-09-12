import React, { useState } from 'react';
import {
  MapPin,
  Search,
  CheckCircle2,
  ExternalLink,
  Phone,
  MessageSquare,
  Building2,
  Navigation,
  Globe2,
  Award,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { motion } from 'motion/react';
import { COMPANY_DETAILS } from '../data';

interface LocalCityCluster {
  id: string;
  name: string;
  tagline: string;
  coverageAreas: string[];
  primaryKeywords: string[];
  keyIndustries: string[];
  localHighlight: string;
}

const LOCAL_CLUSTERS: LocalCityCluster[] = [
  {
    id: 'mehsana-hq',
    name: 'Mehsana (Global HQ & Hub)',
    tagline: 'North Gujarat’s Premier Tech & Growth Headquarters',
    coverageAreas: [
      'Nagalpur',
      'Wide Angle Cinema Road',
      'Radhanpur Cross Road',
      'Modhera Road',
      'Dediyasan GIDC',
      'Palavasna',
      'Panchot Bypass',
      'Highway Mehsana',
    ],
    primaryKeywords: [
      'Digital Marketing Agency in Mehsana',
      'Website Design Company Mehsana',
      'Best SEO Agency in Mehsana',
      'Google Ads & PPC Management Mehsana',
      'Local Business GMB Maps Ranking Mehsana',
      'Mobile App Development Mehsana',
      'Web Developer near Wide Angle Cinema Nagalpur',
    ],
    keyIndustries: ['Engineering & Fabrication', 'Dairy & Agri Processing', 'Healthcare & Clinics', 'Retail Showrooms', 'Educational Institutes'],
    localHighlight: 'Headquartered at G 304 Himalaya Royal Villa with on-ground local support, personal strategy sessions, and rapid in-person consultations.',
  },
  {
    id: 'ahmedabad-metro',
    name: 'Ahmedabad & Gandhinagar',
    tagline: 'Capital Metro & High-Growth Startup Corridor',
    coverageAreas: [
      'SG Highway',
      'Sindhu Bhavan Road (SBR)',
      'Prahlad Nagar',
      'GIFT City Gandhinagar',
      'Infocity Gandhinagar',
      'Kudasan',
      'Chandkheda',
      'Bodakdev & Vastrapur',
    ],
    primaryKeywords: [
      'Digital Marketing Agency Ahmedabad',
      'Web Development SG Highway Ahmedabad',
      'Performance Marketing Meta Ads Ahmedabad',
      'Tech App Development GIFT City Gandhinagar',
      'B2B Lead Generation Agency Ahmedabad',
      'E-Commerce Shopify Developer Ahmedabad',
    ],
    keyIndustries: ['FinTech & IT at GIFT City', 'B2B Corporate Enterprises', 'Real Estate & Builders', 'Pharma & Chemical', 'High-Growth D2C Brands'],
    localHighlight: 'Rapid project delivery for Ahmedabad enterprises seeking high-converting websites and scalable ROAS campaigns without exorbitant agency retainers.',
  },
  {
    id: 'north-gujarat',
    name: 'North Gujarat Growth Belt',
    tagline: 'Visnagar, Patan, Unjha, Kadi, Kalol & Palanpur',
    coverageAreas: [
      'Visnagar (Hospital & Education Hub)',
      'Unjha (World’s Largest APMC Spice Market)',
      'Patan (Textile & University City)',
      'Kadi GIDC (Ceramic, Cotton & Ginning)',
      'Kalol GIDC (Industrial & Engineering)',
      'Palanpur & Himmatnagar',
    ],
    primaryKeywords: [
      'Spice Exporter Website Design Unjha',
      'Industrial B2B Google Ads Kadi & Kalol GIDC',
      'Digital Marketing Agency Visnagar',
      'Website Designer in Patan',
      'Google Business Profile 3-Pack SEO North Gujarat',
      'Lead Generation for Manufacturers Gujarat',
    ],
    keyIndustries: ['Jeera & Spices Export', 'Ceramics & Sanitaryware', 'Cotton Ginning & Textiles', 'Agricultural Machineries', 'Multispecialty Hospitals'],
    localHighlight: 'Helping local exporters, factory owners, and traders modernize their global digital presence and generate genuine B2B buyer inquiries.',
  },
  {
    id: 'surat-vadodara-rajkot',
    name: 'Surat, Vadodara & Rajkot',
    tagline: 'Textile, Diamond, Chemical & Machine Tool Corridors',
    coverageAreas: [
      'Surat (Ring Road, Varachha, Vesu)',
      'Vadodara (Alkapuri, Makarpura GIDC)',
      'Rajkot (Aji GIDC, Metoda GIDC)',
      'Bhavnagar & Jamnagar',
    ],
    primaryKeywords: [
      'Textile E-Commerce Website Design Surat',
      'Chemical & Manufacturing SEO Vadodara',
      'Machine Tools Google Ads Agency Rajkot',
      'Shopify & WhatsApp Commerce Gujarat',
      'Diamond & Jewelry Digital Marketing Surat',
    ],
    keyIndustries: ['Textile & Apparel D2C', 'Diamond & Fine Jewelry', 'Machine Tools & Foundry', 'Chemical Manufacturing', 'Hardware & Engineering'],
    localHighlight: 'Proven experience building lightning-fast online catalogs, automated WhatsApp sales funnels, and high-volume e-commerce storefronts.',
  },
];

const ALL_LOCAL_KEYWORDS = [
  'Digital Marketing Agency in Mehsana',
  'Best Website Design Company Mehsana',
  'SEO Expert in Mehsana Gujarat',
  'Google Ads Agency near me Mehsana',
  'Local SEO & GMB Optimization Mehsana',
  'Web Developer in Nagalpur Mehsana',
  'Mobile App Development Company Gujarat',
  'Digital Marketing Agency Ahmedabad',
  'Website Designer SG Highway Ahmedabad',
  'Shopify E-Commerce Developer Gujarat',
  'B2B Manufacturing Lead Gen Agency',
  'Digital Marketing Agency in Visnagar',
  'Website Design in Patan Gujarat',
  'Unjha APMC Exporter Website Design',
  'Google My Business 3-Pack Ranking',
  'Facebook & Instagram Ads Expert Gujarat',
  'Industrial Website Development Kadi GIDC',
  'Top IT & Growth Agency Gandhinagar',
];

interface LocalSeoHubProps {
  onKeywordClick?: (keyword: string) => void;
}

export const LocalSeoHub: React.FC<LocalSeoHubProps> = ({ onKeywordClick }) => {
  const [selectedClusterId, setSelectedClusterId] = useState<string>('mehsana-hq');

  const activeCluster =
    LOCAL_CLUSTERS.find((c) => c.id === selectedClusterId) || LOCAL_CLUSTERS[0];

  const handleKeywordTap = (kw: string) => {
    if (onKeywordClick) {
      onKeywordClick(kw);
    }
    // Smooth scroll to contact section
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="local-seo"
      className="py-24 relative overflow-hidden bg-[#040612] border-t border-amber-500/15 cv-auto"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4 border bg-[#0a0f24] border-amber-500/30 text-amber-300 shadow-md shadow-amber-500/10">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Local Gujarat SEO & City Directory</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Dominating Local Google Rankings in{' '}
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-300 bg-clip-text text-transparent">
              Mehsana & Across Gujarat
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Whether you need clients walking into your Mehsana clinic/store, B2B wholesale inquiries for your factory in Kadi GIDC, or high-intent Google searches from Ahmedabad, our hyper-targeted Local SEO puts your business at the top of Google Maps and Search.
          </p>
        </div>

        {/* Regional Hub Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {LOCAL_CLUSTERS.map((cluster) => {
            const isSelected = cluster.id === selectedClusterId;
            return (
              <button
                key={cluster.id}
                type="button"
                onClick={() => setSelectedClusterId(cluster.id)}
                className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 text-slate-950 border-amber-300 shadow-lg shadow-amber-500/20 scale-[1.02]'
                    : 'bg-[#0a0f24]/80 text-slate-300 border-amber-500/20 hover:border-amber-400/50 hover:text-white'
                }`}
              >
                <Building2 className={`w-4 h-4 ${isSelected ? 'text-slate-950' : 'text-amber-400'}`} />
                <span>{cluster.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Regional Cluster Card */}
        <motion.div
          key={activeCluster.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded-3xl border border-amber-500/25 bg-[#080d24]/90 backdrop-blur-xl p-6 sm:p-8 lg:p-10 shadow-2xl mb-14 relative overflow-hidden"
        >
          {/* Header of Active Cluster */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-8 border-b border-amber-500/15">
            <div>
              <div className="flex items-center gap-2.5 text-xs text-amber-400 font-semibold mb-1">
                <Navigation className="w-3.5 h-3.5" />
                <span>Target Region</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                {activeCluster.name}
              </h3>
              <p className="text-sm text-slate-300 mt-1 font-medium">
                {activeCluster.tagline}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={COMPANY_DETAILS.mapsQueryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-300 hover:brightness-110 transition shadow-md"
              >
                <MapPin className="w-4 h-4 text-slate-950" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={`${COMPANY_DETAILS.whatsappBaseUrl}?text=Hello%20Widecraft%20Digital,%20I%20am%20looking%20for%20local%20growth%20in%20${encodeURIComponent(activeCluster.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 hover:bg-emerald-900/50 transition shadow-md"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Local Growth Consultation</span>
              </a>
            </div>
          </div>

          {/* Grid of Coverage, Keywords & Industries */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            {/* Micro-Locality Coverage */}
            <div className="p-5 rounded-2xl bg-[#05081a] border border-amber-500/20">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider mb-3">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Micro-Locality Coverage</span>
              </div>
              <ul className="space-y-2">
                {activeCluster.coverageAreas.map((area, i) => (
                  <li key={i} className="text-xs sm:text-sm text-slate-200 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* High-Intent Local Search Keywords */}
            <div className="p-5 rounded-2xl bg-[#05081a] border border-amber-500/20">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider mb-3">
                <Search className="w-4 h-4 text-amber-400" />
                <span>Targeted Search Terms</span>
              </div>
              <ul className="space-y-2">
                {activeCluster.primaryKeywords.map((kw, i) => (
                  <li
                    key={i}
                    onClick={() => handleKeywordTap(kw)}
                    className="text-xs sm:text-sm text-slate-300 hover:text-amber-300 cursor-pointer transition flex items-center justify-between group p-1.5 rounded-lg hover:bg-amber-500/10"
                    title="Click to query this service"
                  >
                    <span className="truncate pr-2 font-medium">{kw}</span>
                    <span className="text-[10px] uppercase font-bold text-amber-400 opacity-0 group-hover:opacity-100 transition shrink-0">
                      Inquire &rarr;
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Primary Industries & Local Presence */}
            <div className="p-5 rounded-2xl bg-[#05081a] border border-amber-500/20 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider mb-3">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Key Commercial Verticals</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {activeCluster.keyIndustries.map((ind, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-[#0c1228] border border-amber-500/25 text-slate-200"
                    >
                      {ind}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-amber-500/15">
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  &ldquo;{activeCluster.localHighlight}&rdquo;
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Local Keywords Cloud & Search Matrix */}
        <div className="rounded-3xl border border-amber-500/20 bg-[#070a1c] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Hyper-Local Keyword Index</span>
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-white mt-1">
                Popular Searches We Rank For On Google
              </h4>
            </div>
            <span className="text-xs text-slate-400">
              Click any keyword to instantly request a custom quote or audit
            </span>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-2.5">
            {ALL_LOCAL_KEYWORDS.map((keyword, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleKeywordTap(keyword)}
                className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#0c1228] border border-amber-500/20 text-slate-200 hover:text-white hover:border-amber-400 hover:bg-amber-500/15 transition-all shadow-sm"
              >
                <Search className="w-3 h-3 text-amber-400 group-hover:scale-110 transition-transform" />
                <span>{keyword}</span>
                <span className="text-[10px] text-amber-400 font-bold ml-1 opacity-60 group-hover:opacity-100">
                  #1
                </span>
              </button>
            ))}
          </div>

          {/* Quick Local Fact Citation Strip (Critical for Local SEO NAP consistency) */}
          <div className="mt-8 pt-6 border-t border-amber-500/15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="flex items-center gap-2.5 text-slate-300">
              <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <span className="block font-bold text-white">Exact Address</span>
                <span className="text-slate-400 truncate block">Himalaya Royal Villa, Mehsana</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-slate-300">
              <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <Navigation className="w-4 h-4" />
              </div>
              <div>
                <span className="block font-bold text-white">GPS Coordinates</span>
                <span className="text-slate-400">23.5880° N, 72.3693° E</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-slate-300">
              <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="block font-bold text-white">Local Helpdesk</span>
                <a href={`tel:+${COMPANY_DETAILS.phoneRaw}`} className="text-amber-300 hover:underline">
                  +91 77376 49405
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-slate-300">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <span className="block font-bold text-white">Google Maps 3-Pack</span>
                <span className="text-emerald-400 font-medium">100% White-Hat Local SEO</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
