import Link from 'next/link';
import { FadeIn } from '@/components/motion/FadeIn';
import { ArrowLeft, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white text-slate-900 px-4 py-24">
      <FadeIn className="text-center max-w-lg space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center mx-auto text-blue-600">
          <Compass className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-blue-600">
            Error 404 · Provenance Unknown
          </div>
          <h1 className="text-4xl font-extrabold text-slate-950 tracking-tight">
            Record Not Found
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            The requested commodity documentation, service page, or intelligence guide does not exist or has been relocated within our registry.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="cta-glow inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-100 border border-slate-200 rounded-xl hover:bg-slate-200 transition-colors"
          >
            <span>Explore Services</span>
          </Link>
        </div>
      </FadeIn>
    </div>
  );
}
