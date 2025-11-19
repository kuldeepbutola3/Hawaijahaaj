import { combineReducers } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage';
// import reduceReducers from 'reduce-reducers';
// import { resetStoreActionCreator } from './rootActions';
// import { rehydrateReducer } from './persist';
import { appSlice } from '../appSlice';

import { persistReducer } from 'redux-persist';
import { sessionSlice } from '../hw/session/sessionSlice';
import { homeSlice } from '../hw/home/homeSlice';
import { genericSlice } from '../hw/generic/genericSlice';
import { toastSlice } from '../hw/toast/ToastSlice';
import { flightSlice } from '../hw/flight/flightSlice';

const combinedReducer = combineReducers({
  app: appSlice.reducer,
  session: sessionSlice.reducer,
  home: homeSlice.reducer,
  generic: genericSlice.reducer,
  toast: toastSlice.reducer,
  flight: flightSlice.reducer,
});

export type RootState = ReturnType<typeof combinedReducer>;
export type RootStateObj = { state: RootState };
export type RootSelector = (state: RootState) => RootState[keyof RootState];

const persistConfig = {
  key: 'root',
  storage: AsyncStorage, // or AsyncStorage for RN
  whitelist: [], // ['app'], // only persist this slice
};
const rootReducer = persistReducer(persistConfig, combinedReducer);

// export type RootReducer = typeof rootReducer;

export default rootReducer;
