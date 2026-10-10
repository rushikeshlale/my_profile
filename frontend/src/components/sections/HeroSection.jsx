import { ArrowRight, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/Icons';
import Button from '../common/Button';
import defaultAvatar from '../../assets/profile.jpg';

export default function HeroSection({ profile, socialLinks = [] }) {
  const renderSocialIcon = (iconName, platform) => {
    const key = (iconName || platform || '').toLowerCase();
    if (key.includes('github')) return <GithubIcon className="w-4 h-4" />;
    if (key.includes('linkedin')) return <LinkedinIcon className="w-4 h-4" />;
    return <Mail className="w-4 h-4" />;
  };

  const avatarSrc = profile?.avatar
    ? (profile.avatar.startsWith('http') ? profile.avatar : `http://127.0.0.1:8000${profile.avatar.startsWith('/') ? '' : '/'}${profile.avatar}`)
    : defaultAvatar;

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 sm:pt-28 pb-12 sm:pb-16 overflow-hidden">
      {/* Background glow & gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[550px] h-[320px] sm:h-[550px] bg-indigo-500/15 dark:bg-indigo-500/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[240px] sm:w-[350px] h-[240px] sm:h-[350px] bg-purple-500/10 dark:bg-purple-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Hero Content Left */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-5 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300 text-xs sm:text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Available for full-time roles & projects</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.2]">
              Hi, I'm{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                {profile?.full_name || 'Rushikesh'}
              </span>
              <br />
              <span className="text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-700 dark:text-slate-300">
                {profile?.title || 'Full Stack Developer (Fresher)'}
              </span>
            </h1>

            <p className="text-sm sm:text-lg text-slate-700 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {profile?.short_bio ||
                'Crafting high-performance web applications with React, Tailwind CSS, Django REST Framework, and PostgreSQL. Focused on clean code and delightful UX.'}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Button
                href="#projects"
                variant="gradient"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
              >
                View My Projects
              </Button>
              <Button
                href="#contact"
                variant="outline"
                size="lg"
                icon={Mail}
              >
                Contact Me
              </Button>
            </div>

            {/* Social Links & Quick badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <span className="text-xs text-slate-600 dark:text-slate-400 uppercase tracking-wider font-bold mr-2">
                Connect:
              </span>
              {socialLinks.map((link) => (
                <a
                  key={link.id || link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                  aria-label={link.platform}
                >
                  {renderSocialIcon(link.icon_name, link.platform)}
                </a>
              ))}
            </div>
          </div>

          {/* Hero Profile Photo Showcase Right */}
          <div className="lg:col-span-5 flex justify-center pt-4 lg:pt-0">
            <div className="relative w-full max-w-[320px] sm:max-w-[360px] group">
              {/* Outer decorative ambient glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 rounded-3xl blur-lg opacity-40 group-hover:opacity-70 transition duration-500 -z-10" />

              {/* Main Image Frame */}
              <div className="relative rounded-3xl overflow-hidden bg-slate-900 border-2 border-slate-200/80 dark:border-slate-800 shadow-2xl">
                <img
                  src={avatarSrc}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = defaultAvatar;
                  }}
                  alt={profile?.full_name || 'Rushikesh'}
                  className="w-full h-[420px] object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />

                {/* Subtle gradient overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold tracking-tight">
                      {profile?.full_name || 'Rushikesh'}
                    </h3>
                    <div className="px-2.5 py-1 rounded-full bg-indigo-500/20 backdrop-blur-md border border-indigo-500/40 text-[11px] font-semibold text-indigo-300">
                      Fresher
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
