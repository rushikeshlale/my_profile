import { useState } from 'react';
import { X, Download, FileText, ExternalLink, Mail, Phone, MapPin } from 'lucide-react';
import Button from './Button';

export default function ResumeModal({ isOpen, onClose, resumeUrl = '/Rushikesh_Lale_Resume.pdf' }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative w-full max-w-4xl h-[92vh] flex flex-col bg-white dark:bg-[#0f172a] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
                Rushikesh Lale — Resume / CV
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Python / Django Full Stack Developer
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Download Button */}
            <a
              href={resumeUrl}
              download="Rushikesh_Lale_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-500/25 transition-all active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Download CV</span>
            </a>

            {/* Open in new tab (helpful for mobile PDF viewers) */}
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              title="Open in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors active:scale-95"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Page 1 Viewer Body - Strictly 1 Page (Zero extra blank page) */}
        <div className="flex-1 w-full bg-slate-200/60 dark:bg-slate-950 overflow-y-auto p-3 sm:p-6 flex justify-center items-start">
          <div className="relative max-w-2xl w-full bg-white shadow-2xl rounded-lg overflow-hidden border border-slate-300 dark:border-slate-800">
            <img
              src="/images/resume_preview.png"
              alt="Rushikesh Laxman Lale Resume - Page 1"
              className="w-full h-auto block select-none"
              loading="eager"
            />
          </div>
        </div>

        {/* Bottom Quick Contact Bar */}
        <div className="px-5 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-indigo-500" />
              rushikeshlale1@gmail.com
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-indigo-500" />
              +91 7823047414
            </span>
          </div>

          <a
            href={resumeUrl}
            download="Rushikesh_Lale_Resume.pdf"
            className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center gap-1"
          >
            Direct PDF Download <Download className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
