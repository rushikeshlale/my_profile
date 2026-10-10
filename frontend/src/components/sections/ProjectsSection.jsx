import { ExternalLink } from 'lucide-react';
import { GithubIcon } from '../common/Icons';
import SectionHeading from '../common/SectionHeading';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import blogScreenshot from '../../assets/projects/django_blog.png';

export default function ProjectsSection({ projects = [] }) {
  const resolveProjectImage = (url) => {
    if (!url) return 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60';
    if (url.includes('django_blog.png')) return blogScreenshot;
    if (url.startsWith('http') || url.startsWith('/')) return url;
    return `http://127.0.0.1:8000${url.startsWith('/') ? '' : '/'}${url}`;
  };

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Featured Work"
          title="Projects & Case Studies"
          subtitle="Real-world full-stack web applications engineered with modern technologies and clean architecture."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => {
            const techs = project.tech_list || (project.technologies ? project.technologies.split(',').map(t => t.trim()) : []);
            const imageSrc = resolveProjectImage(project.image_url || project.image);

            return (
              <Card
                key={project.id || project.slug}
                className="flex flex-col h-full overflow-hidden group p-0 border border-slate-200/80 dark:border-slate-800 shadow-lg"
              >
                {/* Project Image Preview */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-800">
                  <img
                    src={imageSrc}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60';
                    }}
                    alt={project.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {project.is_featured && (
                    <div className="absolute top-3 right-3">
                      <Badge variant="primary" size="xs">
                        Featured
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-500 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-700 dark:text-slate-300 mt-2 leading-relaxed">
                      {project.summary}
                    </p>
                  </div>

                  {/* Tech stack badges */}
                  <div className="space-y-4 pt-2">
                    <div className="flex flex-wrap gap-1.5">
                      {techs.map((tech, idx) => (
                        <Badge key={idx} variant="default" size="xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                      {project.live_demo_url && (
                        <Button
                          href={project.live_demo_url}
                          target="_blank"
                          rel="noreferrer"
                          variant="primary"
                          size="sm"
                          icon={ExternalLink}
                          iconPosition="right"
                        >
                          Live Demo
                        </Button>
                      )}
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center font-medium rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-200 px-3.5 py-1.5 text-xs gap-1.5 transition-all"
                        >
                          <GithubIcon className="w-4 h-4" />
                          Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
