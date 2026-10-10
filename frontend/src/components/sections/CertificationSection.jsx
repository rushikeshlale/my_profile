import { Award, ExternalLink, Calendar, Clock } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import Card from '../common/Card';

export default function CertificationSection() {
  const certifications = [
    {
      id: 1,
      title: 'Advanced Python Django Ecommerce Website Development Course',
      issuer: 'Udemy',
      instructor: 'Rathan Kumar',
      date: 'Jan 24, 2026',
      duration: '21 total hours',
      certificateNo: 'UC-dd0be367-6c2a-47b8-961f-2f04e6b8007a',
      image: '/images/certification_udemy.png',
      verifyUrl: 'https://ude.my/UC-dd0be367-6c2a-47b8-961f-2f04e6b8007a',
    },
  ];

  return (
    <section id="certifications" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Certifications"
          title="Professional Certifications"
          subtitle="Validated credentials demonstrating commitment to continuous learning and mastery of modern development technologies."
        />

        <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-4xl mx-auto">
          {certifications.map((cert) => (
            <Card
              key={cert.id}
              hoverEffect={true}
              className="overflow-hidden group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Certificate Image */}
                <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30">
                  <div className="p-4 lg:p-6">
                    <div className="relative rounded-xl overflow-hidden shadow-lg shadow-indigo-500/10 border border-slate-200/60 dark:border-slate-700/60">
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Shine overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Certificate Details */}
                <div className="p-6 lg:p-8 flex flex-col justify-center space-y-5">
                  {/* Issuer badge */}
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/25">
                      <Award className="w-3.5 h-3.5" />
                      {cert.issuer}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                      Verified
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg lg:text-xl font-bold text-slate-900 dark:text-white leading-snug">
                    {cert.title}
                  </h3>

                  {/* Meta info */}
                  <div className="space-y-2.5 text-sm">
                    <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-300">
                      <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-500">
                        <Calendar className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-medium">Completed: <span className="text-slate-900 dark:text-white font-semibold">{cert.date}</span></span>
                    </div>
                    <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-300">
                      <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-500">
                        <Clock className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-medium">Duration: <span className="text-slate-900 dark:text-white font-semibold">{cert.duration}</span></span>
                    </div>
                  </div>

                  {/* Certificate ID */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                      Certificate ID: {cert.certificateNo}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 font-medium mt-1">
                      Instructor: <span className="text-slate-900 dark:text-white">{cert.instructor}</span>
                    </p>
                  </div>

                  {/* Verify link */}
                  {cert.verifyUrl && (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors group/link"
                    >
                      <ExternalLink className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
                      Verify Certificate
                    </a>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
