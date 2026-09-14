'use client';

import React, { useState } from 'react';
import { services } from '@/data/services';
import { company } from '@/config/company';
import { motion } from 'motion/react';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Lock,
  Mail,
  Copy,
  Check,
} from 'lucide-react';

interface FormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
  honeypot: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
    honeypot: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submissionReference, setSubmissionReference] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name or trading title.';
    if (!formData.email.trim()) {
      errs.email = 'Corporate email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email format.';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please provide details regarding your inquiry or transaction scope.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitSuccess(true);
        setSubmissionReference(result.referenceId || `APX-${Date.now().toString().slice(-6)}`);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          message: '',
          honeypot: '',
        });
      } else {
        setSubmitError(
          result.error || 'Unable to submit automatically. Please transmit directly via email below.'
        );
      }
    } catch {
      setSubmitError(
        'A network interruption occurred. You can submit directly via encrypted email below.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateMailtoLink = () => {
    const subject = encodeURIComponent(
      `[COMMERCIAL INQUIRY] ${formData.service || 'Mineral Sourcing'} - ${formData.company || formData.name || 'Counterparty'}`
    );
    const body = encodeURIComponent(
      `Apex Mineral Ventures Trading Desk,\n\nName: ${formData.name}\nCompany: ${formData.company || 'N/A'}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'N/A'}\nService: ${formData.service || 'General Inquiries'}\n\nTransaction Scope:\n${formData.message}\n\nSubmitted via Apex Mineral Ventures Direct Web Channel`
    );
    return `mailto:${company.email}?subject=${subject}&body=${body}`;
  };

  const copyRef = () => {
    if (submissionReference) {
      navigator.clipboard.writeText(submissionReference);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (submitSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="p-8 sm:p-10 rounded-3xl card-3d bg-gradient-to-br from-blue-50/90 via-white to-blue-50/50 border border-blue-200/90 text-slate-800 space-y-5 shadow-[0_16px_36px_-8px_rgba(30,58,138,0.15)]"
      >
        <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-[0_4px_12px_rgba(37,99,235,0.35),inset_0_1px_0_rgba(255,255,255,0.4)]">
          <CheckCircle2 className="w-6 h-6" />
        </div>

        <div className="space-y-1.5">
          <h3 className="text-xl font-extrabold text-slate-950 tracking-tight">
            Inquiry ticket opened
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            Your inquiry has been assigned to the commercial trading desk in Kampala. An officer will respond within 1 business day.
          </p>
        </div>

        {submissionReference && (
          <div className="p-4.5 rounded-2xl bg-white border border-blue-200/90 flex items-center justify-between shadow-[0_4px_12px_rgba(15,23,42,0.04),inset_0_1px_0_rgba(255,255,255,1)]">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-blue-700">
                Audit Reference ID
              </div>
              <div className="font-mono text-sm font-bold text-slate-950 tracking-wider">
                {submissionReference}
              </div>
            </div>
            <button
              onClick={copyRef}
              type="button"
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1 text-xs font-semibold shadow-xs"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        )}

        <div className="pt-2">
          <button
            type="button"
            onClick={() => setSubmitSuccess(false)}
            className="text-xs font-bold uppercase tracking-wider text-blue-600 hover:text-blue-800 underline underline-offset-4"
          >
            Submit another commercial inquiry
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Honeypot field */}
      <input
        type="text"
        name="honeypot"
        value={formData.honeypot}
        onChange={handleChange}
        tabIndex={-1}
        autoComplete="off"
        className="opacity-0 absolute -top-[5000px] left-0 pointer-events-none"
      />

      {submitError && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <span>{submitError}</span>
          </div>
          <a
            href={generateMailtoLink()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 text-white font-bold text-[11px] hover:bg-red-700 transition-colors flex-shrink-0"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Transmit via Email App</span>
          </a>
        </div>
      )}

      {/* Grid: Name & Corporate Entity */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Principal / Representative Name <span className="text-blue-600">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            enterKeyHint="next"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. David Vance"
            className={`w-full input-3d px-4 py-3.5 sm:py-3 min-h-[48px] rounded-xl bg-slate-50 border ${
              errors.name ? 'border-red-500 focus:border-red-500' : 'border-slate-300 focus:border-blue-600'
            } text-slate-900 text-base sm:text-sm placeholder:text-slate-400 focus:bg-white focus:outline-none transition-all`}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-600 font-medium">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="company" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Company / Trading Entity
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            enterKeyHint="next"
            value={formData.company}
            onChange={handleChange}
            placeholder="e.g. Aurum Global Trading Ltd"
            className="w-full input-3d px-4 py-3.5 sm:py-3 min-h-[48px] rounded-xl bg-slate-50 border border-slate-300 focus:border-blue-600 text-slate-900 text-base sm:text-sm placeholder:text-slate-400 focus:bg-white focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Grid: Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Corporate Email Address <span className="text-blue-600">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            enterKeyHint="next"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. trading@aurumglobal.com"
            className={`w-full input-3d px-4 py-3.5 sm:py-3 min-h-[48px] rounded-xl bg-slate-50 border ${
              errors.email ? 'border-red-500 focus:border-red-500' : 'border-slate-300 focus:border-blue-600'
            } text-slate-900 text-base sm:text-sm placeholder:text-slate-400 focus:bg-white focus:outline-none transition-all`}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600 font-medium">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Phone / WhatsApp Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            enterKeyHint="next"
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g. +44 20 7946 0991"
            className="w-full input-3d px-4 py-3.5 sm:py-3 min-h-[48px] rounded-xl bg-slate-50 border border-slate-300 focus:border-blue-600 text-slate-900 text-base sm:text-sm placeholder:text-slate-400 focus:bg-white focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Service Scope Selection */}
      <div>
        <label htmlFor="service" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
          Service or Transaction Category
        </label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="w-full input-3d px-4 py-3.5 sm:py-3 min-h-[48px] rounded-xl bg-slate-50 border border-slate-300 focus:border-blue-600 text-slate-900 text-base sm:text-sm focus:bg-white focus:outline-none transition-all"
        >
          <option value="">Select a commercial scope (Optional)</option>
          {services.map((svc) => (
            <option key={svc.slug} value={svc.title}>
              {svc.title}
            </option>
          ))}
          <option value="Bespoke Due Diligence & Escrow">Bespoke Due Diligence & Escrow</option>
          <option value="Other Commercial Inquiry">Other Commercial Inquiry</option>
        </select>
      </div>

      {/* Transaction Parameters / Message */}
      <div>
        <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
          Transaction Scope & Parameters <span className="text-blue-600">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="Please describe required precious metal volume, target purity, delivery hub, licensing status, or advisory scope..."
          className={`w-full input-3d px-4 py-3.5 sm:py-3 min-h-[110px] rounded-xl bg-slate-50 border ${
            errors.message ? 'border-red-500 focus:border-red-500' : 'border-slate-300 focus:border-blue-600'
          } text-slate-900 text-base sm:text-sm placeholder:text-slate-400 focus:bg-white focus:outline-none transition-all`}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-600 font-medium">{errors.message}</p>
        )}
      </div>

      {/* Submit Action & Disclaimers */}
      <div className="pt-2 space-y-4">
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 420, damping: 26 }}
          className="btn-3d-primary cta-glow w-full min-h-[48px] inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Transmitting Encrypted Payload...</span>
            </>
          ) : (
            <>
              <span>Transmit Commercial Inquiry</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </motion.button>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500 pt-1 text-center sm:text-left">
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-blue-600" />
            <span>Direct desk dispatch</span>
          </div>
          <a
            href={generateMailtoLink()}
            className="text-blue-600 hover:text-blue-700 font-semibold underline underline-offset-2 py-1"
          >
            Or open mail client directly
          </a>
        </div>
      </div>
    </form>
  );
}
