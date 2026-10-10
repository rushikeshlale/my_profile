import api from './axios';

export const portfolioService = {
  // Fetch overview (profile, skills, projects, experiences, social links)
  getOverview: async () => {
    const response = await api.get('/portfolio/overview/');
    return response.data;
  },

  // Fetch individual resources if needed
  getProfile: async () => {
    const response = await api.get('/portfolio/profiles/');
    return response.data;
  },

  getSkills: async () => {
    const response = await api.get('/portfolio/skills/');
    return response.data;
  },

  getProjects: async (featured = null) => {
    const params = featured !== null ? { featured } : {};
    const response = await api.get('/portfolio/projects/', { params });
    return response.data;
  },

  getExperiences: async () => {
    const response = await api.get('/portfolio/experiences/');
    return response.data;
  },

  getSocialLinks: async () => {
    const response = await api.get('/portfolio/social-links/');
    return response.data;
  },

  // Submit contact message to Django DRF backend
  sendContactMessage: async (payload) => {
    const response = await api.post('/contact/send/', payload);
    return response.data;
  },
};
