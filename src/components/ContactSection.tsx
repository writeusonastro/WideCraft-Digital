import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, Copy, ExternalLink, Phone, MessageSquare, Sparkles, Crown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { COMPANY_DETAILS } from '../data';
import { InquiryFormData } from '../types';

interface ContactSectionProps {
  selectedService: string;
  onServiceChange: (service: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  selectedService,
  onServiceChange,
}) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    clientService: selectedService || 'Website Development',
    projectBudget: 'Flexible / Recommend',
    clientMessage: '',
  });

  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (selectedService) {
      setFormData((prev) => ({ ...prev, clientService: selectedService }));
    }
  }, [selectedService]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const name = formData.clientName.trim();
    const phone = formData.clientPhone.trim();
    const service = formData.clientService;
    const notes = formData.clientMessage.trim() || 'No additional notes specified.';
    const budget = formData.projectBudget;

    const rawMsg =
      `*New Inquiry for Widecraft Digital*\n` +
      `*Name:* ${name}\n` +
      `*Phone:* ${phone}\n` +
      `*Service:* ${service}\n` +
      `*Estimated Budget:* ${budget}\n` +
      `*Details:* ${notes}`;

    const encodedMsg = encodeURIComponent(rawMsg);
    const waUrl = `${COMPANY_DETAILS.whatsappBaseUrl}?text=${encodedMsg}`;

    setSubmittedMessage(rawMsg);

    // Open WhatsApp link safely
    const a = document.createElement('a');
    a.href = waUrl;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleCopy = () => {
    if (submittedMessage) {
      navigator.clipboard.writeText(submittedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const servicesList = [
    'SEO Optimization & Google Ranking',
    'Website Development',
    'Google Ads (Search & Performance Max)',
    'Social Media Meta Ads (FB & IG)',
    'Custom Mobile App Development',
    'E-Commerce & CRO Solutions',
    'Full Digital Growth Retainer',
  ];

  const budgetTiers = [
    '₹5,000 – ₹15,000 (Starter / Single Page)',
    '₹15,000 – ₹35,000',
    '₹35,000 – ₹75,000',
    '₹75,000 – ₹1,50,000',
    '₹1,50,000+',
    'Flexible / Recommend',
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#050714]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Context & Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border bg-[#0c1228] border-amber-500/30 text-amber-300"
            >
              <Crown className="w-3.5 h-3.5 text-amber-400" /> Start Your Project
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] text-white"
            >
              Let's Build Something That{' '}
              <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-300 bg-clip-text text-transparent">
                Drives Real Results
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg leading-relaxed text-slate-300"
            >
              Fill out the inquiry details below. You will be connected directly to our core strategy team
              via WhatsApp or phone within 30 minutes during business hours.
            </motion.p>

            {/* Direct Channels Cards */}
            <div className="space-y-3 pt-2">
              <motion.a
                whileHover={{ x: 4 }}
                href={`tel:+${COMPANY_DETAILS.phoneRaw}`}
                className="flex items-center gap-4 p-4 rounded-2xl border transition bg-[#0a0f24]/90 border-amber-500/20 shadow-md hover:border-amber-400/60"
              >
                <div className="w-12 h-12 rounded-xl bg-[#060918] border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs block text-slate-400">
                    Direct Phone Call
                  </span>
                  <span className="text-sm sm:text-base font-bold text-white">
                    {COMPANY_DETAILS.phone}
                  </span>
                </div>
              </motion.a>

              <motion.a
                whileHover={{ x: 4 }}
                href={`${COMPANY_DETAILS.whatsappBaseUrl}?text=Hello%20Widecraft%20Digital,%20I%20have%20an%20urgent%20inquiry`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl border transition bg-[#0a0f24]/90 border-amber-500/20 shadow-md hover:border-emerald-400/60"
              >
                <div className="w-12 h-12 rounded-xl bg-[#060918] border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs block text-slate-400">
                    WhatsApp Business Channel
                  </span>
                  <span className="text-sm sm:text-base font-bold text-white">
                    Fast Response on WhatsApp
                  </span>
                </div>
              </motion.a>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-6 sm:p-10 rounded-3xl border shadow-2xl bg-[#0a0f24]/95 border-amber-500/25 text-white backdrop-blur-xl"
            >
              <h3 className="text-xl sm:text-2xl font-black mb-2 text-white">
                Project Scope Inquiry
              </h3>
              <p className="text-xs sm:text-sm mb-6 text-slate-300">
                Tell us about your objectives. We will prepare an audit and execution blueprint.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 text-slate-300">
                      Your Name / Company *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      placeholder="e.g. Rahul Patel"
                      className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition bg-[#060918] border-slate-700 text-white placeholder-slate-500 focus:border-amber-400 focus:bg-[#090e22]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1.5 text-slate-300">
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.clientPhone}
                      onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                      placeholder="e.g. 098980 94103"
                      className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition bg-[#060918] border-slate-700 text-white placeholder-slate-500 focus:border-amber-400 focus:bg-[#090e22]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5 text-slate-300">
                    Primary Service Needed
                  </label>
                  <select
                    value={formData.clientService}
                    onChange={(e) => {
                      setFormData({ ...formData, clientService: e.target.value });
                      onServiceChange(e.target.value);
                    }}
                    className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition bg-[#060918] border-slate-700 text-white focus:border-amber-400"
                  >
                    {servicesList.map((svc) => (
                      <option key={svc} value={svc} className="bg-[#0c1228] text-white">
                        {svc}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5 text-slate-300">
                    Estimated Project Budget
                  </label>
                  <select
                    value={formData.projectBudget}
                    onChange={(e) => setFormData({ ...formData, projectBudget: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition bg-[#060918] border-slate-700 text-white focus:border-amber-400"
                  >
                    {budgetTiers.map((tier) => (
                      <option key={tier} value={tier} className="bg-[#0c1228] text-white">
                        {tier}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5 text-slate-300">
                    Brief Project Details or Target Goals
                  </label>
                  <textarea
                    rows={3}
                    value={formData.clientMessage}
                    onChange={(e) => setFormData({ ...formData, clientMessage: e.target.value })}
                    placeholder="Tell us about your current challenges, target timeline, or what you want to achieve..."
                    className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition resize-none bg-[#060918] border-slate-700 text-white placeholder-slate-500 focus:border-amber-400 focus:bg-[#090e22]"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  type="submit"
                  id="submit-inquiry-btn"
                  className="w-full py-4 px-6 rounded-xl font-black text-slate-950 shadow-xl transition flex items-center justify-center gap-2.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:brightness-110 shadow-amber-500/25"
                >
                  <Send className="w-4 h-4 text-slate-950" />
                  <span>Send WhatsApp Inquiry to Widecraft Team</span>
                </motion.button>
              </form>

              {/* Submission Confirmation Box */}
              <AnimatePresence>
                {submittedMessage && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 p-4 sm:p-5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 space-y-3"
                  >
                    <div className="flex items-center gap-2 font-bold text-sm">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span>Inquiry formatted for WhatsApp!</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      If your WhatsApp did not open automatically, you can copy the summary below or click the button directly:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <a
                        href={`${COMPANY_DETAILS.whatsappBaseUrl}?text=${encodeURIComponent(submittedMessage)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black inline-flex items-center gap-1.5 shadow-sm"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Open WhatsApp</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <button
                        onClick={handleCopy}
                        className="px-4 py-2 rounded-lg bg-[#060918] hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold inline-flex items-center gap-1.5"
                      >
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
