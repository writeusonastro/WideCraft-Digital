import React, { useState, useRef } from 'react';
import {
  Layout,
  TrendingUp,
  Share2,
  Smartphone,
  Search,
  ShoppingBag,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  X,
  Clock,
  Target,
  ExternalLink,
  Crown,
} from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { SERVICES_DATA, COMPANY_DETAILS } from '../data';
import { ServiceItem } from '../types';

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
}

const SpotlightServiceCard: React.FC<{
  service: ServiceItem;
  idx: number;
  onSelect: (service: ServiceItem) => void;
  onOpenModal: (service: ServiceItem) => void;
  renderIcon: (iconName: ServiceItem['iconName'], colorTheme: ServiceItem['colorTheme']) => React.ReactNode;
}> = ({ service, idx, onSelect, onOpenModal, renderIcon }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 260 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      id={`service-card-${service.id}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: idx * 0.08 }}
      whileHover={{ y: -5 }}
      onMouseMove={handleMouseMove}
      className="p-7 rounded-2xl border transition-colors duration-200 flex flex-col justify-between relative group overflow-hidden bg-[#0a0f24] border-amber-500/20 hover:border-amber-400/60 shadow-xl shadow-black/60 hover:shadow-2xl hover:shadow-amber-500/15 cursor-pointer"
    >
      {/* Top Shimmer Gold Line on Hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Dynamic Cursor Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(245, 158, 11, 0.18), transparent 70%)`,
        }}
      />

      <div className="relative z-10" style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}>
        {/* Icon Box with 3D Pop */}
        <div
          style={{ transform: 'translateZ(20px)' }}
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-2 transition-transform duration-300 border bg-[#060918] border-amber-500/30 shadow-md shadow-amber-500/10"
        >
          {renderIcon(service.iconName, service.colorTheme)}
        </div>

        {/* Title & Description */}
        <h3
          className="text-xl font-bold mb-2.5 transition text-white group-hover:text-amber-300"
        >
          {service.title}
        </h3>
        <p className="text-sm leading-relaxed mb-5 text-slate-300">
          {service.shortDesc}
        </p>

        {/* Features List */}
        <ul className="text-xs space-y-2.5 mb-6 border-t pt-4 border-amber-500/15 text-slate-300">
          {service.features.map((feat, fIdx) => (
            <li key={`${service.id}-feat-${fIdx}`} className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-amber-400" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Card Bottom CTA Actions with 3D Elevation */}
      <div 
        style={{ transform: 'translateZ(25px)', transformStyle: 'preserve-3d' }}
        className="pt-4 border-t space-y-2.5 relative z-10 border-amber-500/15"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(service)}
          className="w-full py-2.5 px-4 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 shadow-md shadow-amber-500/25 hover:brightness-110"
        >
          <span>Request Proposal</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </motion.button>
        <button
          onClick={() => onOpenModal(service)}
          className="w-full text-center text-xs transition py-1 font-semibold text-amber-300/80 hover:text-amber-200"
        >
          View Scope & Deliverables &rarr;
        </button>
      </div>
    </motion.div>
  );
};

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  const renderIcon = (iconName: ServiceItem['iconName'], colorTheme: ServiceItem['colorTheme']) => {
    const iconClass = 'w-7 h-7';
    switch (iconName) {
      case 'layout':
        return <Layout className={`${iconClass} text-amber-400`} />;
      case 'search':
        return <Search className={`${iconClass} text-amber-300`} />;
      case 'trending-up':
        return <TrendingUp className={`${iconClass} text-emerald-400`} />;
      case 'share-2':
        return <Share2 className={`${iconClass} text-indigo-400`} />;
      case 'smartphone':
        return <Smartphone className={`${iconClass} text-cyan-400`} />;
      case 'shopping-bag':
        return <ShoppingBag className={`${iconClass} text-rose-400`} />;
      default:
        return <Sparkles className={`${iconClass} text-amber-400`} />;
    }
  };

  const handleSelectService = (service: ServiceItem) => {
    onSelectService(service.title);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-24 relative overflow-hidden bg-[#050714]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3 border bg-[#0c1228] border-amber-500/30 text-amber-300"
          >
            <Crown className="w-3.5 h-3.5 text-amber-400" /> High-Impact Core Services
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white"
          >
            Engineered For{' '}
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-300 bg-clip-text text-transparent">
              Tangible Growth
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-base sm:text-lg leading-relaxed text-slate-300"
          >
            From bespoke digital storefronts & SEO authority to native mobile apps and laser-targeted advertising, we build with precision, prestige, and accountability.
          </motion.p>
        </div>

        {/* Services Grid with Spotlight Cursor Following */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES_DATA.map((service, idx) => (
            <SpotlightServiceCard
              key={service.id}
              service={service}
              idx={idx}
              onSelect={handleSelectService}
              onOpenModal={setActiveModalService}
              renderIcon={renderIcon}
            />
          ))}
        </div>
      </div>

      {/* Deliverables & Timeline Modal Dialog */}
      <AnimatePresence>
        {activeModalService && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative my-auto max-h-[90vh] overflow-y-auto border bg-[#090e21] border-amber-500/30 text-white"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalService(null)}
                aria-label="Close modal"
                className="absolute top-5 right-5 p-2 rounded-xl transition bg-[#060818] border border-amber-500/20 text-slate-400 hover:text-white z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4 pr-10">
                <div className="w-10 h-10 rounded-xl bg-[#060818] border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  {renderIcon(activeModalService.iconName, activeModalService.colorTheme)}
                </div>
                <div className="overflow-hidden">
                  <h3 className="text-lg sm:text-xl font-black text-white leading-tight">{activeModalService.title}</h3>
                  <span className="text-xs text-amber-400 font-semibold block mt-0.5">Service Architecture</span>
                </div>
              </div>

              <p className="text-sm leading-relaxed mb-6 text-slate-300">
                {activeModalService.fullDesc}
              </p>

              {/* Deliverables Checklist */}
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider mb-3 text-amber-300">
                  Standard Deliverables
                </h4>
                <div className="space-y-2.5">
                  {activeModalService.deliverables.map((item, dIdx) => (
                    <div
                      key={`${activeModalService.id}-deliv-${dIdx}`}
                      className="flex items-start gap-2.5 p-3 rounded-xl border text-xs leading-relaxed bg-[#060918] border-amber-500/20 text-slate-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline & Ideal For */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <div
                  className="p-3.5 rounded-xl border bg-[#060918] border-amber-500/20"
                >
                  <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold mb-1">
                    <Clock className="w-3.5 h-3.5" /> Typical Delivery
                  </div>
                  <div className="text-xs font-semibold text-slate-200">{activeModalService.typicalTimeline}</div>
                </div>
                <div
                  className="p-3.5 rounded-xl border bg-[#060918] border-amber-500/20"
                >
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold mb-1">
                    <Target className="w-3.5 h-3.5" /> Best Suited For
                  </div>
                  <div className="text-xs font-semibold text-slate-200">{activeModalService.idealFor}</div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-amber-500/20">
                <button
                  onClick={() => {
                    handleSelectService(activeModalService);
                    setActiveModalService(null);
                  }}
                  className="w-full py-3 rounded-xl text-xs font-black bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 transition flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 hover:brightness-110"
                >
                  <span>Select For Inquiry</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href={`${COMPANY_DETAILS.whatsappBaseUrl}?text=Hello%20Widecraft,%20tell%20me%20more%20about%20${encodeURIComponent(
                    activeModalService.title
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-2 bg-[#060818] border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                >
                  <span>Ask On WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
