import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import TestSeriesService from '../../services/TestSeriesService';
import { RootState } from '../store';

interface TestSeriesState {
  items: any[];
  loading: boolean;
  error: string | null;
}

const initialState: TestSeriesState = {
  items: [],
  loading: false,
  error: null,
};

// Async Thunks
export const fetchTestSeries = createAsyncThunk(
  'testSeries/fetchAll',
  async () => {
    const response = await TestSeriesService.getAllTestSeries();
    return response.data; // expecting array of test series
  }
);

export const createTestSeries = createAsyncThunk(
  'testSeries/create',
  async (payload: any) => {
    const response = await TestSeriesService.createTestSeries(payload);
    return response.data;
  }
);

export const updateTestSeries = createAsyncThunk(
  'testSeries/update',
  async ({ id, payload }: { id: string; payload: any }) => {
  const response = await TestSeriesService.updateTestSeries(id, payload);
    return response.data;
  }
);

export const deleteTestSeries = createAsyncThunk(
  'testSeries/delete',
  async (id: string) => {
    await TestSeriesService.deleteTestSeries(id);
    return id; // return id to remove from local state
  }
);

export const uploadQuestionsCSV = createAsyncThunk(
  'testSeries/uploadCSV',
  async ({ testId, file }: { testId: string; file: File }) => {
    const response = await TestSeriesService.uploadQuestionsCSV(testId, file);
    return response.data;
  }
);

// Slice
const testSeriesSlice = createSlice({
  name: 'testSeries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Fetch All
      .addCase(fetchTestSeries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTestSeries.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTestSeries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Fetch failed';
      })

      // Create
      .addCase(createTestSeries.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // Update
      .addCase(updateTestSeries.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      })

      // Delete
      .addCase(deleteTestSeries.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload);
      })

      // Upload CSV (optional success)
      .addCase(uploadQuestionsCSV.fulfilled, (state, action) => {
        // No state mutation needed unless response includes new data
      });
  }
});


export default testSeriesSlice.reducer;
