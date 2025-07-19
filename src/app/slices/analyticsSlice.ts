import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAnalyticsData } from '../../services/AnalyticsService';

interface AnalyticsState {
  participants: number;
  averageScore: number;
  topPerformers: any[];
  scoreDistribution: number[]; // or { score: number, count: number }[]
  loading: boolean;
  error: string | null;
}

const initialState: AnalyticsState = {
  participants: 0,
  averageScore: 0,
  topPerformers: [],
  scoreDistribution: [],
  loading: false,
  error: null,
};

// Thunk to fetch analytics
export const fetchAnalytics = createAsyncThunk(
  'analytics/fetchAnalytics',
  async (_, thunkAPI) => {
    try {
      const data = await getAnalyticsData();
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch analytics'
      );
    }
  }
);

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.participants = action.payload.participants;
        state.averageScore = action.payload.averageScore;
        state.topPerformers = action.payload.topPerformers;
        state.scoreDistribution = action.payload.scoreDistribution;
      })
      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default analyticsSlice.reducer;
