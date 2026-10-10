import { Briefcase, Calendar, MapPin, Building2, Award, CheckCircle2, GraduationCap } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import Card from '../common/Card';
import Badge from '../common/Badge';

export default function ExperienceSection({ experiences = [] }) {
  return (
    <section id="internship" className="py-20 relative bg-slate-100/50 dark:bg-slate-900/30">
      {/* Anchor for backward compatibility with #experience */}
      <div id="experience" className="absolute -top-20" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Internship & Background"
          title="Internship & Industry Experience"
          subtitle="Hands-on training, real-world project delivery, and practical full-stack development experience as an aspiring developer."
        />

        {/* Fresher Highlights Banner */}
        <div className="max-w-3xl mx-auto mb-8 p-4 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-transparent border border-indigo-200/60 dark:border-indigo-800/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-600 text-white shadow-sm">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Fresher Full Stack Developer
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Ready for full-time junior/entry-level software engineer roles with proven internship experience.
              </p>
            </div>
          </div>
          <Badge variant="indigo" size="sm" className="shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-500" />
            Internship Completed
          </Badge>
        </div>

        <div className="max-w-3xl mx-auto relative pl-6 border-l-2 border-indigo-500/30 space-y-8">
          {experiences.map((exp, idx) => (
            <div key={exp.id || idx} className="relative group">
              {/* Timeline marker bullet */}
              <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-indigo-600 ring-4 ring-white dark:ring-slate-900 transition-transform group-hover:scale-125" />

              <Card className="p-6 transition-all hover:border-indigo-400/50 dark:hover:border-indigo-600/50">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {exp.role}
                      </h3>
                      <span className="px-2 py-0.5 text-[11px] font-semibold rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
                        Internship
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium text-sm mt-0.5">
                      <Building2 className="w-4 h-4" />
                      <span>{exp.company}</span>
                    </div>
                  </div>

                  <Badge variant={exp.is_current ? 'success' : 'default'} size="xs">
                    <Calendar className="w-3 h-3 mr-1" />
                    {exp.start_date} - {exp.end_date || (exp.is_current ? 'Present' : '')}
                  </Badge>
                </div>

                {exp.location && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 mb-3 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                    <span>{exp.location}</span>
                  </div>
                )}

                <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
                  {exp.description}
                </p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
