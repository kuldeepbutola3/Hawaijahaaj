import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// type AppOnBoardingState = "OnBoarding" | "SignUpProcess" | "LoggedIn"

interface AppState {
  username: string;
  isloggedIn: boolean;
  marketingScreen: Boolean;
}

const initialState: AppState = {
  username: '',
  isloggedIn: false,
  marketingScreen: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isloggedIn = action.payload;
    },
    setMarketingScreen: (state, action: PayloadAction<boolean>) => {
      state.marketingScreen = action.payload;
    },
  },
});
