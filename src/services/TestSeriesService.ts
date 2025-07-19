import ApiService from './ApiService';

const TestSeriesService = {
  // Create a new test series
  createTestSeries: (payload: any) => {
    return ApiService.post('/test-series/create', payload);
  },

  // Get all test series
  getAllTestSeries: () => {
    return ApiService.get('/test-series/all');
  },

  // Get a single test series by ID
  getTestSeriesById: (id: string) => {
    return ApiService.get(`/test-series/${id}`);
  },

  // Update a test series
  updateTestSeries: (id: string, payload: any) => {
    return ApiService.put(`/test-series/update/${id}`, payload);
  },

  // Delete a test series
  deleteTestSeries: (id: string) => {
    return ApiService.delete(`/test-series/delete/${id}`);
  },

  // Upload questions via CSV/Excel
  uploadQuestionsCSV: (testId: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return ApiService.post(`/test-series/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  getLearnerTests : async (userId: string) => {
    const response = await ApiService.get(`/test-series/active`);
    return response.data;
  },

  getTestResult: async (userId: string, testId: string) => {
  const response = await ApiService.get(`/test-series/result/${userId}?testId=${testId}`);
  return response.data;
},

  fetchQuestionsByTestId: async (testId: string, questionLimit: number) => {
    const response = await ApiService.post('/test-series/fetch-questions', {
      testId,
      questionLimit
    });
    return response.data.questions;
  },

  submitLearnerTest: async (userId: string, testId: string, answers: Record<string, string>)=> {
  const response = await ApiService.post('/test-series/submit', {
    userId,
    testId,
    answers,
  });
  return response.data;
}

};

export default TestSeriesService;