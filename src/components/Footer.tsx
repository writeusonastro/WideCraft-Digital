import React from 'react';
import { Phone, MapPin, Mail, ArrowUp, MessageSquare } from 'lucide-react';
import { COMPANY_DETAILS } from '../data';
import { WidecraftLogo } from './WidecraftLogo';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t pt-16 pb-16 transition-colors duration-300 bg-[#030611] border-amber-500/20 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-amber-500/15">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <WidecraftLogo
                size="md"
                subtitle="Digital Growth & Engineering Agency"
              />
            </div>
            <p className="text-xs sm:text-sm max-w-md leading-relaxed text-slate-300">
              Engineering high-ROI performance marketing campaigns, custom responsive websites, and scalable cross-platform mobile apps for ambitious businesses in Gujarat and across India.
            </p>
            <div className="flex items-start gap-2.5 text-xs pt-1">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span className="text-slate-300">{COMPANY_DETAILS.address}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 text-xs">
            <h5 className="font-bold uppercase tracking-wider text-xs text-white">
              Capabilities
            </h5>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="hover:text-amber-300 transition text-slate-300">
                  Modern Website Design
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-300 transition text-slate-300">
                  Google Search & Performance Max
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-300 transition text-slate-300">
                  Meta Facebook & Instagram Ads
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-300 transition text-slate-300">
                  Cross-Platform Mobile Apps
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-amber-300 transition text-slate-300">
                  Interactive ROI Calculator
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3 text-xs">
            <h5 className="font-bold uppercase tracking-wider text-xs text-white">
              Connect Directly
            </h5>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400" />
                <a
                  href={`tel:+${COMPANY_DETAILS.phoneRaw}`}
                  className="font-medium transition text-white hover:text-amber-300"
                >
                  {COMPANY_DETAILS.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400" />
                <a
                  href={`mailto:${COMPANY_DETAILS.email}`}
                  className="transition hover:text-amber-300 text-slate-300"
                >
                  {COMPANY_DETAILS.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <a
                  href={`${COMPANY_DETAILS.whatsappBaseUrl}?text=Hello%20Widecraft%20Digital`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 transition font-medium text-emerald-400"
                >
                  WhatsApp Quick Chat
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Regional Gujarat Local SEO Coverage & Keywords Index */}
        <div className="py-8 border-b border-amber-500/15">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
            <h6 className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Gujarat Regional Coverage & Local SEO Service Hubs
            </h6>
            <span className="text-[11px] text-slate-400">
              HQ: Mehsana &bull; Operational across all Gujarat commercial districts
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-[11px]">
            <div>
              <span className="font-bold text-white block mb-1 text-xs">Mehsana (HQ)</span>
              <ul className="space-y-1 text-slate-400">
                <li><a href="#local-seo" className="hover:text-amber-300 transition">Digital Marketing Mehsana</a></li>
                <li><a href="#local-seo" className="hover:text-amber-300 transition">Website Design Mehsana</a></li>
                <li><a href="#local-seo" className="hover:text-amber-300 transition">SEO Services Nagalpur</a></li>
                <li><a href="#local-seo" className="hover:text-amber-300 transition">GMB Google Maps 3-Pack</a></li>
              </ul>
            </div>

            <div>
              <span className="font-bold text-white block mb-1 text-xs">Ahmedabad Metro</span>
              <ul className="space-y-1 text-slate-400">
                <li><a href="#local-seo" className="hover:text-amber-300 transition">Digital Agency Ahmedabad</a></li>
                <li><a href="#local-seo" className="hover:text-amber-300 transition">SG Highway Web Design</a></li>
                <li><a href="#local-seo" className="hover:text-amber-300 transition">PPC Google Ads Agency</a></li>
                <li><a href="#local-seo" className="hover:text-amber-300 transition">Shopify CRO Ahmedabad</a></li>
              </ul>
            </div>

            <div>
              <span className="font-bold text-white block mb-1 text-xs">Gandhinagar Capital</span>
              <ul className="space-y-1 text-slate-400">
                <li><a href="#local-seo" className="hover:text-amber-300 transition">GIFT City IT App Dev</a></li>
                <li><a href="#local-seo" className="hover:text-amber-300 transition">Infocity Web Agency</a></li>
                <li><a href="#local-seo" className="hover:text-amber-300 transition">B2B Corporate Portals</a></li>
                <li><a href="#local-seo" className="hover:text-amber-300 transition">Startup Performance Ads</a></li>
              </ul>
            </div>

            <div>
              <span className="font-bold text-white block mb-1 text-xs">Unjha & Patan</span>
              <ul className="space-y-1 text-slate-400">
                <li><a href="#local-seo" className="hover:text-amber-300 transition">Spice Exporter Web Design</a></li>
                <li><a href="#local-seo" className="hover:text-amber-300 transition">Unjha APMC Global SEO</a></li>
                <li><a href="#local-seo" className="hover:text-amber-300 transition">Patan Website Developer</a></li>
                <li><a href="#local-seo" className="hover:text-amber-300 transition">Educational Portal Dev</a></li>
              </ul>
            </div>

            <div>
              <span className="font-bold text-white block mb-1 text-xs">Kadi, Kalol & Visnagar</span>
              <ul className="space-y-1 text-slate-400">
                <li><a href="#local-seo" className="hover:text-amber-300 transition">Kadi GIDC Industrial Ads</a></li>
                <li><a href="#local-seo" className="hover:text-amber-300 transition">Ceramics & Cotton Marketing</a></li>
                <li><a href="#local-seo" className="hover:text-amber-300 transition">Visnagar Hospital Local SEO</a></li>
                <li><a href="#local-seo" className="hover:text-amber-300 transition">Kalol Manufacturing SEO</a></li>
              </ul>
            </div>

            <div>
              <span className="font-bold text-white block mb-1 text-xs">Surat, Vadodara & Rajkot</span>
              <ul className="space-y-1 text-slate-400">
                <li><a href="#local-seo" className="hover:text-amber-300 transition">Surat Textile E-Commerce</a></li>
                <li><a href="#local-seo" className="hover:text-amber-300 transition">Diamond Jewelry Meta Ads</a></li>
                <li><a href="#local-seo" className="hover:text-amber-300 transition">Vadodara Chemical SEO</a></li>
                <li><a href="#local-seo" className="hover:text-amber-300 transition">Rajkot Machine Tools Ads</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom copyright & scroll-to-top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; {currentYear} <strong className="text-white">Widecraft Digital</strong>. All rights reserved. &bull; Registered in Mehsana, Gujarat &bull; GPS: 23.5880° N, 72.3693° E
          </div>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition bg-[#080d20] border-amber-500/30 text-amber-200 hover:bg-amber-500/10 hover:border-amber-400"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>
      </div>
    </footer>
  );
};
