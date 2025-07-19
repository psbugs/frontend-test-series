import ApiService from './ApiService';

export const getAnalyticsData = async () => {
  const response = await ApiService.get('/main-analytics/analytics');
  return response.data; // should contain participants, averageScore, topPerformers, scoreDistribution
};
