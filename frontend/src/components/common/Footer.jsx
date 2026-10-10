import { Heart, Mail, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './Icons';

export default function Footer({ profile, socialLinks = [] }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderSocialIcon = (iconName, platform) => {
    const key = (iconName || platform || '').toLowerCase();
    if (key.includes('github')) return <GithubIcon className="w-5 h-5" />;
    if (key.includes('linkedin')) return <LinkedinIcon className="w-5 h-5" />;
    if (key.includes('twitter') || key.includes('x')) return <TwitterIcon className="w-5 h-5" />;
    return <Mail className="w-5 h-5" />;
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#070b14]/70 backdrop-blur-md pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800/60">
          <div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              {profile?.full_name || 'Rushikesh'}
            </span>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
              Built with React, Vite, Tailwind CSS, Django REST Framework, and PostgreSQL.
            </p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map((item) => (
              <a
                key={item.id || item.platform}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                aria-label={item.platform}
                className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
              >
                {renderSocialIcon(item.icon_name, item.platform)}
              </a>
            ))}

            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all ml-2"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-3">
          <p>© {new Date().getFullYear()} {profile?.full_name || 'Rushikesh'}. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Designed & Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for performance.
          </p>
        </div>
      </div>
    </footer>
  );
}
