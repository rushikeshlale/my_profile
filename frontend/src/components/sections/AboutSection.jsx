import { UserCheck, Sparkles, MapPin, Mail, Layers, ShieldCheck } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import Card from '../common/Card';

export default function AboutSection({ profile }) {
  const highlights = [
    {
      icon: Layers,
      title: 'Full Stack Architecture',
      description: 'Bridging responsive modern React frontends with clean, decoupled Django REST APIs.',
    },
    {
      icon: ShieldCheck,
      title: 'Security & Best Practices',
      description: 'Strict CORS policies, JWT/session auth, safe environment variables, and parameterized queries.',
    },
    {
      icon: Sparkles,
      title: 'Performance & Optimization',
      description: 'Fast Vite bundling, lazy-loading, Tailwind utility-first styling, and relational PostgreSQL indexing.',
    },
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="About Me"
          title="Transforming Ideas into Robust Web Products"
          subtitle="A passionate developer dedicated to clean code, modular architecture, and modern developer tooling."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Detailed Bio Card */}
          <div className="lg:col-span-7 space-y-6">
            <Card className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-indigo-500" />
                Who I Am
              </h3>
              <p className="text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
                {profile?.bio ||
                  'I am a Full Stack Developer specializing in building end-to-end web applications. With strong roots in Python and Django on the backend and modern JavaScript/React on the frontend, I focus on delivering scalable, maintainable, and high-performance solutions.'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-200 font-medium">
                  <MapPin className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span>{profile?.location || 'Pune, India'}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-200 font-medium">
                  <Mail className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span>{profile?.email || 'rushikeshlale1@gmail.com'}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Core Strengths Pillars */}
          <div className="lg:col-span-5 space-y-4">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Card key={idx} hoverEffect={true} className="p-5 flex gap-4 items-start">
                  <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      {item.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
