// app/slices/learnerTestSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import TestSeriesService from '../../services/TestSeriesService';

export interface Question {
  _id: string;
  question: string;
  options: string[];
  skillTag?: string;
}

interface AnswerReview {
  question: string;
  yourAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

export interface Test {
  _id: string;
  status?:'completed' | 'not_attempted';
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  [key: string]: any;
}

export interface TestResult {
  testTitle: string;
  score: number;
  totalMarks: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  answers: AnswerReview[];
}

interface LearnerTestState {
  tests: Test[];
  result: TestResult | null;
  loading: boolean;
  error: string | null;
}


// Add this to state
interface LearnerTestState {
  tests: Test[];
  result: TestResult | null;
  questions: Question[]; // 👈 add this line
  loading: boolean;
  error: string | null;
}

const initialState: LearnerTestState = {
  tests: [],
  result: null,
  questions: [],
  loading: false,
  error: null,
};

// Add a new thunk
export const fetchQuestionsForTest = createAsyncThunk(
  'test/fetchQuestionsForTest',
  async ({ testId, questionLimit }: { testId: string; questionLimit: number }, thunkAPI) => {
    try {
      const response = await TestSeriesService.fetchQuestionsByTestId(testId, questionLimit);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch questions');
    }
  }
);

// Thunk to fetch all tests attempted by learner
export const fetchLearnerTests = createAsyncThunk(
  'learnerTest/fetch',
  async (userId: string, thunkAPI) => {
    try {
      const response = await TestSeriesService.getLearnerTests(userId);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to load learner tests');
    }
  }
);

// Thunk to fetch result of a specific test
export const fetchTestResult = createAsyncThunk(
  'testResult/fetch',
  async ({ userId, testId }: { userId: string; testId: string }, thunkAPI) => {
    try {
      const response = await TestSeriesService.getTestResult(userId, testId);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to load test result');
    }
  }
);

// Submit learner test
export const submitLearnerTest = createAsyncThunk(
  'learnerTest/submit',
  async ({ userId, testId, answers }: { userId: string; testId: string; answers: Record<string, string> }, thunkAPI) => {
    try {
      const response = await TestSeriesService.submitLearnerTest(userId, testId, answers); // update service call too
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to submit test');
    }
  }
);


const learnerTestSlice = createSlice({
  name: 'learnerTest',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Learner Tests
      .addCase(fetchLearnerTests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLearnerTests.fulfilled, (state, action) => {
        state.loading = false;
        state.tests = action.payload;
      })
      .addCase(fetchLearnerTests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Single Test Result
      .addCase(fetchTestResult.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTestResult.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
      })
      .addCase(fetchTestResult.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchQuestionsForTest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestionsForTest.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;
      })
      .addCase(fetchQuestionsForTest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(submitLearnerTest.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(submitLearnerTest.fulfilled, (state, action) => {
          state.loading = false;
          state.result = action.payload; // if backend returns a result
        })
        .addCase(submitLearnerTest.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
  },
});

export default learnerTestSlice.reducer;
