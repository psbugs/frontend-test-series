import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, registerUser as registerUserAPI } from '../../services/UsersService';

interface UserState {
  role: string | null;
  user: any;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  token: null,
  role: null,
  loading: false,
  error: null,
};

// Login Thunk
export const login = createAsyncThunk(
  'users/login',
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await loginUser(credentials);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

// Register Thunk
export const registerUser = createAsyncThunk(
  'users/register',
  async (
    userData: { name: string; email: string; password: string; role: string },
    thunkAPI
  ) => {
    try {
      const response = await registerUserAPI(userData);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.role = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login handlers
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
        state.role = action.payload.user.role;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Register handlers
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        // optional: store registered user
        // state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = usersSlice.actions;
export default usersSlice.reducer;
