import { useState, useEffect } from 'react';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import SkillsSection from './components/sections/SkillsSection';
import ProjectsSection from './components/sections/ProjectsSection';
import ExperienceSection from './components/sections/ExperienceSection';
import CertificationSection from './components/sections/CertificationSection';
import ContactSection from './components/sections/ContactSection';
import Toast from './components/common/Toast';
import { portfolioService } from './api/portfolioService';
import { FALLBACK_PORTFOLIO } from './utils/constants';

function App() {
  const [data, setData] = useState(FALLBACK_PORTFOLIO);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });
  const [isLoading, setIsLoading] = useState(true);

  const showToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast({ visible: false, message: '', type: 'success' });
    }, 4000);
  };

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const res = await portfolioService.getOverview();
        if (res) {
          setData({
            profile: res.profile || FALLBACK_PORTFOLIO.profile,
            skills: res.skills && res.skills.length > 0 ? res.skills : FALLBACK_PORTFOLIO.skills,
            projects: res.projects && res.projects.length > 0 ? res.projects : FALLBACK_PORTFOLIO.projects,
            experiences: res.experiences && res.experiences.length > 0 ? res.experiences : FALLBACK_PORTFOLIO.experiences,
            social_links: res.social_links && res.social_links.length > 0 ? res.social_links : FALLBACK_PORTFOLIO.social_links,
          });
        }
      } catch (err) {
        console.info('Using offline/preview portfolio dataset:', err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolioData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-[#0b0f19] dark:text-slate-100 selection:bg-indigo-500 selection:text-white transition-colors duration-300">
      {/* Top sticky navigation */}
      <Navbar profile={data.profile} />

      {/* Main content sections */}
      <main className="flex-1">
        <HeroSection
          profile={data.profile}
          socialLinks={data.social_links}
        />
        <AboutSection
          profile={data.profile}
        />
        <SkillsSection
          skills={data.skills}
        />
        <ProjectsSection
          projects={data.projects}
        />
        <ExperienceSection
          experiences={data.experiences}
        />
        <CertificationSection />
        <ContactSection
          profile={data.profile}
          socialLinks={data.social_links}
          onShowToast={showToast}
        />
      </main>

      {/* Footer */}
      <Footer
        profile={data.profile}
        socialLinks={data.social_links}
      />

      {/* Global Toast */}
      {toast.visible && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ visible: false, message: '', type: 'success' })}
        />
      )}
    </div>
  );
}

export default App;
