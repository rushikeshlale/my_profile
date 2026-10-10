import { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, Sparkles, FileText } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import Button from './Button';
import ResumeModal from './ResumeModal';
import defaultAvatar from '../../assets/profile.jpg';

export default function Navbar({ profile }) {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Internship', href: '#internship' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Contact', href: '#contact' },
  ];

  // Resolve avatar source (backend media URL, public path, or bundled asset)
  const avatarSrc = profile?.avatar
    ? (profile.avatar.startsWith('http') ? profile.avatar : `http://127.0.0.1:8000${profile.avatar.startsWith('/') ? '' : '/'}${profile.avatar}`)
    : defaultAvatar;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'glass py-3 shadow-md shadow-slate-900/5 dark:shadow-black/20'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo with User Image */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-200">
            <img
              src={avatarSrc}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = defaultAvatar;
              }}
              alt={profile?.full_name || 'Rushikesh'}
              className="w-full h-full object-cover object-top rounded-full bg-slate-900"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-500 transition-colors">
              {profile?.full_name || 'Rushikesh'}
            </span>
            <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-mono font-medium -mt-0.5">
              Full Stack Dev (Fresher)
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {link.label}
            </a>
          ))}
          {/* Resume button in desktop nav */}
          <button
            onClick={() => setResumeModalOpen(true)}
            className="flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 py-1 px-3 rounded-lg bg-indigo-50/80 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span>Resume</span>
          </button>
        </nav>

        {/* Actions (Theme toggle + CTA) */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800/80 transition-colors border border-transparent hover:border-slate-300 dark:hover:border-slate-700"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-slate-700" />
            )}
          </button>

          <Button
            href="#contact"
            variant="gradient"
            size="sm"
            icon={Sparkles}
            iconPosition="right"
          >
            Let's Talk
          </Button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-1.5 md:hidden">
          <button
            onClick={() => setResumeModalOpen(true)}
            aria-label="View Resume"
            className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center gap-1 active:scale-95 transition-all"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>CV</span>
          </button>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors active:scale-95"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-slate-700" />
            )}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors active:scale-95"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-indigo-500" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden glass border-b border-slate-200/80 dark:border-slate-800/80 px-6 py-6 mt-2 space-y-3 shadow-xl backdrop-blur-xl">
          <div className="grid grid-cols-2 gap-2 pb-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 active:scale-95 transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Resume Action Tile */}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setResumeModalOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/60 text-indigo-600 dark:text-indigo-400 active:scale-95 transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>View & Download Resume / CV</span>
            </button>
          </div>

          <div className="pt-1 border-t border-slate-200 dark:border-slate-800/60">
            <Button
              href="#contact"
              variant="gradient"
              size="lg"
              className="w-full justify-center shadow-lg shadow-indigo-500/25"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get in Touch
            </Button>
          </div>
        </div>
      )}

      {/* Interactive Resume Modal with View & Download options */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
        resumeUrl="/Rushikesh_Lale_Resume.pdf"
      />
    </header>
  );
}
